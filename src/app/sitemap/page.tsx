"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { getPosts, getCategories, BlogPost, BlogCategory } from "@/lib/db";
import { 
  Map, 
  FileText, 
  Folder, 
  Shield, 
  ArrowRight, 
  Home, 
  Search, 
  Award, 
  TrendingUp, 
  Clock, 
  ChevronRight,
  ExternalLink
} from "lucide-react";

export default function HTMLSitemap() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const allPosts = await getPosts();
        const allCats = await getCategories();
        setPosts(allPosts);
        setCategories(allCats);
      } catch (error) {
        console.error("Failed to load sitemap links:", error);
      }
    }
    loadData();
  }, []);

  // Filter lists based on search query
  const matchesSearch = (text: string) => {
    return text.toLowerCase().includes(searchQuery.toLowerCase());
  };

  const coreLinks = [
    { label: "Home Page", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Contact Support", href: "/contact" },
    { label: "Blogs & Guides Catalog", href: "/blog" },
    { label: "FAQ Directory", href: "/faq" },
  ].filter(link => matchesSearch(link.label));

  const legalLinks = [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
    { label: "Cookie Policy", href: "/cookie-policy" },
    { label: "Medical Disclaimer", href: "/medical-disclaimer" },
    { label: "Editorial Policy", href: "/editorial-policy" },
    { label: "Advertising Policy", href: "/advertising-policy" },
    { label: "Corrections Policy", href: "/corrections-policy" },
    { label: "Accessibility Statement", href: "/accessibility" },
  ].filter(link => matchesSearch(link.label));

  const filteredCategories = categories.filter(cat => matchesSearch(cat.name));
  const filteredPosts = posts.filter(post => matchesSearch(post.title) || matchesSearch(post.summary));

  // Partition articles
  const featuredArticles = filteredPosts.filter(p => p.featured);
  const latestArticles = filteredPosts.filter(p => !p.featured).slice(0, 6);

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <Navbar />

      <main className="flex-grow py-12">
        <div className="w-full mx-auto px-4 sm:px-8 md:px-12 lg:px-16 max-w-6xl space-y-10">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-1.5 text-[11px] font-bold text-stone-400 uppercase tracking-wider">
            <Link href="/" className="hover:text-[#C9A15A] transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-[#113F48]">Sitemap</span>
          </nav>

          {/* Page Banner Header */}
          <div className="bg-white border border-[#C9A15A]/25 p-8 rounded-3xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A15A]/10 border border-[#C9A15A]/25 text-[10px] font-bold uppercase tracking-wider text-[#C9A15A]">
                ✓ Dynamic Directory Map
              </span>
              <h1 className="text-3xl font-extrabold text-[#113F48] flex items-center gap-2">
                <Map className="h-7 w-7 text-[#C9A15A]" /> HTML Sitemap
              </h1>
              <p className="text-xs text-stone-500 max-w-xl">
                Quickly locate medical guidelines, legal disclosures, policy reviews, or category feeds across the platform.
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

          {/* MAIN THREE COLUMN GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Column 1: Core Directory */}
            <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-sm space-y-5">
              <h3 className="font-extrabold text-sm text-[#113F48] flex items-center justify-between border-b border-stone-100 pb-2.5">
                <span className="flex items-center gap-2">
                  <Home className="h-4.5 w-4.5 text-[#C9A15A]" /> Core Directory
                </span>
                <span className="text-[10px] bg-stone-100 text-stone-500 px-2 py-0.5 rounded-full font-bold">
                  {coreLinks.length}
                </span>
              </h3>
              <ul className="space-y-4">
                {coreLinks.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href} 
                      className="group flex items-center justify-between text-xs font-bold text-stone-600 hover:text-[#C9A15A] py-1.5 transition-colors"
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-[#C9A15A]" />
                    </Link>
                  </li>
                ))}
                {coreLinks.length === 0 && (
                  <p className="text-xs text-stone-400 italic">No matching pages found.</p>
                )}
              </ul>
            </div>

            {/* Column 2: Legal Disclosures */}
            <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-sm space-y-5">
              <h3 className="font-extrabold text-sm text-[#113F48] flex items-center justify-between border-b border-stone-100 pb-2.5">
                <span className="flex items-center gap-2">
                  <Shield className="h-4.5 w-4.5 text-[#C9A15A]" /> Legal &amp; Policies
                </span>
                <span className="text-[10px] bg-stone-100 text-stone-500 px-2 py-0.5 rounded-full font-bold">
                  {legalLinks.length}
                </span>
              </h3>
              <ul className="space-y-4">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href} 
                      className="group flex items-center justify-between text-xs font-bold text-stone-600 hover:text-[#C9A15A] py-1.5 transition-colors"
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-[#C9A15A]" />
                    </Link>
                  </li>
                ))}
                {legalLinks.length === 0 && (
                  <p className="text-xs text-stone-400 italic">No matching pages found.</p>
                )}
              </ul>
            </div>

            {/* Column 3: Resource Categories */}
            <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-sm space-y-5">
              <h3 className="font-extrabold text-sm text-[#113F48] flex items-center justify-between border-b border-stone-100 pb-2.5">
                <span className="flex items-center gap-2">
                  <Folder className="h-4.5 w-4.5 text-[#C9A15A]" /> Health Categories
                </span>
                <span className="text-[10px] bg-stone-100 text-stone-500 px-2 py-0.5 rounded-full font-bold">
                  {filteredCategories.length}
                </span>
              </h3>
              <ul className="space-y-4">
                {filteredCategories.map((cat) => (
                  <li key={cat.slug || cat.name}>
                    <Link 
                      href={`/blog?category=${encodeURIComponent(cat.name)}`} 
                      className="group flex items-center justify-between text-xs font-bold text-stone-600 hover:text-[#C9A15A] py-1.5 transition-colors"
                    >
                      <span>{cat.name}</span>
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-[#C9A15A]" />
                    </Link>
                  </li>
                ))}
                {filteredCategories.length === 0 && (
                  <p className="text-xs text-stone-400 italic">No matching categories found.</p>
                )}
              </ul>
            </div>

          </div>

          {/* DYNAMIC ARTICLE DIRECTORY GRIDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Featured Guides Directory */}
            {featuredArticles.length > 0 && (
              <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-sm space-y-4">
                <h3 className="font-extrabold text-sm text-[#113F48] flex items-center justify-between border-b border-stone-100 pb-2.5">
                  <span className="flex items-center gap-2">
                    <Award className="h-4.5 w-4.5 text-[#C9A15A]" /> Featured Guides ({featuredArticles.length})
                  </span>
                </h3>
                <div className="space-y-3.5">
                  {featuredArticles.map((post) => (
                    <Link 
                      key={post.slug} 
                      href={`/blog/${post.slug}`} 
                      className="group flex items-center justify-between text-xs font-bold text-stone-600 hover:text-[#C9A15A] transition-colors py-1 truncate"
                    >
                      <span className="truncate">• {post.title}</span>
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-[#C9A15A] shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Latest Articles Directory */}
            {latestArticles.length > 0 && (
              <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-sm space-y-4">
                <h3 className="font-extrabold text-sm text-[#113F48] flex items-center justify-between border-b border-stone-100 pb-2.5">
                  <span className="flex items-center gap-2">
                    <Clock className="h-4.5 w-4.5 text-[#C9A15A]" /> Latest Publications ({latestArticles.length})
                  </span>
                </h3>
                <div className="space-y-3.5">
                  {latestArticles.map((post) => (
                    <Link 
                      key={post.slug} 
                      href={`/blog/${post.slug}`} 
                      className="group flex items-center justify-between text-xs font-bold text-stone-600 hover:text-[#C9A15A] transition-colors py-1 truncate"
                    >
                      <span className="truncate">• {post.title}</span>
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-[#C9A15A] shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* SITEMAP FOOTER SECTION */}
          <div className="border-t border-stone-200 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-semibold text-stone-400">
            <span>Last Updated: August 2026</span>
            <div className="flex gap-4">
              <Link href="/sitemap.xml" target="_blank" className="hover:text-[#C9A15A] transition-colors flex items-center gap-1">
                XML Sitemap <ExternalLink className="h-3 w-3" />
              </Link>
              <span>•</span>
              <Link href="/" className="hover:text-[#C9A15A] transition-colors">
                Back to Home
              </Link>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
