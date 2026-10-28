// Test script to check our rendered word calculation matches exactly what Next.js renders
const fs = require('fs');
const mockData = fs.readFileSync('src/lib/mockData.ts', 'utf8');
const sTag = 'export const INITIAL_BLOG_POSTS: BlogPost[] = [';
const eTag = 'export const INITIAL_FAQS: FAQItem[] = [';
const sIdx = mockData.indexOf(sTag) + 'export const INITIAL_BLOG_POSTS: BlogPost[] = '.length;
const eIdx = mockData.indexOf(eTag);
const posts = JSON.parse(mockData.substring(sIdx, eIdx).trim().replace(/;$/, ''));

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

console.log('Posts count in mockData:', posts.length);
console.log('Test function loaded successfully.');
