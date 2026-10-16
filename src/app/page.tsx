import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomeClientView from "@/components/HomeClientView";
import { getPublishedBlogPosts, getCategories, getPublishedFAQs } from "@/lib/db";

export const metadata: Metadata = {
  title: "mediguide4u - Medically-Reviewed Healthcare & Wellness Guides",
  description:
    "Explore clear, doctor-reviewed healthcare guides covering symptoms, conditions, clinical nutrition, and preventive wellness strategies.",
  alternates: {
    canonical: "https://www.mediguide4u.com",
  },
  openGraph: {
    title: "mediguide4u - Medically-Reviewed Healthcare & Wellness Guides",
    description:
      "Explore clear, doctor-reviewed healthcare guides covering symptoms, conditions, clinical nutrition, and preventive wellness strategies.",
    url: "https://www.mediguide4u.com",
    siteName: "mediguide4u",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "mediguide4u - Medically-Reviewed Healthcare & Wellness Guides",
    description:
      "Explore clear, doctor-reviewed healthcare guides covering symptoms, conditions, clinical nutrition, and preventive wellness strategies.",
  },
  verification: {
    google: "dQLbGcUPVRmr8pbyXY_tb6_LgcMBf5JuK4djQpKVquI",
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
    "url": "https://www.mediguide4u.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.mediguide4u.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    "name": "mediguide4u",
    "url": "https://www.mediguide4u.com",
    "logo": "https://www.mediguide4u.com/logo.png",
    "sameAs": [],
    "description": "An independent educational platform providing clear, physician-reviewed healthcare and wellness guides covering symptoms, conditions, nutrition, and preventive care.",
  };

  const sitelinksSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Featured Health Sitelinks",
    "itemListElement": [
      {
        "@type": "SiteNavigationElement",
        "position": 1,
        "name": "Health Guides",
        "description": "Doctor-reviewed comprehensive healthcare guides covering symptoms, clinical nutrition, and preventive wellness strategies.",
        "url": "https://www.mediguide4u.com/blog",
      },
      {
        "@type": "SiteNavigationElement",
        "position": 2,
        "name": "Heart Health",
        "description": "Evidence-based guides on cardiovascular wellness, blood pressure management, and heart disease prevention.",
        "url": "https://www.mediguide4u.com/category/heart-health",
      },
      {
        "@type": "SiteNavigationElement",
        "position": 3,
        "name": "Women's Health",
        "description": "Doctor-reviewed medical insights on hormonal health, preventive screenings, reproductive wellness, and nutrition.",
        "url": "https://www.mediguide4u.com/category/women-s-health",
      },
      {
        "@type": "SiteNavigationElement",
        "position": 4,
        "name": "Senior Healthcare",
        "description": "Clinical longevity strategies, healthy aging guides, mobility wellness, and preventive geriatric healthcare.",
        "url": "https://www.mediguide4u.com/category/senior-healthcare",
      },
    ],
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(sitelinksSchema) }}
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
