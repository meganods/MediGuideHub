const fs = require('fs');
const mockData = fs.readFileSync('src/lib/mockData.ts', 'utf8');
const sTag = 'export const INITIAL_BLOG_POSTS: BlogPost[] = [';
const eTag = 'export const INITIAL_FAQS: FAQItem[] = [';
const sIdx = mockData.indexOf(sTag) + 'export const INITIAL_BLOG_POSTS: BlogPost[] = '.length;
const eIdx = mockData.indexOf(eTag);
const posts = JSON.parse(mockData.substring(sIdx, eIdx).trim().replace(/;$/, ''));

const p = posts.find(x => x.slug === 'bph-enlarged-prostate-symptoms-medications-psa');
console.log('--- CONTENT SAMPLE ---');
console.log(p.content.substring(0, 1000));
console.log('--- BLOCKS 1-3 ---');
console.log(JSON.stringify(p.contentBlocks.slice(0, 3), null, 2).substring(0, 1000));
