"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Calculator, CheckCircle2, ArrowRight, AlertTriangle, DollarSign, BookOpen } from "lucide-react";

export default function MedicarePartDPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-grow">

        <section className="py-16 bg-[#F9FAFB] border-b border-stone-100">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-start gap-6">
              <div className="bg-white border border-stone-200 p-4 rounded-2xl shadow-sm flex-shrink-0">
                <Calculator className="h-10 w-10 text-[#C9A15A]" />
              </div>
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C9A15A]">Medicare Part D</span>
                <h1 className="text-4xl font-extrabold text-[#113F48] leading-tight">Prescription Drug Coverage:<br />How Medicare Part D Works</h1>
                <p className="text-stone-600 max-w-2xl leading-relaxed">
                  Medicare Part D is voluntary prescription drug coverage provided through private insurance companies approved by Medicare. Part D helps pay for brand-name and generic prescription medications — potentially saving you hundreds or thousands of dollars per year on your drug costs. While optional, failing to enroll when first eligible can result in a permanent late enrollment penalty.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 bg-white">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

              <div className="lg:col-span-2 space-y-10">

                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-[#113F48]">How Does Part D Work?</h2>
                  <p className="text-stone-600 text-sm leading-relaxed">Part D plans are offered by private insurers and each plan maintains its own formulary — a list of covered drugs organized into tiers. Higher tiers typically mean higher cost-sharing. You pay monthly premiums, an annual deductible, copays or coinsurance for each prescription, and potentially additional costs once your total drug spending reaches certain thresholds.</p>
                  <p className="text-stone-600 text-sm leading-relaxed">Part D can be obtained in two ways: as a standalone Prescription Drug Plan (PDP) paired with Original Medicare and a Medigap plan, or bundled into a Medicare Advantage Prescription Drug (MA-PD) plan.</p>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-[#113F48]">Part D Cost Phases in 2025</h2>
                  <p className="text-stone-600 text-sm leading-relaxed">The Inflation Reduction Act of 2022 significantly restructured Part D cost phases starting in 2025, eliminating the previous &ldquo;donut hole&rdquo; coverage gap and introducing an out-of-pocket maximum for the first time.</p>
                  <div className="space-y-4">
                    {[
                      {
                        phase: "Phase 1: Deductible",
                        detail: "You pay 100% of drug costs until you meet your annual deductible. The maximum Part D deductible in 2025 is $590, though some plans have lower or no deductible. Many plans waive deductibles for Tier 1 (generic) drugs."
                      },
                      {
                        phase: "Phase 2: Initial Coverage",
                        detail: "After meeting your deductible, you pay copays or coinsurance for covered drugs. Your share depends on the drug's tier. Tier 1 (preferred generics) might cost $0–$5; Tier 5 (specialty drugs) can cost 25–33% coinsurance."
                      },
                      {
                        phase: "Phase 3: Catastrophic Coverage (NEW in 2025)",
                        detail: "Starting January 1, 2025, once your out-of-pocket drug costs reach $2,000, you pay $0 for covered Part D drugs for the rest of the year. This catastrophic cap is a major new benefit that protects people on expensive specialty medications."
                      },
                    ].map((item) => (
                      <div key={item.phase} className="bg-[#F9FAFB] border border-stone-200 rounded-xl p-6 space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-[#C9A15A] flex-shrink-0" />
                          <h3 className="font-bold text-[#113F48]">{item.phase}</h3>
                        </div>
                        <p className="text-stone-600 text-sm leading-relaxed pl-7">{item.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 border-t border-stone-100 pt-10">
                  <h2 className="text-2xl font-bold text-[#113F48]">Key Part D Terms to Know</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="bg-[#F9FAFB] border border-stone-200">
                          <th className="text-left p-3 font-semibold text-[#113F48] border-b border-stone-200">Term</th>
                          <th className="text-left p-3 font-semibold text-[#113F48] border-b border-stone-200">What It Means</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100">
                        {[
                          ["Formulary", "The plan's list of covered drugs, organized into tiers from lowest to highest cost-sharing"],
                          ["Tier", "Drug classification — Tier 1 (preferred generics) to Tier 5 (specialty drugs)"],
                          ["Prior Authorization", "Plan requirement that your doctor prove medical necessity before covering a drug"],
                          ["Step Therapy", "Plan requires you to try a lower-cost drug before covering a higher-cost alternative"],
                          ["Quantity Limit", "Restriction on how much of a drug the plan will cover in a given period"],
                          ["IRMAA (Part D)", "Income-related premium surcharge for high earners, added on top of plan premium"],
                          ["Extra Help / LIS", "Support program reducing Part D costs for eligible beneficiaries"],
                        ].map(([term, meaning]) => (
                          <tr key={term} className="hover:bg-[#F9FAFB] transition-colors">
                            <td className="p-3 font-semibold text-[#113F48]">{term}</td>
                            <td className="p-3 text-stone-600">{meaning}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="space-y-4 border-t border-stone-100 pt-10">
                  <h2 className="text-2xl font-bold text-[#113F48]">The Part D Late Enrollment Penalty</h2>
                  <p className="text-stone-600 text-sm leading-relaxed">If you do not enroll in a Part D plan when first eligible and did not have other creditable drug coverage (coverage as good as Medicare Part D), you face a permanent late enrollment penalty added to your monthly premium.</p>
                  <p className="text-stone-600 text-sm leading-relaxed">The penalty is calculated as 1% of the &ldquo;national base beneficiary premium&rdquo; ($36.78 in 2025) for every month you went without creditable coverage. This penalty applies for the rest of your life, and recalculates annually as the national base premium changes.</p>
                  <p className="text-stone-600 text-sm leading-relaxed"><strong>Example:</strong> If you went 24 months without creditable drug coverage, your penalty would be approximately 24% × $36.78 = $8.83/month permanently added to your Part D premium.</p>
                </div>

                <div className="space-y-4 border-t border-stone-100 pt-10">
                  <h2 className="text-2xl font-bold text-[#113F48]">How to Choose a Part D Plan</h2>
                  <p className="text-stone-600 text-sm leading-relaxed">Choosing the right Part D plan requires comparing the total annual cost — not just monthly premiums. Use official plan comparison resources to compare plans in your zip code based on your specific list of medications. Key factors to evaluate:</p>
                  <ul className="space-y-2">
                    {[
                      "Confirm all your current medications are on the plan formulary",
                      "Check which tier each medication falls into",
                      "Compare the annual deductible — some plans have $0 deductibles for generics",
                      "Evaluate monthly premiums relative to your expected drug costs",
                      "Review pharmacy network — preferred vs. non-preferred pharmacies",
                      "Check if mail-order pharmacy is available (often lower cost-sharing)",
                      "Look for low-income subsidy (Extra Help) availability if your income qualifies",
                    ].map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-stone-600 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-[#C9A15A] flex-shrink-0 mt-0.5" />{tip}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-sm text-amber-800 space-y-2">
                  <AlertTriangle className="h-5 w-5" />
                  <p><strong>Educational Disclaimer:</strong> Part D rules, premiums, and cost structures are updated annually. Verify all current figures with current official sources or a licensed professional.</p>
                </div>

              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <div className="bg-[#F9FAFB] border border-stone-200 rounded-2xl p-6 space-y-4 sticky top-24">
                  <h3 className="font-bold text-[#113F48]">2025 Key Numbers</h3>
                  {[
                    { icon: <DollarSign className="h-4 w-4 text-[#C9A15A]" />, label: "Max Deductible", val: "$590" },
                    { icon: <Calculator className="h-4 w-4 text-[#C9A15A]" />, label: "OOP Cap (NEW)", val: "$2,000 / year" },
                    { icon: <CheckCircle2 className="h-4 w-4 text-[#C9A15A]" />, label: "Base Premium (national)", val: "$36.78/month" },
                  ].map((f) => (
                    <div key={f.label} className="flex items-start gap-3 border-t border-stone-100 pt-3 first:border-t-0 first:pt-0">
                      <div className="bg-white border border-stone-200 p-1.5 rounded-lg">{f.icon}</div>
                      <div>
                        <div className="text-xs text-stone-400">{f.label}</div>
                        <div className="text-sm font-semibold text-[#113F48]">{f.val}</div>
                      </div>
                    </div>
                  ))}
                  <Link href="/contact" className="w-full flex items-center justify-center gap-2 mt-4 px-4 py-3 bg-[#113F48] text-white text-sm font-semibold rounded-xl hover:bg-[#C9A15A] transition-all">
                    Ask a Question <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="bg-white border border-stone-200 rounded-2xl p-6 space-y-3">
                  <h3 className="font-bold text-[#113F48] text-sm">Related Guides</h3>
                  {[
                    { label: "Medicare Part A — Hospital", href: "/services/part-a" },
                    { label: "Medicare Part B — Medical", href: "/services/part-b" },
                    { label: "Medicare Part C — Advantage", href: "/services/part-c" },
                    { label: "Full Blog Library", href: "/blog" },
                  ].map((l) => (
                    <Link key={l.href} href={l.href} className="flex items-center gap-2 text-sm text-stone-600 hover:text-[#C9A15A] transition-colors group">
                      <BookOpen className="h-4 w-4 flex-shrink-0 text-stone-300 group-hover:text-[#C9A15A] transition-colors" />{l.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
