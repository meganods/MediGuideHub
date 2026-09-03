import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomeClientView from "@/components/HomeClientView";
import { getPublishedBlogPosts, getCategories, getPublishedFAQs } from "@/lib/db";

export const revalidate = 60; // Revalidate every 60 seconds (ISR)

export const metadata: Metadata = {
  title: "mediguide4u - Evidence-Based Healthcare Guides & Wellness Resources",
  description:
    "Explore evidence-based health guides, preventive wellness strategies, nutrition insights, and healthcare resources from reputable public health research.",
  alternates: {
    canonical: "https://mediguide4u.com",
  },
  openGraph: {
    title: "mediguide4u - Evidence-Based Healthcare Guides & Wellness Resources",
    description:
      "Explore evidence-based health guides, preventive wellness strategies, nutrition insights, and healthcare resources from reputable public health research.",
    url: "https://mediguide4u.com",
    siteName: "mediguide4u",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "mediguide4u - Evidence-Based Healthcare Guides & Wellness Resources",
    description:
      "Explore evidence-based health guides, preventive wellness strategies, nutrition insights, and healthcare resources from reputable public health research.",
  },
};

export default async function HomePage() {
  const [posts, categories, faqs] = await Promise.all([
    getPublishedBlogPosts().catch(() => []),
    getCategories().catch(() => []),
    getPublishedFAQs().catch(() => []),
  ]);

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "mediguide4u",
    "url": "https://mediguide4u.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://mediguide4u.com/blog?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "mediguide4u",
    "url": "https://mediguide4u.com",
    "logo": "https://mediguide4u.com/icon.png",
    "sameAs": [],
    "description": "An independent educational platform providing clear, evidence-based healthcare and wellness guides.",
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <Navbar />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />

      <main className="flex-grow">
        <HomeClientView
          initialPosts={posts}
          initialCategories={categories}
          initialFaqs={faqs}
        />
      </main>

      <Footer />
    </div>
  );
}
