"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Shield, CheckCircle2, ArrowRight, AlertTriangle, DollarSign, BookOpen } from "lucide-react";

export default function MedicarePartCPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-grow">

        <section className="py-16 bg-[#F9FAFB] border-b border-stone-100">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-start gap-6">
              <div className="bg-white border border-stone-200 p-4 rounded-2xl shadow-sm flex-shrink-0">
                <Shield className="h-10 w-10 text-[#C9A15A]" />
              </div>
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C9A15A]">Medicare Part C</span>
                <h1 className="text-4xl font-extrabold text-[#113F48] leading-tight">Medicare Advantage:<br />How Part C Plans Work</h1>
                <p className="text-stone-600 max-w-2xl leading-relaxed">
                  Medicare Part C — known as Medicare Advantage — is an alternative way to receive your Medicare benefits through a private, Medicare-approved insurance company. Instead of using Original Medicare (Parts A and B) directly, you enroll in a private plan that bundles your hospital and medical coverage, often along with prescription drugs, dental, vision, and hearing benefits, into a single plan.
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
                  <h2 className="text-2xl font-bold text-[#113F48]">How Medicare Advantage Works</h2>
                  <p className="text-stone-600 text-sm leading-relaxed">When you enroll in a Medicare Advantage plan, Medicare pays the private insurer a fixed amount each month to provide your coverage. The insurer must cover at least everything Original Medicare covers (except most hospice care, which remains under Part A). Most plans offer additional benefits beyond Original Medicare, which is a major draw for many beneficiaries.</p>
                  <p className="text-stone-600 text-sm leading-relaxed">You must still pay your Part B premium, even when enrolled in a Medicare Advantage plan. Some Advantage plans offer a &ldquo;Part B premium giveback benefit&rdquo; that applies a credit toward your Part B premium, effectively reducing what you owe.</p>
                </div>

                <div className="space-y-5">
                  <h2 className="text-2xl font-bold text-[#113F48]">Types of Medicare Advantage Plans</h2>
                  {[
                    {
                      title: "HMO (Health Maintenance Organization)",
                      detail: "The most common type. Requires you to use in-network providers (with some exceptions for emergencies). Usually requires a primary care physician (PCP) referral to see specialists. Typically lowest premiums but least flexibility."
                    },
                    {
                      title: "PPO (Preferred Provider Organization)",
                      detail: "Allows you to see any provider who accepts Medicare — in or out of network — though you pay less with in-network providers. No referrals required. More flexibility than HMO, usually higher premiums."
                    },
                    {
                      title: "PFFS (Private Fee-for-Service)",
                      detail: "The plan sets its own payment rates. You can see any Medicare-accepting provider who agrees to the plan's payment terms. No network restrictions, but providers are not always required to accept these plans."
                    },
                    {
                      title: "SNP (Special Needs Plan)",
                      detail: "Designed for people with specific diseases (like diabetes or heart failure), dual-eligibles (Medicare + Medicaid), or residents of institutions like nursing homes. These plans tailor benefits and drug formularies to the specific population served."
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
                  <h2 className="text-2xl font-bold text-[#113F48]">Pros and Cons of Medicare Advantage</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 space-y-3">
                      <h3 className="font-bold text-emerald-800 text-sm">✅ Advantages</h3>
                      {[
                        "Annual out-of-pocket maximum limits your costs",
                        "Often includes dental, vision, and hearing benefits",
                        "Usually includes Part D drug coverage",
                        "Many plans have $0 monthly premiums",
                        "May include fitness benefits (e.g., SilverSneakers)",
                        "Coordinated care can improve health outcomes",
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-emerald-700 text-xs">
                          <CheckCircle2 className="h-4 w-4 flex-shrink-0 mt-0.5" />{item}
                        </div>
                      ))}
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-xl p-5 space-y-3">
                      <h3 className="font-bold text-red-800 text-sm">⚠️ Disadvantages</h3>
                      {[
                        "Network restrictions may limit doctor choice",
                        "Referrals required for specialists in HMO plans",
                        "Plans vary significantly by region and year",
                        "Prior authorization required for some services",
                        "Must re-evaluate plan annually during Open Enrollment",
                        "May not be accepted in all areas (rural coverage gaps)",
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-red-700 text-xs">
                          <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />{item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4 border-t border-stone-100 pt-10">
                  <h2 className="text-2xl font-bold text-[#113F48]">Enrollment Periods</h2>
                  <div className="space-y-3">
                    {[
                      { period: "Initial Coverage Election Period (ICEP)", detail: "When you first become eligible for Medicare (around your 65th birthday). You can enroll in a Medicare Advantage plan during your 7-month Initial Enrollment Period." },
                      { period: "Annual Enrollment Period (AEP)", detail: "October 15 – December 7 each year. You can join, switch, or drop a Medicare Advantage plan. Coverage begins January 1 of the following year." },
                      { period: "Medicare Advantage Open Enrollment Period", detail: "January 1 – March 31 each year. If you are already enrolled in a Medicare Advantage plan, you can switch to a different Advantage plan or return to Original Medicare (and a standalone Part D plan)." },
                      { period: "Special Enrollment Periods (SEPs)", detail: "Triggered by qualifying life events such as moving out of your plan's service area, losing employer coverage, or qualifying for Medicaid. SEPs allow you to enroll or switch outside of normal periods." },
                    ].map((item) => (
                      <div key={item.period} className="bg-[#F9FAFB] border border-stone-200 rounded-xl p-5 space-y-1">
                        <h3 className="font-semibold text-[#113F48] text-sm">{item.period}</h3>
                        <p className="text-stone-600 text-sm leading-relaxed">{item.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-sm text-amber-800 space-y-2">
                  <AlertTriangle className="h-5 w-5" />
                  <p><strong>Educational Disclaimer:</strong> This page describes Medicare Advantage plan types for educational purposes only. We do not recommend or sell specific plans. Plan availability, benefits, and costs vary by county and insurer. Compare options carefully and consult a licensed professional if needed.</p>
                </div>

              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <div className="bg-[#F9FAFB] border border-stone-200 rounded-2xl p-6 space-y-4 sticky top-24">
                  <h3 className="font-bold text-[#113F48]">Key Points</h3>
                  {[
                    { icon: <DollarSign className="h-4 w-4 text-[#C9A15A]" />, label: "Premiums", val: "Often $0/month (pay Part B still)" },
                    { icon: <Shield className="h-4 w-4 text-[#C9A15A]" />, label: "Annual OOP Max", val: "Required by law ($9,350 in-network, 2025)" },
                    { icon: <CheckCircle2 className="h-4 w-4 text-[#C9A15A]" />, label: "Drug Coverage", val: "Usually bundled (MAPD plans)" },
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
                    { label: "Medicare Part D — Drugs", href: "/services/part-d" },
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
