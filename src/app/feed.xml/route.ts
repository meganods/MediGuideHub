import { NextResponse } from "next/server";
import { getPublishedBlogPosts } from "@/lib/db";

export const revalidate = 86400; // Cache for 24 hours to minimize origin compute

function escapeXml(unsafe: string): string {
  return (unsafe || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const baseUrl = "https://www.mediguide4u.com";
  
  try {
    const posts = await getPublishedBlogPosts();
    const publishedPosts = posts
      .filter((p) => p.slug && (!p.status || p.status.toLowerCase() === "published"));

    const rssItems = publishedPosts
      .map((post) => {
        const pubDate = post.publishedAt
          ? new Date(post.publishedAt).toUTCString()
          : new Date().toUTCString();
        const postUrl = `${baseUrl}/blog/${post.slug}`;
        const author = post.author || "mediguide4u Editorial Staff";

        return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description>${escapeXml(post.summary || post.metaDescription || "")}</description>
      <pubDate>${pubDate}</pubDate>
      <category>${escapeXml(post.category || "Healthcare")}</category>
      <author>editorial@mediguide4u.com (${escapeXml(author)})</author>
      ${post.featuredImage ? `<enclosure url="${escapeXml(post.featuredImage)}" type="image/jpeg" length="0" />` : ""}
    </item>`;
      })
      .join("");

    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>mediguide4u - Medically-Reviewed Healthcare &amp; Wellness Guides</title>
    <link>${baseUrl}</link>
    <description>Clear, doctor-reviewed medical guides covering symptoms, conditions, clinical nutrition, and preventive wellness strategies.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${baseUrl}/icon.png</url>
      <title>mediguide4u</title>
      <link>${baseUrl}</link>
    </image>
    ${rssItems}
  </channel>
</rss>`;

    return new NextResponse(rssXml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    });
  } catch (error) {
    console.error("Error generating RSS feed:", error);
    return new NextResponse("Error generating RSS feed", { status: 500 });
  }
}
