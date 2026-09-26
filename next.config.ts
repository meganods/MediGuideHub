import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "mediguide4u.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.firebasestorage.app",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/editorial-team",
        destination: "/authors",
        permanent: true,
      },
      {
        source: "/editorial-board",
        destination: "/authors",
        permanent: true,
      },
      {
        source: "/author/dr-krishan-chugh-mbbs-md-pediatrics-fap",
        destination: "/author/dr-krishan-chugh-md",
        permanent: true,
      },
      {
        source: "/blog/category/:slug*",
        destination: "/category/:slug*",
        permanent: true,
      },
      {
        source: "/blog/pediatric-rotavirus-dehydration-infants-ors-warning-signs",
        destination: "/blog/pediatric-dehydration-infants-ors-warning-signs",
        permanent: true,
      },
      {
        source: "/blog/high-blood-pressure-symptoms-causes-risk-factors-and-prevention",
        destination: "/blog/managing-blood-pressure-naturally",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;

