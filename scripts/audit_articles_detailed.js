const fs = require('fs');
const path = require('path');
const { initializeApp, cert, getApps } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('../firebase-service-account.json');

if (!getApps().length) {
  initializeApp({ credential: cert(serviceAccount) });
}
const db = getFirestore();

async function run() {
  const postsSnap = await db.collection('posts').get();
  const catSnap = await db.collection('categories').get();

  const posts = [];
  postsSnap.forEach(d => posts.push({ id: d.id, ...d.data() }));

  const categories = [];
  catSnap.forEach(d => categories.push({ id: d.id, ...d.data() }));

  const results = posts.map(p => {
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
    const words = text.split(/\s+/).filter(w => w.length > 0).length;
    return {
      id: p.id,
      slug: p.slug,
      title: p.title,
      category: p.category,
      wordCount: words,
      status: p.status || 'Published'
    };
  });

  results.sort((a,b) => (a.category || '').localeCompare(b.category || '') || a.wordCount - b.wordCount);

  fs.writeFileSync(path.join(__dirname, 'detailed_articles_audit.json'), JSON.stringify(results, null, 2));

  console.log('Total Articles:', results.length);
  console.log('Total Categories in collection:', categories.length);

  let totalWords = results.reduce((acc, r) => acc + r.wordCount, 0);
  console.log('Total Words across all articles:', totalWords);
  console.log('Average Words per article:', Math.round(totalWords / results.length));

  // Print list
  results.forEach((r, idx) => {
    console.log(`${idx + 1}. [${r.category}] [${r.wordCount} words] "${r.title}" (slug: ${r.slug})`);
  });
}

run().catch(console.error);
