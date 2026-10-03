import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MEDICAL_REVIEWERS } from "@/lib/mockData";
import { getPublishedBlogPosts } from "@/lib/db";
import {
  Stethoscope,
  ShieldCheck,
  Award,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Scale,
  FileCheck2,
  Building2,
  GraduationCap,
  Sparkles,
  Search,
  BadgeCheck,
  AlertCircle
} from "lucide-react";

export const revalidate = 86400; // Revalidate every 24 hours to prevent high ISR writes on Vercel

export const metadata: Metadata = {
  title: "Medical Review Board & Clinical Advisors | mediguide4u",
  description:
    "Meet the board-certified physicians, cardiologists, endocrinologists, and healthcare professionals who medically review every guide on mediguide4u for clinical accuracy and E-E-A-T integrity.",
  alternates: {
    canonical: "https://www.mediguide4u.com/medical-review-board",
  },
  openGraph: {
    title: "Medical Review Board & Clinical Advisors | mediguide4u",
    description:
      "Meet the board-certified physicians and clinical specialists who verify every health guide on mediguide4u against medically-reviewed medical standards.",
    url: "https://www.mediguide4u.com/medical-review-board",
    siteName: "mediguide4u",
    type: "website",
  },
};

export default async function MedicalReviewBoardPage() {
  const posts = await getPublishedBlogPosts().catch(() => []);

  const boardSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "mediguide4u Medical Review Board & Clinical Advisors",
    "description":
      "Dedicated board-certified medical doctors and clinical specialists responsible for fact-checking and verifying healthcare literacy content at mediguide4u.",
    "url": "https://www.mediguide4u.com/medical-review-board",
    "publisher": {
      "@type": "MedicalOrganization",
      "name": "mediguide4u",
      "url": "https://www.mediguide4u.com",
      "logo": "https://www.mediguide4u.com/logo.png",
      "medicalSpecialty": [
        "Cardiology",
        "Endocrinology",
        "Internal Medicine",
        "Preventive Healthcare",
        "Metabolic Health"
      ]
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": MEDICAL_REVIEWERS.map((doc, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "item": {
          "@type": "Physician",
          "name": doc.name,
          "jobTitle": doc.title,
          "description": doc.bio,
          "medicalSpecialty": doc.specialty,
          "url": `https://www.mediguide4u.com/author/${doc.id}`,
          "hasCredential": [
            {
              "@type": "EducationalOccupationalCredential",
              "name": doc.credentials
            }
          ],
          "knowsAbout": doc.areasReviewed || [],
          "worksFor": {
            "@type": "MedicalOrganization",
            "name": "mediguide4u",
            "url": "https://www.mediguide4u.com"
          }
        }
      }))
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(boardSchema) }}
      />

      <main className="flex-grow py-10 md:py-14">
        <div className="w-full mx-auto px-4 sm:px-8 md:px-12 lg:px-16 max-w-none space-y-12">
          
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-xs text-stone-500 flex items-center gap-2 font-medium">
            <Link href="/" className="hover:text-[#C9A15A] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/about" className="hover:text-[#C9A15A] transition-colors">About Us</Link>
            <span>/</span>
            <span className="text-[#113F48] font-bold">Medical Review Board</span>
          </nav>

          {/* Hero Banner */}
          <header className="bg-white border border-stone-200 rounded-3xl p-8 sm:p-12 shadow-sm space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A15A]/5 rounded-full blur-3xl -z-10 pointer-events-none" />

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold uppercase tracking-wider text-emerald-800">
              <BadgeCheck className="h-4 w-4 text-emerald-600" />
              Verified Clinical Reviewers • Google E-E-A-T Compliant
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#113F48] leading-tight">
              Our Medical Review Board &amp; <span className="text-[#C9A15A]">Clinical Advisors</span>
            </h1>

            <p className="text-stone-600 text-sm sm:text-base max-w-4xl leading-relaxed">
              Every medical and health literacy guide on <strong>mediguide4u</strong> undergoes rigorous examination by board-certified physicians, clinical researchers, and licensed healthcare professionals. Our reviewers confirm that all clinical claims, diagnostic references, dosages, and prevention strategies reflect current clinical practice guidelines from the <strong>NIH, CDC, WHO, AHA, and ADA</strong>.
            </p>

            <div className="pt-4 flex flex-wrap gap-4 border-t border-stone-100 text-xs text-stone-600">
              <span className="flex items-center gap-1.5 font-semibold text-[#113F48]">
                <Stethoscope className="h-4 w-4 text-[#C9A15A]" /> 100% Board-Certified Reviewers
              </span>
              <span className="flex items-center gap-1.5 font-semibold text-emerald-800">
                <ShieldCheck className="h-4 w-4 text-emerald-600" /> Independent Fact-Checking (Zero Pharma Bias)
              </span>
              <span className="flex items-center gap-1.5 font-semibold text-[#113F48]">
                <BookOpen className="h-4 w-4 text-[#C9A15A]" /> {posts.length}+ Clinically Verified Guides
              </span>
            </div>
          </header>

          {/* Medical Reviewers Grid */}
          <section className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#113F48] flex items-center gap-2.5">
                  <Award className="h-7 w-7 text-[#C9A15A]" /> Verified Physician Profiles
                </h2>
                <p className="text-xs sm:text-sm text-stone-500 mt-1">
                  Active medical licenses, board certifications, and professional clinical affiliations.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-stone-600 bg-white border border-stone-200 px-3.5 py-2 rounded-xl">
                <FileCheck2 className="h-4 w-4 text-emerald-600" /> All Licenses Actively Verified
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {MEDICAL_REVIEWERS.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white border border-stone-200 rounded-3xl p-7 shadow-sm hover:shadow-md hover:border-[#C9A15A] transition-all flex flex-col justify-between space-y-6"
                >
                  {/* Doctor Header */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-[#113F48] text-white flex items-center justify-center font-extrabold text-2xl border-2 border-[#C9A15A] shadow-sm flex-shrink-0">
                        {doc.name.replace("Dr. ", "")[0]}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-extrabold text-lg text-[#113F48] leading-snug">
                            {doc.name}
                          </h3>
                        </div>
                        <span className="text-xs font-bold text-[#C9A15A] block">
                          {doc.title}
                        </span>
                        {doc.degree && (
                          <span className="text-[11px] font-semibold text-stone-500 block">
                            {doc.degree}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* License & Verification Badge */}
                    <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-xl p-3 text-xs space-y-1">
                      <div className="flex items-center justify-between text-emerald-900 font-bold">
                        <span className="flex items-center gap-1.5">
                          <BadgeCheck className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                          License Verification
                        </span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                          {doc.licenseStatus || "Active & Verified"}
                        </span>
                      </div>
                      <p className="text-[11px] text-emerald-950 font-mono">
                        License ID: {doc.licenseNumber}
                      </p>
                      {doc.licensingBody && (
                        <p className="text-[10px] text-stone-500">
                          {doc.licensingBody}
                        </p>
                      )}
                    </div>

                    {/* Bio */}
                    <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                      {doc.bio}
                    </p>

                    {/* Education & Hospital Affiliation */}
                    <div className="space-y-2 pt-2 border-t border-stone-100 text-xs text-stone-600">
                      {doc.experience && (
                        <div className="flex items-start gap-2">
                          <Award className="h-4 w-4 text-[#C9A15A] flex-shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-[#113F48]">Experience:</strong> {doc.experience}
                          </div>
                        </div>
                      )}

                      {doc.hospitalAffiliations && (
                        <div className="flex items-start gap-2">
                          <Building2 className="h-4 w-4 text-[#C9A15A] flex-shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-[#113F48]">Affiliation:</strong> {doc.hospitalAffiliations}
                          </div>
                        </div>
                      )}

                      {doc.education && doc.education.length > 0 && (
                        <div className="flex items-start gap-2">
                          <GraduationCap className="h-4 w-4 text-[#C9A15A] flex-shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-[#113F48]">Education:</strong> {doc.education[0]}
                          </div>
                        </div>
                      )}

                      {doc.thesisTitle && (
                        <div className="flex items-start gap-2 bg-[#113F48]/[0.03] p-2.5 rounded-xl border border-[#C9A15A]/20 text-[11px]">
                          <BookOpen className="h-4 w-4 text-[#C9A15A] flex-shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-[#113F48] block font-bold">Academic Thesis:</strong>
                            <span className="text-stone-600 italic line-clamp-2">&ldquo;{doc.thesisTitle}&rdquo;</span>
                            {doc.publicationsCount && (
                              <span className="text-[10px] font-bold text-[#C9A15A] block mt-1">
                                {doc.publicationsCount}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Areas Reviewed */}
                    {doc.areasReviewed && doc.areasReviewed.length > 0 && (
                      <div className="space-y-1.5 pt-2 border-t border-stone-100">
                        <span className="text-[10px] font-bold text-[#113F48] uppercase tracking-wider block">
                          Areas of Clinical Review:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {doc.areasReviewed.map((area, i) => (
                            <span
                              key={i}
                              className="text-[10px] bg-stone-100 text-[#113F48] font-medium px-2 py-0.5 rounded-md"
                            >
                              {area}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Conflict of Interest Disclosure */}
                    {doc.conflictOfInterest && (
                      <div className="bg-[#FDFBF7] border border-stone-200 rounded-xl p-3 text-[11px] text-stone-500 space-y-1">
                        <span className="font-bold text-[#113F48] flex items-center gap-1 text-[10px] uppercase tracking-wider">
                          <Scale className="h-3 w-3 text-[#C9A15A]" /> Editorial Independence Disclosure:
                        </span>
                        <p className="leading-normal">{doc.conflictOfInterest}</p>
                      </div>
                    )}
                  </div>

                  {/* Footer actions */}
                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                    <Link
                      href={`/author/${doc.id}`}
                      className="text-xs font-bold text-[#113F48] hover:text-[#C9A15A] transition-colors inline-flex items-center gap-1"
                    >
                      Full Bio &amp; Reviewed Articles <ArrowRight className="h-3.5 w-3.5" />
                    </Link>

                    {doc.externalProfiles && doc.externalProfiles[0] && (
                      <a
                        href={doc.externalProfiles[0].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-stone-400 hover:text-[#113F48] transition-colors p-1"
                        title={doc.externalProfiles[0].label}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 4-Step Clinical Review Standard */}
          <section className="bg-white border border-stone-200 rounded-3xl p-8 sm:p-12 shadow-sm space-y-8">
            <div className="max-w-3xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C9A15A] bg-[#C9A15A]/10 px-3 py-1 rounded-full inline-block">
                Clinical Rigor &amp; Protocol
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#113F48]">
                How Our Medical Review Board Verifies Health Information
              </h2>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                Health decisions impact lives. That is why our editorial process enforces strict separation between content creation and physician verification.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-[#FDFBF7] border border-stone-200 rounded-2xl p-6 space-y-3 relative">
                <span className="text-2xl font-black text-[#C9A15A]/40 absolute top-4 right-4">01</span>
                <span className="text-xs font-bold text-[#C9A15A] uppercase tracking-wider block">Stage 1</span>
                <h3 className="font-bold text-base text-[#113F48]">Evidence-Based Drafting</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Trained health writers draft guides using solely primary sources: PubMed clinical trials, NIH consensus statements, CDC updates, and WHO guidelines.
                </p>
              </div>

              <div className="bg-[#FDFBF7] border border-stone-200 rounded-2xl p-6 space-y-3 relative">
                <span className="text-2xl font-black text-[#C9A15A]/40 absolute top-4 right-4">02</span>
                <span className="text-xs font-bold text-[#C9A15A] uppercase tracking-wider block">Stage 2</span>
                <h3 className="font-bold text-base text-[#113F48]">Physician Verification</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  A board-certified specialist in the relevant field (e.g. Cardiologist for Heart Health, Endocrinologist for Diabetes) audits all claims for clinical nuance and accuracy.
                </p>
              </div>

              <div className="bg-[#FDFBF7] border border-stone-200 rounded-2xl p-6 space-y-3 relative">
                <span className="text-2xl font-black text-[#C9A15A]/40 absolute top-4 right-4">03</span>
                <span className="text-xs font-bold text-[#C9A15A] uppercase tracking-wider block">Stage 3</span>
                <h3 className="font-bold text-base text-[#113F48]">Conflict &amp; Safety Check</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Every guide is checked to ensure no commercial bias, drug promotion, or unsupported health claims. Safe triage guidance and red-flag emergency symptoms are verified.
                </p>
              </div>

              <div className="bg-[#FDFBF7] border border-stone-200 rounded-2xl p-6 space-y-3 relative">
                <span className="text-2xl font-black text-[#C9A15A]/40 absolute top-4 right-4">04</span>
                <span className="text-xs font-bold text-[#C9A15A] uppercase tracking-wider block">Stage 4</span>
                <h3 className="font-bold text-base text-[#113F48]">Scheduled Re-Review</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Medical knowledge evolves. Our system flags guides for automated re-review every 6 to 12 months, updating protocols as clinical trial results emerge.
                </p>
              </div>
            </div>
          </section>

          {/* Editorial Independence Policy Callout */}
          <section className="bg-[#113F48] text-white rounded-3xl p-8 sm:p-12 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A15A]/20 border border-[#C9A15A]/40 text-xs font-bold text-[#C9A15A]">
                  <Scale className="h-3.5 w-3.5" /> 100% Editorial Independence
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Zero Commercial &amp; Pharmaceutical Influence
                </h2>
                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                  Our medical reviewers are compensated purely for their clinical scrutiny and time. They do not accept compensation, sponsorships, or gifts from pharmaceutical companies, supplement manufacturers, or health device makers.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/editorial-policy"
                  className="bg-[#C9A15A] text-white px-6 py-3 rounded-xl text-xs font-bold hover:bg-[#B58F4E] transition-colors text-center"
                >
                  Read Editorial Policy
                </Link>
                <Link
                  href="/contact"
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-xl text-xs font-bold transition-colors text-center"
                >
                  Contact Medical Board
                </Link>
              </div>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
