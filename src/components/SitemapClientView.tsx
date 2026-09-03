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
  Folder
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
    { label: "About Us", href: "/about" },
    { label: "Editorial & Medical Board", href: "/authors" },
    { label: "Contact Support", href: "/contact" },
    { label: "Blogs & Guides Catalog", href: "/blog" },
    { label: "FAQ Directory", href: "/faq" },
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
    matchesSearch(post.category || "")
  );

  const filteredFaqs = faqs.filter(faq => 
    matchesSearch(faq.question) || 
    matchesSearch(faq.answer)
  );

  // Partitioning Articles
  const featuredArticles = filteredPosts.filter(p => p.featured);
  const displayFeatured = featuredArticles.length > 0 ? featuredArticles : filteredPosts.slice(0, 4);
  const latestArticles = filteredPosts.filter(p => !p.featured).slice(0, 6);
  const displayLatest = latestArticles.length > 0 ? latestArticles : filteredPosts.slice(4, 10);
  const popularArticles = filteredPosts.filter(p => p.views && p.views > 0);
  const displayPopular = popularArticles.length > 0 ? popularArticles : filteredPosts.slice(0, 5);

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
        <nav className="flex items-center gap-1.5 text-[11px] font-bold text-stone-400 uppercase tracking-wider">
          <Link href="/" className="hover:text-[#C9A15A] hover:underline transition-colors cursor-pointer">Home</Link>
          <ChevronRight className="h-3 w-3 text-stone-300" />
          <span className="text-[#113F48]">Sitemap</span>
        </nav>

        {/* Page Banner Header */}
        <div className="bg-white border border-[#C9A15A]/25 p-8 rounded-3xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A15A]/10 border border-[#C9A15A]/25 text-[10px] font-bold uppercase tracking-wider text-[#C9A15A]">
              ✓ Interactive Platform Map
            </span>
            <h1 className="text-3xl font-extrabold text-[#113F48] flex items-center gap-2">
              <Map className="h-7 w-7 text-[#C9A15A]" /> HTML Sitemap
            </h1>
            <p className="text-xs text-stone-500 max-w-xl">
              Explore a comprehensive index of medical guides, legal declarations, resource categories, and FAQ listings.
            </p>
          </div>
          
          {/* Search Input */}
          <div className="relative w-full md:max-w-xs bg-[#FDFBF7] border border-stone-200 rounded-xl p-1 flex items-center shadow-inner">
            <Search className="h-4 w-4 text-stone-400 ml-2.5" />
            <input
              type="text"
              placeholder="Search sitemap pages..."
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
            <p className="text-xs text-stone-500">Try searching another keyword or review our directory links below.</p>
            <button 
              onClick={() => setSearchQuery("")}
              className="text-xs font-bold text-[#C9A15A] hover:underline cursor-pointer"
            >
              Clear Search Filter
            </button>
          </div>
        )}

        {/* MAIN THREE COLUMN GRID (Static Directory Pages) */}
        {totalResultsCount > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Column 1: Core Directory */}
            <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-sm space-y-4">
              <h3 className="font-extrabold text-sm text-[#113F48] flex items-center justify-between border-b border-stone-100 pb-2.5">
                <span className="flex items-center gap-2">
                  <Home className="h-4.5 w-4.5 text-[#C9A15A]" /> Core Directory
                </span>
                <span className="text-[10px] bg-[#C9A15A]/10 text-[#C9A15A] px-2.5 py-0.5 rounded-full font-bold">
                  {filteredCore.length} / {coreRoutes.length}
                </span>
              </h3>
              <div className="space-y-2">
                {filteredCore.map((link) => (
                  <Link 
                    key={link.href}
                    href={link.href} 
                    className="group flex items-center justify-between text-xs font-bold text-stone-600 hover:text-[#C9A15A] hover:underline hover:bg-stone-50/50 p-2.5 rounded-xl transition-all cursor-pointer w-full"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all text-[#C9A15A]" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 2: Legal Disclosures */}
            <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-sm space-y-4">
              <h3 className="font-extrabold text-sm text-[#113F48] flex items-center justify-between border-b border-stone-100 pb-2.5">
                <span className="flex items-center gap-2">
                  <Shield className="h-4.5 w-4.5 text-[#C9A15A]" /> Legal &amp; Policies
                </span>
                <span className="text-[10px] bg-[#C9A15A]/10 text-[#C9A15A] px-2.5 py-0.5 rounded-full font-bold">
                  {filteredLegal.length} / {legalRoutes.length}
                </span>
              </h3>
              <div className="space-y-2">
                {filteredLegal.map((link) => (
                  <Link 
                    key={link.href}
                    href={link.href} 
                    className="group flex items-center justify-between text-xs font-bold text-stone-600 hover:text-[#C9A15A] hover:underline hover:bg-stone-50/50 p-2.5 rounded-xl transition-all cursor-pointer w-full"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all text-[#C9A15A]" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 3: Health Categories */}
            <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-sm space-y-4">
              <h3 className="font-extrabold text-sm text-[#113F48] flex items-center justify-between border-b border-stone-100 pb-2.5">
                <span className="flex items-center gap-2">
                  <Folder className="h-4.5 w-4.5 text-[#C9A15A]" /> Health Categories
                </span>
                <span className="text-[10px] bg-[#C9A15A]/10 text-[#C9A15A] px-2.5 py-0.5 rounded-full font-bold">
                  {filteredCategories.length} / {categories.length}
                </span>
              </h3>
              <div className="space-y-2">
                {filteredCategories.map((cat) => (
                  <Link 
                    key={cat.slug || cat.name}
                    href={`/category/${cat.slug}`} 
                    className="group flex items-center justify-between text-xs font-bold text-stone-600 hover:text-[#C9A15A] hover:underline hover:bg-stone-50/50 p-2.5 rounded-xl transition-all cursor-pointer w-full"
                  >
                    <span>{cat.name}</span>
                    <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all text-[#C9A15A]" />
                  </Link>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* DYNAMIC ARTICLE DIRECTORY SECTIONS */}
        {totalResultsCount > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Featured Articles Section */}
            <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-sm space-y-4">
              <h3 className="font-extrabold text-sm text-[#113F48] flex items-center justify-between border-b border-stone-100 pb-2.5">
                <span className="flex items-center gap-2">
                  <Award className="h-4.5 w-4.5 text-[#C9A15A]" /> Featured Articles
                </span>
                <span className="text-[10px] bg-[#C9A15A]/10 text-[#C9A15A] px-2.5 py-0.5 rounded-full font-bold">
                  {displayFeatured.length}
                </span>
              </h3>
              <div className="space-y-2">
                {displayFeatured.map((post) => (
                  <Link 
                    key={post.slug} 
                    href={`/blog/${post.slug}`} 
                    className="group flex items-center justify-between text-xs font-bold text-stone-600 hover:text-[#C9A15A] hover:underline hover:bg-stone-50/50 p-2.5 rounded-xl transition-all cursor-pointer w-full"
                  >
                    <span className="truncate">• {post.title}</span>
                    <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all text-[#C9A15A] shrink-0 ml-2" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Latest Publications Section */}
            <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-sm space-y-4">
              <h3 className="font-extrabold text-sm text-[#113F48] flex items-center justify-between border-b border-stone-100 pb-2.5">
                <span className="flex items-center gap-2">
                  <Clock className="h-4.5 w-4.5 text-[#C9A15A]" /> Latest Publications
                </span>
                <span className="text-[10px] bg-[#C9A15A]/10 text-[#C9A15A] px-2.5 py-0.5 rounded-full font-bold">
                  {displayLatest.length}
                </span>
              </h3>
              <div className="space-y-2">
                {displayLatest.map((post) => (
                  <Link 
                    key={post.slug} 
                    href={`/blog/${post.slug}`} 
                    className="group flex items-center justify-between text-xs font-bold text-stone-600 hover:text-[#C9A15A] hover:underline hover:bg-stone-50/50 p-2.5 rounded-xl transition-all cursor-pointer w-full"
                  >
                    <span className="truncate">• {post.title}</span>
                    <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all text-[#C9A15A] shrink-0 ml-2" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Popular Guides Section */}
            <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-sm space-y-4">
              <h3 className="font-extrabold text-sm text-[#113F48] flex items-center justify-between border-b border-stone-100 pb-2.5">
                <span className="flex items-center gap-2">
                  <TrendingUp className="h-4.5 w-4.5 text-[#C9A15A]" /> Popular Guides
                </span>
                <span className="text-[10px] bg-[#C9A15A]/10 text-[#C9A15A] px-2.5 py-0.5 rounded-full font-bold">
                  {displayPopular.length}
                </span>
              </h3>
              <div className="space-y-2">
                {displayPopular.map((post) => (
                  <Link 
                    key={post.slug} 
                    href={`/blog/${post.slug}`} 
                    className="group flex items-center justify-between text-xs font-bold text-stone-600 hover:text-[#C9A15A] hover:underline hover:bg-stone-50/50 p-2.5 rounded-xl transition-all cursor-pointer w-full"
                  >
                    <span className="truncate">• {post.title}</span>
                    <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all text-[#C9A15A] shrink-0 ml-2" />
                  </Link>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* DYNAMIC FAQ ARTICLES DIRECTORY */}
        {totalResultsCount > 0 && filteredFaqs.length > 0 && (
          <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-sm space-y-4">
            <h3 className="font-extrabold text-sm text-[#113F48] flex items-center justify-between border-b border-stone-100 pb-2.5">
              <span className="flex items-center gap-2">
                <HelpCircle className="h-4.5 w-4.5 text-[#C9A15A]" /> Medical Resources &amp; FAQ Articles ({filteredFaqs.length})
              </span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold text-stone-600">
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
          </div>
        )}

        {/* SITEMAP FOOTER METADATA PANEL */}
        <div className="bg-white border border-[#C9A15A]/15 p-6 rounded-2xl shadow-sm flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold text-stone-500">
          <div className="flex flex-col gap-1 text-center md:text-left">
            <span>Last Updated: August 2026</span>
            <span className="text-[10px] text-stone-400 font-bold">Total Platform Pages Indexed: {totalPagesIndexed} Pages</span>
          </div>
          <div className="flex gap-4">
            <a href="/sitemap.xml" target="_blank" className="hover:text-[#C9A15A] hover:underline transition-colors flex items-center gap-1">
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
