"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Stethoscope, CheckCircle2, ArrowRight, AlertTriangle, DollarSign, Clock, BookOpen } from "lucide-react";

export default function MedicarePartAPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-grow">

        {/* Hero */}
        <section className="py-16 bg-[#F9FAFB] border-b border-stone-100">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-start gap-6">
              <div className="bg-white border border-stone-200 p-4 rounded-2xl shadow-sm flex-shrink-0">
                <Stethoscope className="h-10 w-10 text-[#C9A15A]" />
              </div>
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C9A15A]">Medicare Part A</span>
                <h1 className="text-4xl font-extrabold text-[#113F48] leading-tight">Hospital Insurance:<br />What Medicare Part A Covers</h1>
                <p className="text-stone-600 max-w-2xl leading-relaxed">
                  Medicare Part A is often called &ldquo;Hospital Insurance.&rdquo; It forms one half of Original Medicare and covers inpatient care in hospitals, skilled nursing facilities, hospice programs, and some home health services. For most Americans who worked and paid Medicare taxes for at least 10 years, Part A is available premium-free starting at age 65.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-14 bg-white">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

              {/* Main Content */}
              <div className="lg:col-span-2 space-y-10">

                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-[#113F48]">What Does Medicare Part A Cover?</h2>
                  <p className="text-stone-600 text-sm leading-relaxed">Medicare Part A covers four primary categories of care. Understanding each one is essential to knowing when your Part A benefits apply and what costs you may still owe out-of-pocket.</p>

                  <div className="space-y-5">
                    {[
                      {
                        title: "Inpatient Hospital Care",
                        detail: "When you are admitted to a hospital (including critical access hospitals and inpatient rehabilitation facilities) as an inpatient — meaning a doctor formally admits you — Part A helps cover your room, meals, nursing care, hospital services, and supplies. Coverage for inpatient care is organized into benefit periods, and you must meet your deductible at the start of each new benefit period. For 2025, the Part A inpatient deductible is $1,676 per benefit period. After 60 days, daily coinsurance applies ($419/day for days 61–90, and $838/day for lifetime reserve days 91–150)."
                      },
                      {
                        title: "Skilled Nursing Facility (SNF) Care",
                        detail: "After a qualifying inpatient hospital stay of at least 3 days, Part A may cover a stay in a Medicare-certified skilled nursing facility for rehabilitation or other skilled care. Coverage is fully paid for days 1–20. For days 21–100, you pay $209.50 per day in coinsurance (2025). Beyond 100 days, Medicare pays nothing — all costs become your responsibility. This is a critical limitation that many beneficiaries discover too late."
                      },
                      {
                        title: "Hospice Care",
                        detail: "If a doctor certifies that you have a terminal illness with a life expectancy of 6 months or less, Part A covers hospice care. This includes pain management, symptom control, counseling, and short-term inpatient care. Hospice care can take place at home, in a hospice facility, or in certain other settings. Medicare covers most hospice services 100%, though small copays may apply for prescription drugs and respite care."
                      },
                      {
                        title: "Home Health Care",
                        detail: "Part A (and Part B) covers home health services when you are homebound and need skilled nursing care or physical/occupational/speech-language therapy on a part-time or intermittent basis. An approved Medicare home health agency must provide the care, and a doctor must certify the medical necessity. Medicare covers approved home health visits 100% — there is no deductible or coinsurance for these visits if your provider is Medicare-approved."
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
                </div>

                <div className="space-y-4 border-t border-stone-100 pt-10">
                  <h2 className="text-2xl font-bold text-[#113F48]">What Part A Does NOT Cover</h2>
                  <p className="text-stone-600 text-sm leading-relaxed">Part A does not cover all hospital-related expenses. Understanding the gaps is equally important:</p>
                  <ul className="space-y-2">
                    {[
                      "Outpatient services (these fall under Part B)",
                      "Prescription drugs administered outside of a hospital or hospice setting",
                      "Custodial care (non-skilled help with daily activities like bathing or dressing)",
                      "Long-term care (nursing home care beyond skilled care needs)",
                      "Private-duty nursing",
                      "Private hospital rooms (unless medically necessary)",
                      "Personal comfort items (TV, telephone, etc.)",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-stone-600 text-sm">
                        <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4 border-t border-stone-100 pt-10">
                  <h2 className="text-2xl font-bold text-[#113F48]">Part A Costs for 2025</h2>
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
                          ["Premium (most people)", "$0/month (premium-free)"],
                          ["Premium (paid less than 30 quarters)", "$518/month"],
                          ["Premium (paid 30–39 quarters)", "$285/month"],
                          ["Inpatient deductible (per benefit period)", "$1,676"],
                          ["Coinsurance days 61–90", "$419/day"],
                          ["Lifetime reserve days coinsurance", "$838/day"],
                          ["SNF coinsurance days 21–100", "$209.50/day"],
                        ].map(([label, value]) => (
                          <tr key={label} className="hover:bg-[#F9FAFB] transition-colors">
                            <td className="p-3 text-stone-600">{label}</td>
                            <td className="p-3 font-semibold text-[#113F48]">{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-stone-400">* Source: 2025 Medicare cost data. Figures are subject to annual adjustment.</p>
                </div>

                <div className="space-y-4 border-t border-stone-100 pt-10">
                  <h2 className="text-2xl font-bold text-[#113F48]">Eligibility and Enrollment</h2>
                  <p className="text-stone-600 text-sm leading-relaxed">You are automatically eligible for premium-free Medicare Part A at age 65 if you or your spouse worked and paid Medicare taxes for at least 40 quarters (10 years). You will be automatically enrolled if you are already receiving Social Security or Railroad Retirement Board benefits.</p>
                  <p className="text-stone-600 text-sm leading-relaxed">If you do not automatically qualify for premium-free Part A, you can still enroll and pay a premium. Your Initial Enrollment Period (IEP) is a 7-month window: 3 months before your 65th birthday month, your birthday month, and 3 months after. Enrolling outside this window without a Special Enrollment Period may result in late penalties and coverage gaps.</p>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-sm text-amber-800 space-y-2">
                  <AlertTriangle className="h-5 w-5" />
                  <p><strong>Educational Disclaimer:</strong> The information on this page is for general educational purposes only. Medicare costs and rules change annually. Verify all figures with current official sources or a licensed Medicare counselor.</p>
                </div>

              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <div className="bg-[#F9FAFB] border border-stone-200 rounded-2xl p-6 space-y-4 sticky top-24">
                  <h3 className="font-bold text-[#113F48]">Quick Facts</h3>
                  {[
                    { icon: <DollarSign className="h-4 w-4 text-[#C9A15A]" />, label: "Premium", val: "$0 for most" },
                    { icon: <Clock className="h-4 w-4 text-[#C9A15A]" />, label: "IEP Window", val: "7 months around 65th birthday" },
                    { icon: <Stethoscope className="h-4 w-4 text-[#C9A15A]" />, label: "Main Coverage", val: "Hospital inpatient, SNF, hospice, home health" },
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
                    { label: "Medicare Part B Explained", href: "/services/part-b" },
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
