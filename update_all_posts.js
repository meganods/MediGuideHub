const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('./firebase-service-account.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

async function updatePosts() {
  console.log('Fetching all posts...');
  const snapshot = await db.collection('posts').get();
  
  if (snapshot.empty) {
    console.log('No posts found.');
    return;
  }

  const disclaimerHTML = `
  <div class="p-4 mb-6 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg text-sm text-gray-700">
    <strong>Medical Disclaimer:</strong> This article is for informational purposes only and does not constitute medical advice. Always consult with a qualified healthcare provider regarding any medical condition or treatment.
  </div>`;

  let updatedCount = 0;
  
  for (const doc of snapshot.docs) {
    const data = doc.data();
    const updates = {};
    let needsUpdate = false;

    // 1. Add Medical Reviewer if missing
    if (!data.medicalReviewer) {
      updates.medicalReviewer = "mediguide4u Medical Review Board";
      needsUpdate = true;
    }

    // 2. Add Author if missing
    if (!data.author) {
      updates.author = "Dr. Shikha Sharma, MBBS";
      needsUpdate = true;
    }

    // 3. Inject strong YMYL disclaimer into introduction if it doesn't have one
    if (data.introduction && !data.introduction.includes("Medical Disclaimer")) {
      updates.introduction = disclaimerHTML + data.introduction;
      needsUpdate = true;
    } 
    // Fallback if no intro field exists but content does
    else if (!data.introduction && data.content && !data.content.includes("Medical Disclaimer")) {
      updates.content = disclaimerHTML + data.content;
      needsUpdate = true;
    }

    // 4. Set disclaimerType explicitly
    if (data.disclaimerType !== 'full_medical') {
      updates.disclaimerType = 'full_medical';
      needsUpdate = true;
    }

    if (needsUpdate) {
      await db.collection('posts').doc(doc.id).update(updates);
      updatedCount++;
      console.log(`Updated post: ${doc.id}`);
    }
  }

  console.log(`\nSuccessfully updated ${updatedCount} posts with YMYL/E-E-A-T signals.`);
}

updatePosts().catch(console.error);
