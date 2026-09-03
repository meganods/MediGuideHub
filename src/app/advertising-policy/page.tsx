import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Mail, Home } from "lucide-react";

export const metadata: Metadata = {
  title: "Advertising Policy | mediguide4u",
  description:
    "Review mediguide4u's strict advertising policy, our commitment to complete editorial independence, and how we handle third-party sponsorships.",
  alternates: {
    canonical: "https://mediguide4u.com/advertising-policy",
  },
  openGraph: {
    title: "Advertising Policy | mediguide4u",
    description:
      "Review mediguide4u's strict advertising policy, our commitment to complete editorial independence, and how we handle third-party sponsorships.",
    url: "https://mediguide4u.com/advertising-policy",
    siteName: "mediguide4u",
    type: "website",
  },
};

export default function AdvertisingPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-grow">
        {/* ── BREADCRUMB ── */}
        <div className="bg-stone-50 border-b border-stone-100 py-3">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-none text-xs text-stone-500 flex gap-2">
            <Link href="/" className="hover:text-[#C9A15A] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#113F48] font-semibold">Advertising Policy</span>
          </div>
        </div>

        {/* ── HERO ── */}
        <section className="py-14 bg-[#F9FAFB] border-b border-stone-100 print:bg-white print:border-0">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-none space-y-3">
            <p className="text-xs text-[#C9A15A] font-bold uppercase tracking-wider">Last Updated: August 2026</p>
            <h1 className="text-4xl font-extrabold text-[#113F48]">Advertising Policy</h1>
            <p className="text-stone-600 leading-relaxed text-sm">
              This policy explains our guidelines regarding display advertising and how we maintain complete editorial separation.
            </p>
          </div>
        </section>

        {/* ── CONTENT ── */}
        <section className="py-14 bg-white print:py-0">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-none">
            <div className="prose prose-stone max-w-none text-stone-600 space-y-8 text-sm leading-relaxed">
              
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-[#113F48]">1. Editorial Separation</h2>
                <p>
                  Advertising revenue may be used to support server hosting costs, technical infrastructure, and clinical research. However, advertising networks or sponsors never influence our research, topic selections, comparisons, or recommendations.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl font-bold text-[#113F48]">2. Sponsored Content Labeling</h2>
                <p>
                  We do not publish undisclosed advertorials or deceptive promotional posts. In the event that any content features partner-supported educational resources, it is clearly and conspicuously labeled as &ldquo;Sponsored&rdquo; or &ldquo;Advertisement&rdquo; at the top of the post.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl font-bold text-[#113F48]">3. Editorial Independence</h2>
                <p>
                  Our editorial writers and health researchers operate with complete independence. They are dedicated to compiling objective, evidence-based health guidance without commercial bias.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ── BOTTOM CTA ── */}
        <section className="py-16 bg-[#F9FAFB] border-t border-stone-200 print:hidden">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-none text-center space-y-5">
            <h3 className="text-xl font-bold text-[#113F48]">Need Assistance?</h3>
            <p className="text-stone-500 text-sm max-w-md mx-auto">
              If you have any questions regarding our terms, policies, or data handling, reach out to our team.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#113F48] hover:bg-[#C9A15A] text-white text-xs font-semibold rounded-xl transition-all shadow"
              >
                <Mail className="h-4 w-4" /> Contact Us
              </Link>
              <Link 
                href="/" 
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 text-xs font-semibold rounded-xl transition-all"
              >
                <Home className="h-4 w-4" /> Return Home
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
