import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { EDITORIAL_PROFILES, MEDICAL_REVIEWERS } from "@/lib/mockData";
import { getPublishedBlogPosts } from "@/lib/db";
import { 
  Users, 
  ShieldCheck, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  FileText,
  Scale,
  Award,
  Stethoscope,
  Sparkles
} from "lucide-react";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Editorial Board & Medical Review Team | mediguide4u",
  description:
    "Meet the board-certified physicians, clinical researchers, and health writers behind mediguide4u. Learn about our medical review process and editorial guidelines.",
  alternates: {
    canonical: "https://mediguide4u.com/authors",
  },
  openGraph: {
    title: "Editorial Board & Medical Review Team | mediguide4u",
    description:
      "Meet the board-certified physicians, clinical researchers, and health writers behind mediguide4u. Learn about our medical review process and editorial guidelines.",
    url: "https://mediguide4u.com/authors",
    siteName: "mediguide4u",
    type: "website",
  },
};

export default async function AuthorsPage() {
  const posts = await getPublishedBlogPosts().catch(() => []);

  const authorsSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "mediguide4u Editorial Board & Medical Reviewers",
    "description": "Qualified medical writers and clinical review board behind mediguide4u educational healthcare guides.",
    "url": "https://mediguide4u.com/authors",
    "publisher": {
      "@type": "MedicalOrganization",
      "name": "mediguide4u",
      "url": "https://mediguide4u.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://mediguide4u.com/logo.png",
      },
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": EDITORIAL_PROFILES.map((p, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "item": {
          "@type": "Person",
          "name": p.name,
          "jobTitle": p.title,
          "description": p.bio,
          "url": `https://mediguide4u.com/author/${p.id}`,
        }
      }))
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(authorsSchema) }}
      />

      <main className="flex-grow py-12">
        <div className="w-full mx-auto px-4 sm:px-8 md:px-12 lg:px-16 max-w-none space-y-12">
          
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-xs text-stone-500 flex items-center gap-2 font-medium">
            <Link href="/" className="hover:text-[#C9A15A] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#113F48] font-bold">Editorial &amp; Medical Board</span>
          </nav>

          {/* Hero */}
          <header className="bg-white border border-stone-200 rounded-3xl p-8 sm:p-12 shadow-sm space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C9A15A]/10 border border-[#C9A15A]/25 text-xs font-bold uppercase tracking-wider text-[#C9A15A]">
              <Users className="h-4 w-4" />
              Medical Integrity &amp; E-E-A-T
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#113F48] leading-tight">
              Our Medical Reviewers &amp; <span className="text-[#C9A15A]">Editorial Team</span>
            </h1>

            <p className="text-stone-600 text-sm sm:text-base max-w-3xl leading-relaxed">
              At mediguide4u, healthcare guides are created by experienced health writers and fact-checked by medical professionals. We synthesize guidelines from the NIH, WHO, CDC, and peer-reviewed clinical literature with zero commercial bias.
            </p>

            <div className="pt-4 flex flex-wrap gap-4 border-t border-stone-100 text-xs text-stone-600">
              <span className="flex items-center gap-1.5 font-semibold text-[#113F48]">
                <BookOpen className="h-4 w-4 text-[#C9A15A]" /> {posts.length}+ Educational Guides Published
              </span>
              <span className="flex items-center gap-1.5 font-semibold text-emerald-800">
                <ShieldCheck className="h-4 w-4 text-emerald-600" /> Fact-Checked against Peer-Reviewed Sources
              </span>
              <span className="flex items-center gap-1.5 font-semibold text-[#113F48]">
                <Stethoscope className="h-4 w-4 text-[#C9A15A]" /> Physician-Reviewed Clinical Standards
              </span>
            </div>
          </header>

          {/* Medical Review Board Callout Banner */}
          <div className="bg-emerald-950 text-white rounded-3xl p-8 sm:p-10 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-emerald-900">
            <div className="space-y-2 max-w-2xl">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C9A15A] bg-[#C9A15A]/20 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
                <Stethoscope className="h-3.5 w-3.5" /> Clinical Oversight
              </span>
              <h2 className="text-2xl font-extrabold text-white">
                Looking for our Board-Certified Physicians?
              </h2>
              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                Visit our dedicated Medical Review Board page to review full medical licenses, verified clinical credentials, and conflict-of-interest declarations.
              </p>
            </div>
            <Link
              href="/medical-review-board"
              className="bg-[#C9A15A] text-white px-6 py-3.5 rounded-xl text-xs font-bold hover:bg-[#B58F4E] transition-colors shadow-md inline-flex items-center gap-2 whitespace-nowrap"
            >
              View Medical Review Board <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Profiles Section */}
          <section className="space-y-6">
            <h2 className="text-2xl font-extrabold text-[#113F48] flex items-center gap-2">
              <Award className="h-6 w-6 text-[#C9A15A]" /> Health Writers &amp; Medical Contributors
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {EDITORIAL_PROFILES.map((profile) => (
                <div
                  key={profile.id}
                  className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm space-y-4 hover:border-[#C9A15A] transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-3.5">
                      <div className="w-14 h-14 rounded-2xl bg-[#113F48] text-white flex items-center justify-center font-bold text-xl border border-[#C9A15A]/30">
                        {profile.name.replace("Dr. ", "")[0]}
                      </div>
                      <div>
                        <h3 className="font-extrabold text-lg text-[#113F48]">{profile.name}</h3>
                        <span className="text-xs font-semibold text-[#C9A15A] block">{profile.title}</span>
                        {profile.credentials && (
                          <span className="text-[11px] text-stone-400 font-medium">{profile.credentials}</span>
                        )}
                      </div>
                    </div>

                    {profile.licenseNumber && (
                      <div className="inline-flex items-center gap-1.5 text-[11px] text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md font-semibold border border-emerald-200">
                        <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> License: {profile.licenseNumber}
                      </div>
                    )}

                    <p className="text-stone-600 text-xs sm:text-sm leading-relaxed line-clamp-4">
                      {profile.bio}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-stone-100 flex justify-between items-center">
                    <Link
                      href={`/author/${profile.id}`}
                      className="text-xs font-bold text-[#113F48] hover:text-[#C9A15A] transition-colors inline-flex items-center gap-1"
                    >
                      View Profile &amp; Articles <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Medical Review Process */}
          <section className="bg-white border border-stone-200 rounded-3xl p-8 sm:p-10 shadow-sm space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-[#113F48] flex items-center gap-2">
              <Scale className="h-5 w-5 text-[#C9A15A]" />
              Our 4-Step Clinical Review Methodology
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-[#FDFBF7] border border-stone-200 rounded-2xl p-6 space-y-2">
                <span className="text-xs font-bold text-[#C9A15A] uppercase tracking-wider">Step 1</span>
                <h3 className="font-bold text-base text-[#113F48]">Primary Research</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Every guide originates from primary medical literature, clinical trials, and public health guidelines from the NIH, CDC, and WHO.
                </p>
              </div>

              <div className="bg-[#FDFBF7] border border-stone-200 rounded-2xl p-6 space-y-2">
                <span className="text-xs font-bold text-[#C9A15A] uppercase tracking-wider">Step 2</span>
                <h3 className="font-bold text-base text-[#113F48]">Plain-Language Drafting</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Medical terminology is translated into clear, actionable advice with structured checklists, tables, and warnings.
                </p>
              </div>

              <div className="bg-[#FDFBF7] border border-stone-200 rounded-2xl p-6 space-y-2">
                <span className="text-xs font-bold text-[#C9A15A] uppercase tracking-wider">Step 3</span>
                <h3 className="font-bold text-base text-[#113F48]">Fact-Checking &amp; Citation</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Every statistic, clinical claim, and treatment protocol is cross-checked with peer-reviewed medical publications.
                </p>
              </div>

              <div className="bg-[#FDFBF7] border border-stone-200 rounded-2xl p-6 space-y-2">
                <span className="text-xs font-bold text-[#C9A15A] uppercase tracking-wider">Step 4</span>
                <h3 className="font-bold text-base text-[#113F48]">Continuous Re-Review</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Guides are scheduled for periodic re-evaluation to ensure all guidance reflects current clinical practice guidelines.
                </p>
              </div>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
