import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SitemapClientView from "@/components/SitemapClientView";
import { getPublishedBlogPosts, getCategories, getPublishedFAQs } from "@/lib/db";

export const metadata: Metadata = {
  title: "HTML Sitemap & Navigation Directory | mediguide4u",
  description:
    "Comprehensive directory of all medical guides, clinical reports, healthcare policy comparisons, and educational pages on mediguide4u.",
  alternates: {
    canonical: "https://www.mediguide4u.com/sitemap",
  },
  openGraph: {
    title: "HTML Sitemap & Navigation Directory | mediguide4u",
    description:
      "Comprehensive directory of all medical guides, clinical reports, healthcare policy comparisons, and educational pages on mediguide4u.",
    url: "https://www.mediguide4u.com/sitemap",
    siteName: "mediguide4u",
    type: "website",
  },
};

export default async function SitemapPage() {
  const [posts, categories, faqs] = await Promise.all([
    getPublishedBlogPosts().catch(() => []),
    getCategories().catch(() => []),
    getPublishedFAQs().catch(() => []),
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <Navbar />
      <SitemapClientView
        initialPosts={posts}
        initialCategories={categories}
        initialFaqs={faqs}
      />
      <Footer />
    </div>
  );
}
