"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BlogPost, BlogCategory, FAQItem } from "@/lib/db";
import { 
  Map, 
  Shield, 
  ArrowRight, 
  Home, 
  Search, 
  Award, 
  TrendingUp, 
  Clock, 
  ChevronRight,
  ExternalLink,
  HelpCircle,
  AlertCircle,
  Folder,
  FileText,
  BookOpen,
  CheckCircle2
} from "lucide-react";

interface SitemapClientViewProps {
  initialPosts: BlogPost[];
  initialCategories: BlogCategory[];
  initialFaqs: FAQItem[];
}

export default function SitemapClientView({
  initialPosts,
  initialCategories,
  initialFaqs,
}: SitemapClientViewProps) {
  const [posts] = useState<BlogPost[]>(initialPosts);
  const [categories] = useState<BlogCategory[]>(initialCategories);
  const [faqs] = useState<FAQItem[]>(initialFaqs);
  const [searchQuery, setSearchQuery] = useState("");

  const matchesSearch = (text: string) => {
    return text.toLowerCase().includes(searchQuery.toLowerCase());
  };

  const coreRoutes = [
    { label: "Home Page", href: "/" },
    { label: "Health Calculators & Tools", href: "/tools" },
    { label: "Health & Lifestyle Quizzes", href: "/quizzes" },
    { label: "About Us", href: "/about" },
    { label: "Medical Review Board", href: "/medical-review-board" },
    { label: "Editorial Team & Contributors", href: "/authors" },
    { label: "Contact Support & Inquiries", href: "/contact" },
    { label: "Healthcare Guides Catalog", href: "/blog" },
    { label: "Medical FAQ Directory", href: "/faq" },
  ];

  const legalRoutes = [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
    { label: "Cookie Policy", href: "/cookie-policy" },
    { label: "Medical Disclaimer", href: "/medical-disclaimer" },
    { label: "Editorial Policy", href: "/editorial-policy" },
    { label: "Advertising Policy", href: "/advertising-policy" },
    { label: "Affiliate Disclosure", href: "/affiliate-disclosure" },
    { label: "Corrections Policy", href: "/corrections-policy" },
    { label: "Accessibility Statement", href: "/accessibility" },
    { label: "DMCA Policy", href: "/dmca" },
  ];

  // Filtering
  const filteredCore = coreRoutes.filter(link => matchesSearch(link.label));
  const filteredLegal = legalRoutes.filter(link => matchesSearch(link.label));
  const filteredCategories = categories.filter(cat => matchesSearch(cat.name));
  
  const filteredPosts = posts.filter(post => 
    matchesSearch(post.title) || 
    matchesSearch(post.summary || "") ||
    matchesSearch(post.category || "") ||
    matchesSearch(post.subcategory || "")
  );

  const filteredFaqs = faqs.filter(faq => 
    matchesSearch(faq.question) || 
    matchesSearch(faq.answer)
  );

  // Group all 46 posts by Category
  const normalize = (str: string) => (str || "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const categoriesWithPosts = categories.map((cat) => {
    const catSlugNorm = normalize(cat.slug);
    const catNameNorm = normalize(cat.name);

    const catPosts = filteredPosts.filter((post) => {
      const postCatNorm = normalize(post.category);
      return (
        postCatNorm === catSlugNorm ||
        postCatNorm === catNameNorm ||
        postCatNorm.includes(catSlugNorm) ||
        catSlugNorm.includes(postCatNorm)
      );
    });

    return {
      category: cat,
      posts: catPosts,
    };
  }).filter((item) => item.posts.length > 0 || (searchQuery === "" && categories.length > 0));

  // Catch any uncategorized posts to guarantee 100% of all 46 posts are shown
  const matchedPostSlugs = new Set(
    categoriesWithPosts.flatMap((item) => item.posts.map((p) => p.slug))
  );
  const uncategorizedPosts = filteredPosts.filter((p) => !matchedPostSlugs.has(p.slug));

  // Totals calculations
  const totalPagesIndexed = 
    coreRoutes.length + 
    legalRoutes.length + 
    categories.length + 
    posts.length + 
    faqs.length;

  const totalResultsCount = 
    filteredCore.length + 
    filteredLegal.length + 
    filteredCategories.length + 
    filteredPosts.length + 
    filteredFaqs.length;

  return (
    <main className="flex-grow py-12">
      <div className="w-full mx-auto px-4 sm:px-8 md:px-12 lg:px-16 max-w-6xl space-y-10">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[11px] font-bold text-stone-400 uppercase tracking-wider">
          <Link href="/" className="hover:text-[#C9A15A] hover:underline transition-colors cursor-pointer">Home</Link>
          <ChevronRight className="h-3 w-3 text-stone-300" />
          <span className="text-[#113F48]">HTML Sitemap</span>
        </nav>

        {/* Page Banner Header */}
        <div className="bg-white border border-[#C9A15A]/25 p-8 rounded-3xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A15A]/10 border border-[#C9A15A]/25 text-[10px] font-bold uppercase tracking-wider text-[#C9A15A]">
                <CheckCircle2 className="h-3.5 w-3.5" /> Comprehensive Platform Index
              </span>
              <a 
                href="/sitemap.xml" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-stone-100 hover:bg-stone-200 border border-stone-200 text-[10px] font-bold uppercase tracking-wider text-stone-700 transition-colors"
              >
                XML Sitemap (for Google / Bots) <ExternalLink className="h-3 w-3 ml-0.5" />
              </a>
            </div>
            <h1 className="text-3xl font-extrabold text-[#113F48] flex items-center gap-2">
              <Map className="h-7 w-7 text-[#C9A15A]" /> HTML Sitemap &amp; Directory
            </h1>
            <p className="text-xs text-stone-500 max-w-xl">
              Complete index of all {posts.length} physician-verified healthcare guides, {categories.length} clinical categories, {legalRoutes.length} policy disclosures, and FAQ resources on mediguide4u.
            </p>
          </div>
          
          {/* Search Input */}
          <div className="relative w-full md:max-w-xs bg-[#FDFBF7] border border-stone-200 rounded-xl p-1 flex items-center shadow-inner">
            <Search className="h-4 w-4 text-stone-400 ml-2.5" />
            <input
              type="text"
              placeholder="Search all guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent px-2.5 py-1.5 text-xs text-[#113F48] focus:outline-none"
            />
          </div>
        </div>

        {/* SEARCH EMPTY STATE */}
        {totalResultsCount === 0 && (
          <div className="bg-white border border-stone-200 rounded-2xl p-12 text-center max-w-md mx-auto space-y-3">
            <AlertCircle className="h-10 w-10 text-stone-300 mx-auto" />
            <h4 className="font-extrabold text-stone-700 text-sm">No pages found</h4>
            <p className="text-xs text-stone-500">Try searching another medical topic or review our directory links below.</p>
            <button 
              onClick={() => setSearchQuery("")}
              className="text-xs font-bold text-[#C9A15A] hover:underline cursor-pointer"
            >
              Clear Search Filter
            </button>
          </div>
        )}

        {/* TOP THREE DIRECTORY CARDS */}
        {totalResultsCount > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Column 1: Core Directory */}
            <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-sm space-y-4">
              <h2 className="font-extrabold text-sm text-[#113F48] flex items-center justify-between border-b border-stone-100 pb-2.5">
                <span className="flex items-center gap-2">
                  <Home className="h-4.5 w-4.5 text-[#C9A15A]" /> Core Directory
                </span>
                <span className="text-[10px] bg-[#C9A15A]/10 text-[#C9A15A] px-2.5 py-0.5 rounded-full font-bold">
                  {filteredCore.length}
                </span>
              </h2>
              <div className="space-y-1.5">
                {filteredCore.map((link) => (
                  <Link 
                    key={link.href}
                    href={link.href} 
                    className="group flex items-center justify-between text-xs font-bold text-stone-600 hover:text-[#C9A15A] hover:underline hover:bg-stone-50/50 p-2 rounded-xl transition-all cursor-pointer w-full"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all text-[#C9A15A]" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 2: Legal Disclosures */}
            <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-sm space-y-4">
              <h2 className="font-extrabold text-sm text-[#113F48] flex items-center justify-between border-b border-stone-100 pb-2.5">
                <span className="flex items-center gap-2">
                  <Shield className="h-4.5 w-4.5 text-[#C9A15A]" /> Legal &amp; Policies
                </span>
                <span className="text-[10px] bg-[#C9A15A]/10 text-[#C9A15A] px-2.5 py-0.5 rounded-full font-bold">
                  {filteredLegal.length}
                </span>
              </h2>
              <div className="space-y-1.5">
                {filteredLegal.map((link) => (
                  <Link 
                    key={link.href}
                    href={link.href} 
                    className="group flex items-center justify-between text-xs font-bold text-stone-600 hover:text-[#C9A15A] hover:underline hover:bg-stone-50/50 p-2 rounded-xl transition-all cursor-pointer w-full"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all text-[#C9A15A]" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 3: Health Categories */}
            <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-sm space-y-4">
              <h2 className="font-extrabold text-sm text-[#113F48] flex items-center justify-between border-b border-stone-100 pb-2.5">
                <span className="flex items-center gap-2">
                  <Folder className="h-4.5 w-4.5 text-[#C9A15A]" /> Health Categories
                </span>
                <span className="text-[10px] bg-[#C9A15A]/10 text-[#C9A15A] px-2.5 py-0.5 rounded-full font-bold">
                  {filteredCategories.length}
                </span>
              </h2>
              <div className="space-y-1.5">
                {filteredCategories.map((cat) => (
                  <Link 
                    key={cat.slug || cat.name}
                    href={`/category/${cat.slug}`} 
                    className="group flex items-center justify-between text-xs font-bold text-stone-600 hover:text-[#C9A15A] hover:underline hover:bg-stone-50/50 p-2 rounded-xl transition-all cursor-pointer w-full"
                  >
                    <span>{cat.name}</span>
                    <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all text-[#C9A15A]" />
                  </Link>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ── COMPLETE ALL 46 MEDICAL ARTICLES DIRECTORY BY CATEGORY ── */}
        {totalResultsCount > 0 && (
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-stone-200 pb-4">
              <div>
                <h2 className="text-xl font-extrabold text-[#113F48] flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-[#C9A15A]" /> All Healthcare &amp; Medical Guides ({filteredPosts.length} Articles)
                </h2>
                <p className="text-xs text-stone-500 mt-1">
                  Browse our complete directory of medically-reviewed clinical healthcare resources organized by topic area.
                </p>
              </div>
              <Link 
                href="/blog" 
                className="text-xs font-bold text-[#C9A15A] hover:underline flex items-center gap-1 shrink-0"
              >
                View Blog Grid <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoriesWithPosts.map(({ category, posts: catPosts }) => (
                <div 
                  key={category.slug} 
                  className="bg-white border border-stone-200 p-6 rounded-2xl shadow-sm space-y-4 flex flex-col justify-between hover:border-[#C9A15A]/40 transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
                      <Link 
                        href={`/category/${category.slug}`}
                        className="font-extrabold text-sm text-[#113F48] hover:text-[#C9A15A] transition-colors flex items-center gap-1.5"
                      >
                        <Folder className="h-4 w-4 text-[#C9A15A]" /> {category.name}
                      </Link>
                      <span className="text-[10px] bg-[#C9A15A]/10 text-[#C9A15A] px-2.5 py-0.5 rounded-full font-bold">
                        {catPosts.length} {catPosts.length === 1 ? 'Guide' : 'Guides'}
                      </span>
                    </div>

                    <ul className="space-y-2">
                      {catPosts.map((post) => (
                        <li key={post.slug}>
                          <Link 
                            href={`/blog/${post.slug}`}
                            className="group flex items-start gap-1.5 text-xs text-stone-600 hover:text-[#C9A15A] hover:underline transition-colors"
                          >
                            <span className="text-[#C9A15A] font-bold mt-0.5">•</span>
                            <span className="line-clamp-2 leading-snug">{post.title}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-stone-100">
                    <Link 
                      href={`/category/${category.slug}`}
                      className="text-[11px] font-bold text-[#113F48] hover:text-[#C9A15A] inline-flex items-center gap-1 transition-colors"
                    >
                      Browse {category.name} Hub <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              ))}

              {/* Uncategorized fallback section if any */}
              {uncategorizedPosts.length > 0 && (
                <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-sm space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
                      <span className="font-extrabold text-sm text-[#113F48] flex items-center gap-1.5">
                        <FileText className="h-4 w-4 text-[#C9A15A]" /> Additional Health Guides
                      </span>
                      <span className="text-[10px] bg-[#C9A15A]/10 text-[#C9A15A] px-2.5 py-0.5 rounded-full font-bold">
                        {uncategorizedPosts.length}
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {uncategorizedPosts.map((post) => (
                        <li key={post.slug}>
                          <Link 
                            href={`/blog/${post.slug}`}
                            className="group flex items-start gap-1.5 text-xs text-stone-600 hover:text-[#C9A15A] hover:underline transition-colors"
                          >
                            <span className="text-[#C9A15A] font-bold mt-0.5">•</span>
                            <span className="line-clamp-2 leading-snug">{post.title}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* DYNAMIC FAQ DIRECTORY */}
        {totalResultsCount > 0 && filteredFaqs.length > 0 && (
          <section className="bg-white border border-stone-200 p-6 rounded-2xl shadow-sm space-y-4">
            <h2 className="font-extrabold text-sm text-[#113F48] flex items-center justify-between border-b border-stone-100 pb-2.5">
              <span className="flex items-center gap-2">
                <HelpCircle className="h-4.5 w-4.5 text-[#C9A15A]" /> Medical Resources &amp; FAQ Articles ({filteredFaqs.length})
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-semibold text-stone-600">
              {filteredFaqs.map((faq) => (
                <Link 
                  key={faq.id} 
                  href="/faq" 
                  className="group flex items-center justify-between hover:text-[#C9A15A] hover:underline hover:bg-stone-50/50 p-2.5 rounded-xl transition-all cursor-pointer w-full"
                >
                  <span className="truncate">• {faq.question}</span>
                  <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all text-[#C9A15A] shrink-0 ml-2" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* SITEMAP FOOTER METADATA PANEL */}
        <div className="bg-white border border-[#C9A15A]/15 p-6 rounded-2xl shadow-sm flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold text-stone-500">
          <div className="flex flex-col gap-1 text-center md:text-left">
            <span>Last Medically Reviewed &amp; Updated: August 2026</span>
            <span className="text-[10px] text-stone-400 font-bold">Total Platform Pages Indexed: {totalPagesIndexed} Pages ({posts.length} Medical Articles)</span>
          </div>
          <div className="flex gap-4">
            <a href="/sitemap.xml" target="_blank" className="hover:text-[#C9A15A] hover:underline transition-colors flex items-center gap-1 font-bold text-[#113F48]">
              XML Sitemap <ExternalLink className="h-3 w-3" />
            </a>
            <span>•</span>
            <Link href="/" className="hover:text-[#C9A15A] hover:underline transition-colors">
              Back to Home
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
