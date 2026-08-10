import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/login",
        "/register",
        "/profile",
        "/dashboard",
        "/admin",
        "/admin/*",
        "/settings",
      ],
    },
    sitemap: "https://mediguide4u.com/sitemap.xml",
  };
}
