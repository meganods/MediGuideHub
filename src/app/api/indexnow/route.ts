import { NextResponse } from "next/server";
import { getPublishedBlogPosts, getCategories, getAuthors } from "@/lib/db";

const INDEXNOW_KEY = "c88e991490214a1fa33f9e9d1bf76228";
const HOST = "www.mediguide4u.com";
const BASE_URL = `https://${HOST}`;

const STATIC_ROUTES = [
  "",
  "/blog",
  "/tools",
  "/quizzes",
  "/search",
  "/about",
  "/medical-review-board",
  "/authors",
  "/contact",
  "/faq",
  "/sitemap",
  "/privacy-policy",
  "/terms-and-conditions",
  "/medical-disclaimer",
  "/cookie-policy",
  "/editorial-policy",
  "/corrections-policy",
  "/advertising-policy",
  "/affiliate-disclosure",
  "/accessibility",
  "/dmca",
];

export async function GET() {
  return handleIndexNowSubmission();
}

export async function POST() {
  return handleIndexNowSubmission();
}

async function handleIndexNowSubmission() {
  try {
    const [posts, categories, authors] = await Promise.all([
      getPublishedBlogPosts().catch(() => []),
      getCategories().catch(() => []),
      getAuthors().catch(() => []),
    ]);

    const urlList: string[] = [];

    // 1. Static routes
    STATIC_ROUTES.forEach((r) => urlList.push(`${BASE_URL}${r}`));

    // 2. Categories
    categories.forEach((c) => {
      if (c.slug) urlList.push(`${BASE_URL}/category/${c.slug}`);
    });

    // 3. Authors
    authors.forEach((a) => {
      if (a.id) urlList.push(`${BASE_URL}/author/${a.id}`);
    });

    // 4. Blog posts
    posts.forEach((p) => {
      if (p.slug && (!p.status || p.status.toLowerCase() === "published")) {
        urlList.push(`${BASE_URL}/blog/${p.slug}`);
      }
    });

    const uniqueUrls = Array.from(new Set(urlList));

    // Submit batch to IndexNow API (Bing, Yandex, etc.)
    const indexNowPayload = {
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: uniqueUrls,
    };

    const [indexNowRes, bingRes] = await Promise.allSettled([
      fetch("https://api.indexnow.org/indexnow", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(indexNowPayload),
      }),
      fetch("https://www.bing.com/indexnow", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(indexNowPayload),
      }),
    ]);

    // Also ping sitemaps
    await Promise.allSettled([
      fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent(`${BASE_URL}/sitemap.xml`)}`),
      fetch(`https://www.bing.com/ping?sitemap=${encodeURIComponent(`${BASE_URL}/sitemap.xml`)}`),
    ]);

    return NextResponse.json({
      success: true,
      message: `Successfully broadcasted ${uniqueUrls.length} URLs to IndexNow & Search Engine Pings`,
      totalUrlsSubmitted: uniqueUrls.length,
      indexNowStatus: indexNowRes.status === "fulfilled" ? indexNowRes.value.status : "failed",
      bingStatus: bingRes.status === "fulfilled" ? bingRes.value.status : "failed",
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to submit URLs to IndexNow",
      },
      { status: 500 }
    );
  }
}
