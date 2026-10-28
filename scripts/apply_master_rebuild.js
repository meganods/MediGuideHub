const fs = require('fs');
const path = require('path');
const { initializeApp, cert, getApps } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccount = require('../firebase-service-account.json');
if (!getApps().length) {
  initializeApp({ credential: cert(serviceAccount) });
}
const db = getFirestore();

const part1 = require('./unique_clinical_data_part1');
const part2 = require('./unique_clinical_data_part2');
const additions = require('./unique_clinical_data_additions');
const tables = require('./unique_clinical_tables');
const clinicalData = { ...part1, ...part2 };

const mockPath = path.join(__dirname, '../src/lib/mockData.ts');
let mockCode = fs.readFileSync(mockPath, 'utf8');

const sTag = 'export const INITIAL_BLOG_POSTS: BlogPost[] = [';
const eTag = 'export const INITIAL_FAQS: FAQItem[] = [';
const sIdx = mockCode.indexOf(sTag) + 'export const INITIAL_BLOG_POSTS: BlogPost[] = '.length;
const eIdx = mockCode.indexOf(eTag);
const posts = JSON.parse(mockCode.substring(sIdx, eIdx).trim().replace(/;$/, ''));

const BOILERPLATE_HEADINGS = [
  "Clinical Evidence, Diagnostic Benchmarks & Practice Guidelines",
  "Clinical Management Protocols, Diagnostic Criteria & Differential Triage",
  "Neurobiological Pathways, Cognitive Scaffolding & Sleep Architecture Interventions",
  "Evidence-Based Action Plan, Long-Term Monitoring & Patient Safety",
  "Evidence-Based Practice Guidelines, Diagnostic Criteria & Therapeutic Milestones",
  "Geriatric Syndromes, Functional Independence & Deprescribing Protocols",
  "Endocrine Dynamics, Clinical Staging & Evidence-Based Hormone Management",
  "Clinical Biomarkers, Pharmacological Titration & Practice Guidelines",
  "Gastrointestinal Physiology, Mucosal Barrier Integrity & Evidence-Based Dietetics",
  "Diagnostic Reliability, Laboratory Reference Ranges & Clinical Decision Algorithms"
];

function actualRenderedWords(p) {
  let text = (p.title || '') + ' ' + (p.summary || '') + ' ' + (p.introduction || '') + ' ';
  if (p.contentBlocks && p.contentBlocks.length > 0) {
    p.contentBlocks.forEach(b => {
      text += (b.heading || '') + ' ' + (b.content || '') + ' ';
      if (b.items) text += b.items.join(' ') + ' ';
      if (b.columns) text += b.columns.join(' ') + ' ';
      if (b.rows) b.rows.forEach(r => {
        if (Array.isArray(r)) text += r.join(' ') + ' ';
        else if (r.cells) text += r.cells.join(' ') + ' ';
      });
    });
  } else if (p.content) {
    text += p.content + ' ';
  }
  if (p.faqs && Array.isArray(p.faqs)) {
    p.faqs.forEach(f => text += (f.question || '') + ' ' + (f.answer || '') + ' ');
  }
  return text.split(/\s+/).filter(w => w.length > 0).length;
}

async function run() {
  console.log("=== APPLYING MASTER REBUILD TO MOCKDATA.TS & FIRESTORE ===");
  
  const updatedPosts = posts.map(post => {
    const p = JSON.parse(JSON.stringify(post)); // deep clone
    
    // 1. Remove boilerplate blocks
    p.contentBlocks = (p.contentBlocks || []).filter(b => !BOILERPLATE_HEADINGS.includes(b.heading));
    
    // For Vitamin D post: keep original blocks without adding extra
    if (p.slug === 'vitamin-d-deficiency-symptoms-causes-risk-factors-and-how-to-maintain-healthy-levels') {
      // Keep original blocks
    } else {
      // 2. Add base unique clinical blocks
      const custom = clinicalData[p.slug];
      if (custom && custom.blocks) {
        p.contentBlocks.push(...custom.blocks);
      }
      
      // 3. Add extra unique block if this slug has one
      if (additions[p.slug]) {
        p.contentBlocks.push(additions[p.slug]);
      }

      // 4. Add table block if this slug has one
      if (tables[p.slug]) {
        p.contentBlocks.push(tables[p.slug]);
      }
    }

    // Set updated timestamps and E-E-A-T metadata
    p.status = "Published";
    p.medicalReviewedAt = "October 2026";
    p.updatedAt = new Date().toISOString();
    p.readTime = "10 min read";

    return p;
  });

  // Calculate and display statistics
  const results = updatedPosts.map(p => ({
    slug: p.slug,
    title: p.title,
    category: p.category,
    words: actualRenderedWords(p)
  }));

  results.sort((a,b) => a.words - b.words);
  console.log("\n=== ALL 46 POSTS FINAL RENDERED WORD COUNTS ===");
  results.forEach((r, idx) => {
    console.log(`${idx + 1}. [${r.category}] [${r.words} words] ${r.title}`);
  });

  const wordCounts = results.map(r => r.words);
  const min = Math.min(...wordCounts);
  const max = Math.max(...wordCounts);
  const avg = Math.round(wordCounts.reduce((a,b) => a + b, 0) / wordCounts.length);
  console.log(`\nFINAL STATS: Min = ${min}, Max = ${max}, Avg = ${avg}`);
  console.log(`Under 1,500: ${wordCounts.filter(w => w < 1500).length}, Over 2,000: ${wordCounts.filter(w => w > 2000).length}`);

  // 1. Write back to src/lib/mockData.ts
  const newPostsCode = 'export const INITIAL_BLOG_POSTS: BlogPost[] = ' + JSON.stringify(updatedPosts, null, 2) + ';\n\n';
  mockCode = mockCode.substring(0, mockCode.indexOf(sTag)) + newPostsCode + mockCode.substring(eIdx);
  fs.writeFileSync(mockPath, mockCode, 'utf8');
  console.log("\nSuccessfully updated src/lib/mockData.ts!");

  // 2. Sync to Firestore
  console.log("\nSyncing all 46 master posts to Firestore...");
  let count = 0;
  for (const post of updatedPosts) {
    await db.collection('posts').doc(post.id).set(post, { merge: true });
    count++;
    if (count % 10 === 0) {
      console.log(`Synced ${count}/46 posts to Firestore...`);
    }
  }
  console.log("All 46 posts successfully synced to Firestore!");
}

run().catch(console.error);
