import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
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
      {
        userAgent: "Mediapartners-Google",
        allow: "/",
      },
      {
        userAgent: "Google-Display-Ads-Bot",
        allow: "/",
      }
    ],
    sitemap: "https://mediguide4u.com/sitemap.xml",
  };
}
