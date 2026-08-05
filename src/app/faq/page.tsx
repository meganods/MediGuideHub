"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { getFAQs, FAQItem } from "@/lib/db";
import { ChevronDown, HelpCircle, PhoneCall, BookOpen } from "lucide-react";

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [activeFaq, setActiveFaq] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    async function load() {
      const data = await getFAQs();
      setFaqs(data);
    }
    load();
  }, []);

  const categories = ["All", "Eligibility", "Enrollment", "Coverage", "Costs", "Medigap"];

  const filtered = activeCategory === "All"
    ? faqs
    : faqs.filter((f) => f.category === activeCategory);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-grow">
        {/* Hero */}
        <section className="py-16 bg-[#F9FAFB] border-b border-stone-100">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-white border border-stone-200 rounded-2xl shadow-sm mx-auto">
              <HelpCircle className="h-7 w-7 text-[#C9A15A]" />
            </div>
            <h1 className="text-4xl font-extrabold text-[#113F48]">Medicare FAQ</h1>
            <p className="text-stone-600 max-w-2xl mx-auto leading-relaxed">
              Answers to the most common questions about Medicare eligibility, enrollment windows, coverage types, and costs — written in plain language by our team of healthcare policy advisors.
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 bg-white border-b border-stone-100 sticky top-20 z-40">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-2.5 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setActiveFaq(null); }}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider border transition-all ${
                    activeCategory === cat
                      ? "bg-[#113F48] text-white border-[#113F48] shadow-sm"
                      : "bg-white text-stone-600 border-stone-200 hover:border-[#C9A15A]/60"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="py-14 bg-white">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            {filtered.length === 0 ? (
              <div className="text-center py-16 text-stone-400 space-y-3">
                <HelpCircle className="h-12 w-12 mx-auto opacity-40" />
                <p className="text-sm">No FAQs found in this category yet.</p>
              </div>
            ) : (
              filtered.map((faq) => {
                const isOpen = activeFaq === faq.id;
                return (
                  <div
                    key={faq.id}
                    className={`border rounded-xl overflow-hidden transition-all ${isOpen ? "border-[#C9A15A] shadow-sm" : "border-stone-200 hover:border-stone-300"}`}
                  >
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : faq.id)}
                      className="w-full text-left px-6 py-5 flex items-center justify-between bg-white hover:bg-[#F9FAFB] transition-colors focus:outline-none"
                    >
                      <span className="font-semibold text-[#113F48] text-base pr-4">{faq.question}</span>
                      <ChevronDown className={`h-5 w-5 text-[#C9A15A] flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 text-stone-600 text-sm leading-relaxed border-t border-stone-100 pt-4 bg-white">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* Extra Static FAQs (AdSense content padding) */}
        <section className="py-14 bg-[#F9FAFB] border-t border-stone-100">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-extrabold text-[#113F48] mb-8">More Medicare Questions Answered</h2>
            <div className="space-y-4">
              {[
                {
                  q: "Can I keep my current doctors if I switch to Medicare Advantage?",
                  a: "Not necessarily. Medicare Advantage plans have provider networks (HMO or PPO), which means your current doctors must participate in the plan's network for you to receive covered services. Always check the plan's provider directory before enrolling. If you see a specialist regularly, verify they are in-network. Original Medicare (Parts A and B), by contrast, allows you to see any doctor in the US who accepts Medicare — providing much broader provider flexibility."
                },
                {
                  q: "What happens if I miss my Medicare Initial Enrollment Period?",
                  a: "If you miss your Initial Enrollment Period (IEP) — the 7-month window around your 65th birthday — you may face late enrollment penalties and have to wait for a General Enrollment Period (January 1 – March 31), with coverage beginning July 1. For Part B, the late penalty is 10% added to your premium permanently for every 12-month period you delayed enrollment without qualifying coverage from an employer. Part D carries a similar ongoing penalty calculated differently. Exceptions exist if you had creditable coverage through an employer."
                },
                {
                  q: "What is creditable coverage and why does it matter for Medicare?",
                  a: "Creditable coverage refers to prescription drug coverage (Part D equivalent) or health insurance from an employer or union that is as good as or better than standard Medicare coverage. If you have creditable coverage, you can delay Medicare enrollment without incurring late penalties. Your employer must provide you with a written notice of whether your coverage is creditable each year. Keep this documentation carefully — you will need it when you eventually enroll in Medicare Part D."
                },
                {
                  q: "What is the Medicare Savings Program?",
                  a: "Medicare Savings Programs (MSPs) are state-administered programs that help people with limited income and resources pay for Medicare costs. Depending on your income level, the program may pay your Part A and/or Part B premiums, deductibles, and coinsurance. There are four types: Qualified Medicare Beneficiary (QMB), Specified Low-Income Medicare Beneficiary (SLMB), Qualifying Individual (QI), and Qualified Disabled and Working Individuals (QDWI). Contact your state Medicaid office or SHIP counselor to learn if you qualify."
                },
                {
                  q: "Does Medicare cover international travel medical expenses?",
                  a: "Generally, Original Medicare does not cover healthcare you receive outside the United States and its territories. There are very limited exceptions for emergencies when a foreign hospital is closer than a US hospital (such as in certain US border regions). Some Medigap supplement plans (Plans C, D, G, M, and N) include a foreign travel emergency benefit that covers 80% of medically necessary emergency care abroad, up to a lifetime maximum of $50,000 after a $250 annual deductible. If you travel internationally, review Medigap options or consider a separate travel health insurance policy."
                },
              ].map((item, i) => {
                const id = `static-${i}`;
                const isOpen = activeFaq === id;
                return (
                  <div key={id} className={`border rounded-xl overflow-hidden transition-all ${isOpen ? "border-[#C9A15A] shadow-sm" : "border-stone-200"}`}>
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : id)}
                      className="w-full text-left px-6 py-5 flex items-center justify-between bg-white hover:bg-[#F9FAFB] transition-colors focus:outline-none"
                    >
                      <span className="font-semibold text-[#113F48] text-base pr-4">{item.q}</span>
                      <ChevronDown className={`h-5 w-5 text-[#C9A15A] flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 text-stone-600 text-sm leading-relaxed border-t border-stone-100 pt-4 bg-white">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 bg-white border-t border-stone-100">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="text-2xl font-extrabold text-[#113F48]">Still Have Questions?</h2>
            <p className="text-stone-600">Our team reviews every inquiry personally and responds within 2 business days.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 font-semibold text-white bg-[#113F48] hover:bg-[#C9A15A] rounded-xl transition-all shadow-md text-sm">
                <PhoneCall className="h-4 w-4" /> Ask Our Team
              </Link>
              <Link href="/blog" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 font-semibold text-[#113F48] bg-white hover:bg-[#F9FAFB] border border-stone-200 hover:border-[#C9A15A] rounded-xl transition-all text-sm">
                <BookOpen className="h-4 w-4" /> Browse Medicare Guides
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
