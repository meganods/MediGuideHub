"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { 
  HeartPulse, 
  ShieldCheck, 
  BookOpen, 
  Eye, 
  ArrowRight, 
  Award, 
  Lock, 
  Mail, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  FileText, 
  Compass, 
  ShieldAlert, 
  Activity, 
  Scale, 
  Sparkles 
} from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      icon: <CheckCircle2 className="h-6 w-6 text-[#C9A15A]" />,
      title: "Accuracy",
      desc: "We verify every fact, stat, and reference with primary medical literature and public health agency records.",
    },
    {
      icon: <Eye className="h-6 w-6 text-[#C9A15A]" />,
      title: "Transparency",
      desc: "Our editorial process and funding sources are completely open. We operate with zero insurance company bias.",
    },
    {
      icon: <BookOpen className="h-6 w-6 text-[#C9A15A]" />,
      title: "Accessibility",
      desc: "We break down complex medical terms and insurance jargon into clear, plain-language resources.",
    },
    {
      icon: <Lock className="h-6 w-6 text-[#C9A15A]" />,
      title: "Privacy",
      desc: "We prioritize user privacy and employ secure data protection protocols to keep your browsing experience safe.",
    },
    {
      icon: <Scale className="h-6 w-6 text-[#C9A15A]" />,
      title: "Integrity",
      desc: "We make independent editorial decisions focused entirely on the educational welfare of our readers.",
    },
    {
      icon: <Sparkles className="h-6 w-6 text-[#C9A15A]" />,
      title: "Continuous Improvement",
      desc: "Medicare guidelines, policy rules, and medical practices update constantly. We update our articles regularly.",
    },
  ];

  const offers = [
    {
      icon: <FileText className="h-5 w-5 text-[#113F48]" />,
      title: "Health Articles",
      desc: "Comprehensive guides covering healthcare updates, wellness tips, and medical conditions.",
    },
    {
      icon: <Compass className="h-5 w-5 text-[#113F48]" />,
      title: "Medical Resources",
      desc: "Hand-curated directories, tools, and databases to help you connect with care.",
    },
    {
      icon: <Activity className="h-5 w-5 text-[#113F48]" />,
      title: "Preventive Care Guides",
      desc: "Practical checklists and guides to keep you proactive about screen-testing and wellness.",
    },
    {
      icon: <ShieldAlert className="h-5 w-5 text-[#113F48]" />,
      title: "Health Plan Education",
      desc: "Clear explanations of coverage types, plan rules, and premium options.",
    },
    {
      icon: <HeartPulse className="h-5 w-5 text-[#113F48]" />,
      title: "Prescription Information",
      desc: "Guides to understanding formulary tiers, generic alternatives, and cost savings.",
    },
    {
      icon: <Award className="h-5 w-5 text-[#113F48]" />,
      title: "Healthcare Awareness",
      desc: "Resources to boost public health literacy and help patients navigate healthcare with confidence.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-grow">
        
        {/* ── HERO SECTION ── */}
        <section className="relative py-20 bg-white overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A15A]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Column */}
              <div className="lg:col-span-7 space-y-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#C9A15A] bg-[#C9A15A]/10 px-3 py-1.5 rounded-full border border-[#C9A15A]/20 inline-block">
                  About MediGuideHub
                </span>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-[#113F48] leading-tight">
                  Demystifying Healthcare For a Healthier Tomorrow
                </h1>
                <p className="text-lg text-stone-600 leading-relaxed">
                  Helping people make informed healthcare decisions through trusted educational resources, expert-reviewed content, and easy-to-understand health information.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Link 
                    href="/blog" 
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 font-semibold text-white bg-[#113F48] hover:bg-[#C9A15A] rounded-xl transition-all shadow-md text-sm"
                  >
                    Explore Health Resources <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link 
                    href="/contact" 
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 font-semibold text-[#113F48] bg-white hover:bg-[#F9FAFB] border border-stone-200 hover:border-[#C9A15A] rounded-xl transition-all text-sm"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
              
              {/* Right Column (Illustration / Image) */}
              <div className="lg:col-span-5 relative hidden lg:block max-w-xl ml-auto mr-0">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#113F48]/10 to-[#C9A15A]/10 rounded-[2.5rem] transform translate-x-4 translate-y-4" />
                <img 
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000" 
                  alt="Professional healthcare educational illustration" 
                  className="relative rounded-[2.5rem] w-full h-auto object-cover shadow-2xl border border-stone-100"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── OUR STORY ── */}
        <section className="py-16 bg-[#F9FAFB] border-t border-stone-200">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="text-3xl font-extrabold text-[#113F48] text-center">Our Story</h2>
              <div className="prose prose-stone max-w-none text-stone-600 space-y-4 text-sm leading-relaxed">
                <p>
                  MediGuideHub was founded by healthcare policy advocates and communications experts who observed a growing problem: the public is regularly overwhelmed by dense medical jargon and complicated health insurance rules. Finding objective, plain-language health information was increasingly difficult.
                </p>
                <p>
                  We created this platform to bridge the gap between complex health systems and the individuals who rely on them. Our focus is centered on absolute transparency, educational independence, and universal accessibility. We do not sell insurance or medical services, enabling us to keep our information clear, free from outside bias, and entirely educational.
                </p>
                <p>
                  By structuring topics into clear guides, we aim to reduce the confusion around preventive care, prescription rules, and health coverage, allowing patients and their families to focus on wellness instead of administration.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── MISSION & VISION ── */}
        <section className="py-20 bg-white border-t border-stone-200">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              
              {/* Mission Card */}
              <div className="bg-[#F9FAFB] border border-stone-200 rounded-2xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-[#C9A15A]/10 w-12 h-12 rounded-xl flex items-center justify-center border border-[#C9A15A]/20">
                  <HeartPulse className="h-6 w-6 text-[#C9A15A]" />
                </div>
                <h3 className="text-2xl font-bold text-[#113F48]">Our Mission</h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Provide accurate, accessible, and easy-to-understand healthcare information that empowers individuals and families to make informed healthcare decisions.
                </p>
              </div>

              {/* Vision Card */}
              <div className="bg-[#F9FAFB] border border-stone-200 rounded-2xl p-8 space-y-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-[#113F48]/10 w-12 h-12 rounded-xl flex items-center justify-center border border-[#113F48]/20">
                  <Compass className="h-6 w-6 text-[#113F48]" />
                </div>
                <h3 className="text-2xl font-bold text-[#113F48]">Our Vision</h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  To become one of the most trusted educational healthcare platforms by delivering reliable information and improving health literacy worldwide.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ── CORE VALUES ── */}
        <section className="py-20 bg-[#F9FAFB] border-t border-stone-200">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
              <h2 className="text-3xl font-extrabold text-[#113F48]">Our Core Values</h2>
              <p className="text-stone-600 text-sm">The operating principles that guide our editorial team and platform decisions.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {values.map((v) => (
                <div key={v.title} className="bg-white border border-stone-200 rounded-2xl p-7 shadow-sm hover:shadow-md transition-all duration-300 space-y-4">
                  <div className="bg-[#F9FAFB] w-12 h-12 rounded-xl flex items-center justify-center border border-stone-200">
                    {v.icon}
                  </div>
                  <h3 className="font-bold text-lg text-[#113F48]">{v.title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHAT WE OFFER ── */}
        <section className="py-20 bg-white border-t border-stone-200">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
              <h2 className="text-3xl font-extrabold text-[#113F48]">What We Offer</h2>
              <p className="text-stone-600 text-sm">Educational tools and resources crafted to support your wellness journey.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {offers.map((o) => (
                <div key={o.title} className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm hover:border-[#C9A15A] transition-colors duration-300 space-y-3">
                  <div className="bg-[#113F48]/5 w-10 h-10 rounded-lg flex items-center justify-center">
                    {o.icon}
                  </div>
                  <h3 className="font-bold text-[#113F48]">{o.title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">{o.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── EDITORIAL STANDARDS ── */}
        <section className="py-20 bg-[#F9FAFB] border-t border-stone-200">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="text-center space-y-3">
                <h2 className="text-3xl font-extrabold text-[#113F48]">Editorial Standards</h2>
                <p className="text-stone-600 text-sm">How we maintain E-E-A-T guidelines across all published guides.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Peer-Reviewed Preparation",
                    desc: "Every article undergoes strict internal review before publishing to verify all medical or regulatory metrics."
                  },
                  {
                    title: "Regular Content Updates",
                    desc: "We monitor healthcare rules annually and review all guidelines dynamically to ensure updates stay current."
                  },
                  {
                    title: "Strictly Educational Focus",
                    desc: "Our platform provides informational resources only, refraining from backing specific commercial insurers."
                  },
                  {
                    title: "Verifiable Public Sources",
                    desc: "We reference official national medical libraries, state portals, and peer-reviewed journals when applicable."
                  },
                  {
                    title: "No Exaggerated Medical Claims",
                    desc: "We do not host or present unsupported health claims, diagnostic opinions, or cure promotions."
                  },
                  {
                    title: "Unbiased Content Creation",
                    desc: "Our writing team is separate from commercial sponsors, ensuring editorial independence."
                  }
                ].map((std, i) => (
                  <div key={i} className="bg-white border border-stone-200 rounded-xl p-5 space-y-2 shadow-sm">
                    <h4 className="font-bold text-[#113F48] flex items-center gap-2">
                      <CheckCircle2 className="h-4.5 w-4.5 text-[#C9A15A] flex-shrink-0" />
                      {std.title}
                    </h4>
                    <p className="text-stone-500 text-xs leading-relaxed">{std.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── MEDICAL DISCLAIMER ── */}
        <section className="py-14 bg-white border-t border-stone-200">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-amber-50/50 border border-amber-200 rounded-2xl p-6 sm:p-8 flex items-start gap-4 shadow-sm">
              <ShieldAlert className="h-6 w-6 text-[#C9A15A] flex-shrink-0 mt-0.5" />
              <div className="space-y-2">
                <h3 className="font-bold text-[#113F48] text-base">Medical Disclaimer</h3>
                <p className="text-stone-600 text-sm leading-relaxed font-medium">
                  The information provided on MediGuideHub is intended for educational purposes only and should not be considered medical advice. Always consult a qualified healthcare professional regarding any medical condition or treatment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── PRIVACY COMMITMENT ── */}
        <section className="py-16 bg-[#F9FAFB] border-t border-stone-200">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-6 text-center">
              <h2 className="text-2xl font-bold text-[#113F48]">Privacy Commitment</h2>
              <p className="text-stone-600 text-sm leading-relaxed">
                At MediGuideHub, we believe your health inquiries are strictly personal. We use high-grade security configurations and secure HTTPS connections to safeguard your browsing experience. We do not sell user data or lease personal profiles, adhering strictly to secure data handling standards.
              </p>
            </div>
          </div>
        </section>

        {/* ── CONTACT SECTION ── */}
        <section className="py-16 bg-white border-t border-stone-200">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-stone-50 border border-stone-200 rounded-2xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-[#113F48]">Get in Touch</h3>
                <p className="text-stone-500 text-sm leading-relaxed">
                  Have questions about our editorial standards, feedback on our content, or general inquiries? Our team is ready to respond.
                </p>
                <div className="space-y-2.5 text-sm text-stone-600">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-[#C9A15A] flex-shrink-0" />
                    <span>support@mediguidehub.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[#C9A15A] flex-shrink-0" />
                    <span>Monday – Saturday (9:00 AM – 6:00 PM)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#C9A15A] flex-shrink-0" />
                    <span>New Delhi, India</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-start md:justify-end">
                <Link 
                  href="/contact" 
                  className="inline-flex items-center gap-2 px-8 py-4 font-semibold text-white bg-[#113F48] hover:bg-[#C9A15A] rounded-xl transition-all shadow-md text-sm"
                >
                  Contact Page Button <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── BOTTOM CTA ── */}
        <section className="py-20 bg-[#113F48] text-white">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 max-w-4xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Ready to Explore Reliable Healthcare Information?
            </h2>
            <p className="text-stone-300 max-w-md mx-auto text-sm">
              Discover generic alternative savings, preventive checklists, and verified clinical guides.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
              <Link 
                href="/blog" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold text-[#113F48] bg-white hover:bg-stone-50 rounded-xl transition-all text-sm shadow-md"
              >
                Browse Articles
              </Link>
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold text-white bg-[#C9A15A] hover:bg-[#B58F4E] rounded-xl transition-all text-sm"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
