"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { getPosts, getCategories, BlogPost, BlogCategory } from "@/lib/db";
import { Map, FileText, Folder, Shield, HelpCircle, ArrowRight, Home, Info, Phone } from "lucide-react";

export default function HTMLSitemap() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);

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

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <Navbar />

      <main className="flex-grow py-16">
        <div className="w-full mx-auto px-4 sm:px-8 md:px-12 lg:px-16 max-w-7xl space-y-12">
          
          {/* Header section */}
          <div className="border-b border-stone-200 pb-6 space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A15A]/10 border border-[#C9A15A]/25 text-[10px] font-bold uppercase tracking-wider text-[#C9A15A]">
              ✓ Platform Map
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#113F48] flex items-center gap-2">
              <Map className="h-8 w-8 text-[#C9A15A]" /> MediGuideHub HTML Sitemap
            </h1>
            <p className="text-xs text-stone-500 max-w-xl">
              An index of all published medical guidelines, resource directories, health policies, and legal document pages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Column 1: Main Platform Pages */}
            <div className="space-y-6">
              <h3 className="font-extrabold text-base text-[#113F48] flex items-center gap-2 border-b border-stone-100 pb-2">
                <Home className="h-4.5 w-4.5 text-[#C9A15A]" /> Core Directory
              </h3>
              <ul className="space-y-3.5 text-xs text-stone-600 font-semibold">
                <li><Link href="/" className="hover:text-[#C9A15A] transition-colors flex items-center gap-1.5">Home Page <ArrowRight className="h-3 w-3" /></Link></li>
                <li><Link href="/about" className="hover:text-[#C9A15A] transition-colors flex items-center gap-1.5">About Us <ArrowRight className="h-3 w-3" /></Link></li>
                <li><Link href="/contact" className="hover:text-[#C9A15A] transition-colors flex items-center gap-1.5">Contact Support <ArrowRight className="h-3 w-3" /></Link></li>
                <li><Link href="/blog" className="hover:text-[#C9A15A] transition-colors flex items-center gap-1.5">Blogs &amp; Guides <ArrowRight className="h-3 w-3" /></Link></li>
                <li><Link href="/faq" className="hover:text-[#C9A15A] transition-colors flex items-center gap-1.5">FAQ Directory <ArrowRight className="h-3 w-3" /></Link></li>
              </ul>
            </div>

            {/* Column 2: Legal Disclosures & Policies */}
            <div className="space-y-6">
              <h3 className="font-extrabold text-base text-[#113F48] flex items-center gap-2 border-b border-stone-100 pb-2">
                <Shield className="h-4.5 w-4.5 text-[#C9A15A]" /> Disclosures &amp; Policies
              </h3>
              <ul className="space-y-3.5 text-xs text-stone-600 font-semibold">
                <li><Link href="/privacy-policy" className="hover:text-[#C9A15A] transition-colors flex items-center gap-1.5">Privacy Policy <ArrowRight className="h-3 w-3" /></Link></li>
                <li><Link href="/terms-and-conditions" className="hover:text-[#C9A15A] transition-colors flex items-center gap-1.5">Terms &amp; Conditions <ArrowRight className="h-3 w-3" /></Link></li>
                <li><Link href="/medical-disclaimer" className="hover:text-[#C9A15A] transition-colors flex items-center gap-1.5">Medical Disclaimer <ArrowRight className="h-3 w-3" /></Link></li>
                <li><Link href="/cookie-policy" className="hover:text-[#C9A15A] transition-colors flex items-center gap-1.5">Cookie Policy <ArrowRight className="h-3 w-3" /></Link></li>
                <li><Link href="/editorial-policy" className="hover:text-[#C9A15A] transition-colors flex items-center gap-1.5">Editorial Policy <ArrowRight className="h-3 w-3" /></Link></li>
                <li><Link href="/advertising-policy" className="hover:text-[#C9A15A] transition-colors flex items-center gap-1.5">Advertising Policy <ArrowRight className="h-3 w-3" /></Link></li>
                <li><Link href="/corrections-policy" className="hover:text-[#C9A15A] transition-colors flex items-center gap-1.5">Corrections Policy <ArrowRight className="h-3 w-3" /></Link></li>
                <li><Link href="/accessibility" className="hover:text-[#C9A15A] transition-colors flex items-center gap-1.5">Accessibility Statement <ArrowRight className="h-3 w-3" /></Link></li>
              </ul>
            </div>

            {/* Column 3: Resource Categories */}
            <div className="space-y-6">
              <h3 className="font-extrabold text-base text-[#113F48] flex items-center gap-2 border-b border-stone-100 pb-2">
                <Folder className="h-4.5 w-4.5 text-[#C9A15A]" /> Health Categories
              </h3>
              <ul className="space-y-3.5 text-xs text-stone-600 font-semibold">
                {categories.length > 0 ? (
                  categories.map((cat) => (
                    <li key={cat.slug}>
                      <Link href={`/blog?category=${cat.name}`} className="hover:text-[#C9A15A] transition-colors flex items-center gap-1.5">
                        {cat.name} <ArrowRight className="h-3 w-3" />
                      </Link>
                    </li>
                  ))
                ) : (
                  <>
                    <li><Link href="/blog?category=Preventive Care" className="hover:text-[#C9A15A] transition-colors flex items-center gap-1.5">Preventive Care <ArrowRight className="h-3 w-3" /></Link></li>
                    <li><Link href="/blog?category=Nutrition" className="hover:text-[#C9A15A] transition-colors flex items-center gap-1.5">Nutrition <ArrowRight className="h-3 w-3" /></Link></li>
                    <li><Link href="/blog?category=Mental Health" className="hover:text-[#C9A15A] transition-colors flex items-center gap-1.5">Mental Health <ArrowRight className="h-3 w-3" /></Link></li>
                    <li><Link href="/blog?category=Senior Health" className="hover:text-[#C9A15A] transition-colors flex items-center gap-1.5">Senior Health <ArrowRight className="h-3 w-3" /></Link></li>
                    <li><Link href="/blog?category=Heart Health" className="hover:text-[#C9A15A] transition-colors flex items-center gap-1.5">Heart Health <ArrowRight className="h-3 w-3" /></Link></li>
                  </>
                )}
              </ul>
            </div>

          </div>

          {/* Dynamic articles section */}
          {posts.length > 0 && (
            <div className="bg-white border border-stone-200 p-6 rounded-2xl shadow-sm space-y-4">
              <h3 className="font-extrabold text-base text-[#113F48] flex items-center gap-2 border-b border-stone-100 pb-2">
                <FileText className="h-4.5 w-4.5 text-[#C9A15A]" /> Published Medical &amp; Health Guides
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold text-stone-600">
                {posts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="hover:text-[#C9A15A] transition-colors block py-1 truncate">
                    • {post.title}
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
