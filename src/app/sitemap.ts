import { MetadataRoute } from "next";
import { getPosts, getCategories } from "@/lib/db";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://mediguide4u.com";

  // Static routes configuration as explicitly requested
  const staticRoutes = [
    "",
    "/about",
    "/contact",
    "/blogs",
    "/articles",
    "/categories",
    "/privacy-policy",
    "/terms-and-conditions",
    "/disclaimer",
    "/cookie-policy",
  ];

  const staticEntries = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === "" ? "daily" : "weekly") as "daily" | "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  try {
    const posts = await getPosts();
    const categories = await getCategories();

    // Dynamic /blog/[slug] and /article/[slug] entries
    const postEntries = posts.flatMap((post) => {
      const dateStr = post.updatedAt || post.publishedAt || new Date().toISOString();
      const lastMod = new Date(dateStr);
      return [
        {
          url: `${baseUrl}/blog/${post.slug}`,
          lastModified: lastMod,
          changeFrequency: "monthly" as const,
          priority: 0.6,
        },
        {
          url: `${baseUrl}/article/${post.slug}`,
          lastModified: lastMod,
          changeFrequency: "monthly" as const,
          priority: 0.6,
        }
      ];
    });

    // Dynamic /category/[slug] entries
    const categoryEntries = categories.map((cat) => ({
      url: `${baseUrl}/category/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

    return [...staticEntries, ...postEntries, ...categoryEntries];
  } catch (error) {
    console.error("Error generating dynamic sitemap entries:", error);
    return staticEntries;
  }
}
