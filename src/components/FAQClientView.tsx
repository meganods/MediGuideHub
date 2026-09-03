"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FAQItem } from "@/lib/db";
import { ChevronDown, HelpCircle, PhoneCall, BookOpen } from "lucide-react";

interface FAQClientViewProps {
  initialFaqs: FAQItem[];
}

export default function FAQClientView({ initialFaqs }: FAQClientViewProps) {
  const [faqs] = useState<FAQItem[]>(initialFaqs);
  const [activeFaq, setActiveFaq] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "General", "Preventive Care", "Nutrition", "Eligibility", "Coverage"];

  const filtered = activeCategory === "All"
    ? faqs
    : faqs.filter((f) => (f.category || "").toLowerCase() === activeCategory.toLowerCase());

  return (
    <>
      {/* Hero */}
      <section className="py-16 bg-[#F9FAFB] border-b border-stone-100">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white border border-stone-200 rounded-2xl shadow-sm mx-auto">
            <HelpCircle className="h-7 w-7 text-[#C9A15A]" />
          </div>
          <h1 className="text-4xl font-extrabold text-[#113F48]">Healthcare FAQ</h1>
          <p className="text-stone-500 max-w-2xl text-sm leading-relaxed mx-auto">
            Answers to the most common questions about healthcare wellness, preventive care, nutrition guidelines, and health literacy — researched from public health literature by our editorial team.
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
                className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider border transition-all cursor-pointer ${
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
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-4 max-w-5xl">
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
                    className="w-full text-left px-6 py-5 flex items-center justify-between bg-white hover:bg-[#F9FAFB] transition-colors focus:outline-none cursor-pointer"
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

      {/* Extra Static FAQs */}
      <section className="py-14 bg-[#F9FAFB] border-t border-stone-100">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <h2 className="text-2xl font-extrabold text-[#113F48] mb-8">More Healthcare Questions Answered</h2>
          <div className="space-y-4">
            {[
              {
                q: "What is preventive healthcare and why is it important?",
                a: "Preventive healthcare focuses on maintaining wellness rather than treating illness. It includes routine check-ups, immunizations, and screenings designed to prevent health problems before they occur. Catching conditions early often leads to better outcomes and lower healthcare costs over time."
              },
              {
                q: "How often should I get a full medical checkup?",
                a: "While the traditional recommendation was an annual physical, many experts now suggest that the frequency of checkups should depend on your age, risk factors, and current health status. However, for adults over 50, an annual checkup is generally recommended to screen for age-related conditions."
              },
              {
                q: "How does mental health affect physical health?",
                a: "Mental and physical health are deeply connected. Chronic stress, depression, or anxiety can negatively impact your immune system, increase the risk of heart disease, and cause gastrointestinal issues. Conversely, regular physical exercise and a healthy diet can significantly improve mood and cognitive function."
              },
              {
                q: "What is the difference between a generic and a brand-name drug?",
                a: "Generic drugs have the same active ingredients, strength, dosage form, and route of administration as their brand-name counterparts. They are rigorously tested by the FDA to ensure they are just as safe and effective. The main difference is typically the cost, as generics are usually much cheaper."
              },
              {
                q: "How can I improve my cardiovascular health?",
                a: "Improving heart health involves a combination of lifestyle choices: eating a diet rich in fruits, vegetables, and whole grains, exercising for at least 150 minutes a week, managing stress, avoiding smoking, and getting regular health screenings to check blood pressure and cholesterol levels."
              },
            ].map((item, i) => {
              const id = `static-${i}`;
              const isOpen = activeFaq === id;
              return (
                <div key={id} className={`border rounded-xl overflow-hidden transition-all ${isOpen ? "border-[#C9A15A] shadow-sm" : "border-stone-200"}`}>
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : id)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between bg-white hover:bg-[#F9FAFB] transition-colors focus:outline-none cursor-pointer"
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
              <BookOpen className="h-4 w-4" /> Browse Healthcare Guides
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
