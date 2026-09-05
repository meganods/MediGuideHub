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
          "/search?*",
        ],
      },
      {
        userAgent: [
          "Googlebot",
          "Google-InspectionTool",
          "Bingbot",
          "Twitterbot",
          "facebookexternalhit",
          "Mediapartners-Google",
          "Google-Display-Ads-Bot",
        ],
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
          "/search?*",
        ],
      },
    ],
    sitemap: "https://mediguide4u.com/sitemap.xml",
    host: "https://mediguide4u.com",
  };
}

