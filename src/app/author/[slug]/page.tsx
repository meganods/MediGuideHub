import React from "react";
import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { EDITORIAL_PROFILES, MEDICAL_REVIEWERS } from "@/lib/mockData";
import { getAuthorBySlug, getPostsByAuthor, getPostsReviewedBy } from "@/lib/db";
import { 
  User, 
  BookOpen, 
  ArrowRight, 
  Clock, 
  Calendar, 
  ShieldCheck, 
  ChevronRight,
  Award,
  Stethoscope,
  BadgeCheck,
  Building2,
  GraduationCap,
  Scale,
  ExternalLink,
  FileCheck2,
  CheckCircle2
} from "lucide-react";

export const revalidate = 86400; // Revalidate every 24 hours to prevent high ISR writes on Vercel
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const allProfiles = [...EDITORIAL_PROFILES, ...MEDICAL_REVIEWERS];
  const uniqueIds = Array.from(new Set(allProfiles.map((p) => p.id)));
  return uniqueIds.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);

  if (!author) {
    return {
      title: "Medical Expert Profile Not Found | mediguide4u",
      description: "The requested medical reviewer or author profile could not be found.",
    };
  }

  const title = `${author.name} (${author.degree || author.credentials || "Medical Reviewer"}) - Credentials, Bio & Guides | mediguide4u`;
  const description = author.bio || `Explore verified clinical credentials, medical licensing, and peer-reviewed health guides authored or medically reviewed by ${author.name}.`;
  const canonicalUrl = `https://www.mediguide4u.com/author/${author.id}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "mediguide4u",
      type: "profile",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function AuthorProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);

  if (!author) {
    notFound();
  }

  if (slug !== author.id) {
    permanentRedirect(`/author/${author.id}`);
  }

  const [authoredPosts, reviewedPosts] = await Promise.all([
    getPostsByAuthor(author.name || author.id),
    getPostsReviewedBy(author.name || author.id)
  ]);

  const isPhysician = author.name.startsWith("Dr.") || author.title.toLowerCase().includes("physician") || author.title.toLowerCase().includes("cardiologist") || author.title.toLowerCase().includes("endocrinologist");

  const authorSchema: any = {
    "@context": "https://schema.org",
    "@type": isPhysician ? "Physician" : "Person",
    "name": author.name,
    "jobTitle": author.title,
    "description": author.bio,
    "url": `https://www.mediguide4u.com/author/${author.id}`,
    "hasCredential": author.credentials ? [
      {
        "@type": "EducationalOccupationalCredential",
        "name": author.credentials
      }
    ] : undefined,
    "medicalSpecialty": author.specialty ? author.specialty.split(",").map(s => s.trim()) : undefined,
    "knowsAbout": author.areasReviewed || (author.specialty ? author.specialty.split(",").map((s) => s.trim()) : [
      "Internal Medicine",
      "Preventive Healthcare",
      "Clinical Guidelines"
    ]),
    "alumniOf": author.education ? author.education.map(e => ({
      "@type": "EducationalOrganization",
      "name": e
    })) : undefined,
    "sameAs": author.externalProfiles?.map(p => p.url) || [],
    "worksFor": {
      "@type": "MedicalOrganization",
      "name": "mediguide4u",
      "url": "https://www.mediguide4u.com",
      "logo": "https://www.mediguide4u.com/logo.png"
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
        "name": "Medical Review Board",
        "item": "https://www.mediguide4u.com/medical-review-board",
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": author.name,
        "item": `https://www.mediguide4u.com/author/${author.id}`,
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(authorSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="flex-grow py-10">
        <div className="w-full mx-auto px-4 sm:px-8 md:px-12 lg:px-16 max-w-none space-y-10">
          
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-xs text-stone-500 flex items-center gap-2 font-medium">
            <Link href="/" className="hover:text-[#C9A15A] transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3 text-stone-400" />
            <Link href="/medical-review-board" className="hover:text-[#C9A15A] transition-colors">Medical Review Board</Link>
            <ChevronRight className="h-3 w-3 text-stone-400" />
            <span className="text-[#113F48] font-bold">{author.name}</span>
          </nav>

          {/* Profile Card */}
          <header className="bg-white border border-stone-200 rounded-3xl p-8 sm:p-12 shadow-sm space-y-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-stone-100">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="w-20 h-20 rounded-3xl bg-[#113F48] text-white flex items-center justify-center font-black text-3xl border-2 border-[#C9A15A] shadow-sm flex-shrink-0">
                  {author.name.replace("Dr. ", "")[0]}
                </div>
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#C9A15A] bg-[#C9A15A]/10 px-2.5 py-1 rounded">
                      {author.roleType || "Medical Contributor"}
                    </span>
                    {author.degree && (
                      <span className="text-[10px] font-semibold text-stone-600 bg-stone-100 px-2.5 py-1 rounded">
                        {author.degree}
                      </span>
                    )}
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#113F48]">{author.name}</h1>
                  <p className="text-stone-500 text-xs sm:text-sm font-semibold">{author.title}</p>
                </div>
              </div>

              {/* License Status Pill */}
              {author.licenseNumber && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs space-y-1 w-full md:w-auto">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                    <BadgeCheck className="h-4 w-4 text-emerald-600" />
                    <span>License Verified</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold ml-auto">
                      {author.licenseStatus || "Active"}
                    </span>
                  </div>
                  <p className="text-[11px] text-emerald-950 font-mono">
                    ID: {author.licenseNumber}
                  </p>
                  {author.licensingBody && (
                    <p className="text-[10px] text-stone-500">
                      {author.licensingBody}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Bio */}
            <div className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-stone-400">Professional Background &amp; Bio</h2>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed max-w-4xl">
                {author.bio}
              </p>
            </div>

            {/* Detailed Credentials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4 border-t border-stone-100 text-xs">
              {author.specialty && (
                <div className="bg-[#FDFBF7] border border-stone-200 rounded-2xl p-5 space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-[#113F48]">
                    <Stethoscope className="h-4 w-4 text-[#C9A15A]" /> Medical Specialization
                  </div>
                  <p className="text-stone-600 leading-relaxed">{author.specialty}</p>
                </div>
              )}

              {author.experience && (
                <div className="bg-[#FDFBF7] border border-stone-200 rounded-2xl p-5 space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-[#113F48]">
                    <Award className="h-4 w-4 text-[#C9A15A]" /> Clinical Experience
                  </div>
                  <p className="text-stone-600 leading-relaxed">{author.experience}</p>
                </div>
              )}

              {author.hospitalAffiliations && (
                <div className="bg-[#FDFBF7] border border-stone-200 rounded-2xl p-5 space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-[#113F48]">
                    <Building2 className="h-4 w-4 text-[#C9A15A]" /> Hospital / Clinical Affiliation
                  </div>
                  <p className="text-stone-600 leading-relaxed">{author.hospitalAffiliations}</p>
                </div>
              )}

              {author.education && author.education.length > 0 && (
                <div className="bg-[#FDFBF7] border border-stone-200 rounded-2xl p-5 space-y-1.5 md:col-span-2 lg:col-span-2">
                  <div className="flex items-center gap-2 font-bold text-[#113F48]">
                    <GraduationCap className="h-4 w-4 text-[#C9A15A]" /> Education &amp; Medical Training
                  </div>
                  <ul className="space-y-1 text-stone-600 list-disc list-inside">
                    {author.education.map((edu, idx) => (
                      <li key={idx}>{edu}</li>
                    ))}
                  </ul>
                </div>
              )}

              {author.externalProfiles && author.externalProfiles.length > 0 && (
                <div className="bg-[#FDFBF7] border border-stone-200 rounded-2xl p-5 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-[#113F48]">
                    <ExternalLink className="h-4 w-4 text-[#C9A15A]" /> Professional Profiles
                  </div>
                  <div className="space-y-1">
                    {author.externalProfiles.map((p, idx) => (
                      <a
                        key={idx}
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#113F48] hover:text-[#C9A15A] font-medium flex items-center justify-between underline decoration-[#C9A15A]/40"
                      >
                        <span>{p.label}</span>
                        <ExternalLink className="h-3 w-3 text-stone-400" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Academic Thesis & Research Publications */}
            {(author.thesisTitle || author.thesisSummary || author.publicationsCount) && (
              <div className="bg-[#113F48]/[0.03] border-2 border-[#C9A15A]/30 rounded-2xl p-6 sm:p-7 space-y-4 shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-[#C9A15A]/20 pb-3">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-[#C9A15A]" />
                    <h3 className="font-extrabold text-sm sm:text-base text-[#113F48]">
                      Academic Thesis &amp; Medical Research
                    </h3>
                  </div>
                  {author.publicationsCount && (
                    <span className="text-[11px] font-bold text-[#113F48] bg-[#C9A15A]/15 border border-[#C9A15A]/40 px-3 py-1 rounded-full">
                      {author.publicationsCount}
                    </span>
                  )}
                </div>

                {author.thesisTitle && (
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-[#C9A15A] uppercase tracking-wider block">
                      Postgraduate Thesis / Dissertation Title:
                    </span>
                    <p className="font-bold text-xs sm:text-sm text-[#113F48] italic leading-snug">
                      &ldquo;{author.thesisTitle}&rdquo;
                    </p>
                    {author.thesisInstitution && (
                      <p className="text-[11px] font-medium text-stone-500 flex items-center gap-1.5 pt-0.5">
                        <Building2 className="h-3.5 w-3.5 text-[#C9A15A]" />
                        <span>Institution: {author.thesisInstitution}</span>
                      </p>
                    )}
                  </div>
                )}

                {author.thesisSummary && (
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed bg-white/80 p-4 rounded-xl border border-stone-200/80">
                    {author.thesisSummary}
                  </p>
                )}

                {author.keyResearchAreas && author.keyResearchAreas.length > 0 && (
                  <div className="space-y-2 pt-1">
                    <span className="text-[10px] font-bold text-[#113F48] uppercase tracking-wider block">
                      Key Investigative &amp; Clinical Research Domains:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {author.keyResearchAreas.map((area, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-semibold bg-white text-[#113F48] px-3 py-1 rounded-lg border border-stone-200 shadow-2xs"
                        >
                          • {area}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Areas Reviewed */}
            {author.areasReviewed && author.areasReviewed.length > 0 && (
              <div className="pt-4 border-t border-stone-100 space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#113F48]">
                  Clinical Areas Reviewed for mediguide4u:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {author.areasReviewed.map((area, i) => (
                    <span
                      key={i}
                      className="text-xs bg-stone-100 text-[#113F48] font-medium px-3 py-1 rounded-lg border border-stone-200"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Conflict of Interest Disclosure */}
            {author.conflictOfInterest && (
              <div className="bg-white border border-stone-200 rounded-2xl p-5 space-y-2 text-xs">
                <div className="flex items-center gap-2 font-bold text-[#113F48]">
                  <Scale className="h-4 w-4 text-[#C9A15A]" />
                  Conflict-of-Interest &amp; Editorial Independence Disclosure
                </div>
                <p className="text-stone-600 leading-relaxed">
                  {author.conflictOfInterest}
                </p>
              </div>
            )}
          </header>

          {/* Medically Reviewed Guides Section */}
          {reviewedPosts.length > 0 && (
            <section className="space-y-6">
              <div className="flex justify-between items-center border-b border-stone-200 pb-3">
                <div className="space-y-0.5">
                  <h2 className="text-xl font-bold text-[#113F48] flex items-center gap-2">
                    <Stethoscope className="h-5 w-5 text-[#C9A15A]" /> Guides Medically Reviewed by {author.name}
                  </h2>
                  <p className="text-xs text-stone-500">Verified for medical accuracy, safety guidelines, and clinical evidence.</p>
                </div>
                <span className="text-xs font-semibold text-[#C9A15A] bg-[#C9A15A]/10 px-2.5 py-1 rounded-full">
                  {reviewedPosts.length} Reviewed
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviewedPosts.map((post) => (
                  <article
                    key={post.slug}
                    className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full"
                  >
                    <div className="relative h-44 w-full bg-stone-50 overflow-hidden">
                      {post.featuredImage && (
                        <Image
                          src={post.featuredImage}
                          alt={post.imageAlt || post.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      )}
                      <span className="absolute top-3 left-3 bg-[#113F48] text-white text-[9px] font-bold px-2 py-0.5 rounded z-10">
                        {post.category}
                      </span>
                    </div>

                    <div className="p-5 flex-grow space-y-2.5">
                      <div className="flex items-center justify-between text-[10px] text-stone-400">
                        <span>{post.publishedAt}</span>
                        <span>{post.readTime || "5 min read"}</span>
                      </div>

                      <h3 className="font-extrabold text-[#113F48] text-sm hover:text-[#C9A15A] transition-colors leading-snug line-clamp-2">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h3>

                      <p className="text-stone-500 text-xs line-clamp-3 leading-relaxed">
                        {post.summary}
                      </p>
                    </div>

                    <div className="p-5 pt-3 border-t border-stone-100 flex justify-between items-center">
                      <span className="text-stone-400 text-[11px] flex items-center gap-1">
                        <BadgeCheck className="h-3.5 w-3.5 text-emerald-600" /> Physician Verified
                      </span>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="bg-[#113F48] text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#C9A15A] transition-colors shadow-sm inline-flex items-center gap-1"
                      >
                        Read Guide <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* Authored Guides Section */}
          {authoredPosts.length > 0 && (
            <section className="space-y-6">
              <div className="flex justify-between items-center border-b border-stone-200 pb-3">
                <div className="space-y-0.5">
                  <h2 className="text-xl font-bold text-[#113F48] flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-[#C9A15A]" /> Articles Written by {author.name}
                  </h2>
                  <p className="text-xs text-stone-500">Educational healthcare resources created for public health literacy.</p>
                </div>
                <span className="text-xs font-semibold text-[#113F48] bg-stone-100 px-2.5 py-1 rounded-full">
                  {authoredPosts.length} Authored
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {authoredPosts.map((post) => (
                  <article
                    key={post.slug}
                    className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full"
                  >
                    <div className="relative h-44 w-full bg-stone-50 overflow-hidden">
                      {post.featuredImage && (
                        <Image
                          src={post.featuredImage}
                          alt={post.imageAlt || post.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      )}
                      <span className="absolute top-3 left-3 bg-[#113F48] text-white text-[9px] font-bold px-2 py-0.5 rounded z-10">
                        {post.category}
                      </span>
                    </div>

                    <div className="p-5 flex-grow space-y-2.5">
                      <div className="flex items-center justify-between text-[10px] text-stone-400">
                        <span>{post.publishedAt}</span>
                        <span>{post.readTime || "5 min read"}</span>
                      </div>

                      <h3 className="font-extrabold text-[#113F48] text-sm hover:text-[#C9A15A] transition-colors leading-snug line-clamp-2">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h3>

                      <p className="text-stone-500 text-xs line-clamp-3 leading-relaxed">
                        {post.summary}
                      </p>
                    </div>

                    <div className="p-5 pt-3 border-t border-stone-100 flex justify-between items-center">
                      <span className="text-stone-400 text-[11px]">{post.category}</span>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="bg-[#113F48] text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#C9A15A] transition-colors shadow-sm inline-flex items-center gap-1"
                      >
                        Read Guide <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* Empty state fallback */}
          {reviewedPosts.length === 0 && authoredPosts.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border border-stone-200 p-6 space-y-2">
              <BookOpen className="h-10 w-10 text-stone-300 mx-auto" />
              <p className="text-sm font-semibold text-[#113F48]">Upcoming Publications</p>
              <p className="text-xs text-stone-500">More articles by this clinical expert are currently in the editorial review pipeline.</p>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
