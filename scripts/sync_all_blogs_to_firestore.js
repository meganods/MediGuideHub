const fs = require("fs");
const path = require("path");
const { initializeApp, cert, getApps } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const serviceAccount = require("../firebase-service-account.json");
if (!getApps().length) {
  initializeApp({ credential: cert(serviceAccount) });
}
const db = getFirestore();

function sanitizeForFirestore(val) {
  if (val === undefined) return null;
  if (Array.isArray(val)) {
    return val.map(item => {
      if (Array.isArray(item)) {
        // Firestore prohibits nested arrays - wrap in object with cells property
        return { cells: item.map(c => (c === undefined ? "" : c)) };
      }
      return sanitizeForFirestore(item);
    });
  }
  if (typeof val === "object" && val !== null) {
    const cleaned = {};
    for (const [k, v] of Object.entries(val)) {
      if (v !== undefined) {
        cleaned[k] = sanitizeForFirestore(v);
      }
    }
    return cleaned;
  }
  return val;
}

async function runSync() {
  console.log("Reading INITIAL_BLOG_POSTS from mockData.ts...");
  const { INITIAL_BLOG_POSTS } = require("../src/lib/mockData.ts");
  console.log(`Found ${INITIAL_BLOG_POSTS.length} posts to sync.`);

  // 1. Fetch existing posts from Firestore to avoid duplicates and update in place
  const existingSnapshot = await db.collection("posts").get();
  console.log(`Current posts in Firestore: ${existingSnapshot.size}`);

  const slugToDocId = new Map();
  const idToDocId = new Map();

  existingSnapshot.docs.forEach(docSnap => {
    const data = docSnap.data();
    if (data.slug) slugToDocId.set(data.slug, docSnap.id);
    if (data.id) idToDocId.set(data.id, docSnap.id);
  });

  let updatedCount = 0;
  let createdCount = 0;

  // Process in batches of 20
  const batchSize = 20;
  for (let i = 0; i < INITIAL_BLOG_POSTS.length; i += batchSize) {
    const batch = db.batch();
    const slice = INITIAL_BLOG_POSTS.slice(i, i + batchSize);

    for (const rawPost of slice) {
      let targetDocId;
      if (slugToDocId.has(rawPost.slug)) {
        targetDocId = slugToDocId.get(rawPost.slug);
        updatedCount++;
      } else if (rawPost.id && (idToDocId.has(rawPost.id) || existingSnapshot.docs.some(d => d.id === rawPost.id))) {
        targetDocId = rawPost.id;
        updatedCount++;
      } else {
        targetDocId = rawPost.id || db.collection("posts").doc().id;
        createdCount++;
      }

      const docRef = db.collection("posts").doc(targetDocId);
      const cleanedPost = sanitizeForFirestore({
        ...rawPost,
        id: targetDocId,
        publishedAt: rawPost.publishedAt || "2026-08-15",
        status: "Published",
        updatedAt: new Date().toISOString(),
      });

      batch.set(docRef, cleanedPost, { merge: true });
    }

    await batch.commit();
    console.log(`Synced posts ${i + 1} to ${Math.min(i + batchSize, INITIAL_BLOG_POSTS.length)}`);
  }

  console.log(`\n=== SYNC SUMMARY ===`);
  console.log(`Successfully updated: ${updatedCount}`);
  console.log(`Successfully created: ${createdCount}`);
  console.log(`Total processed: ${INITIAL_BLOG_POSTS.length}`);

  // Re-verify Firestore collection
  const finalSnapshot = await db.collection("posts").get();
  console.log(`Final Firestore post count: ${finalSnapshot.size}`);
}

runSync().catch((err) => {
  console.error("Sync failed:", err);
  process.exit(1);
});
