import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQClientView from "@/components/FAQClientView";
import { getPublishedFAQs } from "@/lib/db";

export const revalidate = 60; // Revalidate every 60 seconds (ISR)

export const metadata: Metadata = {
  title: "Frequently Asked Questions | mediguide4u",
  description:
    "Find clear answers to common questions about symptoms, health guidelines, preventive care, clinical nutrition, and editorial review standards.",
  alternates: {
    canonical: "https://mediguide4u.com/faq",
  },
  openGraph: {
    title: "Frequently Asked Questions | mediguide4u",
    description:
      "Find clear answers to common questions about symptoms, health guidelines, preventive care, clinical nutrition, and editorial review standards.",
    url: "https://mediguide4u.com/faq",
    siteName: "mediguide4u",
    type: "website",
  },
};

export default async function FAQPage() {
  const faqs = await getPublishedFAQs().catch(() => []);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://mediguide4u.com",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Frequently Asked Questions",
        "item": "https://mediguide4u.com/faq",
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="flex-grow">
        <FAQClientView initialFaqs={faqs} />
      </main>
      <Footer />
    </div>
  );
}
