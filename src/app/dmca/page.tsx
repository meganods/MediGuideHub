"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Mail, Home, ShieldAlert } from "lucide-react";

export default function DMCAPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-grow">
        {/* ── BREADCRUMB ── */}
        <div className="bg-stone-50 border-b border-stone-100 py-3">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-xs text-stone-500 flex gap-2">
            <Link href="/" className="hover:text-[#C9A15A] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#113F48] font-semibold">DMCA Policy</span>
          </div>
        </div>

        {/* ── HERO ── */}
        <section className="py-14 bg-[#F9FAFB] border-b border-stone-100 print:bg-white print:border-0">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-3">
            <p className="text-xs text-[#C9A15A] font-bold uppercase tracking-wider">Last Updated: August 2026</p>
            <h1 className="text-4xl font-extrabold text-[#113F48]">DMCA Copyright Policy</h1>
            <p className="text-stone-600 max-w-2xl leading-relaxed text-sm">
              MediGuideHub respects the intellectual property rights of others. This DMCA policy outlines the process for reporting alleged copyright infringements.
            </p>
          </div>
        </section>

        {/* ── CONTENT ── */}
        <section className="py-14 bg-white print:py-0">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="prose prose-stone max-w-none text-stone-600 space-y-8 text-sm leading-relaxed">
              
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-[#113F48]">1. Reporting Infringement Claims</h2>
                <p>
                  In accordance with the Digital Millennium Copyright Act (&ldquo;DMCA&rdquo;), we respond promptly to notices of alleged infringement. If you believe your copyrighted material is displayed on our website without authorization, please submit a written notification including the following:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>A physical or electronic signature of the copyright owner or authorized representative.</li>
                  <li>Identification of the copyrighted work claimed to have been infringed.</li>
                  <li>Identification of the material claimed to be infringing and its exact URL path.</li>
                  <li>Your contact details (physical address, phone number, and email address).</li>
                  <li>A statement that you have a good-faith belief that use of the material is not authorized by the copyright owner.</li>
                  <li>A statement, under penalty of perjury, that the information in the notification is accurate.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl font-bold text-[#113F48]">2. Counter-Notification</h2>
                <p>
                  If your content was removed due to a DMCA claim and you believe this was an error, you may file a counter-notification. The counter-notice must be sent in writing to our designated agent and include your name, contact details, identification of the removed material, and a statement under penalty of perjury consenting to federal court jurisdiction.
                </p>
              </div>

              <div className="space-y-3 border-t border-stone-100 pt-6">
                <h2 className="text-lg font-bold text-[#113F48]">3. Designated Copyright Agent</h2>
                <p>
                  All DMCA claims and counter-notifications must be sent directly to our designated copyright administrator:
                  <br />
                  <a href="mailto:support@mediguidehub.com" className="text-[#C9A15A] underline font-semibold block mt-1">
                    support@mediguidehub.com
                  </a>
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ── BOTTOM CTA ── */}
        <section className="py-16 bg-[#F9FAFB] border-t border-stone-200 print:hidden">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center space-y-5">
            <h3 className="text-xl font-bold text-[#113F48]">Need Assistance?</h3>
            <p className="text-stone-500 text-sm max-w-md mx-auto">
              If you have any questions regarding copyright, legal terms, or guidelines, reach out to our team.
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
