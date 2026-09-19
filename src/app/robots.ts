import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/admin-login",
          "/dashboard/",
          "/login",
          "/register",
          "/forgot-password",
          "/api/",
        ],
      },
    ],
    sitemap: "https://www.mediguide4u.com/sitemap.xml",
    host: "https://www.mediguide4u.com",
  };
}

