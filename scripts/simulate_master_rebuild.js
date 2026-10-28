const fs = require('fs');
const part1 = require('./unique_clinical_data_part1');
const part2 = require('./unique_clinical_data_part2');
const clinicalData = { ...part1, ...part2 };

const mockData = fs.readFileSync('src/lib/mockData.ts', 'utf8');
const sTag = 'export const INITIAL_BLOG_POSTS: BlogPost[] = [';
const eTag = 'export const INITIAL_FAQS: FAQItem[] = [';
const sIdx = mockData.indexOf(sTag) + 'export const INITIAL_BLOG_POSTS: BlogPost[] = '.length;
const eIdx = mockData.indexOf(eTag);
const posts = JSON.parse(mockData.substring(sIdx, eIdx).trim().replace(/;$/, ''));

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

const simulatedPosts = posts.map(post => {
  const p = JSON.parse(JSON.stringify(post)); // deep clone
  
  // 1. Remove boilerplate blocks
  p.contentBlocks = (p.contentBlocks || []).filter(b => !BOILERPLATE_HEADINGS.includes(b.heading));
  
  // 2. Add unique clinical blocks
  const custom = clinicalData[p.slug];
  if (custom && custom.blocks) {
    p.contentBlocks.push(...custom.blocks);
  }
  
  const words = actualRenderedWords(p);
  return {
    slug: p.slug,
    title: p.title,
    category: p.category,
    blocksCount: p.contentBlocks.length,
    words: words
  };
});

simulatedPosts.sort((a,b) => a.words - b.words);

console.log('=== SIMULATION RESULTS ===');
simulatedPosts.forEach((p, i) => {
  console.log((i+1) + '. [' + p.category + '] ' + p.words + ' words: ' + p.slug);
});

const wordCounts = simulatedPosts.map(p => p.words);
const min = Math.min(...wordCounts);
const max = Math.max(...wordCounts);
const avg = Math.round(wordCounts.reduce((a,b)=>a+b,0) / wordCounts.length);
const under1500 = simulatedPosts.filter(p => p.words < 1500);
const over2000 = simulatedPosts.filter(p => p.words > 2000);

console.log('\n--- SUMMARY ---');
console.log('Total:', simulatedPosts.length);
console.log('Min words:', min);
console.log('Max words:', max);
console.log('Avg words:', avg);
console.log('Under 1,500 words:', under1500.length);
console.log('Over 2,000 words:', over2000.length);
if (under1500.length > 0) {
  console.log('Under 1500 list:', under1500.map(x => ({ slug: x.slug, words: x.words })));
}
if (over2000.length > 0) {
  console.log('Over 2000 list:', over2000.map(x => ({ slug: x.slug, words: x.words })));
}
