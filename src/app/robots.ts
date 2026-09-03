import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
        "/admin/*",
        "/admin-login",
        "/dashboard",
        "/dashboard/*",
        "/auth",
        "/login",
        "/register",
        "/forgot-password",
        "/api/*",
      ],
    },
    sitemap: "https://mediguide4u.com/sitemap.xml",
  };
}
