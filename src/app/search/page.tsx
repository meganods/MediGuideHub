import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchClientView from "@/components/SearchClientView";
import { getPublishedBlogPosts, getCategories } from "@/lib/db";

export const metadata: Metadata = {
  title: "Search Health Guides & Medical Resources | mediguide4u",
  description:
    "Search doctor-reviewed medical guides, symptoms explanations, condition overviews, and clinical nutrition resources on mediguide4u.",
  alternates: {
    canonical: "https://www.mediguide4u.com/search",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Search Health Guides & Medical Resources | mediguide4u",
    description:
      "Search doctor-reviewed medical guides, symptoms explanations, condition overviews, and clinical nutrition resources on mediguide4u.",
    url: "https://www.mediguide4u.com/search",
    siteName: "mediguide4u",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Search Health Guides & Medical Resources | mediguide4u",
    description:
      "Search doctor-reviewed medical guides, symptoms explanations, condition overviews, and clinical nutrition resources on mediguide4u.",
  },
};

export default async function SearchPage() {
  const [posts, categories] = await Promise.all([
    getPublishedBlogPosts().catch(() => []),
    getCategories().catch(() => []),
  ]);

  const searchSchema = {
    "@context": "https://schema.org",
    "@type": "SearchResultsPage",
    "name": "Search Health Guides | mediguide4u",
    "url": "https://www.mediguide4u.com/search",
    "publisher": {
      "@type": "Organization",
      "name": "mediguide4u",
      "url": "https://www.mediguide4u.com"
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(searchSchema) }}
      />

      <main className="flex-grow">
        <SearchClientView initialPosts={posts} initialCategories={categories} />
      </main>

      <Footer />
    </div>
  );
}
