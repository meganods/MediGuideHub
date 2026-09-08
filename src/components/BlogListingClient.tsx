"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/authContext";
import { updateUserSavedPosts, BlogPost, BlogCategory } from "@/lib/db";
import { getAuthorProfileUrl } from "@/components/BlogComponents";
import { 
  Search, 
  BookOpen, 
  SlidersHorizontal, 
  FileText,
  Grid,
  Bookmark,
  Eye
} from "lucide-react";

interface BlogListingClientProps {
  initialPosts: BlogPost[];
  initialCategories: BlogCategory[];
}

function BlogListingContent({
  initialPosts,
  initialCategories,
}: BlogListingClientProps) {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [savedSlugs, setSavedSlugs] = useState<string[]>([]);
  const [posts] = useState<BlogPost[]>(initialPosts);
  const [categories] = useState<BlogCategory[]>(initialCategories);
  
  const queryParam = searchParams.get("q") || "";
  const categoryParam = searchParams.get("category") || "All";

  const [search, setSearch] = useState(queryParam);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  
  // Keep state synced if URL params change
  useEffect(() => {
    if (queryParam) setSearch(queryParam);
    if (categoryParam) setSelectedCategory(categoryParam);
  }, [queryParam, categoryParam]);

  // Filtering states
  const [filterReadTime, setFilterReadTime] = useState("all"); // all, short (<5m), medium (5-10m), long (>10m)
  const [sortBy, setSortBy] = useState("newest"); // newest, oldest, popular, views
  const [showFilters, setShowFilters] = useState(false);

  const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: "", visible: false });

  const showToast = (message: string) => {
    setToast({ message, visible: true });
  };

  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => {
        setToast((prev) => ({ ...prev, visible: false }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.visible]);

  useEffect(() => {
    if (user) {
      setSavedSlugs(user.savedPosts || []);
    } else {
      setSavedSlugs([]);
    }
  }, [user]);

  const handleToggleSave = async (slug: string) => {
    if (!user) {
      router.push("/auth?redirect=" + encodeURIComponent("/blog"));
      return;
    }
    const isSaved = savedSlugs.includes(slug);
    const action = isSaved ? "unsave" : "save";
    try {
      const updatedProfile = await updateUserSavedPosts(user.uid, slug, action);
      if (updatedProfile) {
        setSavedSlugs(updatedProfile.savedPosts || []);
        localStorage.setItem("mediguide4u_current_user", JSON.stringify(updatedProfile));
        showToast(action === "save" ? "Article bookmarked successfully!" : "Article removed from bookmarks.");
      }
    } catch (e) {
      console.error("Failed to save post:", e);
      showToast("Failed to update bookmark.");
    }
  };

  const seenSlugs = new Set<string>();
  const filteredPosts = posts
    .filter((post) => {
      const matchesSearch =
        !search ||
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        (post.summary && post.summary.toLowerCase().includes(search.toLowerCase())) ||
        (post.author && post.author.toLowerCase().includes(search.toLowerCase()));
      
      const postCategory = (post.category || "").toLowerCase();
      const selCat = selectedCategory.toLowerCase();
      const matchesCategory =
        selectedCategory === "All" ||
        postCategory === selCat ||
        postCategory.includes(selCat) ||
        selCat.includes(postCategory) ||
        (selCat.includes("heart") && postCategory.includes("heart")) ||
        (selCat.includes("fitness") && (postCategory.includes("fitness") || postCategory.includes("wellness"))) ||
        (selCat.includes("wellness") && (postCategory.includes("wellness") || postCategory.includes("fitness"))) ||
        (selCat.includes("senior") && postCategory.includes("senior")) ||
        (selCat.includes("nutrition") && postCategory.includes("nutrition")) ||
        (selCat.includes("diabetes") && postCategory.includes("diabetes")) ||
        (selCat.includes("women") && postCategory.includes("women")) ||
        (selCat.includes("child") && postCategory.includes("child")) ||
        (selCat.includes("preventive") && (postCategory.includes("preventive") || postCategory.includes("prevention")));

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
      if (sortBy === "oldest") return (a.publishedAt || "").localeCompare(b.publishedAt || "");
      if (sortBy === "views") return (b.views || 0) - (a.views || 0);
      if (sortBy === "popular" || sortBy === "trending") return (b.views || 0) - (a.views || 0);
      return (b.publishedAt || "").localeCompare(a.publishedAt || ""); // default newest
    })
    .filter((post) => {
      if (!post.slug || seenSlugs.has(post.slug)) return false;
      seenSlugs.add(post.slug);
      return true;
    });

  return (
    <>
      {/* ── HERO HEADER ── */}
      <section className="relative bg-gradient-to-b from-stone-50 to-[#FDFBF7] py-20 border-b border-stone-100">
        <div className="w-full mx-auto px-4 sm:px-8 md:px-12 lg:px-16 max-w-none text-center space-y-6">
          <span className="text-xs font-bold text-[#C9A15A] uppercase tracking-[0.2em] bg-[#C9A15A]/10 px-3.5 py-1.5 rounded-full border border-[#C9A15A]/20">
            mediguide4u Knowledge Base
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#113F48] leading-tight max-w-3xl mx-auto">
            Doctor-Reviewed Medical &amp; Wellness Guides
          </h1>
          <p className="text-stone-600 max-w-2xl mx-auto text-sm leading-relaxed">
            Clear, structured health guides covering symptoms, conditions, clinical nutrition, and preventive wellness strategies.
          </p>

          {/* Direct Search Bar */}
          <div className="relative max-w-xl mx-auto bg-white border border-stone-200 rounded-2xl shadow-md p-1.5 flex items-center">
            <Search className="h-4 w-4 text-stone-400 ml-3" />
            <input
              type="text"
              placeholder="Search articles by title, keywords, or topics..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white px-3 py-2 text-xs text-[#113F48] focus:outline-none"
            />
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 border-l border-stone-200 text-stone-600 hover:text-[#C9A15A] transition-colors flex items-center gap-1 text-[11px] font-bold cursor-pointer"
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
              <button onClick={() => setSelectedCategory("All")} className="text-xs text-[#C9A15A] font-bold hover:underline cursor-pointer">
                Clear Filters
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {Array.from(new Map(categories.map(cat => [cat.name, cat])).values()).slice(0, 16).map((cat) => (
              <button
                key={cat.id || cat.slug || cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
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
          <div className="space-y-12">
            
            {/* Main Stream */}
            <div className="w-full space-y-12">
              
              {/* List of filtered Articles */}
              <div className="space-y-6">
                <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest flex items-center gap-1">
                  <FileText className="h-3.5 w-3.5 text-[#C9A15A]" /> Latest Health Articles
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredPosts.map((post, idx) => (
                    <article key={post.id || post.slug + "-" + idx} className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
                      <div className="relative h-44 w-full bg-stone-50 overflow-hidden">
                        {post.featuredImage && (
                          <Image 
                            src={post.featuredImage} 
                            alt={post.imageAlt || post.title} 
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        )}
                        <span className="absolute top-3 left-3 bg-[#113F48]/90 text-white text-[9px] font-bold px-2 py-0.5 rounded z-10">{post.category}</span>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleToggleSave(post.slug);
                          }}
                          className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 hover:bg-white text-stone-600 hover:text-[#C9A15A] transition-colors shadow-sm cursor-pointer z-10"
                          title="Save Article"
                          aria-label={`Save article: ${post.title}`}
                        >
                          <Bookmark className={`h-4 w-4 ${savedSlugs.includes(post.slug) ? "fill-[#C9A15A] text-[#C9A15A]" : ""}`} />
                        </button>
                      </div>
                      <div className="p-5 flex flex-col justify-between flex-grow space-y-3">
                        <div className="space-y-2">
                          <span className="text-[10px] text-stone-400 flex items-center justify-between">
                            <span>{post.publishedAt}</span>
                            <span className="flex items-center gap-1"><Eye className="h-3 w-3 text-[#C9A15A]" /> {post.views || 0}</span>
                          </span>
                          <h4 className="font-extrabold text-[#113F48] text-base leading-snug line-clamp-2 hover:text-[#C9A15A] transition-colors">
                            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                          </h4>
                          <p className="text-stone-500 text-xs leading-relaxed line-clamp-3">{post.summary}</p>
                        </div>
                        <div className="pt-4 border-t border-stone-100 flex justify-between items-center mt-2">
                          <span className="text-stone-500 text-xs font-medium mt-1">
                            By{" "}
                            <Link 
                              href={getAuthorProfileUrl(post.author)} 
                              className="text-[#113F48] hover:text-[#C9A15A] hover:underline font-semibold transition-colors"
                            >
                              {post.author || "Mediguide4u Editorial Staff"}
                            </Link>
                          </span>
                          <Link href={`/blog/${post.slug}`} className="bg-[#113F48] text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-[#C9A15A] transition-colors shadow-md">Read Guide</Link>
                        </div>
                      </div>
                    </article>
                  ))}
                  {filteredPosts.length === 0 && (
                    <div className="col-span-4 text-center py-20 bg-white border border-stone-200 rounded-2xl p-6 space-y-2">
                      <BookOpen className="h-10 w-10 text-stone-300 mx-auto" />
                      <h4 className="font-bold text-stone-700">No Articles Found</h4>
                      <p className="text-xs text-stone-400">Try adjusting your filters or keyword query.</p>
                    </div>
                  )}
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ── NEWSLETTER SECTION ── */}
      <section className="py-20 bg-[#113F48] text-white">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center space-y-6">
          <h3 className="text-3xl font-extrabold tracking-tight">Stay Updated on Healthcare Guidelines</h3>
          <p className="text-stone-300 max-w-md mx-auto text-xs">
            Subscribe to the mediguide4u newsletter to receive latest wellness updates, clinical reports, and health modifications directly in your inbox.
          </p>
          <form onSubmit={(e) => { e.preventDefault(); showToast("Thank you for subscribing!"); }} className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              required
              placeholder="Enter your email address..."
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#C9A15A]"
            />
            <button 
              type="submit"
              className="bg-[#C9A15A] hover:bg-[#B58F4E] text-[#113F48] font-bold px-6 py-2.5 rounded-xl text-xs whitespace-nowrap transition-colors cursor-pointer"
            >
              Join Now
            </button>
          </form>
        </div>
      </section>

      {/* Toast Notification */}
      {toast.visible && (
        <div className="fixed top-5 right-5 z-50 bg-[#113F48] text-white border border-[#C9A15A]/30 px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-2.5 animate-in fade-in slide-in-from-top-5 duration-300">
          <Bookmark className="h-4.5 w-4.5 text-[#C9A15A] fill-[#C9A15A]" />
          <span className="text-xs font-bold">{toast.message}</span>
        </div>
      )}
    </>
  );
}

export default function BlogListingClient(props: BlogListingClientProps) {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center py-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#C9A15A]" />
      </div>
    }>
      <BlogListingContent {...props} />
    </Suspense>
  );
}
