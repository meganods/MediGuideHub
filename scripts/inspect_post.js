const fs = require('fs');
const mockData = fs.readFileSync('src/lib/mockData.ts', 'utf8');
const sTag = 'export const INITIAL_BLOG_POSTS: BlogPost[] = [';
const eTag = 'export const INITIAL_FAQS: FAQItem[] = [';
const sIdx = mockData.indexOf(sTag) + 'export const INITIAL_BLOG_POSTS: BlogPost[] = '.length;
const eIdx = mockData.indexOf(eTag);
const posts = JSON.parse(mockData.substring(sIdx, eIdx).trim().replace(/;$/, ''));

const p = posts.find(x => x.slug === 'bph-enlarged-prostate-symptoms-medications-psa');
console.log('Title:', p.title);
console.log('Intro length:', (p.introduction || '').length);
console.log('Content length:', (p.content || '').length);
console.log('Blocks count:', (p.contentBlocks || []).length);
(p.contentBlocks || []).forEach((b, i) => {
  console.log(`Block ${i+1}: [${b.type}] heading="${b.heading}" itemsCount=${(b.items||[]).length}`);
});
console.log('FAQs count:', (p.faqs || []).length);
