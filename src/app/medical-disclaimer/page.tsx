"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Mail, Home, ShieldAlert } from "lucide-react";

export default function MedicalDisclaimerPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-grow">
        {/* ── BREADCRUMB ── */}
        <div className="bg-stone-50 border-b border-stone-100 py-3">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-none text-xs text-stone-500 flex gap-2">
            <Link href="/" className="hover:text-[#C9A15A] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#113F48] font-semibold">Medical Disclaimer</span>
          </div>
        </div>

        {/* ── HERO ── */}
        <section className="py-14 bg-[#F9FAFB] border-b border-stone-100 print:bg-white print:border-0">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-none space-y-3">
            <p className="text-xs text-[#C9A15A] font-bold uppercase tracking-wider">Last Updated: August 2026</p>
            <h1 className="text-4xl font-extrabold text-[#113F48]">Medical Disclaimer</h1>
            <p className="text-stone-600 leading-relaxed text-sm">
              Please read this Medical Disclaimer carefully. It details the informational limits of mediguide4u and your responsibilities regarding professional medical consultation.
            </p>
          </div>
        </section>

        {/* ── CONTENT ── */}
        <section className="py-14 bg-white print:py-0">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-none">
            
            {/* Highlighted Warning Box */}
            <div className="bg-amber-50/50 border border-amber-200 rounded-2xl p-6 mb-8 flex items-start gap-4 shadow-sm">
              <ShieldAlert className="h-6 w-6 text-[#C9A15A] flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="font-bold text-amber-950 text-sm">Important Notice</h4>
                <p className="text-amber-900 text-xs leading-relaxed font-semibold">
                  mediguide4u is an educational publication. Nothing published here constitutes diagnostic medical opinions, treatment guidance, plan comparison approvals, or insurance claims decisions.
                </p>
              </div>
            </div>

            <div className="prose prose-stone max-w-none text-stone-600 space-y-8 text-sm leading-relaxed">
              
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-[#113F48]">1. Educational Purposes Only</h2>
                <p>
                  All articles,Condition profiles, checklist widgets, data tables, and reference guidelines hosted on mediguide4u are provided for general educational and health awareness purposes only. The information does not constitute official advice.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl font-bold text-[#113F48]">2. No Doctor-Patient Relationship</h2>
                <p>
                  Reading articles, submitting contact forms, using search features, or joining community updates on mediguide4u does not establish a doctor-patient, practitioner-client, or professional relationship between you and the writers, editors, or advisory staff of mediguide4u.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl font-bold text-[#113F48]">3. Not Emergency Medical Advice</h2>
                <p>
                  If you are experiencing a medical emergency, you must immediately call your local emergency services (such as 102/112 in India, 911 in the United States) or visit the nearest emergency room. Never disregard or delay professional care because of something read on this platform.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl font-bold text-[#113F48]">4. Consult Qualified Professionals</h2>
                <p>
                  Always seek the advice of your physician, licensed nurse, or qualified healthcare provider with any questions you have regarding a medical condition, symptoms, medication dosages, or treatment programs.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl font-bold text-[#113F48]">5. No Guarantee of Completeness or Currency</h2>
                <p>
                  While our editorial board makes reasonable efforts to verify statistics against current official public databases, healthcare rules and medical findings evolve rapidly. We offer no guarantees that the information displayed is fully complete, completely accurate, or updated to the exact current date.
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
