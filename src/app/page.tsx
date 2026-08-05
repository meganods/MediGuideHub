"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getFAQs, getPosts, FAQItem, BlogPost } from "@/lib/db";
import {
  ArrowRight,
  Calculator,
  Heart,
  Stethoscope,
  Shield,
  ChevronDown,
  Star,
  CheckCircle2,
  BookOpen,
  Clock,
  Users,
  FileText,
  RefreshCcw,
  PhoneCall,
} from "lucide-react";
import { INITIAL_TESTIMONIALS } from "@/lib/mockData";

export default function Home() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [activeFaq, setActiveFaq] = useState<string | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Plan finder wizard state
  const [step, setStep] = useState(1);
  const [age, setAge] = useState("");
  const [priority, setPriority] = useState("");
  const [recommendation, setRecommendation] = useState("");

  useEffect(() => {
    async function loadData() {
      const allFaqs = await getFAQs();
      setFaqs(allFaqs);
      const allPosts = await getPosts();
      setFeaturedPosts(allPosts.slice(0, 3));
    }
    loadData();
  }, []);

  // Auto-advance testimonial carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % INITIAL_TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleFindPlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!age || !priority) return;
    let rec = "";
    if (age === "under-65") {
      rec = "Since you are under 65, you generally qualify for Medicare through Social Security Disability (SSDI) after 24 months of benefits, or due to conditions like ESRD or ALS. We recommend reviewing the 'What is Medicare' guide and consulting our Support Team for custom assistance.";
    } else if (priority === "flexibility") {
      rec = "Based on your preference to see any doctor nationwide, we recommend Original Medicare (Part A & Part B) paired with a Medicare Supplement (Medigap Plan G) and a standalone Part D Drug Plan. This provides maximum flexibility and predictable costs.";
    } else if (priority === "all-in-one") {
      rec = "If you want all-in-one dental, vision, and drug benefits with low premiums, we recommend looking into a private Medicare Advantage Plan (Part C). Be sure to check that your current doctors are in-network.";
    } else if (priority === "drugs") {
      rec = "Since prescription costs are your priority, we advise comparing stand-alone Medicare Part D plans alongside your Original Medicare. Be sure to check that your medications are on the plan's formulary.";
    } else {
      rec = "Original Medicare (Part A & Part B) is a great foundation. Adding a Medigap plan will cover the out-of-pocket gaps. Explore our educational guides to choose between Medigap and Medicare Advantage.";
    }
    setRecommendation(rec);
    setStep(3);
  };

  const resetWizard = () => {
    setAge("");
    setPriority("");
    setRecommendation("");
    setStep(1);
  };

  const trustPoints = [
    {
      icon: <BookOpen className="h-6 w-6 text-[#C9A15A]" />,
      title: "Unbiased Information",
      desc: "We never accept referral fees or insurance commissions. Every guide is written purely to educate.",
    },
    {
      icon: <FileText className="h-6 w-6 text-[#C9A15A]" />,
      title: "Written by Researchers",
      desc: "Our content team includes healthcare policy advisors and Medicare specialists with years of experience.",
    },
    {
      icon: <Users className="h-6 w-6 text-[#C9A15A]" />,
      title: "Free to Use",
      desc: "All educational articles, plan guides, and comparison tools are completely free — no registration required to read.",
    },
    {
      icon: <RefreshCcw className="h-6 w-6 text-[#C9A15A]" />,
      title: "Updated Regularly",
      desc: "Medicare rules change annually. We review and update every article to reflect current year enrollment rules and premiums.",
    },
  ];

  const howItWorksSteps = [
    {
      number: "01",
      icon: <BookOpen className="h-7 w-7 text-white" />,
      title: "Compare",
      desc: "Use our structured comparison guides to understand the differences between Original Medicare, Medicare Advantage, Medigap, and Part D plans.",
    },
    {
      number: "02",
      icon: <Shield className="h-7 w-7 text-white" />,
      title: "Understand",
      desc: "Dive into plain-language educational articles explaining enrollment windows, costs, coverage rules, and late penalty avoidance.",
    },
    {
      number: "03",
      icon: <CheckCircle2 className="h-7 w-7 text-white" />,
      title: "Decide",
      desc: "Armed with reliable information, you can make confident decisions about your Medicare coverage — or connect with a licensed advisor.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      {/* ── HERO SECTION ── */}
      <section className="relative overflow-hidden pt-16 pb-24 md:py-36 bg-white">
        {/* Subtle background blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C9A15A]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#113F48]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Copy */}
            <div className="space-y-7">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C9A15A]/10 border border-[#C9A15A]/25 text-xs font-semibold uppercase tracking-wider text-[#C9A15A]">
                ✨ 100% Free Educational Platform
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#113F48] leading-tight">
                Demystifying{" "}
                <span className="text-[#C9A15A]">Medicare</span>{" "}
                For Your Future
              </h1>

              <p className="text-lg md:text-xl text-stone-500 font-normal leading-relaxed max-w-lg">
                Navigating Medicare coverage paths can be complicated. We break down enrollment windows, explain Parts A, B, C &amp; D, and compare plans with clear, user-friendly guides.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/blog"
                  className="flex items-center justify-center px-8 py-4 font-semibold text-white bg-[#113F48] hover:bg-[#C9A15A] rounded-xl transition-all shadow-lg shadow-[#113F48]/10 text-base"
                >
                  Explore Plans
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 px-8 py-4 font-semibold text-[#113F48] bg-white hover:bg-[#F9FAFB] rounded-xl border border-stone-200 hover:border-[#C9A15A] transition-all text-base shadow-sm"
                >
                  <PhoneCall className="h-5 w-5 text-[#C9A15A]" />
                  Talk to an Expert
                </Link>
              </div>

              {/* Quick trust badges */}
              <div className="flex flex-wrap gap-4 pt-2">
                {["No sales pitch", "Expert-written", "Always free"].map((b) => (
                  <div key={b} className="flex items-center gap-1.5 text-sm text-stone-600">
                    <CheckCircle2 className="h-4 w-4 text-[#C9A15A]" />
                    {b}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Illustration / Stats card */}
            <div className="relative hidden lg:flex justify-end">
              <div className="relative w-full max-w-md">
                {/* Main card */}
                <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-xl space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-[#C9A15A]/10 p-3 rounded-xl border border-[#C9A15A]/20">
                      <Heart className="h-7 w-7 text-[#C9A15A]" />
                    </div>
                    <div>
                      <div className="text-2xl font-extrabold text-[#113F48]">65M+</div>
                      <div className="text-xs text-stone-500 font-medium">Medicare beneficiaries in the US</div>
                    </div>
                  </div>
                  <div className="h-px bg-stone-100" />
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "Part A", detail: "Hospital Care" },
                      { label: "Part B", detail: "Medical Insurance" },
                      { label: "Part C", detail: "Medicare Advantage" },
                      { label: "Part D", detail: "Drug Coverage" },
                    ].map((p) => (
                      <div key={p.label} className="bg-[#F9FAFB] border border-stone-200 rounded-xl p-4">
                        <div className="font-bold text-[#C9A15A] text-sm">{p.label}</div>
                        <div className="text-xs text-stone-500 mt-0.5">{p.detail}</div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-[#113F48] text-white rounded-xl p-4 text-sm font-medium flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#C9A15A]" />
                    Free educational guides — updated for 2025
                  </div>
                </div>
                {/* Floating accent blob */}
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#C9A15A]/10 rounded-full blur-2xl -z-10" />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#113F48]/10 rounded-full blur-2xl -z-10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT US SECTION ── */}
      <section id="about" className="py-20 bg-[#F9FAFB] border-t border-stone-100">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#C9A15A] bg-[#C9A15A]/10 px-3 py-1.5 rounded-full border border-[#C9A15A]/20 inline-block">
                Who We Are
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#113F48] leading-tight">
                A Trusted Medicare Education Platform
              </h2>
              <p className="text-stone-600 leading-relaxed">
                MediGuide Hub was founded with a single mission — to eliminate the confusion around Medicare enrollment. We are an independent educational platform, not an insurance company. We do not sell plans, take commissions, or push any product.
              </p>
              <p className="text-stone-600 leading-relaxed">
                Our team of healthcare researchers and policy advisors compile accurate, up-to-date information so you can approach Medicare decisions with confidence and clarity.
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800 font-medium">
                ⚠️ This website provides educational information only and is not intended as a substitute for personalized professional guidance.
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
              {[
                { num: "8+", label: "Medicare Guides Published" },
                { num: "10K+", label: "Monthly Readers" },
                { num: "100%", label: "Free & Unbiased" },
                { num: "2025", label: "Content Updated For" },
              ].map((stat) => (
                <div key={stat.label} className="bg-white border border-stone-200 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-3xl font-extrabold text-[#C9A15A] mb-1">{stat.num}</div>
                  <div className="text-sm text-stone-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES / WHAT WE COVER SECTION ── */}
      <section id="services" className="py-20 bg-white border-t border-stone-100">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C9A15A] bg-[#C9A15A]/10 px-3 py-1.5 rounded-full border border-[#C9A15A]/20 inline-block">
              What We Cover
            </span>
            <h2 className="text-3xl font-bold text-[#113F48] sm:text-4xl">
              Understand the Parts of Medicare
            </h2>
            <p className="text-stone-600">
              Medicare is broken into four distinct parts, each covering specific areas of your healthcare. Here is a plain-language overview.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
            {[
              {
                icon: <Stethoscope className="h-6 w-6 text-[#C9A15A]" />,
                label: "Part A",
                subtitle: "Hospital Insurance",
                desc: "Covers inpatient hospital stays, skilled nursing facility care, hospice, and some home health services. Most people qualify premium-free if they or their spouse paid Medicare taxes for at least 10 years.",
                href: "/blog/medicare-part-a-hospital-insurance",
              },
              {
                icon: <Heart className="h-6 w-6 text-[#C9A15A]" />,
                label: "Part B",
                subtitle: "Medical Insurance",
                desc: "Covers outpatient services including doctor visits, preventive screenings, mental health care, lab tests, and durable medical equipment. Requires a standard monthly premium that adjusts based on income.",
                href: "/blog/medicare-part-b-medical-insurance",
              },
              {
                icon: <Shield className="h-6 w-6 text-[#C9A15A]" />,
                label: "Part C",
                subtitle: "Medicare Advantage",
                desc: "Bundled private insurance alternatives that combine Part A, Part B, and usually Part D into one plan. Often include dental, vision, and hearing benefits at lower or zero premiums — but restrict your provider network.",
                href: "/blog/medicare-part-c-medicare-advantage",
              },
              {
                icon: <Calculator className="h-6 w-6 text-[#C9A15A]" />,
                label: "Part D",
                subtitle: "Drug Coverage",
                desc: "Standalone prescription drug insurance sold through Medicare-approved private insurers. Helps pay for brand-name and generic drugs. Each plan has its own formulary (list of covered medications) and cost tiers.",
                href: "/blog/medicare-part-d-prescription-drug-coverage",
              },
            ].map((item) => (
              <div key={item.label} className="premium-card p-8 flex flex-col justify-between group">
                <div>
                  <div className="bg-[#F9FAFB] w-12 h-12 rounded-xl flex items-center justify-center border border-stone-200 mb-6 group-hover:border-[#C9A15A]/50 transition-colors">
                    {item.icon}
                  </div>
                  <div className="mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C9A15A]">{item.label}</span>
                    <h3 className="text-lg font-bold text-[#113F48] mt-0.5">{item.subtitle}</h3>
                  </div>
                  <p className="text-stone-500 text-sm leading-relaxed mt-3 mb-6">
                    {item.desc}
                  </p>
                </div>
                <Link
                  href={item.href}
                  className="flex items-center text-sm font-semibold text-[#C9A15A] hover:text-[#113F48] transition-colors group/link"
                >
                  Learn More
                  <ArrowRight className="ml-1 h-4 w-4 group-hover/link:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS SECTION ── */}
      <section className="py-20 bg-[#F9FAFB] border-t border-stone-100">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C9A15A] bg-[#C9A15A]/10 px-3 py-1.5 rounded-full border border-[#C9A15A]/20 inline-block">
              How It Works
            </span>
            <h2 className="text-3xl font-bold text-[#113F48] sm:text-4xl">
              Three Steps to Medicare Clarity
            </h2>
            <p className="text-stone-600">
              Our platform is designed to walk you through the Medicare decision process from confusion to confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line (desktop) */}
            <div className="hidden md:block absolute top-10 left-1/6 right-1/6 h-px bg-stone-200" />

            {howItWorksSteps.map((step, idx) => (
              <div key={step.number} className="relative flex flex-col items-center text-center space-y-5">
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-[#113F48] rounded-2xl flex items-center justify-center shadow-lg shadow-[#113F48]/15">
                    {step.icon}
                  </div>
                  <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-[#C9A15A] text-white text-xs font-extrabold flex items-center justify-center shadow">
                    {idx + 1}
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-[#113F48]">{step.title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-8 py-4 font-semibold text-white bg-[#C9A15A] hover:bg-[#B58F4E] rounded-xl transition-all shadow-lg shadow-[#C9A15A]/15"
            >
              Start Reading Guides
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US / TRUST SECTION ── */}
      <section className="py-20 bg-white border-t border-stone-100">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C9A15A] bg-[#C9A15A]/10 px-3 py-1.5 rounded-full border border-[#C9A15A]/20 inline-block">
              Why MediGuide Hub
            </span>
            <h2 className="text-3xl font-bold text-[#113F48] sm:text-4xl">
              Why Thousands Trust Us
            </h2>
            <p className="text-stone-600">
              We hold ourselves to the highest standards of accuracy, objectivity, and transparency.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 mb-12">
            {trustPoints.map((p) => (
              <div key={p.title} className="premium-card p-7 space-y-4 group">
                <div className="bg-[#F9FAFB] w-12 h-12 rounded-xl flex items-center justify-center border border-stone-200 group-hover:border-[#C9A15A]/50 transition-colors">
                  {p.icon}
                </div>
                <h3 className="font-bold text-[#113F48]">{p.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

          {/* Disclaimer bar */}
          <div className="bg-[#F9FAFB] border border-stone-200 rounded-2xl p-6 text-center text-sm text-stone-500 w-full mx-auto">
            <strong className="text-[#113F48]">Disclaimer:</strong> This website provides educational information only and is not a substitute for personalized professional guidance. We are an independent informational resource.
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS SECTION ── */}
      <section className="py-20 bg-[#F9FAFB] border-t border-stone-100">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C9A15A] bg-[#C9A15A]/10 px-3 py-1.5 rounded-full border border-[#C9A15A]/20 inline-block">
              Reader Stories
            </span>
            <h2 className="text-3xl font-bold text-[#113F48] sm:text-4xl">What Beneficiaries Say</h2>
            <p className="text-stone-600">Real feedback from readers navigating Medicare using our platform.</p>
          </div>

          {/* Desktop: 3 grid */}
          <div className="hidden md:grid grid-cols-3 gap-7">
            {INITIAL_TESTIMONIALS.slice(0, 3).map((t, idx) => (
              <div
                key={t.id}
                className={`bg-white p-8 rounded-2xl border shadow-sm space-y-4 transition-all duration-300 ${activeTestimonial === idx ? "border-[#C9A15A] shadow-md" : "border-stone-200"}`}
              >
                <div className="flex text-amber-400 gap-0.5">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-stone-600 italic text-sm leading-relaxed">&ldquo;{t.content}&rdquo;</p>
                <div className="flex items-center gap-3 pt-2 border-t border-stone-100">
                  <div className="w-9 h-9 rounded-full bg-[#113F48] flex items-center justify-center text-white text-xs font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#113F48]">{t.name}</h4>
                    <p className="text-xs text-stone-400 mt-0.5">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: Carousel */}
          <div className="md:hidden">
            <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm space-y-4">
              <div className="flex text-amber-400 gap-0.5">
                {[...Array(INITIAL_TESTIMONIALS[activeTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="text-stone-600 italic text-sm leading-relaxed">&ldquo;{INITIAL_TESTIMONIALS[activeTestimonial].content}&rdquo;</p>
              <div className="flex items-center gap-3 pt-2 border-t border-stone-100">
                <div className="w-9 h-9 rounded-full bg-[#113F48] flex items-center justify-center text-white text-xs font-bold">
                  {INITIAL_TESTIMONIALS[activeTestimonial].name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#113F48]">{INITIAL_TESTIMONIALS[activeTestimonial].name}</h4>
                  <p className="text-xs text-stone-400 mt-0.5">{INITIAL_TESTIMONIALS[activeTestimonial].role}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-2 mt-5">
              {INITIAL_TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`w-2 h-2 rounded-full transition-all ${activeTestimonial === i ? "bg-[#C9A15A] w-5" : "bg-stone-300"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PLAN FINDER WIZARD ── */}
      <section id="plan-finder" className="py-20 bg-white border-t border-stone-100">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C9A15A] bg-[#C9A15A]/10 px-3 py-1.5 rounded-full border border-[#C9A15A]/20 inline-block">
              Interactive Tool
            </span>
            <h2 className="text-3xl font-bold text-[#113F48]">Medicare Recommendation Wizard</h2>
            <p className="text-stone-600">Answer two quick questions to see which Medicare path fits your needs.</p>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 p-8 md:p-10 shadow-lg relative overflow-hidden">
            {/* Progress bar */}
            <div className="w-full bg-stone-100 rounded-full h-1.5 mb-8">
              <div
                className="bg-[#C9A15A] h-1.5 rounded-full transition-all duration-500"
                style={{ width: step === 1 ? "33%" : step === 2 ? "66%" : "100%" }}
              />
            </div>

            {step === 1 && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-[#113F48]">Step 1: What is your age eligibility?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { label: "Under 65", sub: "Disability or special condition", val: "under-65" },
                    { label: "Turning 65 Soon", sub: "Within the next 3 months", val: "turning-65" },
                    { label: "Over 65", sub: "Already Medicare eligible", val: "over-65" },
                  ].map((o) => (
                    <button
                      key={o.val}
                      onClick={() => { setAge(o.val); setStep(2); }}
                      className="p-6 text-center border-2 border-stone-200 hover:border-[#C9A15A] hover:bg-[#F9FAFB] rounded-xl transition-all group"
                    >
                      <span className="font-bold text-[#113F48] group-hover:text-[#C9A15A] block">{o.label}</span>
                      <span className="text-xs text-stone-500 mt-1 block">{o.sub}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <button onClick={() => setStep(1)} className="text-[#C9A15A] hover:underline text-sm font-semibold">
                  ← Back to Step 1
                </button>
                <h3 className="text-xl font-bold text-[#113F48]">Step 2: What is your primary priority?</h3>
                <form onSubmit={handleFindPlan} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { label: "Doctor Choice", sub: "See any doctor nationwide", val: "flexibility" },
                      { label: "Low Cost / Extra Perks", sub: "HMO/PPO dental & vision", val: "all-in-one" },
                      { label: "Drug Coverage", sub: "Reduce prescription costs", val: "drugs" },
                    ].map((o) => (
                      <label
                        key={o.val}
                        className={`p-6 text-center border-2 rounded-xl cursor-pointer transition-all flex flex-col items-center justify-center ${
                          priority === o.val ? "border-[#C9A15A] bg-[#F9FAFB] text-[#113F48]" : "border-stone-200 hover:border-[#C9A15A]"
                        }`}
                      >
                        <input type="radio" name="priority" value={o.val} className="sr-only" onChange={() => setPriority(o.val)} />
                        <span className="font-bold text-sm">{o.label}</span>
                        <span className="text-xs text-stone-500 mt-1">{o.sub}</span>
                      </label>
                    ))}
                  </div>
                  <button
                    type="submit"
                    disabled={!priority}
                    className="w-full bg-[#113F48] text-white py-4 hover:bg-[#C9A15A] rounded-xl transition-all font-semibold disabled:opacity-50 shadow-md"
                  >
                    View My Recommendation
                  </button>
                </form>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 text-center">
                <div className="bg-[#F9FAFB] p-6 rounded-xl border border-stone-200 text-[#113F48] text-left">
                  <h4 className="font-bold text-[#C9A15A] text-lg mb-2">Our Educational Recommendation:</h4>
                  <p className="leading-relaxed text-sm">{recommendation}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/blog" className="bg-[#113F48] text-white px-6 py-3.5 hover:bg-[#C9A15A] rounded-xl font-semibold transition-all text-sm shadow-md">
                    Read Detailed Guides
                  </Link>
                  <button onClick={resetWizard} className="border border-stone-200 text-[#113F48] hover:border-[#C9A15A] px-6 py-3.5 rounded-xl font-semibold transition-all text-sm">
                    Start Over
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── LATEST BLOG POSTS ── */}
      <section className="py-20 bg-[#F9FAFB] border-t border-stone-100">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-[#113F48]">Latest Medicare Guides</h2>
              <p className="text-stone-600 mt-1">High-quality articles verified by healthcare policy advisors.</p>
            </div>
            <Link href="/blog" className="flex items-center text-[#C9A15A] hover:text-[#113F48] font-semibold text-sm transition-colors group">
              See All Articles <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <article key={post.slug} className="premium-card flex flex-col overflow-hidden bg-white">
                <img src={post.featuredImage} alt={post.title} className="h-48 w-full object-cover border-b border-stone-100" />
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div className="space-y-3">
                    <span className="text-xs font-semibold text-[#C9A15A] uppercase tracking-wider bg-[#C9A15A]/10 px-2.5 py-1 rounded-md border border-[#C9A15A]/20">
                      {post.category}
                    </span>
                    <h3 className="font-bold text-lg text-[#113F48] hover:text-[#C9A15A] transition-colors leading-snug">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="text-stone-500 text-sm line-clamp-3">{post.summary}</p>
                  </div>
                  <div className="pt-5 border-t border-stone-100 flex items-center justify-between mt-5 text-xs text-stone-400">
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{post.readTime}</span>
                    <span>{post.publishedAt}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ── */}
      <section id="faq" className="py-20 bg-white border-t border-stone-100">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C9A15A] bg-[#C9A15A]/10 px-3 py-1.5 rounded-full border border-[#C9A15A]/20 inline-block">
              FAQ
            </span>
            <h2 className="text-3xl font-bold text-[#113F48]">Frequently Asked Questions</h2>
            <p className="text-stone-600">Answers to the most common inquiries about Medicare enrollment and regulations.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => {
              const isOpen = activeFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`border rounded-xl overflow-hidden transition-all ${isOpen ? "border-[#C9A15A] shadow-sm" : "border-stone-200"}`}
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : faq.id)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none bg-white hover:bg-[#F9FAFB] transition-colors"
                  >
                    <span className="font-semibold text-[#113F48] text-base pr-4">{faq.question}</span>
                    <ChevronDown className={`h-5 w-5 text-[#C9A15A] transition-transform flex-shrink-0 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 text-stone-600 text-sm leading-relaxed border-t border-stone-100 pt-4 bg-white">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <p className="text-stone-500 text-sm mb-4">Still have questions? We&apos;re here to help.</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 font-semibold text-white bg-[#113F48] hover:bg-[#C9A15A] rounded-xl transition-all shadow-md"
            >
              <PhoneCall className="h-4 w-4" />
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-20 bg-[#113F48]">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-7">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold uppercase tracking-wider text-[#C9A15A]">
            We&apos;re Here to Help
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
            Still Confused About Your{" "}
            <span className="text-[#C9A15A]">Medicare Options?</span>
          </h2>
          <p className="text-stone-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Our team of Medicare education specialists reviews every question personally. Send us your situation and we&apos;ll point you to the right resources — completely free of charge.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold text-[#113F48] bg-[#C9A15A] hover:bg-[#B58F4E] rounded-xl transition-all shadow-lg text-base"
            >
              <PhoneCall className="h-5 w-5" />
              Contact Our Team
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all text-base"
            >
              Browse All Guides
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
          <p className="text-stone-400 text-xs">
            No sales pitch. No insurance quotes. Purely educational guidance.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
