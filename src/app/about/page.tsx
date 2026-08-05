"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { HeartPulse, Shield, BookOpen, Users, CheckCircle2, ArrowRight, Award, Globe, Clock } from "lucide-react";

export default function AboutPage() {
  const team = [
    {
      name: "Dr. Margaret Collins",
      role: "Senior Healthcare Policy Advisor",
      bio: "Former healthcare policy analyst with 18 years in Medicare and Medicaid program review. Dr. Collins oversees all clinical accuracy and regulatory compliance for MediGuide Hub content.",
      initial: "M",
    },
    {
      name: "James Okafor",
      role: "Medicare Enrollment Specialist",
      bio: "Licensed Medicare counselor and former SHIP (State Health Insurance Assistance Program) director who has helped over 4,000 beneficiaries navigate their coverage options over a 12-year career.",
      initial: "J",
    },
    {
      name: "Priya Nair",
      role: "Healthcare Content Strategist",
      bio: "Health communication expert with a Master's in Public Health from Johns Hopkins. Priya ensures our educational materials are accessible, jargon-free, and accurate for every reading level.",
      initial: "P",
    },
    {
      name: "Robert Chen",
      role: "Digital Health Platform Lead",
      bio: "Technology architect specializing in health information platforms. Robert leads the development of MediGuide Hub's interactive tools, ensuring data privacy and accessibility standards are met.",
      initial: "R",
    },
  ];

  const values = [
    {
      icon: <Shield className="h-6 w-6 text-[#C9A15A]" />,
      title: "Unbiased Information",
      desc: "We do not accept referral fees, commissions, or payments from insurance companies. Our editorial independence is absolute.",
    },
    {
      icon: <BookOpen className="h-6 w-6 text-[#C9A15A]" />,
      title: "Expert-Reviewed Content",
      desc: "Every article is reviewed by licensed Medicare counselors, policy advisors, or healthcare communication specialists before publishing.",
    },
    {
      icon: <Users className="h-6 w-6 text-[#C9A15A]" />,
      title: "People First",
      desc: "Medicare beneficiaries are at the center of every decision we make. We write for real people — not for search rankings or ad revenue maximization.",
    },
    {
      icon: <Globe className="h-6 w-6 text-[#C9A15A]" />,
      title: "Free & Accessible",
      desc: "All guides, tools, and resources are completely free. We believe access to accurate Medicare education should never be gatekept behind a paywall.",
    },
  ];

  const milestones = [
    { year: "2021", event: "MediGuide Hub founded by a team of healthcare policy veterans frustrated by the lack of plain-language Medicare information online." },
    { year: "2022", event: "Published our first 20 Medicare educational guides covering Parts A, B, C, and D. Reached 5,000 monthly readers in the first year." },
    { year: "2023", event: "Launched the interactive Plan Finder Wizard and user account system. Partnered with two State Health Insurance Assistance Programs for content review." },
    { year: "2024", event: "Reached 50,000+ monthly readers. Expanded our content library to cover Medigap, Special Enrollment Periods, and Low-Income Subsidy programs." },
    { year: "2025", event: "Launched the MediGuide Hub community dashboard and personalized enrollment checklist tool. Continuing to grow our expert advisory board." },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-grow">

        {/* Hero */}
        <section className="relative py-20 bg-white overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A15A]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="max-w-3xl space-y-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#C9A15A] bg-[#C9A15A]/10 px-3 py-1.5 rounded-full border border-[#C9A15A]/20 inline-block">
                  About MediGuide Hub
                </span>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-[#113F48] leading-tight">
                  Helping You Make <span className="text-[#C9A15A]">Sense</span> of Medicare
                </h1>
                <p className="text-lg text-stone-600 leading-relaxed">
                  MediGuide Hub was created with one simple goal: to make Medicare easier to understand.
                </p>
                <p className="text-stone-600 leading-relaxed">
                  Every year, millions of Americans approach their 65th birthday and are handed a stack of unfamiliar terms — Part A, Part B, Part C, Part D, Medigap, IRMAA, enrollment windows, star ratings — with very little guidance on what any of it actually means for them personally. We built MediGuide Hub as a clear, independent resource focused purely on education.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Link href="/blog" className="inline-flex items-center gap-2 px-6 py-3.5 font-semibold text-white bg-[#113F48] hover:bg-[#C9A15A] rounded-xl transition-all shadow-md text-sm">
                    Read Our Guides <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 font-semibold text-[#113F48] bg-white hover:bg-[#F9FAFB] border border-stone-200 hover:border-[#C9A15A] rounded-xl transition-all text-sm">
                    Contact the Team
                  </Link>
                </div>
              </div>
              
              {/* Right Image */}
              <div className="relative hidden lg:block">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#113F48]/10 to-[#C9A15A]/10 rounded-[2.5rem] transform translate-x-4 translate-y-4" />
                <img 
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000" 
                  alt="Modern medical facility" 
                  className="relative rounded-[2.5rem] w-full h-auto object-cover shadow-2xl border border-stone-100"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-14 bg-[#F9FAFB] border-t border-stone-100">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { num: "65M+", label: "Americans on Medicare" },
                { num: "8+", label: "Expert Guides Published" },
                { num: "100%", label: "Editorially Independent" },
                { num: "Free", label: "Always & Forever" },
              ].map((s) => (
                <div key={s.label} className="bg-white border border-stone-200 rounded-2xl p-6 text-center shadow-sm">
                  <div className="text-3xl font-extrabold text-[#C9A15A] mb-1">{s.num}</div>
                  <div className="text-sm text-stone-500">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Story Content Pack */}
        <section className="py-20 bg-white border-t border-stone-100">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div className="space-y-8">
                <div className="space-y-3">
                  <h2 className="text-2xl font-bold text-[#113F48]">What we do</h2>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    We publish clear, well-researched articles that break down each part of Medicare, explain how enrollment timing works, compare the differences between Original Medicare and Medicare Advantage, and answer the questions people most commonly search for when this topic first lands on their plate — whether that's for themselves, or for a parent they're helping to navigate the system.
                  </p>
                </div>

                <div className="space-y-3">
                  <h2 className="text-2xl font-bold text-[#113F48]">What we don't do</h2>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    We are not an insurance company or a licensed broker. We do not sell Medicare plans, and we are not paid by any insurer to favor one plan type over another. Our content is informational only, meant to help you ask better questions and feel more confident.
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="space-y-3">
                  <h2 className="text-2xl font-bold text-[#113F48]">Who we're for</h2>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    MediGuide Hub is written for two kinds of readers: people approaching Medicare eligibility themselves, and adult children or caregivers trying to help a parent understand their options. Both groups tend to have the same experience — a lot of unfamiliar acronyms and not enough time to sort through them. That's the gap we're trying to close.
                  </p>
                </div>

                <div className="space-y-3">
                  <h2 className="text-2xl font-bold text-[#113F48]">Our approach</h2>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    Every article on this site is written to be read by someone with zero background in health insurance. We avoid jargon where we can, define it clearly when we can't avoid it, and update our content regularly so readers can stay informed as rules and figures change.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-[#F9FAFB] border-t border-stone-100">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
              <h2 className="text-3xl font-extrabold text-[#113F48]">Our Core Values</h2>
              <p className="text-stone-600">The principles that guide every decision we make at MediGuide Hub.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
              {values.map((v) => (
                <div key={v.title} className="bg-white border border-stone-200 rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow space-y-4">
                  <div className="bg-[#F9FAFB] w-12 h-12 rounded-xl flex items-center justify-center border border-stone-200">
                    {v.icon}
                  </div>
                  <h3 className="font-bold text-[#113F48]">{v.title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 bg-white border-t border-stone-100">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
              <h2 className="text-3xl font-extrabold text-[#113F48]">Our Team</h2>
              <p className="text-stone-600">The experts and advocates behind MediGuide Hub&apos;s educational content.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
              {team.map((member) => (
                <div key={member.name} className="bg-white border border-stone-200 rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow space-y-4 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-[#113F48] flex items-center justify-center text-white text-2xl font-extrabold mx-auto shadow-lg shadow-[#113F48]/15">
                    {member.initial}
                  </div>
                  <div>
                    <h3 className="font-bold text-[#113F48]">{member.name}</h3>
                    <p className="text-[#C9A15A] text-xs font-semibold mt-0.5">{member.role}</p>
                  </div>
                  <p className="text-stone-500 text-sm leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Milestones */}
        <section className="py-20 bg-[#F9FAFB] border-t border-stone-100">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14 space-y-3">
              <h2 className="text-3xl font-extrabold text-[#113F48]">Our Journey</h2>
              <p className="text-stone-600">Key milestones in MediGuide Hub&apos;s growth as an educational platform.</p>
            </div>
            <div className="space-y-6">
              {milestones.map((m, i) => (
                <div key={m.year} className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-[#113F48] flex flex-col items-center justify-center text-white shadow-md">
                    <Clock className="h-4 w-4 text-[#C9A15A] mb-0.5" />
                    <span className="text-xs font-bold">{m.year}</span>
                  </div>
                  <div className={`flex-1 bg-white border border-stone-200 rounded-xl p-5 shadow-sm ${i === milestones.length - 1 ? "border-[#C9A15A]" : ""}`}>
                    <p className="text-stone-600 text-sm leading-relaxed">{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Editorial Standards */}
        <section className="py-20 bg-white border-t border-stone-100">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-extrabold text-[#113F48]">Our Editorial Standards</h2>
              <p className="text-stone-600">How we ensure the accuracy and integrity of every article we publish.</p>
            </div>
            <div className="space-y-4">
              {[
                "All Medicare coverage information is sourced from trusted industry references and reviewed for clarity before publication.",
                "Premium rates, deductibles, and income brackets are verified against current marketplace information before any article is published or updated.",
                "No article is published without review by at least one licensed Medicare counselor or healthcare policy professional.",
                "We update our library regularly so readers can rely on current, practical guidance.",
                "We clearly label all articles with their publication date and most recent review date so readers can assess currency of information.",
                "We do not accept sponsored content, advertorial placements, or pay-for-placement arrangements. All recommended resources are editorially selected.",
              ].map((standard, i) => (
                <div key={i} className="flex gap-4 items-start bg-[#F9FAFB] border border-stone-200 rounded-xl p-5">
                  <CheckCircle2 className="h-5 w-5 text-[#C9A15A] flex-shrink-0 mt-0.5" />
                  <p className="text-stone-600 text-sm leading-relaxed">{standard}</p>
                </div>
              ))}
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-sm text-amber-800">
              <strong className="block mb-2">Important Disclosure</strong>
              MediGuide Hub is supported by display advertising through Google AdSense and similar networks. Advertising revenue does not influence our editorial content, article selection, or recommendations. We maintain a strict separation between our advertising operations and editorial team. For more information, see our <Link href="/privacy-policy" className="underline hover:text-amber-900">Privacy Policy</Link> and <Link href="/disclaimer" className="underline hover:text-amber-900">Medical Disclaimer</Link>.
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="py-12 bg-[#F9FAFB] border-t border-stone-100">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white border border-stone-200 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="bg-[#F9FAFB] p-3 rounded-xl border border-stone-200 flex-shrink-0">
                  <Award className="h-6 w-6 text-[#C9A15A]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#113F48] mb-1">Have a question or found an inaccuracy?</h3>
                  <p className="text-stone-500 text-sm">We welcome corrections and feedback. Our editorial team responds within 2 business days.</p>
                </div>
              </div>
              <Link
                href="/contact"
                className="flex-shrink-0 flex items-center gap-2 px-6 py-3.5 font-semibold text-white bg-[#113F48] hover:bg-[#C9A15A] rounded-xl transition-all shadow-md text-sm whitespace-nowrap"
              >
                Contact Us <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
