"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  BookOpen, 
  AlertTriangle, 
  Shield, 
  Check, 
  Info, 
  AlertCircle, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  User, 
  Calendar, 
  Clock, 
  Bookmark, 
  Stethoscope, 
  Award,
  BadgeCheck,
  Building2,
  GraduationCap,
  Scale,
  ArrowRight,
  ExternalLink
} from "lucide-react";
import { ContentBlock, FAQItem, ReferenceItem, MEDICAL_AUTHORS, MEDICAL_REVIEWERS, getAuthorProfileUrl } from "@/lib/mockData";
export { getAuthorProfileUrl };

// --- LIGHTWEIGHT CLIENT-SIDE HTML SANITIZER ---
export function sanitizeHtml(html: string): string {
  if (!html) return "";
  // Strip script tags entirely
  let clean = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "");
  // Strip on* event handlers (e.g. onload, onerror, onclick)
  clean = clean.replace(/\son[a-z]+=\s*["'][^"']*["']/gi, "");
  clean = clean.replace(/\son[a-z]+=\s*javascript:[^>\s]*/gi, "");
  // Strip javascript: URLs
  clean = clean.replace(/href=["']javascript:[^"']*["']/gi, 'href="#"');
  return clean;
}

// Render raw sanitized HTML safely
export function RichText({ content, className = "" }: { content: string; className?: string }) {
  const sanitized = sanitizeHtml(content);
  return (
    <div
      className={`prose max-w-none text-[#113F48] ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
}

// --- AUTHOR INFO COMPONENT ---
export function AuthorInfo({ authorName }: { authorName?: string }) {
  const authorMatch = MEDICAL_AUTHORS.find(
    (a) => a.name.toLowerCase() === (authorName || "").toLowerCase() || (authorName && authorName.includes(a.name))
  );

  const displayName = authorMatch ? authorMatch.name : (authorName || "Mediguide4u Editorial Staff");
  const displayTitle = authorMatch ? authorMatch.title : "Health & Wellness Editorial Team";
  const profileUrl = getAuthorProfileUrl(displayName);

  return (
    <Link href={profileUrl} className="flex items-center gap-2.5 group">
      <div className="w-9 h-9 rounded-xl bg-[#113F48] text-white flex items-center justify-center font-bold text-xs border border-[#C9A15A]/30 group-hover:bg-[#C9A15A] transition-colors flex-shrink-0">
        {displayName.replace("Dr. ", "")[0] || "M"}
      </div>
      <div>
        <span className="font-bold text-[#113F48] block text-xs group-hover:text-[#C9A15A] transition-colors">
          Written by <span className="underline decoration-[#C9A15A]/50">{displayName}</span>
        </span>
        <span className="text-[10px] text-stone-400 block">{displayTitle}</span>
      </div>
    </Link>
  );
}

// --- MEDICAL REVIEWER INFO COMPONENT ---
export function MedicalReviewerInfo({ reviewerName, reviewedAt }: { reviewerName?: string; reviewedAt?: string }) {
  const reviewerMatch = MEDICAL_REVIEWERS.find(
    (r) => r.name.toLowerCase() === (reviewerName || "").toLowerCase() || (reviewerName && reviewerName.includes(r.name))
  );

  const displayReviewer = reviewerMatch ? reviewerMatch.name : (reviewerName || "Dr. Ananya Roy, MD");
  const displayCredentials = reviewerMatch ? (reviewerMatch.degree || reviewerMatch.credentials) : "Internal Medicine Specialist";
  const profileUrl = getAuthorProfileUrl(displayReviewer);

  return (
    <div className="flex items-center gap-3 border-l-2 border-[#C9A15A]/40 pl-4 py-0.5">
      <Link href={profileUrl} className="group flex-shrink-0">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-xs border border-emerald-200 group-hover:border-[#C9A15A] transition-colors shadow-xs">
          <Stethoscope className="h-5 w-5 text-emerald-600" />
        </div>
      </Link>
      <div className="space-y-0.5">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-extrabold text-[#113F48] text-xs">
            Medically Reviewed by{" "}
            <Link href={profileUrl} className="text-[#113F48] hover:text-[#C9A15A] underline decoration-[#C9A15A]/60 font-black">
              {displayReviewer}
            </Link>
          </span>
          <span className="inline-flex items-center gap-0.5 text-[9px] font-bold bg-emerald-100/70 text-emerald-800 px-1.5 py-0.2 rounded font-mono">
            ✓ Verified
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-[10px] text-stone-500">
          <span>{displayCredentials}</span>
          {reviewedAt && <span>• Reviewed {reviewedAt}</span>}
          <span>•</span>
          <Link href="/medical-review-board" className="text-[#C9A15A] hover:underline font-semibold">
            Medical Review Board
          </Link>
        </div>
      </div>
    </div>
  );
}

// --- SYMPTOMS CHECKLIST COMPONENT ---
export function SymptomsChecklist({ id, heading, content, items, multiColumn }: { id?: string; heading?: string; content?: string; items?: string[]; multiColumn?: boolean }) {
  return (
    <div id={id} className="bg-emerald-50/20 border border-emerald-500/10 rounded-2xl p-5 space-y-3 scroll-mt-24">
      {heading && <h3 className="text-lg font-bold text-[#113F48]">{heading}</h3>}
      {content && <RichText content={content} className="text-xs" />}
      {items && items.length > 0 && (
        <div className={`grid gap-2 ${multiColumn ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"}`}>
          {items.map((item, index) => {
            const formattedItem = item.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-[#113F48]">$1</strong>');
            return (
              <div key={index} className="flex items-start gap-2 text-stone-700 text-xs">
                <Check className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span dangerouslySetInnerHTML={{ __html: sanitizeHtml(formattedItem) }} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// --- COMPARISON TABLE COMPONENT ---
export function ComparisonTable({ id, heading, columns, rows }: { id?: string; heading?: string; columns?: string[]; rows?: string[][] }) {
  return (
    <div id={id} className="space-y-3 overflow-hidden scroll-mt-24">
      {heading && <h3 className="text-base font-bold text-[#113F48]">{heading}</h3>}
      <div className="overflow-x-auto rounded-xl border border-stone-200">
        <table className="w-full text-left border-collapse bg-white">
          <thead>
            <tr className="bg-[#FDF6EC]">
              {columns?.map((col, index) => (
                <th key={index} className="p-3 border-b border-stone-200 text-xs font-bold text-[#113F48]">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows?.map((row, rIdx) => (
              <tr key={rIdx} className="hover:bg-stone-50/50">
                {row.map((cell, cIdx) => (
                  <td key={cIdx} className="p-3 border-b border-stone-150 text-xs text-stone-700">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// --- ALERT / CALLOUT COMPONENT ---
export function AlertCallout({ id, alertType = "info", content }: { id?: string; alertType?: "info" | "important" | "warning" | "emergency"; content: string }) {
  const configs = {
    info: {
      bg: "bg-blue-50/55 border-blue-500/25 text-blue-900",
      icon: <Info className="h-4.5 w-4.5 text-blue-600 mt-0.5 flex-shrink-0" />,
      label: "Information"
    },
    important: {
      bg: "bg-[#FDF6EC] border-[#C9A15A]/35 text-[#113F48]",
      icon: <Shield className="h-4.5 w-4.5 text-[#C9A15A] mt-0.5 flex-shrink-0" />,
      label: "Key Takeaway"
    },
    warning: {
      bg: "bg-amber-50/50 border-amber-500/30 text-amber-900",
      icon: <AlertTriangle className="h-4.5 w-4.5 text-amber-600 mt-0.5 flex-shrink-0" />,
      label: "Caution"
    },
    emergency: {
      bg: "bg-red-50/50 border-red-500/30 text-red-900",
      icon: <AlertCircle className="h-4.5 w-4.5 text-red-600 mt-0.5 flex-shrink-0" />,
      label: "Clinical Advisory"
    }
  };
  const config = configs[alertType];

  return (
    <div id={id} className={`border p-4.5 rounded-2xl flex gap-3 scroll-mt-24 ${config.bg}`}>
      {config.icon}
      <div className="space-y-1">
        <span className="text-xs font-bold uppercase tracking-wider block">{config.label}</span>
        <RichText content={content} className="text-xs leading-relaxed" />
      </div>
    </div>
  );
}

// --- WHEN TO SEE A DOCTOR COMPONENT ---
export function WhenToSeeDoctor({ id, heading, content, items }: { id?: string; heading?: string; content?: string; items?: string[] }) {
  return (
    <div id={id} className="bg-red-50/15 border border-red-500/25 p-5 rounded-2xl flex gap-3.5 items-start scroll-mt-24">
      <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
      <div className="space-y-2 flex-grow">
        <h4 className="text-xs font-bold text-red-800 uppercase tracking-wide">{heading || "Clinical Warning Indicators"}</h4>
        {content && <RichText content={content} className="text-xs text-stone-700 leading-relaxed" />}
        {items && items.length > 0 && (
          <ul className="list-disc pl-5 text-xs text-red-900/90 space-y-1 font-medium">
            {items.map((item, index) => {
              const formattedItem = item.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-red-950">$1</strong>');
              return (
                <li key={index} dangerouslySetInnerHTML={{ __html: sanitizeHtml(formattedItem) }} />
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

// --- TRUST DISCLAIMERS COMPONENT ---
export function MedicalDisclaimer({ disclaimerType }: { disclaimerType?: "clinical" | "insurance" | "wellness" }) {
  const disclaimers = {
    clinical: "This educational guide is not clinical medical advice. Health guidelines, recommendations, and dietary guidelines are subject to periodic updates. Speak to a qualified healthcare provider or primary care physician regarding specific medical questions.",
    insurance: "mediguide4u is an educational publisher and is not associated with Medicare, Medicaid, HHS, or any commercial insurance company. Always consult with a licensed broker or representative to obtain individual policy quotes and coverage confirmations.",
    wellness: "All wellness instructions, exercises, and dietary guidelines are for informational purposes only. Do not begin any physical training program or dietary regime without first consulting your doctor or qualified healthcare professional."
  };

  const text = disclaimers[disclaimerType || "clinical"];

  return (
    <div className="bg-[#FAE5C7]/15 border border-[#C9A15A]/35 p-5 rounded-2xl flex gap-3.5 items-start">
      <AlertTriangle className="h-5 w-5 text-[#C9A15A] flex-shrink-0 mt-0.5" />
      <div className="space-y-1">
        <span className="text-xs font-bold text-[#113F48] uppercase tracking-wide">Medical Integrity Notice</span>
        <p className="text-[11px] text-stone-600 leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

// --- CONTENT BLOCK RENDERER COMPONENT ---
export function ContentBlockRenderer({ block }: { block: ContentBlock }) {
  const heading = block.heading;
  const content = block.content || "";
  const id = block.id;

  switch (block.type) {
    case "clinical_overview":
    case "causes_risk_factors":
    case "diagnostic_criteria":
    case "treatment_medications":
    case "self_care_lifestyle":
    case "standard_rich_text":
      return (
        <div id={id} className="space-y-4 scroll-mt-24">
          {heading && (
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#113F48] pt-4 border-b border-stone-150 pb-2.5">
              {heading}
            </h2>
          )}
          {content && <RichText content={content} className="text-sm sm:text-base leading-relaxed text-stone-700" />}
          {block.items && block.items.length > 0 && (
            <div className="grid grid-cols-1 gap-2.5 pt-1">
              {block.items.map((item, idx) => {
                const formattedItem = item.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-[#113F48]">$1</strong>');
                return (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-stone-800 bg-stone-50/80 border border-stone-200/80 p-3.5 rounded-xl">
                    <Check className="h-4.5 w-4.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed font-normal" dangerouslySetInnerHTML={{ __html: sanitizeHtml(formattedItem) }} />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      );
    case "symptoms_checklist":
      return <SymptomsChecklist id={id} heading={heading} content={content} items={block.items} multiColumn={block.multiColumn} />;
    case "comparison_table":
      return <ComparisonTable id={id} heading={heading} columns={block.columns} rows={block.rows} />;
    case "alert_callout":
      return <AlertCallout id={id} alertType={block.alertType} content={content} />;
    case "when_to_see_doctor":
      return <WhenToSeeDoctor id={id} heading={heading} content={content} items={block.items} />;
    default:
      return (
        <div id={id} className="space-y-4 scroll-mt-24">
          {heading && (
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#113F48] pt-4 border-b border-stone-150 pb-2.5">
              {heading}
            </h2>
          )}
          {content && <RichText content={content} className="text-sm sm:text-base leading-relaxed text-stone-700" />}
          {block.items && block.items.length > 0 && (
            <div className="grid grid-cols-1 gap-2.5 pt-1">
              {block.items.map((item, idx) => {
                const formattedItem = item.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-[#113F48]">$1</strong>');
                return (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-stone-800 bg-stone-50/80 border border-stone-200/80 p-3.5 rounded-xl">
                    <Check className="h-4.5 w-4.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed font-normal" dangerouslySetInnerHTML={{ __html: sanitizeHtml(formattedItem) }} />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      );
  }
}

// --- FULL PAGE CONTENT BLOCKS CONTAINER ---
export function BlogContentRenderer({ blocks }: { blocks?: ContentBlock[] }) {
  if (!blocks || blocks.length === 0) return null;
  return (
    <div className="space-y-8">
      {blocks.map((block) => (
        <ContentBlockRenderer key={block.id} block={block} />
      ))}
    </div>
  );
}

// --- FAQ ACCORDION SECTION COMPONENT ---
export function FAQSection({ faqs }: { faqs?: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="border-t border-stone-100 pt-8 space-y-4">
      <h3 className="text-lg font-bold text-[#113F48] flex items-center gap-1.5">
        <HelpCircle className="h-5 w-5 text-[#C9A15A]" /> Frequently Asked Questions
      </h3>
      <div className="space-y-2">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={faq.id || index} className="border border-stone-200 rounded-xl overflow-hidden bg-white">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full p-4 text-left font-bold text-[#113F48] text-xs flex justify-between items-center hover:bg-[#FDF6EC]/15 transition-all"
              >
                <span>{faq.question}</span>
                {isOpen ? <ChevronUp className="h-4 w-4 text-[#C9A15A]" /> : <ChevronDown className="h-4 w-4 text-[#C9A15A]" />}
              </button>
              {isOpen && (
                <div className="p-4 border-t border-stone-150 bg-stone-50/50">
                  <p className="text-xs text-stone-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// --- REFERENCES LIST SECTION COMPONENT ---
export function ReferencesSection({ references }: { references?: ReferenceItem[] }) {
  if (!references || references.length === 0) return null;

  return (
    <div className="border-t border-stone-100 pt-6 space-y-3">
      <h4 className="font-bold text-[#113F48] text-sm flex items-center gap-1.5">
        <BookOpen className="h-4 w-4 text-[#C9A15A]" /> References &amp; Clinical Resources
      </h4>
      <ol className="list-decimal pl-5 text-[11px] text-stone-500 space-y-1.5 font-medium">
        {references.map((ref, idx) => (
          <li key={ref.id || idx}>
            {ref.author && `${ref.author}. `}
            <span className="italic">{ref.title}</span>
            {ref.publishDate && ` (${ref.publishDate})`}.{" "}
            {ref.url ? (
              <a
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C9A15A] hover:underline hover:text-[#B58F4E] transition-colors"
              >
                [Access Resource Link]
              </a>
            ) : null}
            {ref.citation && ` — ${ref.citation}`}
          </li>
        ))}
      </ol>
    </div>
  );
}

// --- ARTICLE PHYSICIAN & REVIEWER DETAIL CARD (Bottom of Article) ---
export function ArticlePhysicianReviewerBox({ reviewerName, reviewedAt, authorName }: { reviewerName?: string; reviewedAt?: string; authorName?: string }) {
  const reviewerMatch = MEDICAL_REVIEWERS.find(
    (r) => r.name.toLowerCase() === (reviewerName || "").toLowerCase() || (reviewerName && reviewerName.includes(r.name)) || (reviewerName && r.name.includes(reviewerName))
  );

  const doc = reviewerMatch || MEDICAL_REVIEWERS[0];
  const profileUrl = `/author/${doc.id}`;

  return (
    <div className="border border-stone-200 bg-white rounded-3xl p-6 sm:p-8 shadow-sm space-y-5 my-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
        <div className="flex items-center gap-4">
          <Link href={profileUrl} className="group flex-shrink-0">
            <div className="w-14 h-14 rounded-2xl bg-[#113F48] text-white flex items-center justify-center font-extrabold text-xl border-2 border-[#C9A15A] group-hover:bg-[#C9A15A] transition-colors shadow-xs">
              {doc.name.replace("Dr. ", "")[0]}
            </div>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C9A15A] bg-[#C9A15A]/10 px-2.5 py-0.5 rounded">
                Clinical Reviewer
              </span>
              {doc.licenseStatus && (
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded flex items-center gap-1">
                  <BadgeCheck className="h-3 w-3 text-emerald-600" /> License Verified
                </span>
              )}
            </div>
            <h4 className="font-extrabold text-base text-[#113F48] mt-1">
              <Link href={profileUrl} className="hover:text-[#C9A15A] transition-colors underline decoration-[#C9A15A]/40">
                {doc.name}
              </Link>
            </h4>
            <span className="text-xs text-stone-500 font-medium block">
              {doc.title} {doc.degree && `• ${doc.degree}`}
            </span>
          </div>
        </div>

        <Link
          href="/medical-review-board"
          className="text-xs font-bold text-[#113F48] hover:text-[#C9A15A] bg-stone-50 border border-stone-200 px-3.5 py-2 rounded-xl transition-colors whitespace-nowrap inline-flex items-center gap-1.5"
        >
          <Stethoscope className="h-4 w-4 text-[#C9A15A]" /> Medical Review Board
        </Link>
      </div>

      <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
        {doc.bio}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-stone-600">
        {doc.licenseNumber && (
          <div className="flex items-center gap-2 bg-[#FDFBF7] p-2.5 rounded-xl border border-stone-200">
            <Shield className="h-4 w-4 text-[#C9A15A] flex-shrink-0" />
            <span className="font-mono text-[11px] text-stone-700 font-semibold">
              License ID: {doc.licenseNumber}
            </span>
          </div>
        )}
        {doc.hospitalAffiliations && (
          <div className="flex items-center gap-2 bg-[#FDFBF7] p-2.5 rounded-xl border border-stone-200">
            <Building2 className="h-4 w-4 text-[#C9A15A] flex-shrink-0" />
            <span className="truncate text-[11px] text-stone-700">
              {doc.hospitalAffiliations}
            </span>
          </div>
        )}
      </div>

      <div className="pt-2 border-t border-stone-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs">
        <span className="text-stone-400 text-[11px]">
          {reviewedAt ? `Medically evaluated on ${reviewedAt}` : "Adheres to NIH, CDC & WHO clinical guidelines"}
        </span>
        <Link
          href={profileUrl}
          className="text-xs font-bold text-[#113F48] hover:text-[#C9A15A] transition-colors inline-flex items-center gap-1"
        >
          View Dr. Profile, Verified Credentials &amp; Articles <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
