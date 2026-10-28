const fs = require('fs');
const path = require('path');
const { initializeApp, cert, getApps } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccount = require('../firebase-service-account.json');
if (!getApps().length) {
  initializeApp({ credential: cert(serviceAccount) });
}
const db = getFirestore();

function countWords(p) {
  let text = (p.title || '') + ' ' + (p.summary || '') + ' ' + (p.introduction || '') + ' ';
  if (p.content) text += p.content + ' ';
  if (p.contentBlocks && Array.isArray(p.contentBlocks)) {
    p.contentBlocks.forEach(b => {
      text += (b.heading || '') + ' ' + (b.content || '') + ' ';
      if (b.items) text += b.items.join(' ') + ' ';
      if (b.rows) b.rows.forEach(r => {
        if (Array.isArray(r)) text += r.join(' ') + ' ';
        else if (r.cells) text += r.cells.join(' ') + ' ';
      });
    });
  }
  if (p.faqs && Array.isArray(p.faqs)) {
    p.faqs.forEach(f => text += (f.question || '') + ' ' + (f.answer || '') + ' ');
  }
  return text.split(/\s+/).filter(w => w.length > 0).length;
}

async function run() {
  const mockPath = path.join(__dirname, '../src/lib/mockData.ts');
  let mockCode = fs.readFileSync(mockPath, 'utf8');
  const sTag = 'export const INITIAL_BLOG_POSTS: BlogPost[] = [';
  const eTag = 'export const INITIAL_FAQS: FAQItem[] = [';
  const sIdx = mockCode.indexOf(sTag) + 'export const INITIAL_BLOG_POSTS: BlogPost[] = '.length;
  const eIdx = mockCode.indexOf(eTag);
  const posts = JSON.parse(mockCode.substring(sIdx, eIdx).trim().replace(/;$/, ''));

  posts.forEach(p => {
    if (p.slug === 'masld-fatty-liver-disease-symptoms-fibroscan-reversal-diet') {
      if (p.contentBlocks && p.contentBlocks.length > 3) {
        p.contentBlocks = p.contentBlocks.slice(0, 3);
      }
      if (p.faqs && p.faqs.length > 3) {
        p.faqs = p.faqs.slice(0, 3);
      }
      console.log('MASLD calibrated word count:', countWords(p));
    }
    if (p.slug === 'vitamin-b12-deficiency-neuropathy-symptoms-treatment-guide') {
      if (p.contentBlocks && p.contentBlocks.length > 3) {
        p.contentBlocks = p.contentBlocks.slice(0, 3);
      }
      if (p.faqs && p.faqs.length > 3) {
        p.faqs = p.faqs.slice(0, 3);
      }
      console.log('B12 calibrated word count:', countWords(p));
    }
  });

  const newPostsCode = 'export const INITIAL_BLOG_POSTS: BlogPost[] = ' + JSON.stringify(posts, null, 2) + ';\n\n';
  mockCode = mockCode.substring(0, mockCode.indexOf(sTag)) + newPostsCode + mockCode.substring(eIdx);
  fs.writeFileSync(mockPath, mockCode, 'utf8');
  console.log('Saved to mockData.ts');

  for (const p of posts) {
    if (p.slug === 'masld-fatty-liver-disease-symptoms-fibroscan-reversal-diet' || p.slug === 'vitamin-b12-deficiency-neuropathy-symptoms-treatment-guide') {
      await db.collection('posts').doc(p.id).set(p, { merge: true });
    }
  }
  console.log('Firestore updated.');

  // Final check
  const allCounts = posts.map(p => ({ slug: p.slug, words: countWords(p) }));
  console.log('Min words:', Math.min(...allCounts.map(p => p.words)));
  console.log('Max words:', Math.max(...allCounts.map(p => p.words)));
}

run().catch(console.error);
