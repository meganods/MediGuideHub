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
    "Find clear, evidence-based answers to common questions about preventive care, nutrition guidelines, healthcare literacy, and medical editorial integrity.",
  alternates: {
    canonical: "https://mediguide4u.com/faq",
  },
  openGraph: {
    title: "Frequently Asked Questions | mediguide4u",
    description:
      "Find clear, evidence-based answers to common questions about preventive care, nutrition guidelines, healthcare literacy, and medical editorial integrity.",
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

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="flex-grow">
        <FAQClientView initialFaqs={faqs} />
      </main>
      <Footer />
    </div>
  );
}
