"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Mail, Home } from "lucide-react";

export default function EditorialPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-grow">
        {/* ── BREADCRUMB ── */}
        <div className="bg-stone-50 border-b border-stone-100 py-3">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-none text-xs text-stone-500 flex gap-2">
            <Link href="/" className="hover:text-[#C9A15A] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#113F48] font-semibold">Editorial Policy</span>
          </div>
        </div>

        {/* ── HERO ── */}
        <section className="py-14 bg-[#F9FAFB] border-b border-stone-100 print:bg-white print:border-0">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-none space-y-3">
            <p className="text-xs text-[#C9A15A] font-bold uppercase tracking-wider">Last Updated: August 2026</p>
            <h1 className="text-4xl font-extrabold text-[#113F48]">Editorial Policy</h1>
            <p className="text-stone-600 leading-relaxed text-sm">
              This Editorial Policy outlines how we prepare, review, update, and manage health information to maintain strict E-E-A-T values.
            </p>
          </div>
        </section>

        {/* ── CONTENT ── */}
        <section className="py-14 bg-white print:py-0">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-none">
            <div className="prose prose-stone max-w-none text-stone-600 space-y-8 text-sm leading-relaxed">
              
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-[#113F48]">1. Content Review Process</h2>
                <p>
                  Before publishing, every article is researched by professional health writers and reviewed internally. We double-check each metric, medication listing, and government policy rule to make sure the copy is easy to understand, accurate, and free of bias.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl font-bold text-[#113F48]">2. Editorial Independence</h2>
                <p>
                  mediguide4u operates with absolute editorial independence. We do not host sponsored articles, nor do we let display ads or advertising agreements dictate our topics, content tone, coverage comparisons, or recommendations.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl font-bold text-[#113F48]">3. Fact-Checking &amp; References</h2>
                <p>
                  We build our guides on reliable public health databases. We cite official medical sources, government departments, and peer-reviewed journals when applicable, ensuring that readers can trace every stat back to a reputable source.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl font-bold text-[#113F48]">4. Content Updates</h2>
                <p>
                  Medical research, healthcare policies, and plan parameters change over time. We review and update our article catalog regularly to reflect updated guidelines. The &ldquo;Last Updated&rdquo; tag at the top of each page signals the most recent review.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl font-bold text-[#113F48]">5. Corrections Policy</h2>
                <p>
                  If you spot an error, typo, or outdated stat, please report it through our contact form. Our editorial board evaluates and applies updates within 2 business days.
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
