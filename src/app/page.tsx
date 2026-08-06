"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/lib/authContext";
import { getFAQs, getPosts, getCategories, updateUserSavedPosts, FAQItem, BlogPost, BlogCategory } from "@/lib/db";
import {
  ArrowRight,
  Heart,
  Stethoscope,
  Shield,
  ChevronDown,
  CheckCircle2,
  BookOpen,
  Clock,
  Users,
  FileText,
  RefreshCcw,
  PhoneCall,
  Search,
  Check,
  AlertTriangle,
  HelpCircle,
  ShieldCheck,
  Award,
  Lock,
  Activity,
  Layers,
  ArrowUpRight,
  Bookmark
} from "lucide-react";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
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
        localStorage.setItem("mediguide_current_user", JSON.stringify(updatedProfile));
        showToast(action === "save" ? "Article bookmarked successfully!" : "Article removed from bookmarks.");
      }
    } catch (e) {
      console.error("Failed to save post:", e);
      showToast("Failed to update bookmark.");
    }
  };

  useEffect(() => {
    async function loadData() {
      const allFaqs = await getFAQs();
      setFaqs(allFaqs.length > 0 ? allFaqs : [
        { id: "faq-1", question: "What is MediGuideHub?", answer: "MediGuideHub is an independent, free educational resource platform built to help people understand healthcare policies and medical wellness guidelines.", category: "General" },
        { id: "faq-2", question: "Is the information free?", answer: "Yes, all guide materials, comparison charts, and editorial reviews on MediGuideHub are 100% free to read without advertisements or registration walls.", category: "General" },
        { id: "faq-3", question: "Is this medical advice?", answer: "No, all articles are for educational and information purposes only. They are not a substitute for clinical diagnostics or licensed health coordinator advice.", category: "General" },
        { id: "faq-4", question: "How often is content updated?", answer: "Our research editors review all resources quarterly, updating the guidelines as new health regulations are issued.", category: "General" },
        { id: "faq-5", question: "How can I contact MediGuideHub?", answer: "You can reach out to our team directly via the contact form on our /contact page. We aim to respond within 24-48 business hours.", category: "General" }
      ]);
      const allPosts = await getPosts();
      setPosts(allPosts);
      const allCats = await getCategories();
      setCategories(allCats);
    }
    loadData();
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSuccess(true);
    setNewsletterEmail("");
    setTimeout(() => setNewsletterSuccess(false), 5000);
  };

  const featuredPosts = posts.filter(p => p.featured).slice(0, 3);
  const trendingTopics = posts.slice(0, 8);

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <Navbar />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "MediGuideHub",
            "url": "https://mediguidehub.com",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://mediguidehub.com/blog?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />

      {/* ── SECTION 1: TRUST BAR ── */}
      <div className="bg-[#113F48] text-white py-3 border-b border-[#C9A15A]/20">
        <div className="w-full mx-auto px-4 sm:px-8 md:px-12 lg:px-16 max-w-none">
          <div className="flex flex-wrap justify-center sm:justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-wider text-center">
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-[#C9A15A]" /> Educational Healthcare Platform</span>
            <span className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-[#C9A15A]" /> Evidence-Based Information</span>
            <span className="flex items-center gap-1.5"><Lock className="h-3.5 w-3.5 text-[#C9A15A]" /> Privacy Protected</span>
            <span className="flex items-center gap-1.5"><RefreshCcw className="h-3.5 w-3.5 text-[#C9A15A]" /> Updated Regularly</span>
            <span className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5 text-[#C9A15A]" /> Secure Website</span>
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
                ✓ Clinically Fact-Checked &amp; Unbiased
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#113F48] leading-tight">
                Objective Healthcare &amp; <span className="text-[#C9A15A]">Wellness Guidelines</span>
              </h1>
              <p className="text-sm md:text-base text-stone-500 font-normal leading-relaxed max-w-xl">
                We make healthcare options accessible. Explore evidence-based guides on preventive care, wellness choices, and mental health resources.
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
                  className="bg-[#113F48] hover:bg-[#C9A15A] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all"
                >
                  Search
                </Link>
              </div>

              {/* Popular Searches list */}
              <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold text-stone-500 pt-1">
                <span>Popular Searches:</span>
                {["Health Insurance", "Mental Health", "Diabetes", "Heart Health", "Nutrition", "Vaccination"].map((term) => (
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
                  href="/about"
                  className="inline-flex items-center justify-center px-6 py-3 font-semibold text-[#113F48] bg-white border border-stone-200 hover:border-[#C9A15A] rounded-xl transition-all text-xs"
                >
                  Our Review Board
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
                    <h3 className="text-xl font-bold text-[#113F48]">Evidence-Based</h3>
                    <p className="text-[10px] text-stone-400">Independent Research Publication</p>
                  </div>
                </div>
                <div className="h-px bg-stone-100" />
                <ul className="space-y-2.5 text-xs text-stone-600 font-medium">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#C9A15A]" /> Free health reviews</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#C9A15A]" /> Updated 2026 wellness policies</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#C9A15A]" /> Zero referral bias</li>
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
            <p className="text-stone-500 text-xs max-w-md mx-auto">Access objective reports compiled by our medical editors.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: "Health Articles", desc: "General healthcare guides and tips", icon: <BookOpen className="h-5 w-5 text-[#C9A15A]" /> },
              { title: "Preventive Care", desc: "Methods to sustain wellness before illness", icon: <Shield className="h-5 w-5 text-[#C9A15A]" /> },
              { title: "Mental Health", desc: "Psychological and emotional advisory guides", icon: <Heart className="h-5 w-5 text-[#C9A15A]" /> },
              { title: "Nutrition", desc: "Scientific diet guidelines and analysis", icon: <Activity className="h-5 w-5 text-[#C9A15A]" /> },
              { title: "Heart Health", desc: "Cardiovascular reviews and policy indicators", icon: <Stethoscope className="h-5 w-5 text-[#C9A15A]" /> },
              { title: "Women's Health", desc: "Dedicated resources for female health needs", icon: <Users className="h-5 w-5 text-[#C9A15A]" /> },
              { title: "Children's Health", desc: "Pediatric indices and vaccination guides", icon: <CheckCircle2 className="h-5 w-5 text-[#C9A15A]" /> },
              { title: "Senior Health", desc: "Senior benefit guides and wellness advice", icon: <Award className="h-5 w-5 text-[#C9A15A]" /> }
            ].map((card, i) => (
              <div key={i} className="bg-[#FDFBF7] border border-stone-200 rounded-2xl p-6 hover:border-[#C9A15A] hover:bg-[#FDF6EC]/15 transition-all text-center space-y-2">
                <div className="bg-[#C9A15A]/10 w-fit p-2 rounded-xl mx-auto">{card.icon}</div>
                <h4 className="font-extrabold text-base text-[#113F48]">{card.title}</h4>
                <p className="text-xs text-stone-500 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: FEATURED ARTICLES ── */}
      {featuredPosts.length > 0 && (
        <section className="py-16 bg-[#FDFBF7] border-b border-stone-100">
          <div className="w-full mx-auto px-4 sm:px-8 md:px-12 lg:px-16 max-w-none space-y-8">
            <div className="flex justify-between items-end border-b border-stone-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C9A15A]">Selected Reading</span>
                <h2 className="text-2xl font-extrabold text-[#113F48]">Featured Medical Publications</h2>
              </div>
              <Link href="/blog" className="text-xs font-bold text-[#C9A15A] hover:underline flex items-center gap-0.5">All Guides <ArrowUpRight className="h-3.5 w-3.5" /></Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredPosts.map((post) => (
                <article key={post.slug} className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full">
                  <div className="relative h-44 w-full bg-stone-50">
                    {post.featuredImage && (
                      <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover" />
                    )}
                    <span className="absolute top-3 left-3 bg-[#113F48] text-white text-[9px] font-bold px-2 py-0.5 rounded">{post.category}</span>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleToggleSave(post.slug);
                      }}
                      className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 hover:bg-white text-stone-600 hover:text-[#C9A15A] transition-colors shadow-sm cursor-pointer"
                      title="Save Article"
                    >
                      <Bookmark className={`h-4 w-4 ${savedSlugs.includes(post.slug) ? "fill-[#C9A15A] text-[#C9A15A]" : ""}`} />
                    </button>
                  </div>
                  <div className="p-5 flex-grow space-y-2">
                    <span className="text-[10px] text-stone-400 block">{post.publishedAt} • {post.readTime}</span>
                    <h4 className="font-extrabold text-[#113F48] text-sm hover:text-[#C9A15A] transition-colors leading-snug line-clamp-2">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h4>
                    <p className="text-stone-500 text-xs line-clamp-3 leading-relaxed">{post.summary}</p>
                  </div>
                  <div className="p-5 pt-3 border-t border-stone-100 flex justify-between items-center">
                    <span className="text-stone-500 text-xs mt-1">By {post.author}</span>
                    <Link href={`/blog/${post.slug}`} className="bg-[#113F48] text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-[#C9A15A] transition-colors shadow-md">Read Guide</Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── SECTION 5: TRENDING TOPICS ── */}
      {trendingTopics.length > 0 && (
        <section className="py-16 bg-white border-b border-stone-100">
          <div className="w-full mx-auto px-4 sm:px-8 md:px-12 lg:px-16 max-w-none space-y-8">
            <div className="text-center space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C9A15A]">Daily Feed</span>
              <h2 className="text-2xl font-extrabold text-[#113F48]">Trending Healthcare Topics</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {trendingTopics.slice(0, 3).map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="bg-[#FDFBF7] border border-stone-200 hover:border-[#C9A15A] p-4 rounded-xl transition-all space-y-1 block">
                  <span className="text-[9px] font-bold text-[#C9A15A] uppercase">{post.category}</span>
                  <h4 className="font-bold text-xs text-[#113F48] line-clamp-2 leading-snug">{post.title}</h4>
                  <span className="text-[9px] text-stone-400 block">{post.readTime}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── SECTION 6: WHY TRUST MEDIGUIDEHUB ── */}
      <section className="py-16 bg-[#FDFBF7] border-b border-stone-100">
        <div className="w-full mx-auto px-4 sm:px-8 md:px-12 lg:px-16 max-w-none space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C9A15A]">E-E-A-T Framework</span>
            <h2 className="text-2xl font-extrabold text-[#113F48]">Why Readers Trust MediGuideHub</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Educational Content", desc: "Purely informational pages without aggressive marketing pitches.", icon: <BookOpen className="h-5 w-5 text-[#C9A15A]" /> },
              { title: "Editorial Review Process", desc: "All guides are fact-checked and reviewed prior to publishing.", icon: <ShieldCheck className="h-5 w-5 text-[#C9A15A]" /> },
              { title: "Evidence-Based Resources", desc: "Referencing federal documents under HHS and CMS provisions.", icon: <Stethoscope className="h-5 w-5 text-[#C9A15A]" /> },
              { title: "Privacy First", desc: "No cookies or session parameters sold or tracked for ad campaigns.", icon: <Lock className="h-5 w-5 text-[#C9A15A]" /> },
              { title: "Regular Content Updates", desc: "All data schedules are updated quarterly to match local regulations.", icon: <RefreshCcw className="h-5 w-5 text-[#C9A15A]" /> },
              { title: "Independent Information", desc: "No affiliation or sponsorships influence our coverage summaries.", icon: <Award className="h-5 w-5 text-[#C9A15A]" /> }
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
            <h2 className="text-2xl font-extrabold text-[#113F48]">Our Rigorous Editorial Review</h2>
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
                { num: "01", step: "Research", desc: "Gathering federal updates" },
                { num: "02", step: "Writing", desc: "Simplifying guidelines" },
                { num: "03", step: "Editorial Review", desc: "Styling for readability" },
                { num: "04", step: "Fact Checking", desc: "Reviewing references" },
                { num: "05", step: "Publishing", desc: "Deploying pages cleanly" },
                { num: "06", step: "Regular Updates", desc: "Reviewing every quarter" }
              ].concat([
                { num: "01", step: "Research", desc: "Gathering federal updates" },
                { num: "02", step: "Writing", desc: "Simplifying guidelines" },
                { num: "03", step: "Editorial Review", desc: "Styling for readability" },
                { num: "04", step: "Fact Checking", desc: "Reviewing references" },
                { num: "05", step: "Publishing", desc: "Deploying pages cleanly" },
                { num: "06", step: "Regular Updates", desc: "Reviewing every quarter" }
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
                The content hosted on MediGuideHub is provided for educational and information purposes only. None of the articles constitute clinical advice or endorse any commercial health policy provider. Consult with a licensed physician or policy representative before modifying your personal health coverage plans.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 9: NEWSLETTER ── */}
      <section className="py-16 bg-[#113F48] text-white">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center space-y-6">
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Stay Updated with Trusted Healthcare Information</h3>
          <p className="text-stone-300 max-w-md mx-auto text-xs leading-relaxed">
            Get E-E-A-T reviewed guides, wellness policy updates, and important health advisories. No advertisements.
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
              className="bg-[#C9A15A] hover:bg-[#B58F4E] text-[#113F48] font-bold px-6 py-2.5 rounded-xl text-xs whitespace-nowrap transition-colors"
            >
              Subscribe
            </button>
          </form>
          {newsletterSuccess && (
            <p className="text-emerald-400 font-bold text-xs">✓ Thank you for subscribing to MediGuideHub update feeds!</p>
          )}
        </div>
      </section>

      {/* ── SECTION 10: STATISTICS ── */}
      <section className="py-12 bg-white border-b border-stone-100">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { val: "30+", label: "Articles Published" },
              { val: "17+", label: "Healthcare Categories" },
              { val: "12K+", label: "Monthly Readers" },
              { val: "2026", label: "Content Updates" }
            ].map((stat, i) => (
              <div key={i} className="space-y-1">
                <span className="text-3xl font-extrabold text-[#113F48]">{stat.val}</span>
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 11: WHY READERS CHOOSE MEDIGUIDEHUB ── */}
      <section className="py-16 bg-[#FDFBF7] border-b border-stone-100">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C9A15A]">Reader Loyalty</span>
            <h2 className="text-2xl font-extrabold text-[#113F48]">Why Readers Choose MediGuideHub</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-stone-200 p-6 rounded-2xl space-y-2">
              <span className="font-bold text-xs text-[#113F48]">Transparency &amp; Independence</span>
              <p className="text-xs text-stone-500 leading-relaxed">
                Unlike brokerage sites, we do not require you to input phone numbers or email addresses to browse coverage quotes. All info is openly readable.
              </p>
            </div>
            <div className="bg-white border border-stone-200 p-6 rounded-2xl space-y-2">
              <span className="font-bold text-xs text-[#113F48]">Focus on Helpful Literacy</span>
              <p className="text-xs text-stone-500 leading-relaxed">
                We focus on reducing complex government policy drafts into clean tables, step-by-step guides, and clear definitions that help seniors choose wisely.
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
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#113F48]">Common Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setActiveFaq(activeFaq === faq.id ? null : faq.id)}
                  className="w-full text-left p-5 sm:p-6 bg-[#FDFBF7] hover:bg-[#FDF6EC]/15 flex justify-between items-center text-sm sm:text-base font-extrabold text-[#113F48] transition-colors focus:outline-none"
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

      <Footer />
    </div>
  );
}
