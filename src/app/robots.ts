import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/authors", "/author/*"],
        disallow: [
          "/admin",
          "/admin/*",
          "/admin-login",
          "/dashboard",
          "/dashboard/*",
          "/auth$",
          "/auth/*",
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
        allow: ["/", "/authors", "/author/*"],
        disallow: [
          "/admin",
          "/admin/*",
          "/admin-login",
          "/dashboard",
          "/dashboard/*",
          "/auth$",
          "/auth/*",
          "/login",
          "/register",
          "/forgot-password",
          "/api/*",
          "/search?*",
        ],
      },
    ],
    sitemap: "https://www.mediguide4u.com/sitemap.xml",
    host: "https://www.mediguide4u.com",
  };
}

