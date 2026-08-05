"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Heart, CheckCircle2, ArrowRight, AlertTriangle, DollarSign, Clock, BookOpen } from "lucide-react";

export default function MedicarePartBPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-grow">

        {/* Hero */}
        <section className="py-16 bg-[#F9FAFB] border-b border-stone-100">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-start gap-6">
              <div className="bg-white border border-stone-200 p-4 rounded-2xl shadow-sm flex-shrink-0">
                <Heart className="h-10 w-10 text-[#C9A15A]" />
              </div>
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C9A15A]">Medicare Part B</span>
                <h1 className="text-4xl font-extrabold text-[#113F48] leading-tight">Medical Insurance:<br />What Medicare Part B Covers</h1>
                <p className="text-stone-600 max-w-2xl leading-relaxed">
                  Medicare Part B is &ldquo;Medical Insurance&rdquo; — the outpatient half of Original Medicare. Together with Part A, it forms the foundation of traditional Medicare coverage. Part B covers doctor visits, preventive services, outpatient procedures, mental health care, and medically necessary equipment. Unlike Part A, Part B requires a monthly premium for virtually all beneficiaries.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-14 bg-white">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

              <div className="lg:col-span-2 space-y-10">

                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-[#113F48]">What Does Medicare Part B Cover?</h2>
                  <p className="text-stone-600 text-sm leading-relaxed">Part B coverage falls into two main categories: medically necessary services and preventive services. Understanding which category your care falls into determines your cost-sharing responsibility.</p>

                  {[
                    {
                      title: "Physician and Outpatient Services",
                      detail: "Part B covers visits to doctors (including specialists), outpatient hospital services, ambulatory surgical center services, clinical lab tests, and outpatient mental health services. After meeting your annual deductible ($257 in 2025), you typically pay 20% of the Medicare-approved amount as coinsurance. There is no out-of-pocket maximum in Original Medicare, which is why many people add a Medigap supplement to cap their exposure."
                    },
                    {
                      title: "Preventive Care (Often 100% Covered)",
                      detail: "Medicare Part B covers many preventive screenings and services at no cost to you — no deductible, no coinsurance — when provided by a participating provider. This includes annual wellness visits, flu and COVID-19 vaccines, mammograms, colorectal cancer screenings, cardiovascular disease screenings, diabetes screenings, bone density tests, and depression screenings. These preventive benefits are only covered at 100% if the visit is specifically for prevention, not treatment."
                    },
                    {
                      title: "Durable Medical Equipment (DME)",
                      detail: "Part B covers durable medical equipment that your doctor prescribes for home use, including wheelchairs, walkers, hospital beds, oxygen equipment, blood sugar monitors, and CPAP machines. You must purchase or rent DME from a Medicare-approved supplier. You typically pay 20% coinsurance after your deductible for approved DME."
                    },
                    {
                      title: "Mental Health Services",
                      detail: "Part B covers outpatient mental health services, including visits to psychiatrists, psychologists, clinical social workers, and other mental health professionals. Outpatient mental health visits are treated the same as other Part B services — 20% coinsurance after your deductible. Inpatient psychiatric care falls under Part A."
                    },
                    {
                      title: "Other Covered Services",
                      detail: "Part B also covers ambulance services (when medically necessary), second surgical opinions, clinical research studies, limited outpatient prescription drugs (such as injectable drugs that cannot be self-administered), and certain telehealth services that expanded significantly following regulatory changes during and after the COVID-19 public health emergency."
                    },
                  ].map((item) => (
                    <div key={item.title} className="bg-[#F9FAFB] border border-stone-200 rounded-xl p-6 space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-[#C9A15A] flex-shrink-0" />
                        <h3 className="font-bold text-[#113F48]">{item.title}</h3>
                      </div>
                      <p className="text-stone-600 text-sm leading-relaxed pl-7">{item.detail}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 border-t border-stone-100 pt-10">
                  <h2 className="text-2xl font-bold text-[#113F48]">Part B Costs for 2025</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="bg-[#F9FAFB] border border-stone-200">
                          <th className="text-left p-3 font-semibold text-[#113F48] border-b border-stone-200">Cost Item</th>
                          <th className="text-left p-3 font-semibold text-[#113F48] border-b border-stone-200">2025 Amount</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100">
                        {[
                          ["Standard monthly premium", "$185.00/month"],
                          ["Annual deductible", "$257"],
                          ["Coinsurance (most services)", "20% of approved amount"],
                          ["IRMAA surcharge (income $106,000–$133,000/individual)", "+$74.00/month"],
                          ["IRMAA surcharge (income $133,000–$167,000/individual)", "+$186.10/month"],
                          ["Preventive services (most)", "$0 (100% covered)"],
                        ].map(([label, value]) => (
                          <tr key={label} className="hover:bg-[#F9FAFB] transition-colors">
                            <td className="p-3 text-stone-600">{label}</td>
                            <td className="p-3 font-semibold text-[#113F48]">{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-stone-400">* Source: 2025 Medicare cost data. IRMAA brackets are based on income from 2 years prior. Higher income individuals pay additional surcharges.</p>
                </div>

                <div className="space-y-4 border-t border-stone-100 pt-10">
                  <h2 className="text-2xl font-bold text-[#113F48]">Part B Late Enrollment Penalty</h2>
                  <p className="text-stone-600 text-sm leading-relaxed">If you do not enroll in Part B when first eligible and do not have other qualifying coverage, you will face a permanent late enrollment penalty. For every 12-month period you delayed, your Part B premium increases by 10% permanently. This penalty applies for the lifetime you have Medicare.</p>
                  <p className="text-stone-600 text-sm leading-relaxed"><strong>Example:</strong> If you delayed enrollment by 2 years without creditable employer coverage, your monthly premium would be permanently 20% higher than the standard rate — for the rest of your life.</p>
                  <p className="text-stone-600 text-sm leading-relaxed">Exceptions exist for people who delayed Part B while covered by an employer-sponsored group health plan through their own active employment (or a spouse&apos;s). In this case, a Special Enrollment Period applies after employment or employer coverage ends, with no penalty.</p>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-sm text-amber-800 space-y-2">
                  <AlertTriangle className="h-5 w-5" />
                  <p><strong>Educational Disclaimer:</strong> Information on this page is for general educational purposes only. Medicare rules and costs change annually. Verify all information with current official sources or a licensed Medicare counselor.</p>
                </div>

              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <div className="bg-[#F9FAFB] border border-stone-200 rounded-2xl p-6 space-y-4 sticky top-24">
                  <h3 className="font-bold text-[#113F48]">Quick Facts</h3>
                  {[
                    { icon: <DollarSign className="h-4 w-4 text-[#C9A15A]" />, label: "Standard Premium", val: "$185.00/month (2025)" },
                    { icon: <Clock className="h-4 w-4 text-[#C9A15A]" />, label: "Annual Deductible", val: "$257 per year" },
                    { icon: <Heart className="h-4 w-4 text-[#C9A15A]" />, label: "Main Coverage", val: "Outpatient, doctor visits, preventive, DME" },
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
                    { label: "Medicare Part C — Advantage", href: "/services/part-c" },
                    { label: "Medicare Part D — Drugs", href: "/services/part-d" },
                    { label: "Full Blog Library", href: "/blog" },
                  ].map((l) => (
                    <Link key={l.href} href={l.href} className="flex items-center gap-2 text-sm text-stone-600 hover:text-[#C9A15A] transition-colors group">
                      <BookOpen className="h-4 w-4 flex-shrink-0 text-stone-300 group-hover:text-[#C9A15A] transition-colors" />
                      {l.label}
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
