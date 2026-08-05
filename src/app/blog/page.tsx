"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { getPosts, BlogPost } from "@/lib/db";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Search, BookOpen, Clock, ArrowRight } from "lucide-react";

export default function BlogIndex() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    async function loadPosts() {
      const allPosts = await getPosts();
      setPosts(allPosts);
    }
    loadPosts();
  }, []);

  const categories = ["All", "Overview", "Part A", "Part B", "Part C", "Part D", "Comparison", "Enrollment"];

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.summary.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-grow py-12">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
            <h1 className="text-4xl font-extrabold text-[#113F48]">
              Medicare Educational Guides
            </h1>
            <p className="text-stone-600">
              Explore in-depth articles written by healthcare specialists and policy advisors. Learn about enrollment, eligibility, and coverage options.
            </p>
          </div>

          {/* Search & Categories Bar */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm mb-10 space-y-6">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-stone-400" />
              <input
                type="text"
                placeholder="Search articles by title or keyword..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#F9FAFB] border border-stone-200 rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#C9A15A] text-sm text-[#113F48]"
              />
            </div>

            {/* Pill Categories */}
            <div className="flex flex-wrap gap-2.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider border transition-all ${
                    selectedCategory === cat
                      ? "bg-[#113F48] text-white border-[#113F48] shadow-sm shadow-[#113F48]/10"
                      : "bg-[#FDF6EC]/50 text-stone-600 border-[#C9A15A]/20 hover:border-[#C9A15A]/65"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Layout */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article key={post.slug} className="premium-card flex flex-col overflow-hidden bg-white">
                  <div className="relative h-48 w-full">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="h-full w-full object-cover border-b border-[#C9A15A]/15"
                    />
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm border border-[#C9A15A]/20 px-2.5 py-1 rounded-md text-xs font-semibold text-[#113F48]">
                      {post.category}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
                    <div className="space-y-2">
                      <h2 className="font-bold text-lg text-[#113F48] hover:text-[#C9A15A] transition-colors leading-snug line-clamp-2">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h2>
                      <p className="text-stone-600 text-sm line-clamp-3">
                        {post.summary}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-stone-100 flex items-center justify-between mt-auto">
                      <div className="flex items-center text-xs text-stone-500 gap-1">
                        <Clock className="h-3.5 w-3.5 text-[#C9A15A]" />
                        <span>{post.readTime}</span>
                      </div>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="flex items-center text-xs font-semibold text-[#C9A15A] hover:text-[#113F48] transition-colors group"
                      >
                        Read Guide <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white border border-[#C9A15A]/15 rounded-2xl p-8 space-y-3">
              <BookOpen className="h-12 w-12 text-[#C9A15A] mx-auto opacity-50" />
              <h3 className="font-bold text-lg text-[#113F48]">No guides found</h3>
              <p className="text-stone-500 max-w-md mx-auto">
                We couldn&apos;t find any articles matching your search criteria. Try modifying your filters or keyword query.
              </p>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
