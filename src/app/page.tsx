import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomeClientView from "@/components/HomeClientView";
import { getPublishedBlogPosts, getCategories, getPublishedFAQs } from "@/lib/db";

export const revalidate = 86400; // Revalidate every 24 hours to prevent high ISR writes on Vercel

export const metadata: Metadata = {
  title: "mediguide4u - Physician-Reviewed Healthcare & Wellness Guides",
  description:
    "Explore clear, doctor-reviewed healthcare guides covering symptoms, conditions, clinical nutrition, and preventive wellness strategies.",
  alternates: {
    canonical: "https://www.mediguide4u.com",
  },
  openGraph: {
    title: "mediguide4u - Physician-Reviewed Healthcare & Wellness Guides",
    description:
      "Explore clear, doctor-reviewed healthcare guides covering symptoms, conditions, clinical nutrition, and preventive wellness strategies.",
    url: "https://mediguide4u.com",
    siteName: "mediguide4u",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "mediguide4u - Physician-Reviewed Healthcare & Wellness Guides",
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
    "url": "https://mediguide4u.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://mediguide4u.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    "name": "mediguide4u",
    "url": "https://mediguide4u.com",
    "logo": "https://mediguide4u.com/logo.png",
    "sameAs": [],
    "description": "An independent educational platform providing clear, physician-reviewed healthcare and wellness guides covering symptoms, conditions, nutrition, and preventive care.",
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
