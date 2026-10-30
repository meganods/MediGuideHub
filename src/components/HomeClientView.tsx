"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/authContext";
import AdBanner from "@/components/AdBanner";
import { updateUserSavedPosts, BlogPost, BlogCategory, FAQItem, SiteSettings, subscribeToPublishedBlogPosts, subscribeToPublishedFAQs } from "@/lib/db";
import { getAuthorProfileUrl } from "@/components/BlogComponents";
import {
  ArrowRight,
  Heart,
  Stethoscope,
  Shield,
  ChevronDown,
  CheckCircle2,
  BookOpen,
  Users,
  RefreshCcw,
  Search,
  Check,
  AlertTriangle,
  ShieldCheck,
  Award,
  Lock,
  Activity,
  ArrowUpRight,
  Bookmark,
  Eye,
  FileText
} from "lucide-react";

interface HomeClientViewProps {
  initialPosts: BlogPost[];
  initialCategories: BlogCategory[];
  initialFaqs: FAQItem[];
  initialSettings?: SiteSettings;
}

export default function HomeClientView({
  initialPosts,
  initialCategories,
  initialFaqs,
  initialSettings,
}: HomeClientViewProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [faqs, setFaqs] = useState<FAQItem[]>(initialFaqs);
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [categories, setCategories] = useState<BlogCategory[]>(initialCategories);
  const [settings, setSettings] = useState<SiteSettings | undefined>(initialSettings);
  const [searchQuery, setSearchQuery] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [activeFaq, setActiveFaq] = useState<string | null>(null);
  
  const [savedSlugs, setSavedSlugs] = useState<string[]>([]);
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: "", visible: false });

  const showToast = (message: string) => {
    setToast({ message, visible: true });
  };

  useEffect(() => {
    setPosts(initialPosts);
  }, [initialPosts]);

  useEffect(() => {
    setCategories(initialCategories);
  }, [initialCategories]);

  useEffect(() => {
    setFaqs(initialFaqs);
  }, [initialFaqs]);

  useEffect(() => {
    if (initialSettings) setSettings(initialSettings);
  }, [initialSettings]);

  // Real-time synchronization with database updates
  useEffect(() => {
    const unsubPosts = subscribeToPublishedBlogPosts((livePosts) => {
      if (livePosts && livePosts.length > 0) {
        setPosts(livePosts);
      }
    });
    const unsubFaqs = subscribeToPublishedFAQs((liveFaqs) => {
      if (liveFaqs && liveFaqs.length > 0) {
        setFaqs(liveFaqs);
      }
    });
    return () => {
      unsubPosts();
      unsubFaqs();
    };
  }, []);

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
      router.push("/auth?redirect=" + encodeURIComponent("/"));
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

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSuccess(true);
    setNewsletterEmail("");
    setTimeout(() => setNewsletterSuccess(false), 5000);
  };

  const featuredPosts = posts.filter(p => p.featured).slice(0, 4);
  const displayFeatured = featuredPosts.length > 0 ? featuredPosts : posts.slice(0, 4);
  const trendingTopics = posts.slice(0, 8);

  // Verifiable numbers derived directly from the real database state
  const publishedGuideCount = posts.length;
  const topicCategoryCount = categories.length;
  const publishedFaqCount = faqs.length;

  const statsList = [
    { val: `${publishedGuideCount}`, label: "Healthcare Guides" },
    { val: `${topicCategoryCount}`, label: "Health Topics" },
    { val: "100%", label: "Physician Reviewed" },
    { val: "Free", label: "Educational Access" }
  ];

  return (
    <>
      {/* ── SECTION 1: TRUST BAR ── */}
      <div className="bg-[#113F48] text-white py-3 border-b border-[#C9A15A]/20">
        <div className="w-full mx-auto px-4 sm:px-8 md:px-12 lg:px-16 max-w-none">
          <div className="flex flex-wrap justify-center sm:justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-wider text-center">
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-[#C9A15A]" /> Educational Healthcare Platform</span>
            <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-[#C9A15A]" /> Medically-Reviewed Information</span>
            <span className="flex items-center gap-1.5"><Lock className="h-3.5 w-3.5 text-[#C9A15A]" /> Privacy Protected</span>
            <span className="flex items-center gap-1.5"><RefreshCcw className="h-3.5 w-3.5 text-[#C9A15A]" /> Regularly Updated Content</span>
            <span className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5 text-[#C9A15A]" /> Secure Platform</span>
          </div>
        </div>
      </div>

      {/* ── SECTION 2: HERO SECTION ── */}
      <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-b from-stone-50 to-[#FDFBF7] border-b border-stone-100">
        <div className="w-full mx-auto px-4 sm:px-8 md:px-12 lg:px-16 max-w-none relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A15A]/10 border border-[#C9A15A]/25 text-[10px] font-bold uppercase tracking-wider text-[#C9A15A]">
                Health Information Fact-Checked by Medical Experts
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#113F48] leading-tight">
                {settings?.heroTitle ? (
                  settings.heroTitle
                ) : (
                  <>
                    Clear Healthcare &amp; <span className="text-[#C9A15A]">Wellness Guidelines</span>
                  </>
                )}
              </h1>
              <p className="text-sm md:text-base text-stone-500 font-normal leading-relaxed max-w-xl">
                {settings?.heroSubtitle || "We make healthcare concepts accessible to everyone. Explore comprehensive guides covering symptoms, conditions, clinical nutrition, preventive care, and everyday wellness."}
              </p>

              {/* Direct Search Bar */}
              <div className="bg-white border border-stone-200 rounded-2xl shadow-sm p-1.5 flex items-center max-w-md">
                <Search className="h-4.5 w-4.5 text-stone-400 ml-3" />
                <input
                  type="text"
                  placeholder="Search health topics, keywords, or guides..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white px-3 py-2 text-xs text-[#113F48] focus:outline-none"
                />
                <Link
                  href={`/blog?q=${encodeURIComponent(searchQuery)}`}
                  className="bg-[#113F48] hover:bg-[#C9A15A] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all whitespace-nowrap"
                >
                  Search
                </Link>
              </div>

              {/* Popular Searches list */}
              <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold text-stone-500 pt-1">
                <span>Popular Searches:</span>
                {["Preventive Care", "Mental Health", "Diabetes", "Heart Health", "Nutrition", "Blood Pressure"].map((term) => (
                  <Link
                    key={term}
                    href={`/blog?q=${encodeURIComponent(term)}`}
                    className="bg-stone-100 hover:bg-[#C9A15A]/10 hover:text-[#C9A15A] px-2.5 py-1 rounded-md transition-colors"
                  >
                    {term}
                  </Link>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  href="/blog"
                  className="inline-flex items-center justify-center px-8 py-4 font-bold text-white bg-[#113F48] hover:bg-[#C9A15A] rounded-xl transition-all shadow-lg shadow-[#113F48]/10 text-base"
                >
                  Read Healthcare Guides <ArrowRight className="ml-1.5 h-5 w-5" />
                </Link>
                <Link
                  href="/editorial-policy"
                  className="inline-flex items-center justify-center px-6 py-3 font-semibold text-[#113F48] bg-white border border-stone-200 hover:border-[#C9A15A] rounded-xl transition-all text-xs"
                >
                  Editorial Standards
                </Link>
              </div>
            </div>

            {/* Right Card Panel */}
            <div className="lg:col-span-5 relative flex justify-end">
              <div className="bg-white border border-stone-200 rounded-3xl p-6.5 shadow-xl space-y-4 max-w-sm w-full">
                <div className="flex items-center gap-3">
                  <div className="bg-[#C9A15A]/10 p-2.5 rounded-xl">
                    <Heart className="h-6 w-6 text-[#C9A15A]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#113F48]">Physician Reviewed</h3>
                    <p className="text-[10px] text-stone-400">Independent Educational Publication</p>
                  </div>
                </div>
                <div className="h-px bg-stone-100" />
                <ul className="space-y-2.5 text-xs text-stone-600 font-medium">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#C9A15A]" /> Free health educational resources</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#C9A15A]" /> Researched from NIH, CDC, and WHO sources</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#C9A15A]" /> Independent editorial standards</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 3: QUICK HEALTH CATEGORIES ── */}
      <section className="py-16 bg-white border-b border-stone-100">
        <div className="w-full mx-auto px-4 sm:px-8 md:px-12 lg:px-16 max-w-none space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C9A15A]">Guides Directory</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#113F48]">Essential Healthcare Directories</h2>
            <p className="text-stone-500 text-xs max-w-md mx-auto">Access objective guides compiled by our editorial team.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: "Health Guides", desc: "Comprehensive doctor-reviewed healthcare guides and clinical awareness", icon: <BookOpen className="h-5 w-5 text-[#C9A15A]" />, href: "/blog" },
              { title: "Heart & Cardiometabolic", desc: "Cardiovascular medicine, hypertension, lipid management & diabetes", icon: <Stethoscope className="h-5 w-5 text-[#C9A15A]" />, href: "/category/heart-health" },
              { title: "Preventive Care & Diagnostics", desc: "Evidence-based health screening checklists, lab panels & vaccines", icon: <Shield className="h-5 w-5 text-[#C9A15A]" />, href: "/category/preventive-care" },
              { title: "Mental Health & Sleep Science", desc: "Neuroscience-backed guides on anxiety, mood, stress & sleep", icon: <Heart className="h-5 w-5 text-[#C9A15A]" />, href: "/category/mental-health" },
              { title: "Digestive Health & Nutrition", desc: "Gastroenterology, microbiome science, GERD, IBS & metabolic diets", icon: <Activity className="h-5 w-5 text-[#C9A15A]" />, href: "/category/wellness" },
              { title: "Senior Healthcare & Longevity", desc: "Geriatric mobility, sarcopenia prevention & cognitive health", icon: <Award className="h-5 w-5 text-[#C9A15A]" />, href: "/category/senior-healthcare" },
              { title: "Women's & Hormonal Health", desc: "Physician-guided resources on perimenopause, HRT, PCOS & thyroid", icon: <Users className="h-5 w-5 text-[#C9A15A]" />, href: "/category/women-s-health" },
              { title: "Interactive Health Tools", desc: "Clinical calculators, symptom checks and preventive scorecards", icon: <CheckCircle2 className="h-5 w-5 text-[#C9A15A]" />, href: "/tools" }
            ].map((card, i) => (
              <Link key={i} href={card.href} className="bg-[#FDFBF7] border border-stone-200 rounded-2xl p-6 hover:border-[#C9A15A] hover:bg-[#FDF6EC]/15 transition-all text-center space-y-2 block">
                <div className="bg-[#C9A15A]/10 w-fit p-2 rounded-xl mx-auto">{card.icon}</div>
                <h4 className="font-extrabold text-base text-[#113F48]">{card.title}</h4>
                <p className="text-xs text-stone-500 leading-relaxed">{card.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: FEATURED ARTICLES ── */}
      {displayFeatured.length > 0 && (
        <section className="py-16 bg-[#FDFBF7] border-b border-stone-100">
          <div className="w-full mx-auto px-4 sm:px-8 md:px-12 lg:px-16 max-w-none space-y-8">
            <div className="flex justify-between items-end border-b border-stone-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C9A15A]">Selected Reading</span>
                <h2 className="text-2xl font-extrabold text-[#113F48]">Featured Medical Publications</h2>
              </div>
              <Link href="/blog" className="text-xs font-bold text-[#C9A15A] hover:underline flex items-center gap-0.5">All Guides <ArrowUpRight className="h-3.5 w-3.5" /></Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayFeatured.map((post) => (
                <article key={post.slug} className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full">
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
                    <span className="absolute top-3 left-3 bg-[#113F48] text-white text-[9px] font-bold px-2 py-0.5 rounded z-10">{post.category}</span>
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
                  <div className="p-5 flex-grow space-y-2">
                    <span className="text-[10px] text-stone-400 flex items-center justify-between">
                      <span>{post.publishedAt} • {post.readTime || "5 min read"}</span>
                      <span className="flex items-center gap-1"><Eye className="h-3 w-3 text-[#C9A15A]" /> {post.views || 0}</span>
                    </span>
                    <h4 className="font-extrabold text-[#113F48] text-sm hover:text-[#C9A15A] transition-colors leading-snug line-clamp-2">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h4>
                    <p className="text-stone-500 text-xs line-clamp-3 leading-relaxed">{post.summary}</p>
                  </div>
                  <div className="p-5 pt-3 border-t border-stone-100 flex justify-between items-center">
                    <span className="text-stone-500 text-xs mt-1">
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
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Leaderboard Ad Placement */}
      <div className="w-full mx-auto px-4 sm:px-8 md:px-12 lg:px-16 max-w-none bg-[#FDFBF7] py-2">
        <AdBanner format="leaderboard" />
      </div>

      {/* ── SECTION 5: TRENDING TOPICS ── */}
      {trendingTopics.length > 0 && (
        <section className="py-16 bg-white border-b border-stone-100">
          <div className="w-full mx-auto px-4 sm:px-8 md:px-12 lg:px-16 max-w-none space-y-8">
            <div className="text-center space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C9A15A]">Daily Feed</span>
              <h2 className="text-2xl font-extrabold text-[#113F48]">Trending Healthcare Topics</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {trendingTopics.slice(0, 3).map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="bg-white border border-stone-200 hover:border-[#C9A15A] p-6.5 rounded-2xl transition-all space-y-3.5 block shadow-sm hover:shadow-md">
                  <span className="text-[10px] font-bold text-[#C9A15A] uppercase tracking-wider block">{post.category}</span>
                  <h4 className="font-extrabold text-sm sm:text-base text-[#113F48] line-clamp-2 leading-snug hover:text-[#C9A15A] transition-colors">{post.title}</h4>
                  <span className="text-[10px] text-stone-400 font-medium block">{post.readTime || "5 min read"}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── SECTION 6: WHY TRUST MEDIGUIDE4U ── */}
      <section className="py-16 bg-[#FDFBF7] border-b border-stone-100">
        <div className="w-full mx-auto px-4 sm:px-8 md:px-12 lg:px-16 max-w-none space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C9A15A]">Trust &amp; Transparency</span>
            <h2 className="text-2xl font-extrabold text-[#113F48]">Why Readers Trust mediguide4u</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Educational Content", desc: "Purely informational pages without aggressive marketing pitches.", icon: <BookOpen className="h-5 w-5 text-[#C9A15A]" /> },
              { title: "Editorial Review Process", desc: "All guides are researched and reviewed against reputable medical sources prior to publishing.", icon: <ShieldCheck className="h-5 w-5 text-[#C9A15A]" /> },
              { title: "Authoritative Citations", desc: "Referencing reputable medical institutions including the NIH, CDC, and WHO.", icon: <Stethoscope className="h-5 w-5 text-[#C9A15A]" /> },
              { title: "Privacy First", desc: "We respect your digital privacy. No personal medical queries are tracked or sold.", icon: <Lock className="h-5 w-5 text-[#C9A15A]" /> },
              { title: "Regular Content Updates", desc: "Health guides are reviewed periodically to reflect current clinical guidelines.", icon: <RefreshCcw className="h-5 w-5 text-[#C9A15A]" /> },
              { title: "Independent Information", desc: "Independent educational publication with zero commercial product sponsorship bias.", icon: <Award className="h-5 w-5 text-[#C9A15A]" /> }
            ].map((trust, idx) => (
              <div key={idx} className="bg-white border border-stone-200 rounded-2xl p-6.5 space-y-2.5 shadow-sm">
                <div className="bg-[#C9A15A]/10 w-fit p-2 rounded-xl">{trust.icon}</div>
                <h4 className="font-extrabold text-base text-[#113F48]">{trust.title}</h4>
                <p className="text-sm text-stone-500 leading-relaxed">{trust.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 7: EDITORIAL PROCESS ── */}
      <section className="py-16 bg-white border-b border-stone-100">
        <div className="w-full mx-auto px-4 sm:px-8 md:px-12 lg:px-16 max-w-none space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C9A15A]">Workflow Integrity</span>
            <h2 className="text-2xl font-extrabold text-[#113F48]">Our Editorial Research Process</h2>
          </div>
          <div className="relative w-full overflow-hidden">
            <style dangerouslySetInnerHTML={{__html: `
              @keyframes marquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .animate-marquee-scroll {
                display: flex;
                width: max-content;
                animation: marquee 25s linear infinite;
              }
              .animate-marquee-scroll:hover {
                animation-play-state: paused;
              }
            `}} />
            <div className="animate-marquee-scroll flex gap-6 py-2">
              {[
                { num: "01", step: "Research", desc: "Reviewing medically-reviewed literature and public databases" },
                { num: "02", step: "Writing", desc: "Explaining health concepts in clear language" },
                { num: "03", step: "Editorial Review", desc: "Checking clarity, tone, and educational quality" },
                { num: "04", step: "Fact Checking", desc: "Cross-referencing claims against medical literature" },
                { num: "05", step: "Publishing", desc: "Making guides freely available to readers" },
                { num: "06", step: "Regular Updates", desc: "Refreshing guides to reflect updated findings" }
              ].concat([
                { num: "01", step: "Research", desc: "Reviewing medically-reviewed literature and public databases" },
                { num: "02", step: "Writing", desc: "Explaining health concepts in clear language" },
                { num: "03", step: "Editorial Review", desc: "Checking clarity, tone, and educational quality" },
                { num: "04", step: "Fact Checking", desc: "Cross-referencing claims against medical literature" },
                { num: "05", step: "Publishing", desc: "Making guides freely available to readers" },
                { num: "06", step: "Regular Updates", desc: "Refreshing guides to reflect updated findings" }
              ]).map((e, idx) => (
                <div key={idx} className="bg-white border border-stone-200 rounded-2xl p-6.5 space-y-2.5 shadow-sm hover:border-[#C9A15A] hover:bg-[#FDF6EC]/10 transition-all flex flex-col justify-between min-h-[150px] w-[280px] shrink-0">
                  <div>
                    <span className="text-2xl font-black text-[#C9A15A]/45 block mb-1.5">{e.num}</span>
                    <h4 className="font-extrabold text-base text-[#113F48]">{e.step}</h4>
                  </div>
                  <p className="text-sm text-stone-500 leading-relaxed whitespace-normal">{e.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 8: MEDICAL DISCLAIMER ── */}
      <section className="py-10 bg-[#FDFBF7] border-b border-stone-100">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="bg-[#FAE5C7]/15 border border-[#C9A15A]/35 p-6 rounded-2xl flex gap-4 items-start shadow-sm">
            <AlertTriangle className="h-5 w-5 text-[#C9A15A] flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#113F48] uppercase tracking-wide">Public Medical Disclaimer</span>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                The content hosted on mediguide4u is provided for general educational and informational purposes only. None of the articles constitute clinical diagnosis, personalized medical advice, or treatment recommendations. Always consult with a licensed physician or qualified healthcare provider regarding medical conditions or symptoms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 9: NEWSLETTER ── */}
      <section className="py-16 bg-[#113F48] text-white">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center space-y-6">
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Stay Informed with Clear Healthcare Insights</h3>
          <p className="text-stone-300 max-w-md mx-auto text-xs leading-relaxed">
            Get doctor-reviewed medical guides, wellness tips, and preventive care resources directly in your inbox.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email address..."
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#C9A15A]"
            />
            <button
              type="submit"
              className="bg-[#C9A15A] hover:bg-[#B58F4E] text-[#113F48] font-bold px-6 py-2.5 rounded-xl text-xs whitespace-nowrap transition-colors cursor-pointer"
            >
              Subscribe
            </button>
          </form>
          {newsletterSuccess && (
            <p className="text-emerald-400 font-bold text-xs">✓ Thank you for subscribing to mediguide4u updates!</p>
          )}
        </div>
      </section>

      {/* ── SECTION 10: VERIFIABLE STATISTICS ── */}
      <section className="py-12 bg-white border-b border-stone-100">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {statsList.map((stat, i) => (
              <div key={i} className="space-y-1">
                <span className="text-3xl font-extrabold text-[#113F48]">{stat.val}</span>
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 11: WHY READERS CHOOSE MEDIGUIDE4U ── */}
      <section className="py-16 bg-[#FDFBF7] border-b border-stone-100">
        <div className="w-full mx-auto px-4 sm:px-8 md:px-12 lg:px-16 max-w-4xl space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C9A15A]">Educational Mission</span>
            <h2 className="text-2xl font-extrabold text-[#113F48]">Why Readers Choose mediguide4u</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-stone-200 p-6 rounded-2xl space-y-2">
              <span className="font-bold text-xs text-[#113F48]">Transparency &amp; Independence</span>
              <p className="text-xs text-stone-500 leading-relaxed">
                We provide openly accessible healthcare and wellness education. We do not require signups or personal contact details to read our guides.
              </p>
            </div>
            <div className="bg-white border border-stone-200 p-6 rounded-2xl space-y-2">
              <span className="font-bold text-xs text-[#113F48]">Focus on Health Literacy</span>
              <p className="text-xs text-stone-500 leading-relaxed">
                We focus on breaking down complex clinical and wellness concepts into clear, structured guides, preventive recommendations, and practical health awareness information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 12: FAQ ── */}
      <section className="py-16 bg-white border-b border-stone-100">
        <div className="w-full mx-auto px-4 sm:px-8 md:px-12 lg:px-16 max-w-none space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C9A15A]">FAQ Directory</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#113F48]">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4 max-w-5xl mx-auto">
            {faqs.map((faq) => (
              <div key={faq.id} className="border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setActiveFaq(activeFaq === faq.id ? null : faq.id)}
                  className="w-full text-left p-5 sm:p-6 bg-[#FDFBF7] hover:bg-[#FDF6EC]/15 flex justify-between items-center text-sm sm:text-base font-extrabold text-[#113F48] transition-colors focus:outline-none cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`h-5 w-5 text-[#C9A15A] transition-transform ${activeFaq === faq.id ? "rotate-180" : ""}`} />
                </button>
                {activeFaq === faq.id && (
                  <div className="p-5 sm:p-6 bg-white border-t border-stone-200 text-sm sm:text-base text-stone-600 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
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
