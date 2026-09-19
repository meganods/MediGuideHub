import React, { Suspense } from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToolsClientView from "@/components/ToolsClientView";

export const metadata: Metadata = {
  title: "Health & Wellness Calculators - BMI, TDEE, Water & Heart Rate | mediguide4u",
  description:
    "Free clinical and wellness calculators including BMI, TDEE daily calorie burn, water hydration needs, AHA blood pressure checker, and target heart rate zones.",
  keywords: [
    "health calculators",
    "BMI calculator",
    "TDEE calorie calculator",
    "water intake calculator",
    "blood pressure category checker",
    "target heart rate zones",
    "pregnancy due date calculator",
    "medical calculators",
  ],
  alternates: {
    canonical: "https://www.mediguide4u.com/tools",
  },
  openGraph: {
    title: "Health & Wellness Calculators | mediguide4u",
    description:
      "Interactive, medically referenced health calculators to evaluate BMI, daily caloric needs, hydration targets, and cardiovascular zones.",
    url: "https://www.mediguide4u.com/tools",
    siteName: "mediguide4u",
    type: "website",
  },
};

export default function ToolsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "mediguide4u Health Calculators Suite",
    "url": "https://www.mediguide4u.com/tools",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript",
    "description": "Evidence-based health calculators for BMI, daily energy expenditure, hydration requirements, and cardiovascular benchmarks.",
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
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-stone-400">Loading calculators...</div>}>
          <ToolsClientView />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
