import { MetadataRoute } from "next";
import { getPublishedBlogPosts, getCategories, getAuthors } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.mediguide4u.com";

  // Static routes configuration
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
    let priority = 0.6;
    let changeFrequency: "daily" | "weekly" | "monthly" = "monthly";

    if (route === "") {
      priority = 1.0;
      changeFrequency = "daily";
    } else if (route === "/blog" || route === "/tools" || route === "/quizzes") {
      priority = 0.9;
      changeFrequency = "daily";
    } else if (["/about", "/medical-review-board", "/authors", "/faq", "/sitemap"].includes(route)) {
      priority = 0.8;
      changeFrequency = "weekly";
    }

    return {
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    };
  });

  try {
    const [posts, categories, authors] = await Promise.all([
      getPublishedBlogPosts().catch(() => []),
      getCategories().catch(() => []),
      getAuthors().catch(() => []),
    ]);

    // Dynamic /category/[slug] entries
    const categoryEntries: MetadataRoute.Sitemap = categories.map((cat) => ({
      url: `${baseUrl}/category/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

    // Dynamic /author/[slug] entries
    const authorEntries: MetadataRoute.Sitemap = authors.map((author) => ({
      url: `${baseUrl}/author/${author.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

    // Dynamic /blog/[slug] entries
    const postEntries: MetadataRoute.Sitemap = posts
      .filter((post) => post.slug && (!post.status || post.status.toLowerCase() === "published"))
      .map((post) => {
        const dateStr = post.updatedAt || post.publishedAt || new Date().toISOString();
        const lastMod = new Date(dateStr);
        return {
          url: `${baseUrl}/blog/${post.slug}`,
          lastModified: isNaN(lastMod.getTime()) ? new Date() : lastMod,
          changeFrequency: "weekly" as const,
          priority: 0.8,
        };
      });

    return [...staticEntries, ...categoryEntries, ...authorEntries, ...postEntries];
  } catch (error) {
    console.error("Error generating dynamic sitemap entries:", error);
    return staticEntries;
  }
}
