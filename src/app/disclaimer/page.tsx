"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

export default function DisclaimerPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-grow">

        {/* Hero */}
        <section className="py-14 bg-[#F9FAFB] border-b border-stone-100">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-800 text-xs font-semibold uppercase tracking-wider">
              <AlertTriangle className="h-3.5 w-3.5" /> Important Notice
            </div>
            <p className="text-xs text-stone-400 font-medium">Last Updated: August 4, 2026</p>
            <h1 className="text-4xl font-extrabold text-[#113F48]">Disclaimer</h1>
            <p className="text-stone-600 max-w-2xl leading-relaxed">
              The information provided on MediGuide Hub (&ldquo;the Site,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is for general educational and informational purposes only. It is not intended as, and should not be interpreted as, medical, legal, financial, or insurance advice.
            </p>
          </div>
        </section>

        {/* Detailed Disclaimer Cards */}
        <section className="py-14 bg-white">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            
            <div className="bg-[#FDF6EC] border border-[#C9A15A]/25 rounded-2xl p-6 sm:p-8 space-y-4">
              <h2 className="text-lg font-bold text-[#113F48]">Independent educational resource</h2>
              <p className="text-stone-600 text-sm leading-relaxed">
                MediGuide Hub is an independently operated, privately owned website created to help people understand Medicare-related topics in plain language. We provide educational information and do not act as an insurance carrier, broker, or legal advisor.
              </p>
            </div>

            <div className="bg-[#F9FAFB] border border-stone-200 rounded-2xl p-6 sm:p-8 space-y-4">
              <h2 className="text-lg font-bold text-[#113F48]">Not insurance advice</h2>
              <p className="text-stone-600 text-sm leading-relaxed">
                We do not sell insurance policies, and nothing on this site should be construed as a recommendation to purchase any specific plan, insurer, or coverage type. Medicare rules, costs, and plan availability vary based on your location, income, and personal circumstances. Before making any enrollment or coverage decision, we strongly encourage you to speak with a licensed insurance agent, a Medicare counselor through your local SHIP (State Health Insurance Assistance Program), or contact Medicare directly.
              </p>
            </div>

            <div className="bg-[#F9FAFB] border border-stone-200 rounded-2xl p-6 sm:p-8 space-y-4">
              <h2 className="text-lg font-bold text-[#113F48]">Not medical advice</h2>
              <p className="text-stone-600 text-sm leading-relaxed">
                Content on this site that references health conditions, treatments, or coverage types is for general understanding only and is not a substitute for professional medical advice, diagnosis, or treatment from a qualified healthcare provider.
              </p>
            </div>

            <div className="bg-[#F9FAFB] border border-stone-200 rounded-2xl p-6 sm:p-8 space-y-4">
              <h2 className="text-lg font-bold text-[#113F48]">Accuracy and updates</h2>
              <p className="text-stone-600 text-sm leading-relaxed">
                Medicare rules, premiums, deductibles, and penalty calculations are subject to change over time. While we make reasonable efforts to keep our content accurate and current, we cannot guarantee that all information reflects the most recent figures at the time you're reading it. Always verify specific numbers and deadlines with current official sources before making a decision.
              </p>
            </div>

            <div className="bg-[#F9FAFB] border border-stone-200 rounded-2xl p-6 sm:p-8 space-y-4">
              <h2 className="text-lg font-bold text-[#113F48]">No liability</h2>
              <p className="text-stone-600 text-sm leading-relaxed">
                MediGuide Hub, its owners, and contributors are not liable for any decisions made, or losses incurred, based on information found on this site. Use of this website is at your own discretion and risk.
              </p>
            </div>

            <div className="bg-[#FDF6EC] border border-[#C9A15A]/25 rounded-2xl p-6 text-sm text-[#C9A15A] font-semibold text-center">
              If you have questions about your specific Medicare situation, please consult current official sources or a licensed professional.
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
