import React, { Suspense } from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuizzesClientView from "@/components/QuizzesClientView";

export const metadata: Metadata = {
  title: "Health & Lifestyle Quizzes - Sleep, Stress & Heart Assessments | mediguide4u",
  description:
    "Evaluate your sleep architecture, stress and burnout levels, and cardiovascular habits with our evidence-based wellness assessments.",
  keywords: [
    "health quizzes",
    "sleep quality quiz",
    "stress self assessment",
    "burnout check",
    "heart health quiz",
    "wellness screeners",
    "lifestyle assessments",
  ],
  alternates: {
    canonical: "https://www.mediguide4u.com/quizzes",
  },
  openGraph: {
    title: "Health & Lifestyle Quizzes | mediguide4u",
    description:
      "Take evidence-based health quizzes on sleep quality, perceived stress, and cardiovascular wellness habits.",
    url: "https://www.mediguide4u.com/quizzes",
    siteName: "mediguide4u",
    type: "website",
  },
};

export default function QuizzesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "mediguide4u Health Self-Assessment Hub",
    "url": "https://www.mediguide4u.com/quizzes",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "All",
    "description": "Interactive lifestyle questionnaires assessing sleep architecture, stress levels, and cardiovascular health behaviors.",
    "publisher": {
      "@type": "MedicalOrganization",
      "name": "mediguide4u",
      "url": "https://mediguide4u.com"
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="flex-grow">
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-stone-400">Loading quizzes...</div>}>
          <QuizzesClientView />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
