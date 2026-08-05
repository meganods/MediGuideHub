"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { getPosts, getCategories, BlogPost, BlogCategory } from "@/lib/db";
import { 
  Search, 
  BookOpen, 
  Clock, 
  ArrowRight, 
  SlidersHorizontal, 
  Flame, 
  Award, 
  RotateCcw, 
  Sparkles,
  TrendingUp,
  FileText,
  Grid
} from "lucide-react";

export default function BlogIndex() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  // Filtering states
  const [filterReadTime, setFilterReadTime] = useState("all"); // all, short (<5m), medium (5-10m), long (>10m)
  const [sortBy, setSortBy] = useState("newest"); // newest, oldest, popular, views
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    async function loadData() {
      const allPosts = await getPosts();
      const allCats = await getCategories();
      setPosts(allPosts);
      setCategories(allCats);
    }
    loadData();
  }, []);

  // Filter and sort logic
  const filteredPosts = posts
    .filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.summary.toLowerCase().includes(search.toLowerCase()) ||
        post.author.toLowerCase().includes(search.toLowerCase());
      
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;

      // Read time calculation
      let minutes = 5;
      if (post.readTime) {
        const parsed = parseInt(post.readTime);
        if (!isNaN(parsed)) minutes = parsed;
      }
      const matchesReadTime =
        filterReadTime === "all" ||
        (filterReadTime === "short" && minutes < 5) ||
        (filterReadTime === "medium" && minutes >= 5 && minutes <= 10) ||
        (filterReadTime === "long" && minutes > 10);

      return matchesSearch && matchesCategory && matchesReadTime;
    })
    .sort((a, b) => {
      if (sortBy === "oldest") return a.publishedAt.localeCompare(b.publishedAt);
      if (sortBy === "views") return (b.views || 0) - (a.views || 0);
      if (sortBy === "popular" || sortBy === "trending") return (b.views || 0) - (a.views || 0);
      return b.publishedAt.localeCompare(a.publishedAt); // default newest
    });

  // Derived sections
  const featuredPost = posts.find(p => p.featured) || posts[0];
  const trendingPosts = posts.filter(p => p.trending).slice(0, 4);
  const editorPicks = posts.filter(p => p.seoScore && p.seoScore > 90).slice(0, 3);
  const recentlyUpdated = posts
    .filter(p => p.updatedAt)
    .sort((a, b) => (b.updatedAt || "").localeCompare(a.updatedAt || ""))
    .slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <Navbar />

      <main className="flex-grow">
        
        {/* ── HERO HEADER ── */}
        <section className="relative bg-gradient-to-b from-stone-50 to-[#FDFBF7] py-20 border-b border-stone-100">
          <div className="w-full mx-auto px-4 sm:px-8 md:px-12 lg:px-16 max-w-none text-center space-y-6">
            <span className="text-xs font-bold text-[#C9A15A] uppercase tracking-[0.2em] bg-[#C9A15A]/10 px-3.5 py-1.5 rounded-full border border-[#C9A15A]/20">
              MediGuideHub Knowledge Base
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#113F48] leading-tight max-w-3xl mx-auto">
              Empowering Health Literacy with Medical Integrity
            </h1>
            <p className="text-stone-600 max-w-2xl mx-auto text-sm leading-relaxed">
              Objective clinical research guides, healthcare policy updates, and Medicare comparisons. Fact-checked by medical professionals.
            </p>

            {/* Direct Search Bar */}
            <div className="relative max-w-xl mx-auto bg-white border border-stone-200 rounded-2xl shadow-md p-1.5 flex items-center">
              <Search className="h-4 w-4 text-stone-400 ml-3" />
              <input
                type="text"
                placeholder="Search articles by title, keywords, or authors..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white px-3 py-2 text-xs text-[#113F48] focus:outline-none"
              />
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="p-2 border-l border-stone-200 text-stone-600 hover:text-[#C9A15A] transition-colors flex items-center gap-1 text-[11px] font-bold"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" /> Filters
              </button>
            </div>

            {/* Expanded Advanced Filters Panel */}
            {showFilters && (
              <div className="max-w-xl mx-auto bg-white border border-stone-200 rounded-2xl p-4.5 shadow-sm text-left grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wide">Reading Time</label>
                  <select
                    value={filterReadTime}
                    onChange={(e) => setFilterReadTime(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg px-2 py-1.5 text-xs text-stone-700 focus:outline-none"
                  >
                    <option value="all">All Lengths</option>
                    <option value="short">Quick Reads (&lt; 5m)</option>
                    <option value="medium">Medium Content (5-10m)</option>
                    <option value="long">Deep Dives (&gt; 10m)</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wide">Sort Orders</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg px-2 py-1.5 text-xs text-stone-700 focus:outline-none"
                  >
                    <option value="newest">Newest Articles</option>
                    <option value="oldest">Oldest Articles</option>
                    <option value="views">Most Viewed</option>
                    <option value="popular">Most Popular</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ── BROWSE BY CATEGORIES (CARDS) ── */}
        <section className="py-12 bg-white">
          <div className="w-full mx-auto px-4 sm:px-8 md:px-12 lg:px-16 max-w-none space-y-6">
            <div className="flex justify-between items-end border-b border-stone-100 pb-3">
              <h3 className="text-lg font-bold text-[#113F48] flex items-center gap-1.5">
                <Grid className="h-4.5 w-4.5 text-[#C9A15A]" /> Browse Health Categories
              </h3>
              {selectedCategory !== "All" && (
                <button onClick={() => setSelectedCategory("All")} className="text-xs text-[#C9A15A] font-bold hover:underline">
                  Clear Filters
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              {categories.slice(0, 16).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`p-3.5 rounded-xl border text-center transition-all ${
                    selectedCategory === cat.name
                      ? "bg-[#113F48] text-white border-[#113F48] shadow"
                      : "bg-[#FDFBF7] text-stone-700 border-stone-200 hover:border-[#C9A15A] hover:bg-[#FDF6EC]/25"
                  }`}
                >
                  <span className="text-xs font-bold block truncate">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── MAIN FEATURED & LATEST GRID ── */}
        <section className="py-16">
          <div className="w-full mx-auto px-4 sm:px-8 md:px-12 lg:px-16 max-w-none">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              
              {/* Left Main Stream */}
              <div className="lg:col-span-8 space-y-12">
                
                {/* 1. Featured Article Cover */}
                {featuredPost && selectedCategory === "All" && !search && (
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest flex items-center gap-1"><Sparkles className="h-3.5 w-3.5 text-[#C9A15A]" /> Featured Publication</h3>
                    <div className="bg-white border border-stone-200 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div className="relative h-96 w-full bg-stone-100">
                        {featuredPost.featuredImage && (
                          <img src={featuredPost.featuredImage} alt={featuredPost.title} className="w-full h-full object-cover" />
                        )}
                        <span className="absolute top-4 left-4 bg-[#113F48] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-md">{featuredPost.category}</span>
                      </div>
                      <div className="p-8 space-y-3">
                        <span className="text-[10px] font-bold text-stone-400">{featuredPost.publishedAt} • {featuredPost.readTime}</span>
                        <h2 className="text-2xl font-extrabold text-[#113F48] hover:text-[#C9A15A] transition-colors leading-tight">
                          <Link href={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
                        </h2>
                        <p className="text-stone-600 text-sm leading-relaxed">{featuredPost.summary}</p>
                        <div className="pt-3 flex justify-between items-center border-t border-stone-100">
                          <span className="text-xs font-semibold text-stone-500">By {featuredPost.author}</span>
                          <Link href={`/blog/${featuredPost.slug}`} className="text-xs font-bold text-[#C9A15A] hover:text-[#113F48] transition-colors flex items-center gap-0.5">Read Guide <ArrowRight className="h-3.5 w-3.5" /></Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. List of filtered Articles */}
                <div className="space-y-6">
                  <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest flex items-center gap-1"><FileText className="h-3.5 w-3.5 text-[#C9A15A]" /> Latest Health Articles</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {filteredPosts.map((post) => (
                      <article key={post.slug} className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
                        <div className="relative h-44 w-full bg-stone-50">
                          {post.featuredImage && (
                            <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover" />
                          )}
                          <span className="absolute top-3 left-3 bg-[#113F48]/90 text-white text-[9px] font-bold px-2 py-0.5 rounded">{post.category}</span>
                        </div>
                        <div className="p-5 flex flex-col justify-between flex-grow space-y-3">
                          <div className="space-y-2">
                            <span className="text-[10px] text-stone-400 block">{post.publishedAt}</span>
                            <h4 className="font-extrabold text-[#113F48] text-base leading-snug line-clamp-2 hover:text-[#C9A15A] transition-colors">
                              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                            </h4>
                            <p className="text-stone-500 text-xs leading-relaxed line-clamp-3">{post.summary}</p>
                          </div>
                          <div className="pt-3 border-t border-stone-100 flex justify-between items-center text-xs">
                            <span className="text-stone-500 font-medium">By {post.author}</span>
                            <Link href={`/blog/${post.slug}`} className="text-[#C9A15A] font-bold hover:underline">Read Guide</Link>
                          </div>
                        </div>
                      </article>
                    ))}
                    {filteredPosts.length === 0 && (
                      <div className="col-span-2 text-center py-20 bg-white border border-stone-200 rounded-2xl p-6 space-y-2">
                        <BookOpen className="h-10 w-10 text-stone-300 mx-auto" />
                        <h4 className="font-bold text-stone-700">No Articles Found</h4>
                        <p className="text-xs text-stone-400">Try adjusting your filters or keyword query.</p>
                      </div>
                    )}
                  </div>
                </div>

              </div>

              {/* Right Side Bar */}
              <aside className="lg:col-span-4 space-y-8">
                
                {/* 1. Trending Posts */}
                {trendingPosts.length > 0 && (
                  <div className="bg-white border border-stone-200 rounded-2xl p-6 space-y-4 shadow-sm">
                    <h4 className="font-bold text-[#113F48] text-sm flex items-center gap-1 border-b border-stone-100 pb-2"><Flame className="h-4 w-4 text-[#C9A15A]" /> Trending Posts</h4>
                    <div className="space-y-3.5">
                      {trendingPosts.map((post, i) => (
                        <div key={post.slug} className="flex gap-3 text-xs">
                          <span className="text-base font-extrabold text-stone-300">0{i+1}</span>
                          <div className="space-y-1">
                            <Link href={`/blog/${post.slug}`} className="font-bold text-[#113F48] hover:text-[#C9A15A] transition-colors line-clamp-2 leading-snug">{post.title}</Link>
                            <span className="text-[10px] text-stone-400 block">{post.category}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. Editor's Picks */}
                {editorPicks.length > 0 && (
                  <div className="bg-white border border-stone-200 rounded-2xl p-6 space-y-4 shadow-sm">
                    <h4 className="font-bold text-[#113F48] text-sm flex items-center gap-1 border-b border-stone-100 pb-2"><Award className="h-4 w-4 text-[#C9A15A]" /> Editor&apos;s Choices</h4>
                    <div className="space-y-3">
                      {editorPicks.map((post) => (
                        <div key={post.slug} className="space-y-1">
                          <Link href={`/blog/${post.slug}`} className="font-bold text-[#113F48] text-xs hover:text-[#C9A15A] transition-colors block">{post.title}</Link>
                          <span className="text-[9px] text-stone-400 block">Review Score: {post.seoScore}/100</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. Recently Updated */}
                {recentlyUpdated.length > 0 && (
                  <div className="bg-white border border-stone-200 rounded-2xl p-6 space-y-4 shadow-sm">
                    <h4 className="font-bold text-[#113F48] text-sm flex items-center gap-1 border-b border-stone-100 pb-2"><RotateCcw className="h-4 w-4 text-[#C9A15A]" /> Recently Revised</h4>
                    <div className="space-y-3 text-xs">
                      {recentlyUpdated.map((post) => (
                        <div key={post.slug} className="flex justify-between items-start gap-2">
                          <Link href={`/blog/${post.slug}`} className="font-bold text-[#113F48] hover:text-[#C9A15A] transition-colors truncate max-w-xs">{post.title}</Link>
                          <span className="text-[9px] bg-stone-100 text-stone-500 px-1.5 py-0.5 rounded flex-shrink-0">Updated</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </aside>

            </div>
          </div>
        </section>

        {/* ── NEWSLETTER SECTION ── */}
        <section className="py-20 bg-[#113F48] text-white">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center space-y-6">
            <h3 className="text-3xl font-extrabold tracking-tight">Stay Updated on Healthcare Guidelines</h3>
            <p className="text-stone-300 max-w-md mx-auto text-xs">
              Subscribe to the MediGuideHub newsletter to receive latest Medicare updates, clinical reports, and policy modifications directly in your inbox.
            </p>
            <form className="max-w-md mx-auto flex gap-2">
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#C9A15A]"
              />
              <button 
                type="submit"
                className="bg-[#C9A15A] hover:bg-[#B58F4E] text-[#113F48] font-bold px-6 py-2.5 rounded-xl text-xs whitespace-nowrap transition-colors"
              >
                Join Now
              </button>
            </form>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
