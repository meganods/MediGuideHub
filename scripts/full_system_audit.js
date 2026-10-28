const fs = require('fs');
const { initializeApp, cert, getApps } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccount = require('../firebase-service-account.json');
if (!getApps().length) {
  initializeApp({ credential: cert(serviceAccount) });
}
const db = getFirestore();

async function fullAudit() {
  console.log('================ FULL SYSTEM AUDIT ================');

  // 1. FIRESTORE
  const fsPostsSnap = await db.collection('posts').get();
  const fsCatsSnap = await db.collection('categories').get();
  const fsAuthorsSnap = await db.collection('authors').get();

  const fsPosts = [];
  fsPostsSnap.forEach(d => fsPosts.push({ id: d.id, ...d.data() }));
  const fsCats = [];
  fsCatsSnap.forEach(d => fsCats.push({ id: d.id, ...d.data() }));

  console.log('1. FIRESTORE:');
  console.log('   - Total Posts in Firestore: ' + fsPosts.length);
  console.log('   - Total Categories in Firestore: ' + fsCats.length);
  console.log('   - Total Authors in Firestore: ' + fsAuthorsSnap.size);

  // 2. MOCKDATA.TS
  const mockCode = fs.readFileSync('src/lib/mockData.ts', 'utf8');

  const cTag1 = 'export const INITIAL_CATEGORIES: BlogCategory[] = ';
  const cTag2 = 'export const INITIAL_BLOG_POSTS: BlogPost[] = ';
  const cIdx1 = mockCode.indexOf(cTag1) + cTag1.length;
  const cIdx2 = mockCode.indexOf(cTag2);
  const mockCats = JSON.parse(mockCode.substring(cIdx1, cIdx2).trim().replace(/;$/, ''));

  const pTag1 = 'export const INITIAL_BLOG_POSTS: BlogPost[] = [';
  const pTag2 = 'export const INITIAL_FAQS: FAQItem[] = [';
  const pIdx1 = mockCode.indexOf(pTag1) + pTag1.length - 1;
  const pIdx2 = mockCode.indexOf(pTag2);
  const mockPosts = JSON.parse(mockCode.substring(pIdx1, pIdx2).trim().replace(/;$/, ''));

  console.log('\n2. MOCKDATA.TS:');
  console.log('   - Total Posts in mockData: ' + mockPosts.length);
  console.log('   - Total Categories in mockData: ' + mockCats.length);

  // Check matching slugs
  const fsPostSlugs = new Set(fsPosts.map(p => p.slug));
  const mockPostSlugs = new Set(mockPosts.map(p => p.slug));

  let missingInMock = fsPosts.filter(p => !mockPostSlugs.has(p.slug)).map(p => p.slug);
  let missingInFs = mockPosts.filter(p => !fsPostSlugs.has(p.slug)).map(p => p.slug);

  console.log('   - Post Slugs Match Exactly? ' + (missingInMock.length === 0 && missingInFs.length === 0));
  if (missingInMock.length > 0) console.log('     * Missing in mockData: ' + missingInMock.join(', '));
  if (missingInFs.length > 0) console.log('     * Missing in Firestore: ' + missingInFs.join(', '));

  // Check Category counts
  console.log('\n3. CATEGORY COUNTS BREAKDOWN:');
  mockCats.forEach(c => {
    const fsCatDoc = fsCats.find(fc => fc.slug === c.slug);
    const postsInCat = mockPosts.filter(p => p.category === c.name);
    const fsPostsInCat = fsPosts.filter(p => p.category === c.name);
    console.log('   - [' + c.slug + '] "' + c.name + '":');
    console.log('       mockData badge count: ' + c.articleCount + ' | actual mock posts: ' + postsInCat.length);
    console.log('       Firestore badge count: ' + (fsCatDoc ? fsCatDoc.articleCount : 'MISSING') + ' | actual fs posts: ' + fsPostsInCat.length);
  });
}

fullAudit().catch(console.error);
