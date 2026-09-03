import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactClientView from "@/components/ContactClientView";

export const metadata: Metadata = {
  title: "Contact mediguide4u | Support, Editorial Feedback & Inquiries",
  description:
    "Get in touch with the mediguide4u team for editorial feedback, content corrections, partnership inquiries, or general support.",
  alternates: {
    canonical: "https://mediguide4u.com/contact",
  },
  openGraph: {
    title: "Contact mediguide4u | Support, Editorial Feedback & Inquiries",
    description:
      "Get in touch with the mediguide4u team for editorial feedback, content corrections, partnership inquiries, or general support.",
    url: "https://mediguide4u.com/contact",
    siteName: "mediguide4u",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact mediguide4u | Support, Editorial Feedback & Inquiries",
    description:
      "Get in touch with the mediguide4u team for editorial feedback, content corrections, partnership inquiries, or general support.",
  },
};

export default function ContactPage() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact mediguide4u",
    "description": "Contact form, office details, and support inquiries for mediguide4u.",
    "url": "https://mediguide4u.com/contact",
    "mainEntity": {
      "@type": "Organization",
      "name": "mediguide4u",
      "url": "https://mediguide4u.com",
      "email": "support@mediguide4u.com",
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "support@mediguide4u.com",
        "contactType": "customer support",
        "availableLanguage": ["English"]
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />

      <main className="flex-grow">
        <ContactClientView />
      </main>

      <Footer />
    </div>
  );
}
