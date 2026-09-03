import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogListingClient from "@/components/BlogListingClient";
import { getPublishedBlogPosts, getCategories } from "@/lib/db";

export const revalidate = 60; // Revalidate every 60 seconds (ISR)

export const metadata: Metadata = {
  title: "Evidence-Based Health Guides & Articles | mediguide4u",
  description:
    "Explore objective health guides, preventive medicine topics, nutrition insights, and wellness resources researched from peer-reviewed public health literature.",
  alternates: {
    canonical: "https://mediguide4u.com/blog",
  },
  openGraph: {
    title: "Evidence-Based Health Guides & Articles | mediguide4u",
    description:
      "Explore objective health guides, preventive medicine topics, nutrition insights, and wellness resources researched from peer-reviewed public health literature.",
    url: "https://mediguide4u.com/blog",
    siteName: "mediguide4u",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Evidence-Based Health Guides & Articles | mediguide4u",
    description:
      "Explore objective health guides, preventive medicine topics, nutrition insights, and wellness resources researched from peer-reviewed public health literature.",
  },
};

export default async function BlogIndexPage() {
  const [posts, categories] = await Promise.all([
    getPublishedBlogPosts().catch(() => []),
    getCategories().catch(() => []),
  ]);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Evidence-Based Health Guides & Articles",
    "description": "Educational healthcare and wellness guides from mediguide4u.",
    "url": "https://mediguide4u.com/blog",
    "publisher": {
      "@type": "Organization",
      "name": "mediguide4u",
      "url": "https://mediguide4u.com"
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <main className="flex-grow">
        <BlogListingClient initialPosts={posts} initialCategories={categories} />
      </main>
      <Footer />
    </div>
  );
}
