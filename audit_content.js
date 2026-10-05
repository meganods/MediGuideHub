const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('./firebase-service-account.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function auditDatabase() {
  console.log("=== STARTING ADSENSE AUDIT ===\n");
  
  const postsSnapshot = await db.collection('posts').get();
  const categoriesSnapshot = await db.collection('categories').get();
  
  const posts = [];
  postsSnapshot.forEach(doc => posts.push({ id: doc.id, ...doc.data() }));
  
  // 1. Check for "Thin Content" (< 500 words)
  console.log("--- THIN CONTENT CHECK (< 500 words) ---");
  let thinCount = 0;
  posts.forEach(post => {
    const text = post.content || "";
    // Simple word count approximation
    const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
    if (wordCount < 500) {
      console.log(`[Thin] ${post.slug || post.id} - ${wordCount} words`);
      thinCount++;
    }
  });
  if (thinCount === 0) console.log("✅ No thin content found. All articles are > 500 words.");
  console.log();

  // 2. Check for Duplication (Identical Titles or exact same content length as a proxy)
  console.log("--- INTERNAL DUPLICATION CHECK ---");
  const titles = new Set();
  let dupCount = 0;
  posts.forEach(post => {
    const title = (post.title || "").toLowerCase().trim();
    if (titles.has(title)) {
      console.log(`[Duplicate Title] Found multiple posts with title: "${title}"`);
      dupCount++;
    } else {
      titles.add(title);
    }
  });
  if (dupCount === 0) console.log("✅ No exact duplicate titles found.");
  console.log();

  // 3. Category Structural Maintenance Check
  console.log("--- CATEGORY MAINTENANCE CHECK ---");
  
  // Count posts per category
  const categoryCounts = {};
  posts.forEach(post => {
    const cat = post.category;
    if (cat) {
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    }
  });

  let deletedCats = 0;
  for (const doc of categoriesSnapshot.docs) {
    const catData = doc.data();
    const catName = catData.name || catData.title || doc.id;
    // Map the string properly based on how they store category links
    const catSlug = catData.slug || doc.id;
    
    // Count how many posts have this category's slug or name
    let count = 0;
    posts.forEach(post => {
      if (post.category === catName || post.category === catSlug || post.subcategory === catName) {
        count++;
      }
    });

    if (count <= 2) {
      console.log(`[Removing] Category "${catName}" only has ${count} articles. Deleting to fix site structure...`);
      await db.collection('categories').doc(doc.id).delete();
      deletedCats++;
    } else {
      console.log(`[Keeping] Category "${catName}" has ${count} articles.`);
    }
  }
  
  if (deletedCats === 0) {
    console.log("✅ All categories have 3 or more articles.");
  }
  
  console.log("\n=== AUDIT COMPLETE ===");
}

auditDatabase().catch(console.error);
