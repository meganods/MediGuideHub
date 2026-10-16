import { MetadataRoute } from "next";
import { getPublishedBlogPosts, getCategories, getAuthors } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.mediguide4u.com";

  try {
    const [posts, categories, authors] = await Promise.all([
      getPublishedBlogPosts().catch(() => []),
      getCategories().catch(() => []),
      getAuthors().catch(() => []),
    ]);

    // Determine the most recent post publication/update date
    let latestPostDate = new Date("2026-03-15T00:00:00Z");
    const validPostDates = posts
      .map((p) => new Date(p.updatedAt || p.publishedAt || ""))
      .filter((d) => !isNaN(d.getTime()));
    if (validPostDates.length > 0) {
      latestPostDate = new Date(Math.max(...validPostDates.map((d) => d.getTime())));
    }

    // Static policy and informational routes
    const staticRoutes = [
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

    const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => {
      let priority = 0.5;
      let changeFrequency: "daily" | "weekly" | "monthly" = "monthly";
      let lastModified = new Date("2026-03-01T00:00:00Z");

      if (route === "") {
        priority = 1.0;
        changeFrequency = "daily";
        lastModified = latestPostDate;
      } else if (route === "/blog") {
        priority = 0.9;
        changeFrequency = "daily";
        lastModified = latestPostDate;
      } else if (route === "/tools" || route === "/quizzes" || route === "/search") {
        priority = 0.8;
        changeFrequency = "weekly";
        lastModified = new Date("2026-03-10T00:00:00Z");
      } else if (["/about", "/medical-review-board", "/authors", "/faq", "/sitemap"].includes(route)) {
        priority = 0.8;
        changeFrequency = "weekly";
        lastModified = new Date("2026-03-15T00:00:00Z");
      }

      return {
        url: `${baseUrl}${route}`,
        lastModified,
        changeFrequency,
        priority,
      };
    });

    // Dynamic /category/[slug] entries
    const categoryEntries: MetadataRoute.Sitemap = categories.map((cat) => ({
      url: `${baseUrl}/category/${cat.slug}`,
      lastModified: latestPostDate,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

    // Dynamic /author/[slug] entries
    const authorEntries: MetadataRoute.Sitemap = authors.map((author) => ({
      url: `${baseUrl}/author/${author.id}`,
      lastModified: new Date("2026-03-01T00:00:00Z"),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

    // Dynamic /blog/[slug] entries
    const postEntries: MetadataRoute.Sitemap = posts
      .filter((post) => post.slug && (!post.status || post.status.toLowerCase() === "published"))
      .map((post) => {
        const dateStr = post.updatedAt || post.publishedAt || "2026-02-15T00:00:00Z";
        const parsed = new Date(dateStr);
        const lastMod = isNaN(parsed.getTime()) ? new Date("2026-02-15T00:00:00Z") : parsed;
        return {
          url: `${baseUrl}/blog/${post.slug}`,
          lastModified: lastMod,
          changeFrequency: "weekly" as const,
          priority: 0.9,
        };
      });

    return [...staticEntries, ...categoryEntries, ...authorEntries, ...postEntries];
  } catch (error) {
    console.error("Error generating dynamic sitemap entries:", error);
    return [
      {
        url: `${baseUrl}`,
        lastModified: new Date("2026-03-15T00:00:00Z"),
        changeFrequency: "daily",
        priority: 1.0,
      },
    ];
  }
}
