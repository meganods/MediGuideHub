"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPosts, getCategories, BlogPost, BlogCategory, updateUserSavedPosts } from "@/lib/db";
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
  AlertTriangle,
  History,
  TrendingUp,
  X,
  BookOpen,
  Calendar,
  Clock,
  Loader2
} from "lucide-react";

function SearchResultsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();

  const queryParam = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
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
    async function loadData() {
      const allPosts = await getPosts();
      setPosts(allPosts);
      const allCats = await getCategories();
      setCategories(allCats);
    }
    loadData();

    // Load search history from localStorage
    const savedHistory = localStorage.getItem("mediguide4u_search_history");
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
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
    history = history.slice(0, 20); // Keep last 20
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
        alert("Voice recognition is not supported in your browser.");
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.lang = "en-US";
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        router.push(`/search?q=${encodeURIComponent(transcript)}`);
        setIsListening(false);
      };

      recognition.onerror = (e: any) => {
        console.error(e);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      if (isListening) {
        recognition.stop();
      } else {
        recognition.start();
      }
    }
  };

  // Search ranking priority logic
  const filteredResults = posts
    .filter((post) => {
      if (!queryParam) return true;
      
      const q = queryParam.toLowerCase();
      const titleMatch = post.title.toLowerCase().includes(q);
      const categoryMatch = post.category.toLowerCase().includes(q);
      const summaryMatch = post.summary.toLowerCase().includes(q);
      const contentMatch = post.content.toLowerCase().includes(q);
      const authorMatch = post.author.toLowerCase().includes(q);

      return titleMatch || categoryMatch || summaryMatch || contentMatch || authorMatch;
    })
    .filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;

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

      return matchesCategory && matchesReadTime;
    })
    .sort((a, b) => {
      // Relevance ranking prioritizes Exact Title Match, then Category, then Summary
      if (sortBy === "relevant") {
        const q = queryParam.toLowerCase();
        const aTitle = a.title.toLowerCase().includes(q) ? 3 : 0;
        const bTitle = b.title.toLowerCase().includes(q) ? 3 : 0;
        const aCat = a.category.toLowerCase().includes(q) ? 2 : 0;
        const bCat = b.category.toLowerCase().includes(q) ? 2 : 0;

        return (bTitle + bCat) - (aTitle + aCat);
      }
      if (sortBy === "newest") return b.publishedAt.localeCompare(a.publishedAt);
      if (sortBy === "oldest") return a.publishedAt.localeCompare(b.publishedAt);
      if (sortBy === "views") return (b.views || 0) - (a.views || 0);
      return 0;
    });

  const handleShareCopy = (slug: string) => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(`${window.location.origin}/blog/${slug}`);
      setCopiedSlug(slug);
      setTimeout(() => setCopiedSlug(null), 2000);
    }
  };

  const handleSavePost = async (slug: string) => {
    if (!user) {
      router.push("/auth?redirect=" + encodeURIComponent(`/search?q=${queryParam}`));
      return;
    }
    try {
      await updateUserSavedPosts(user.uid, slug, "save");
      alert("Guide saved successfully!");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <Navbar />

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SearchResultsPage",
            "mainEntity": filteredResults.slice(0, 10).map((post) => ({
              "@type": "MedicalWebPage",
              "name": post.title,
              "description": post.summary,
              "url": `https://mediguidehub.com/blog/${post.slug}`
            }))
          })
        }}
      />

      <main className="flex-grow py-12 w-full mx-auto px-4 sm:px-8 md:px-12 lg:px-16 max-w-none space-y-8">
        
        {/* Search controls */}
        <div className="bg-white border border-stone-200 p-6 rounded-3xl shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-[#113F48]">Search Healthcare Platform</h2>
          <div className="flex gap-2">
            <div className="relative w-full bg-[#FDFBF7] border border-stone-200 rounded-xl p-1.5 flex items-center">
              <Search className="h-5 w-5 text-stone-400 ml-3" />
              <input
                type="text"
                placeholder="Search health topics, symptoms, articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
                  }
                }}
                className="w-full bg-transparent px-3 py-2 text-xs text-[#113F48] focus:outline-none"
              />
              <button 
                onClick={handleVoiceSearch} 
                className={`p-2 rounded-lg transition-colors mr-2 ${isListening ? "bg-red-50 text-red-600" : "text-stone-400 hover:text-[#113F48]"}`}
                title="Voice Search"
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </button>
            </div>
            <button
              onClick={() => router.push(`/search?q=${encodeURIComponent(searchQuery)}`)}
              className="bg-[#113F48] hover:bg-[#C9A15A] text-white text-xs font-bold px-6 py-2.5 rounded-xl transition-all"
            >
              Search
            </button>
          </div>

          {/* Popular searches tags */}
          <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold text-stone-500">
            <span>Popular Searches:</span>
            {["Diabetes", "Heart Health", "Nutrition", "Mental Health", "Preventive Care"].map(tag => (
              <button
                key={tag}
                onClick={() => {
                  setSearchQuery(tag);
                  router.push(`/search?q=${encodeURIComponent(tag)}`);
                }}
                className="bg-stone-100 hover:bg-[#C9A15A]/10 hover:text-[#C9A15A] px-2.5 py-1 rounded-md transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Results grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Filters Sidebar */}
          <aside className="lg:col-span-3 bg-white border border-stone-200 p-5 rounded-2xl shadow-sm space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#113F48] flex items-center gap-1"><SlidersHorizontal className="h-4 w-4 text-[#C9A15A]" /> Filters</h4>
            
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wide">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-[#FDFBF7] border border-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-none text-[#113F48]"
              >
                <option value="All">All Categories</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wide">Reading Length</label>
              <select
                value={filterReadTime}
                onChange={(e) => setFilterReadTime(e.target.value)}
                className="w-full bg-[#FDFBF7] border border-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-none text-[#113F48]"
              >
                <option value="all">All Lengths</option>
                <option value="short">Quick reads (&lt; 5m)</option>
                <option value="medium">Medium Content (5-10m)</option>
                <option value="long">Deep Dives (&gt; 10m)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wide">Sort Orders</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-[#FDFBF7] border border-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-none text-[#113F48]"
              >
                <option value="relevant">Relevance Match</option>
                <option value="newest">Newest Articles</option>
                <option value="oldest">Oldest Articles</option>
                <option value="views">Most Viewed</option>
              </select>
            </div>
          </aside>

          {/* Results Area */}
          <div className="lg:col-span-9 space-y-6">
            
            {/* Search metadata */}
            <div className="flex justify-between items-center text-xs text-stone-500">
              <span>Found {filteredResults.length} matching health guides</span>
              {queryParam && (
                <span>Keyword: <strong className="text-[#113F48]">&ldquo;{queryParam}&rdquo;</strong></span>
              )}
            </div>

            {/* List */}
            <div className="space-y-4">
              {filteredResults.map((post) => (
                <div key={post.slug} className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                  <div className="w-full sm:w-40 h-28 bg-stone-50 rounded-xl overflow-hidden flex-shrink-0 border border-stone-100">
                    {post.featuredImage && (
                      <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="space-y-1.5 flex-grow">
                    <span className="text-[9px] font-bold text-[#C9A15A] uppercase">{post.category}</span>
                    <h3 className="font-extrabold text-sm text-[#113F48] hover:text-[#C9A15A] transition-colors leading-snug">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">{post.summary}</p>
                    
                    <div className="pt-2 flex items-center justify-between gap-4 text-[10px] text-stone-400 border-t border-stone-100 mt-3 pt-3">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3 text-[#C9A15A]" /> {post.readTime}</span>
                        <span>By {post.author}</span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <button onClick={() => handleSavePost(post.slug)} className="p-1.5 border border-stone-200 text-stone-400 hover:text-[#113F48] rounded hover:border-[#113F48]" title="Save"><Bookmark className="h-3.5 w-3.5" /></button>
                        <button onClick={() => handleShareCopy(post.slug)} className="p-1.5 border border-stone-200 text-stone-400 hover:text-[#C9A15A] rounded hover:border-[#C9A15A]" title="Copy link">
                          {copiedSlug === post.slug ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Share2 className="h-3.5 w-3.5" />}
                        </button>
                        <Link href={`/blog/${post.slug}`} className="bg-[#113F48] text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#C9A15A] transition-colors shadow-md ml-2">Read Guide</Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {filteredResults.length === 0 && (
                <div className="text-center py-20 bg-white border border-stone-200 rounded-3xl p-8 space-y-4">
                  <AlertTriangle className="h-12 w-12 text-[#C9A15A] mx-auto opacity-75" />
                  <div className="space-y-1">
                    <h3 className="font-bold text-stone-700">No Matching Healthcare Resources Found</h3>
                    <p className="text-xs text-stone-400 max-w-sm mx-auto">Verify spelling, adjust reading length filters, or search generic keywords like Nutrition.</p>
                  </div>
                  <div className="flex justify-center gap-2">
                    <button onClick={() => { setSearchQuery(""); router.push("/search"); }} className="bg-[#113F48] hover:bg-[#C9A15A] text-white text-xs font-semibold px-4.5 py-2 rounded-xl transition-all">Clear Search</button>
                    <Link href="/blog" className="border border-stone-200 hover:bg-stone-50 text-stone-600 text-xs font-semibold px-4.5 py-2 rounded-xl transition-all">Browse Categories</Link>
                  </div>
                </div>
              )}
            </div>

            {/* Search History Panel */}
            {searchHistory.length > 0 && (
              <div className="bg-white border border-stone-200 p-5 rounded-2xl shadow-sm space-y-3">
                <div className="flex justify-between items-center border-b border-stone-100 pb-2">
                  <h4 className="font-bold text-xs text-[#113F48] flex items-center gap-1"><History className="h-4 w-4 text-[#C9A15A]" /> Recent Searches</h4>
                  <button onClick={clearHistory} className="text-[10px] text-stone-400 hover:text-red-600 font-bold hover:underline">Clear History</button>
                </div>
                <div className="flex flex-wrap gap-2 text-[10px] font-medium text-stone-600">
                  {searchHistory.map((hist) => (
                    <div key={hist} className="bg-stone-50 border border-stone-100 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                      <button onClick={() => { setSearchQuery(hist); router.push(`/search?q=${encodeURIComponent(hist)}`); }} className="hover:text-[#C9A15A]">{hist}</button>
                      <button onClick={() => removeHistoryItem(hist)} className="text-stone-300 hover:text-red-600 font-bold"><X className="h-3 w-3" /></button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}

export default function SearchResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8 text-[#C9A15A]" />
      </div>
    }>
      <SearchResultsContent />
    </Suspense>
  );
}
