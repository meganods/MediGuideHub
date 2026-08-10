"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Mail, Home } from "lucide-react";

export default function TermsAndConditionsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-grow">
        {/* ── BREADCRUMB ── */}
        <div className="bg-stone-50 border-b border-stone-100 py-3">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-none text-xs text-stone-500 flex gap-2">
            <Link href="/" className="hover:text-[#C9A15A] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#113F48] font-semibold">Terms &amp; Conditions</span>
          </div>
        </div>

        {/* ── HERO ── */}
        <section className="py-14 bg-[#F9FAFB] border-b border-stone-100 print:bg-white print:border-0">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-none space-y-3">
            <p className="text-xs text-[#C9A15A] font-bold uppercase tracking-wider">Last Updated: August 2026</p>
            <h1 className="text-4xl font-extrabold text-[#113F48]">Terms &amp; Conditions</h1>
            <p className="text-stone-600 leading-relaxed text-sm">
              Please read these Terms &amp; Conditions carefully before using mediguide4u. By accessing our platform, you agree to be bound by these terms.
            </p>
          </div>
        </section>

        {/* ── CONTENT ── */}
        <section className="py-14 bg-white print:py-0">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-none">
            <div className="prose prose-stone max-w-none text-stone-600 space-y-8 text-sm leading-relaxed">
              
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-[#113F48]">1. Website Usage</h2>
                <p>
                  mediguide4u provides general health information and medical education resources. All visitors must be at least 18 years of age or accessing under parental guidance. You agree to use the site only for lawful purposes and in a manner that does not infringe the rights of, or restrict the use of the platform by, any third party.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl font-bold text-[#113F48]">2. Intellectual Property</h2>
                <p>
                  All content, text, infographics, brand logos, custom designs, and database code featured on mediguide4u are the intellectual property of mediguide4u and are protected by international copyright laws. Unauthorized reproduction, duplication, or resale of any content is strictly prohibited.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl font-bold text-[#113F48]">3. User Responsibilities</h2>
                <p>
                  If you submit contact forms, newsletter signups, or comment data, you are responsible for providing accurate and truthful information. You are prohibited from submitting any harmful, malicious, or spam content.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl font-bold text-[#113F48]">4. External Links &amp; AdSense Advertisements</h2>
                <p>
                  mediguide4u features links to third-party resources and hosts Google AdSense advertisements. We do not control, endorse, or verify the content, privacy policies, or business practices of third-party platforms or advertisers. Clicking external links is done at your own risk.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl font-bold text-[#113F48]">5. Limitation of Liability</h2>
                <p>
                  mediguide4u is an educational platform. Under no circumstances will mediguide4u, its founders, or medical advisors be liable for any direct, indirect, or incidental decisions made in reliance on website articles. All information is provided &ldquo;as is&rdquo; without warranties of completeness or accuracy.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl font-bold text-[#113F48]">6. Updates to These Terms</h2>
                <p>
                  We reserve the right to modify these terms at any time without prior notice. The date at the top of this page indicates the most recent modification. Continued use of the platform represents agreement to the modified terms.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl font-bold text-[#113F48]">7. Governing Law</h2>
                <p>
                  These Terms &amp; Conditions are governed by and construed in accordance with the laws of India. Any legal disputes arising out of the use of this website shall be settled in the courts of New Delhi, India.
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
