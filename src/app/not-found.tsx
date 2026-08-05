"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, AlertTriangle, ArrowRight, Home } from "lucide-react";

export default function NotFound() {
  const [query, setQuery] = useState("");

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-20">
        <div className="max-w-xl w-full mx-auto px-4 text-center space-y-8">
          
          {/* SVG Illustration */}
          <div className="relative w-40 h-40 mx-auto bg-[#C9A15A]/10 rounded-full flex items-center justify-center border border-[#C9A15A]/20 shadow-sm animate-pulse">
            <AlertTriangle className="h-20 w-20 text-[#C9A15A]" />
          </div>

          <div className="space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C9A15A] bg-[#C9A15A]/10 px-3 py-1 rounded">Error Code: 404</span>
            <h1 className="text-3xl font-extrabold text-[#113F48]">Healthcare Guide Not Found</h1>
            <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed">
              We couldn&apos;t find the educational resource page you requested. Try searching our database or browsing recommended categories.
            </p>
          </div>

          {/* Search box */}
          <div className="max-w-md mx-auto bg-white border border-stone-200 rounded-2xl p-1.5 flex items-center shadow-sm">
            <Search className="h-4.5 w-4.5 text-stone-400 ml-3" />
            <input
              type="text"
              placeholder="Search health topics, articles, reviews..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-white px-3 py-2 text-xs text-[#113F48] focus:outline-none"
            />
            <Link
              href={`/search?q=${encodeURIComponent(query)}`}
              className="bg-[#113F48] hover:bg-[#C9A15A] text-white text-xs font-bold px-4.5 py-2 rounded-xl transition-all"
            >
              Search
            </Link>
          </div>

          {/* Popular categories & links */}
          <div className="max-w-md mx-auto grid grid-cols-2 gap-3 text-left pt-2">
            <div className="bg-white border border-stone-200 p-4 rounded-xl space-y-2">
              <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wide">Popular Guides</span>
              <ul className="text-xs space-y-1.5 font-semibold text-[#113F48]">
                <li><Link href="/blog" className="hover:text-[#C9A15A] flex items-center gap-1">Health Topics <ArrowRight className="h-3 w-3" /></Link></li>
                <li><Link href="/blog" className="hover:text-[#C9A15A] flex items-center gap-1">Enrollment Periods <ArrowRight className="h-3 w-3" /></Link></li>
              </ul>
            </div>
            <div className="bg-white border border-stone-200 p-4 rounded-xl space-y-2">
              <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wide">Helpful Links</span>
              <ul className="text-xs space-y-1.5 font-semibold text-[#113F48]">
                <li><Link href="/about" className="hover:text-[#C9A15A] flex items-center gap-1">About Our Mission <ArrowRight className="h-3 w-3" /></Link></li>
                <li><Link href="/contact" className="hover:text-[#C9A15A] flex items-center gap-1">Contact Support <ArrowRight className="h-3 w-3" /></Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#113F48] hover:bg-[#C9A15A] text-white text-xs font-bold px-6 py-3 rounded-xl transition-all shadow shadow-[#113F48]/10"
            >
              <Home className="h-4 w-4" /> Return to Homepage
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
