import { INITIAL_BLOG_POSTS } from "./src/lib/mockData";

const wordCounts = INITIAL_BLOG_POSTS.map(post => {
  let text = post.title + " " + post.summary + " " + (post.quickAnswer || "") + " " + (post.introduction || "");
  post.contentBlocks?.forEach(block => {
    text += " " + (block.heading || "") + " " + (block.content || "") + " " + (block.items?.join(" ") || "");
    if (block.rows) {
      block.rows.forEach(row => {
        text += " " + row.join(" ");
      });
    }
  });
  const words = text.split(/\s+/).filter(w => w.length > 0).length;
  return { slug: post.slug, words, category: post.category };
});

const thin = wordCounts.filter(w => w.words < 500);
console.log("Total articles:", wordCounts.length);
console.log("Thin articles (< 500 words):", thin.length);
console.log("Bottom 10 thin articles:");
thin.sort((a,b) => a.words - b.words).slice(0, 10).forEach(w => console.log(w.slug, w.words, "words"));

const categories = [...new Set(INITIAL_BLOG_POSTS.map(p => p.category))];
const categoryCounts = categories.map(c => {
  return { category: c, count: wordCounts.filter(w => w.category === c).length };
});

console.log("\nCategory Counts:");
console.log(categoryCounts);
