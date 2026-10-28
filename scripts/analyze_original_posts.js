const fs = require('fs');
const mockData = fs.readFileSync('src/lib/mockData.ts', 'utf8');
const sTag = 'export const INITIAL_BLOG_POSTS: BlogPost[] = [';
const eTag = 'export const INITIAL_FAQS: FAQItem[] = [';
const sIdx = mockData.indexOf(sTag) + 'export const INITIAL_BLOG_POSTS: BlogPost[] = '.length;
const eIdx = mockData.indexOf(eTag);
const posts = JSON.parse(mockData.substring(sIdx, eIdx).trim().replace(/;$/, ''));

const boilerplateHeadings = [
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

function countWordsInText(str) {
  return (str || '').trim().split(/\s+/).filter(Boolean).length;
}

const analysis = posts.map(p => {
  const originalBlocks = (p.contentBlocks || []).filter(b => !boilerplateHeadings.includes(b.heading));
  let origText = (p.title || '') + ' ' + (p.summary || '') + ' ' + (p.introduction || '') + ' ';
  originalBlocks.forEach(b => {
    origText += (b.heading || '') + ' ' + (b.content || '') + ' ';
    if (b.items) origText += b.items.join(' ') + ' ';
    if (b.columns) origText += b.columns.join(' ') + ' ';
    if (b.rows) b.rows.forEach(r => {
      if (Array.isArray(r)) origText += r.join(' ') + ' ';
      else if (r.cells) origText += r.cells.join(' ') + ' ';
    });
  });
  if (p.faqs) {
    p.faqs.forEach(f => origText += (f.question || '') + ' ' + (f.answer || '') + ' ');
  }
  const origWords = countWordsInText(origText);
  return {
    slug: p.slug,
    title: p.title,
    origBlocksCount: originalBlocks.length,
    origWords: origWords,
    contentLength: (p.content || '').length
  };
});

console.log('Original word count before boilerplate (min, max, avg):');
const counts = analysis.map(x => x.origWords);
console.log('Min:', Math.min(...counts), 'Max:', Math.max(...counts), 'Avg:', Math.round(counts.reduce((a,b)=>a+b,0)/counts.length));
console.log('\nSample posts:');
analysis.slice(0, 10).forEach(x => {
  console.log(`- ${x.slug}: origWords=${x.origWords}, origBlocks=${x.origBlocksCount}`);
});
