import { MetadataRoute } from "next";
import { getPosts } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://mediguidehub.com";

  // Static routes configuration
  const staticRoutes = [
    "",
    "/about",
    "/accessibility",
    "/contact",
    "/cookie-policy",
    "/editorial-policy",
    "/faq",
    "/medical-disclaimer",
    "/privacy-policy",
    "/terms-and-conditions",
    "/advertising-policy",
    "/corrections-policy",
    "/blog",
  ];

  const staticEntries = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === "" ? "daily" : "weekly") as "daily" | "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  try {
    // Dynamic blog articles routes
    const posts = await getPosts();
    const dynamicEntries = posts.map((post) => {
      const dateStr = post.updatedAt || post.publishedAt || new Date().toISOString();
      return {
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(dateStr),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      };
    });

    return [...staticEntries, ...dynamicEntries];
  } catch (error) {
    console.error("Error generating sitemap dynamic blog entries:", error);
    return staticEntries;
  }
}
