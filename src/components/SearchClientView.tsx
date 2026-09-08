"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { BlogPost, BlogCategory, updateUserSavedPosts } from "@/lib/db";
import { useAuth } from "@/lib/authContext";
import { 
  Search, 
  SlidersHorizontal, 
  Mic, 
  MicOff, 
  Bookmark, 
  Share2, 
  Check, 
  ArrowRight, 
  History, 
  TrendingUp, 
  X, 
  BookOpen, 
  Calendar, 
  Clock 
} from "lucide-react";

interface SearchClientViewProps {
  initialPosts: BlogPost[];
  initialCategories: BlogCategory[];
}

function SearchClientContent({ initialPosts, initialCategories }: SearchClientViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();

  const queryParam = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [posts] = useState<BlogPost[]>(initialPosts);
  const [categories] = useState<BlogCategory[]>(initialCategories);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  // Search history
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  
  // Voice search state
  const [isListening, setIsListening] = useState(false);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filterReadTime, setFilterReadTime] = useState("all");
  const [sortBy, setSortBy] = useState("relevant");
  
  useEffect(() => {
    // Load search history from localStorage
    const savedHistory = localStorage.getItem("mediguide4u_search_history");
    if (savedHistory) {
      try {
        setSearchHistory(JSON.parse(savedHistory));
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    setSearchQuery(queryParam);
    if (queryParam.trim().length >= 2) {
      saveToHistory(queryParam.trim());
    }
  }, [queryParam]);

  const saveToHistory = (keyword: string) => {
    let history = [...searchHistory];
    if (history.includes(keyword)) {
      history = history.filter(k => k !== keyword);
    }
    history.unshift(keyword);
    history = history.slice(0, 20);
    setSearchHistory(history);
    localStorage.setItem("mediguide4u_search_history", JSON.stringify(history));
  };

  const removeHistoryItem = (keyword: string) => {
    const updated = searchHistory.filter(k => k !== keyword);
    setSearchHistory(updated);
    localStorage.setItem("mediguide4u_search_history", JSON.stringify(updated));
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem("mediguide4u_search_history");
  };

  // Web Speech API Voice Search
  const handleVoiceSearch = () => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) {
        alert("Voice recognition is not supported in this browser. Please try Chrome or Edge.");
        return;
      }
      
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = false;
      
      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        router.push(`/search?q=${encodeURIComponent(transcript)}`);
      };

      recognition.start();
    }
  };

  const handleCopyLink = (slug: string) => {
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}/blog/${slug}`;
      navigator.clipboard.writeText(url);
      setCopiedSlug(slug);
      setTimeout(() => setCopiedSlug(null), 2000);
    }
  };

  const handleSavePost = async (slug: string) => {
    if (!user) {
      router.push("/auth?redirect=" + encodeURIComponent(`/search?q=${searchQuery}`));
      return;
    }
    const isSaved = user.savedPosts?.includes(slug);
    const action = isSaved ? "unsave" : "save";
    try {
      const updatedProfile = await updateUserSavedPosts(user.uid, slug, action);
      if (updatedProfile) {
        localStorage.setItem("mediguide4u_current_user", JSON.stringify(updatedProfile));
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Filtering Logic
  const filteredPosts = posts.filter(post => {
    const q = searchQuery.toLowerCase().trim();
    
    // Search match
    const titleMatch = post.title.toLowerCase().includes(q);
    const summaryMatch = (post.summary || "").toLowerCase().includes(q);
    const tagMatch = (post.tags || []).some((t) => t.toLowerCase().includes(q));
    const contentMatch = (post.content || "").toLowerCase().includes(q);

    const matchesSearch = !q || titleMatch || summaryMatch || tagMatch || contentMatch;

    // Category match
    const postCat = (post.category || "").toLowerCase();
    const selCat = selectedCategory.toLowerCase();
    const matchesCategory = selectedCategory === "All" || postCat === selCat || postCat.includes(selCat);

    // Read time match
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
  }).sort((a, b) => {
    if (sortBy === "newest") return (b.publishedAt || "").localeCompare(a.publishedAt || "");
    if (sortBy === "popular") return (b.views || 0) - (a.views || 0);
    return 0; // Relevant by default
  });

  return (
    <div className="w-full mx-auto px-4 sm:px-8 md:px-12 lg:px-16 max-w-6xl py-12 space-y-8">
      {/* ── SEARCH HEADER ── */}
      <div className="space-y-4">
        <h1 className="text-3xl font-extrabold text-[#113F48]">Search Healthcare Knowledge Base</h1>
        <p className="text-stone-500 text-xs">Search doctor-reviewed articles, clinical guides, and healthcare topics.</p>
        
        {/* Search Input Box */}
        <div className="relative flex items-center bg-white border border-stone-200 rounded-2xl p-2 shadow-sm focus-within:ring-2 focus-within:ring-[#C9A15A] transition-all">
          <Search className="h-5 w-5 text-stone-400 ml-2.5 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search health topics, keywords, or guides..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
              }
            }}
            className="w-full bg-transparent px-3 py-2 text-sm text-[#113F48] focus:outline-none"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="p-1 text-stone-400 hover:text-stone-600 mr-1 cursor-pointer">
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={handleVoiceSearch}
            className={`p-2 rounded-xl transition-all cursor-pointer ${
              isListening ? "bg-red-50 text-red-600 animate-pulse" : "text-stone-400 hover:text-[#C9A15A]"
            }`}
            title="Search with Voice"
          >
            {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </button>
          <button
            onClick={() => router.push(`/search?q=${encodeURIComponent(searchQuery)}`)}
            className="bg-[#113F48] hover:bg-[#C9A15A] text-white text-xs font-bold px-5 py-2.5 rounded-xl ml-2 transition-all cursor-pointer shadow-sm"
          >
            Search
          </button>
        </div>
      </div>

      {/* ── SEARCH HISTORY & TRENDING TAGS ── */}
      <div className="flex flex-wrap gap-4 items-center justify-between text-xs text-stone-500 border-b border-stone-100 pb-4">
        {searchHistory.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="flex items-center gap-1 font-bold text-[#113F48] text-[11px] uppercase tracking-wider">
              <History className="h-3.5 w-3.5 text-[#C9A15A]" /> Recent Searches:
            </span>
            {searchHistory.slice(0, 5).map((kw, i) => (
              <span key={i} className="inline-flex items-center gap-1 bg-stone-100 hover:bg-[#C9A15A]/10 px-2.5 py-1 rounded-md text-[11px] font-medium text-stone-700 transition-colors">
                <button onClick={() => { setSearchQuery(kw); router.push(`/search?q=${encodeURIComponent(kw)}`); }} className="cursor-pointer">
                  {kw}
                </button>
                <button onClick={() => removeHistoryItem(kw)} className="text-stone-400 hover:text-stone-600 cursor-pointer">
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
            <button onClick={clearHistory} className="text-[10px] text-stone-400 hover:text-red-600 underline cursor-pointer ml-1">
              Clear
            </button>
          </div>
        )}

        <div className="flex items-center gap-2 flex-wrap">
          <span className="flex items-center gap-1 font-bold text-[#113F48] text-[11px] uppercase tracking-wider">
            <TrendingUp className="h-3.5 w-3.5 text-[#C9A15A]" /> Popular:
          </span>
          {["Preventive Care", "Diabetes", "Heart Health", "Nutrition", "Mental Health"].map((tag) => (
            <button
              key={tag}
              onClick={() => { setSearchQuery(tag); router.push(`/search?q=${encodeURIComponent(tag)}`); }}
              className="bg-stone-50 hover:bg-[#C9A15A]/10 hover:text-[#C9A15A] border border-stone-200 px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* ── FILTERS BAR ── */}
      <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-[#C9A15A]" />
          <span className="text-xs font-bold text-[#113F48] uppercase tracking-wider">Filter Results</span>
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-stone-50 border border-stone-200 rounded-lg px-3 py-1.5 text-xs text-stone-700 focus:outline-none cursor-pointer"
          >
            <option value="All">All Categories</option>
            {categories.map((c) => (
              <option key={c.slug || c.name} value={c.name}>{c.name}</option>
            ))}
          </select>

          <select
            value={filterReadTime}
            onChange={(e) => setFilterReadTime(e.target.value)}
            className="bg-stone-50 border border-stone-200 rounded-lg px-3 py-1.5 text-xs text-stone-700 focus:outline-none cursor-pointer"
          >
            <option value="all">Any Read Time</option>
            <option value="short">Quick Reads (&lt; 5m)</option>
            <option value="medium">Medium (5-10m)</option>
            <option value="long">Deep Dives (&gt; 10m)</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-stone-50 border border-stone-200 rounded-lg px-3 py-1.5 text-xs text-stone-700 focus:outline-none cursor-pointer"
          >
            <option value="relevant">Most Relevant</option>
            <option value="newest">Newest First</option>
            <option value="popular">Most Viewed</option>
          </select>
        </div>
      </div>

      {/* ── RESULTS SUMMARY ── */}
      <div className="flex justify-between items-center text-xs text-stone-500">
        <span>Found <strong>{filteredPosts.length}</strong> matching guides {searchQuery && <span>for &ldquo;{searchQuery}&rdquo;</span>}</span>
      </div>

      {/* ── RESULTS GRID ── */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <article key={post.id || post.slug} className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="relative h-44 w-full bg-stone-50 overflow-hidden">
                  {post.featuredImage && (
                    <Image
                      src={post.featuredImage}
                      alt={post.imageAlt || post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                  <span className="absolute top-3 left-3 bg-[#113F48]/90 text-white text-[9px] font-bold px-2 py-0.5 rounded z-10">
                    {post.category}
                  </span>
                  <div className="absolute top-3 right-3 flex gap-1.5 z-10">
                    <button
                      onClick={() => handleSavePost(post.slug)}
                      className="p-1.5 bg-white/90 hover:bg-white text-stone-600 rounded-full shadow cursor-pointer transition-colors"
                      title="Bookmark guide"
                      aria-label={`Bookmark guide: ${post.title}`}
                    >
                      <Bookmark className={`h-3.5 w-3.5 ${user?.savedPosts?.includes(post.slug) ? "fill-[#C9A15A] text-[#C9A15A]" : ""}`} />
                    </button>
                    <button
                      onClick={() => handleCopyLink(post.slug)}
                      className="p-1.5 bg-white/90 hover:bg-white text-stone-600 rounded-full shadow cursor-pointer transition-colors"
                      title="Copy guide link"
                      aria-label={`Copy link for: ${post.title}`}
                    >
                      {copiedSlug === post.slug ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Share2 className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="p-5 space-y-2.5">
                  <div className="flex items-center gap-3 text-[10px] text-stone-400">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.publishedAt}</span>
                    {post.readTime && <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</span>}
                  </div>
                  <h3 className="font-extrabold text-[#113F48] text-base leading-snug line-clamp-2 hover:text-[#C9A15A] transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-stone-500 text-xs leading-relaxed line-clamp-3">
                    {post.summary}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 flex justify-between items-center border-t border-stone-100 mt-2">
                <span className="text-[11px] text-stone-400 font-medium">
                  By Mediguide4u Editorial Staff
                </span>
                <Link href={`/blog/${post.slug}`} className="text-xs font-bold text-[#113F48] hover:text-[#C9A15A] flex items-center gap-1 transition-colors">
                  Read Guide <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white border border-stone-200 rounded-2xl p-8 space-y-4">
          <BookOpen className="h-12 w-12 text-stone-300 mx-auto" />
          <h3 className="text-lg font-bold text-stone-700">No Guides Found</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            We couldn&apos;t find any guides matching your criteria. Try adjusting your search keywords or browsing our healthcare categories.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link href="/blog" className="bg-[#113F48] hover:bg-[#C9A15A] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow">
              Browse All Guides
            </Link>
            <button onClick={() => { setSearchQuery(""); setSelectedCategory("All"); setFilterReadTime("all"); }} className="bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold px-5 py-2.5 rounded-xl transition-all cursor-pointer">
              Reset Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SearchClientView(props: SearchClientViewProps) {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center py-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#C9A15A]" />
      </div>
    }>
      <SearchClientContent {...props} />
    </Suspense>
  );
}
