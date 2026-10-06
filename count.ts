import { INITIAL_BLOG_POSTS } from "./src/lib/mockData";

const getCount = (slug: string) => {
  const post = INITIAL_BLOG_POSTS.find(p => p.slug.includes(slug));
  if (!post) return 0;
  let text = post.title + " " + post.summary + " " + (post.quickAnswer || "") + " " + (post.introduction || "");
  post.contentBlocks?.forEach(block => {
    text += " " + (block.heading || "") + " " + (block.content || "") + " " + (block.items?.join(" ") || "");
    if (block.rows) {
      block.rows.forEach(row => { text += " " + row.join(" "); });
    }
  });
  return text.split(/\s+/).filter(w => w.length > 0).length;
}

console.log("vitamin-d-deficiency:", getCount("vitamin-d-deficiency"));
console.log("vitamin-b12-deficiency:", getCount("vitamin-b12-deficiency"));
console.log("essential-preventive-health-screenings-by-age:", getCount("essential-preventive-health-screenings-by-age"));
