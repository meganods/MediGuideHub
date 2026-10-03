import React from "react";
import type { Metadata } from "next";
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
  Users,
  Search,
  RefreshCw
} from "lucide-react";

export const metadata: Metadata = {
  title: "About mediguide4u | Medical Literacy & Editorial Standards",
  description:
    "Learn about mediguide4u, our mission, vision, story, editorial research methodology, source selection standards, and commitment to accessible health literacy.",
  alternates: {
    canonical: "https://www.mediguide4u.com/about",
  },
  openGraph: {
    title: "About mediguide4u | Medical Literacy & Editorial Standards",
    description:
      "Learn about mediguide4u, our mission, vision, story, editorial research methodology, source selection standards, and commitment to accessible health literacy.",
    url: "https://www.mediguide4u.com/about",
    siteName: "mediguide4u",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About mediguide4u | Medical Literacy & Editorial Standards",
    description:
      "Learn about mediguide4u, our mission, vision, story, editorial research methodology, source selection standards, and commitment to accessible health literacy.",
  },
};

export default function AboutPage() {
  const values = [
    {
      icon: <CheckCircle2 className="h-6 w-6 text-[#C9A15A]" />,
      title: "Clinically Researched",
      desc: "We build our guides on reputable public health research, synthesizing information from institutions like the NIH, CDC, and WHO.",
    },
    {
      icon: <Eye className="h-6 w-6 text-[#C9A15A]" />,
      title: "Complete Transparency",
      desc: "Our editorial process, source citations, and educational scope are clearly disclosed. We host no undisclosed sponsorships.",
    },
    {
      icon: <BookOpen className="h-6 w-6 text-[#C9A15A]" />,
      title: "Universal Accessibility",
      desc: "We translate complex medical terminology into clear, structured, and easy-to-understand plain language for all readers.",
    },
    {
      icon: <Lock className="h-6 w-6 text-[#C9A15A]" />,
      title: "Privacy First",
      desc: "We respect your digital privacy. We do not require personal medical details, sell user data, or track health queries.",
    },
    {
      icon: <Scale className="h-6 w-6 text-[#C9A15A]" />,
      title: "Editorial Independence",
      desc: "Our writing and research decisions are made independently without commercial influence or pharmaceutical promotion.",
    },
    {
      icon: <RefreshCw className="h-6 w-6 text-[#C9A15A]" />,
      title: "Continuous Updates",
      desc: "Health guidelines evolve. We regularly review and refresh published guides to reflect updated medical consensus.",
    },
  ];

  const whatWeOffer = [
    {
      icon: <FileText className="h-5 w-5 text-[#113F48]" />,
      title: "Doctor-Reviewed Health Guides",
      desc: "In-depth educational articles covering vital signs, symptoms, nutrition science, and common health conditions.",
    },
    {
      icon: <Activity className="h-5 w-5 text-[#113F48]" />,
      title: "Preventive Wellness Strategies",
      desc: "Practical lifestyle strategies, dietary guidelines, and routine screening recommendations to support long-term wellness.",
    },
    {
      icon: <HeartPulse className="h-5 w-5 text-[#113F48]" />,
      title: "Condition Awareness Resources",
      desc: "Comprehensive overviews of prevalent conditions like hypertension, anemia, and vitamin deficiencies.",
    },
    {
      icon: <Compass className="h-5 w-5 text-[#113F48]" />,
      title: "Health Literacy Tools",
      desc: "Clear explanations of medical metrics, lab values, and diagnostic concepts to empower informed patient conversations.",
    },
  ];

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About mediguide4u",
    "description": "Information about mediguide4u's educational mission, health literacy objectives, editorial research methodology, and medically-reviewed standards.",
    "url": "https://www.mediguide4u.com/about",
    "mainEntity": {
      "@type": "MedicalOrganization",
      "name": "mediguide4u",
      "url": "https://www.mediguide4u.com",
      "logo": "https://www.mediguide4u.com/logo.png",
      "description": "An independent educational publication dedicated to improving public healthcare literacy through doctor-reviewed clinical guides."
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.mediguide4u.com",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "About Us",
        "item": "https://www.mediguide4u.com/about",
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="flex-grow">
        
        {/* ── HERO SECTION ── */}
        <section className="relative py-20 bg-gradient-to-b from-stone-50 to-white overflow-hidden border-b border-stone-100">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="space-y-6 max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C9A15A] bg-[#C9A15A]/10 px-3 py-1.5 rounded-full border border-[#C9A15A]/20 inline-block">
                About mediguide4u
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-[#113F48] leading-tight">
                Empowering Health Literacy Through Clear, Medically-Reviewed Guidance
              </h1>
              <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
                mediguide4u is an independent educational platform dedicated to making health, nutrition, and preventive wellness information understandable, transparent, and freely accessible to everyone.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link 
                  href="/blog" 
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 font-bold text-white bg-[#113F48] hover:bg-[#C9A15A] rounded-xl transition-all shadow-md text-sm"
                >
                  Explore Healthcare Guides <ArrowRight className="h-4 w-4" />
                </Link>
                <Link 
                  href="/editorial-policy" 
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 font-semibold text-[#113F48] bg-white hover:bg-stone-50 border border-stone-200 hover:border-[#C9A15A] rounded-xl transition-all text-sm"
                >
                  Read Editorial Standards
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── OUR STORY ── */}
        <section className="py-16 bg-[#F9FAFB] border-b border-stone-100">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="text-center space-y-2">
                <span className="text-xs font-bold text-[#C9A15A] uppercase tracking-wider">Background &amp; Origin</span>
                <h2 className="text-3xl font-extrabold text-[#113F48]">Our Story</h2>
              </div>
              <div className="bg-white border border-stone-200 rounded-2xl p-8 sm:p-10 space-y-4 text-stone-600 text-sm leading-relaxed shadow-sm">
                <p>
                  mediguide4u was founded by health communication advocates who observed a persistent challenge: the general public is constantly overwhelmed by dense clinical terminology, conflicting online claims, and aggressive commercial marketing. Finding objective, plain-language health information was becoming increasingly difficult.
                </p>
                <p>
                  We created this platform to bridge the gap between complex health science and everyday individuals seeking clear answers. Our focus is grounded in transparency, clinical rigor, and universal accessibility.
                </p>
                <p>
                  By structuring topics into clear, digestible guides, we aim to reduce the confusion surrounding preventive care, nutrient deficiencies, and wellness strategies, empowering individuals and families to take proactive control of their well-being.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── OUR MISSION & VISION ── */}
        <section className="py-16 bg-white border-b border-stone-100">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              
              {/* Mission Card */}
              <div className="bg-[#FDFBF7] border border-stone-200 rounded-2xl p-8 sm:p-10 space-y-4 shadow-2xs hover:shadow-md transition-shadow">
                <div className="bg-[#C9A15A]/10 w-12 h-12 rounded-xl flex items-center justify-center border border-[#C9A15A]/20">
                  <HeartPulse className="h-6 w-6 text-[#C9A15A]" />
                </div>
                <h3 className="text-2xl font-bold text-[#113F48]">Our Mission</h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Provide accurate, accessible, and easy-to-understand healthcare information that empowers individuals and families to make informed healthcare decisions.
                </p>
              </div>

              {/* Vision Card */}
              <div className="bg-[#FDFBF7] border border-stone-200 rounded-2xl p-8 sm:p-10 space-y-4 shadow-2xs hover:shadow-md transition-shadow">
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

        {/* ── WHAT IS MEDIGUIDE4U ── */}
        <section className="py-16 bg-[#F9FAFB] border-b border-stone-100">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl space-y-8">
            <div className="max-w-4xl mx-auto space-y-4">
              <span className="text-xs font-bold text-[#C9A15A] uppercase tracking-wider">Our Organization</span>
              <h2 className="text-3xl font-extrabold text-[#113F48]">What is mediguide4u?</h2>
              <div className="prose prose-stone text-stone-600 text-sm leading-relaxed space-y-4">
                <p>
                  <strong>mediguide4u</strong> is an independent digital health education resource. Navigating modern healthcare information can be daunting: clinical studies are often laden with complex terminology, and online queries frequently lead to product pitches or alarmist claims.
                </p>
                <p>
                  We exist to provide a reliable, objective alternative. Our team synthesizes established public health consensus into organized, plain-language guides that help readers better understand their bodies, preventive wellness strategies, nutrition principles, and medical concepts.
                </p>
                <p>
                  We operate with strict editorial independence. We do not sell medications, medical devices, or insurance policies, enabling us to keep our information focused exclusively on public education.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHO CREATES THE CONTENT & RESEARCH METHODOLOGY ── */}
        <section className="py-16 bg-white border-b border-stone-100">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold text-[#C9A15A] uppercase tracking-wider">Editorial Integrity</span>
              <h2 className="text-3xl font-extrabold text-[#113F48]">How Our Content is Created &amp; Researched</h2>
              <p className="text-stone-600 text-sm">
                Transparency regarding who produces our content and how we verify medical references.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Who Creates */}
              <div className="bg-[#FDFBF7] border border-stone-200 rounded-2xl p-7 space-y-4 shadow-sm">
                <div className="bg-[#113F48]/10 w-12 h-12 rounded-xl flex items-center justify-center text-[#113F48]">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-[#113F48]">Who Creates Our Content</h3>
                <p className="text-stone-500 text-sm leading-relaxed">
                  Articles on mediguide4u are produced by the <strong>Mediguide4u Editorial Staff</strong> — a dedicated team of health researchers, medical writers, and content editors focused on science communication and public health literacy.
                </p>
              </div>

              {/* How Content is Researched */}
              <div className="bg-[#FDFBF7] border border-stone-200 rounded-2xl p-7 space-y-4 shadow-sm">
                <div className="bg-[#C9A15A]/10 w-12 h-12 rounded-xl flex items-center justify-center text-[#C9A15A]">
                  <Search className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-[#113F48]">How Content is Researched</h3>
                <p className="text-stone-500 text-sm leading-relaxed">
                  Our writers review published literature, national health guidelines, and public databases. Concepts are structured into clear sections, verified for accuracy, and double-checked against clinical consensus.
                </p>
              </div>

              {/* Source Selection */}
              <div className="bg-[#FDFBF7] border border-stone-200 rounded-2xl p-7 space-y-4 shadow-sm">
                <div className="bg-[#113F48]/10 w-12 h-12 rounded-xl flex items-center justify-center text-[#113F48]">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-[#113F48]">How Sources Are Selected</h3>
                <p className="text-stone-500 text-sm leading-relaxed">
                  We prioritize primary sources including the <strong>National Institutes of Health (NIH)</strong>, <strong>CDC</strong>, <strong>World Health Organization (WHO)</strong>, <strong>PubMed</strong>, and medically-reviewed journals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHAT WE OFFER ── */}
        <section className="py-16 bg-[#F9FAFB] border-b border-stone-100">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold text-[#C9A15A] uppercase tracking-wider">Educational Focus</span>
              <h2 className="text-3xl font-extrabold text-[#113F48]">What We Offer</h2>
              <p className="text-stone-600 text-sm">
                Educational guides and resources crafted to support your wellness literacy journey.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {whatWeOffer.map((item, idx) => (
                <div key={idx} className="bg-white border border-stone-200 rounded-2xl p-6 space-y-3 shadow-2xs hover:shadow-md hover:border-[#C9A15A]/60 transition-all">
                  <div className="bg-[#113F48]/5 w-10 h-10 rounded-xl flex items-center justify-center text-[#113F48]">
                    {item.icon}
                  </div>
                  <h4 className="font-bold text-base text-[#113F48]">{item.title}</h4>
                  <p className="text-xs text-stone-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CORE VALUES ── */}
        <section className="py-20 bg-white border-b border-stone-100">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold text-[#C9A15A] uppercase tracking-wider">Our Standards</span>
              <h2 className="text-3xl font-extrabold text-[#113F48]">Our Core Guiding Principles</h2>
              <p className="text-stone-600 text-sm">The values that inform every article, update, and platform decision.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((v) => (
                <div key={v.title} className="bg-[#FDFBF7] border border-stone-200 rounded-2xl p-7 shadow-2xs hover:shadow-md hover:border-[#C9A15A]/60 transition-all space-y-3.5">
                  <div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center border border-stone-200 shadow-2xs">
                    {v.icon}
                  </div>
                  <h3 className="font-bold text-lg text-[#113F48]">{v.title}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MEDICAL DISCLAIMER BANNER ── */}
        <section className="py-12 bg-[#FDFBF7] border-b border-stone-100">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-6 sm:p-8 flex items-start gap-4 shadow-sm">
              <ShieldAlert className="h-6 w-6 text-[#C9A15A] flex-shrink-0 mt-0.5" />
              <div className="space-y-2">
                <h3 className="font-bold text-[#113F48] text-base">Educational Medical Disclaimer</h3>
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                  All content hosted on mediguide4u is provided solely for educational and health awareness purposes. Nothing published here constitutes diagnostic medical opinions, clinical care advice, or treatment prescriptions. Always seek the advice of your physician or qualified healthcare provider with any questions regarding personal health conditions.
                </p>
                <Link href="/medical-disclaimer" className="text-xs font-bold text-[#C9A15A] hover:underline inline-block mt-1">
                  Read Full Medical Disclaimer &rarr;
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTACT SECTION ── */}
        <section className="py-16 bg-white border-b border-stone-100">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="bg-[#F9FAFB] border border-stone-200 rounded-2xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center shadow-sm">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-[#113F48]">Get in Touch</h3>
                <p className="text-stone-500 text-xs sm:text-sm leading-relaxed">
                  Have feedback, questions about our editorial research process, or content suggestions? Our team is available to help.
                </p>
                <div className="space-y-2.5 text-xs sm:text-sm text-stone-600">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-[#C9A15A] flex-shrink-0" />
                    <span>support@mediguide4u.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[#C9A15A] flex-shrink-0" />
                    <span>Monday – Saturday (9:00 AM – 6:00 PM IST)</span>
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
                  className="inline-flex items-center gap-2 px-8 py-4 font-bold text-white bg-[#113F48] hover:bg-[#C9A15A] rounded-xl transition-all shadow-md text-sm"
                >
                  Contact Our Team <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── BOTTOM CTA ── */}
        <section className="py-20 bg-[#113F48] text-white">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 max-w-4xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Explore Our Healthcare Knowledge Base
            </h2>
            <p className="text-stone-300 max-w-md mx-auto text-xs sm:text-sm">
              Discover clear guides on preventive wellness, nutrient deficiencies, and cardiovascular care.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
              <Link 
                href="/blog" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 font-bold text-[#113F48] bg-white hover:bg-stone-50 rounded-xl transition-all text-sm shadow-md"
              >
                Browse Health Guides
              </Link>
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 font-bold text-white bg-[#C9A15A] hover:bg-[#B58F4E] rounded-xl transition-all text-sm"
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
