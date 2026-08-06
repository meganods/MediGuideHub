"use client";

import React, { useEffect, useState, use } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/authContext";
import { getPostBySlug, getPosts, updateUserSavedPosts, saveUserProfile, BlogPost, getCommentsForPost, addComment, BlogComment } from "@/lib/db";
import { 
  Bookmark, 
  Clock, 
  ChevronLeft, 
  User, 
  Share2, 
  Check, 
  AlertTriangle,
  BookOpen,
  Calendar,
  ArrowLeft,
  ArrowRight,
  Send,
  Copy
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function BlogPostDetail(props: PageProps) {
  const params = use(props.params);
  const router = useRouter();
  const { user } = useAuth();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  // Comments state
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [commentName, setCommentName] = useState("");
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    async function loadPost() {
      const foundPost = await getPostBySlug(params.slug);
      const list = await getPosts();
      setAllPosts(list);
      
      if (foundPost) {
        setPost(foundPost);
        if (user) {
          setIsSaved(user.savedPosts?.includes(params.slug) || false);
          
          const existingHistory = (user as any).readingHistory || [];
          const alreadyLogged = existingHistory.some((h: any) => h.slug === params.slug);
          if (!alreadyLogged) {
            const newHistoryItem = {
              slug: params.slug,
              date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
              progress: 100
            };
            const updatedHistory = [newHistoryItem, ...existingHistory];
            const updatedProfile = {
              ...user,
              readingHistory: updatedHistory
            };
            try {
              await saveUserProfile(updatedProfile);
              localStorage.setItem("mediguide_current_user", JSON.stringify(updatedProfile));
            } catch (err) {
              console.error("Failed to log reading history:", err);
            }
          }
        }
        const postComments = await getCommentsForPost(params.slug);
        setComments(postComments);
      }
      setLoading(false);
    }
    loadPost();
  }, [params.slug, user]);

  const handleToggleSave = async () => {
    if (!user) {
      router.push("/auth?redirect=" + encodeURIComponent(`/blog/${params.slug}`));
      return;
    }
    try {
      const action = isSaved ? "unsave" : "save";
      await updateUserSavedPosts(user.uid, params.slug, action);
      setIsSaved(!isSaved);
    } catch (e) {
      console.error("Failed to save post status:", e);
    }
  };

  const handleShareCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName || !commentText || !post) return;
    const newComment = {
      postSlug: post.slug,
      postTitle: post.title,
      name: commentName,
      text: commentText,
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      createdAt: new Date().toISOString()
    };
    try {
      await addComment(newComment);
      const postComments = await getCommentsForPost(post.slug);
      setComments(postComments);
      setCommentName("");
      setCommentText("");
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
        <Navbar />
        <div className="flex-grow flex items-center justify-center py-24">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#C9A15A]"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
        <Navbar />
        <div className="flex-grow max-w-md mx-auto text-center py-24 px-4 space-y-4">
          <h2 className="text-2xl font-bold text-[#113F48]">Guide Not Found</h2>
          <p className="text-stone-500">The health guide you are looking for does not exist or has been removed.</p>
          <Link href="/blog" className="inline-flex items-center text-[#C9A15A] hover:underline font-semibold text-sm">
            <ChevronLeft className="h-4 w-4" /> Back to Guides
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Related posts
  const relatedPosts = allPosts.filter(p => p.category === post.category && p.slug !== post.slug).slice(0, 3);
  const nextPost = allPosts.find(p => p.slug !== post.slug);

  // Extract head tags for TOC
  const headings = [
    { text: "Overview", id: "overview" },
    { text: "Benefits & Cost Schedule", id: "benefits" },
    { text: "Eligibility and Enrollment", id: "enrollment" },
    { text: "Frequently Asked Questions", id: "faq" }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <Navbar />

      {/* Dynamic JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalWebPage",
            "name": post.title,
            "description": post.summary,
            "lastReviewed": post.lastReviewedDate || post.updatedAt || post.publishedAt,
            "reviewedBy": {
              "@type": "Person",
              "name": "Dr. Angela Roberts, MD"
            },
            "publisher": {
              "@type": "Organization",
              "name": "MediGuideHub",
              "logo": "https://mediguidehub.com/logo.png"
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://mediguidehub.com/blog/${post.slug}`
            }
          })
        }}
      />

      <main className="flex-grow py-8 w-full mx-auto px-4 sm:px-8 md:px-12 lg:px-16 max-w-none">
        
        {/* Breadcrumb Navigation */}
        <nav className="text-xs text-stone-500 mb-6 flex items-center gap-1.5 font-medium">
          <Link href="/" className="hover:text-[#C9A15A]">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-[#C9A15A]">Blog</Link>
          <span>/</span>
          <span className="text-[#113F48] font-bold truncate max-w-xs">{post.title}</span>
        </nav>

        {/* Outer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Article Stream (8 Cols) */}
          <article className="lg:col-span-8 bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-sm p-6 sm:p-10 space-y-8">
            
            {/* Header info */}
            <div className="space-y-4">
              <span className="text-[10px] font-bold text-[#C9A15A] uppercase tracking-widest bg-[#C9A15A]/10 px-2.5 py-1 rounded border border-[#C9A15A]/25">{post.category}</span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#113F48] leading-tight">{post.title}</h1>
              <p className="text-stone-600 text-sm italic leading-relaxed">{post.summary}</p>
              
              <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-500">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1"><User className="h-3.5 w-3.5 text-[#C9A15A]" /> By {post.author}</span>
                  <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5 text-[#C9A15A]" /> Published {post.publishedAt}</span>
                  {post.updatedAt && (
                    <span className="text-stone-400">Revised: {post.updatedAt}</span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-[#C9A15A]" /> {post.readTime || "5 min read"}</span>
                  <button onClick={handleToggleSave} className="hover:text-[#C9A15A] flex items-center gap-1">
                    <Bookmark className={`h-4 w-4 ${isSaved ? "fill-[#C9A15A] text-[#C9A15A]" : ""}`} /> Save
                  </button>
                </div>
              </div>
            </div>

            {/* Medical Warning Box */}
            <div className="bg-[#FAE5C7]/15 border border-[#C9A15A]/35 p-5 rounded-2xl flex gap-3.5 items-start">
              <AlertTriangle className="h-5 w-5 text-[#C9A15A] flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#113F48] uppercase tracking-wide">Medical Integrity Notice</span>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  This educational guide is not clinical medical advice. Health guidelines, cost-shares, and coverage thresholds are subject to yearly policy modifications. Speak to a certified healthcare coordinator before selecting coverage options.
                </p>
              </div>
            </div>

            {/* Image display */}
            {post.featuredImage && (
              <div className="rounded-2xl overflow-hidden border border-stone-200">
                <img src={post.featuredImage} alt={post.title} className="w-full h-80 object-cover" />
                <div className="bg-stone-50 px-4 py-2 border-t border-stone-200 text-[10px] text-stone-400 italic">
                  Image Source: MediGuideHub Editorial Library
                </div>
              </div>
            )}

            {/* Content body */}
            <div 
              className="prose max-w-none text-[#113F48] leading-relaxed space-y-6 
                         prose-headings:font-bold prose-headings:text-[#113F48]
                         prose-h2:text-xl prose-h2:pt-6 prose-h2:border-b prose-h2:border-stone-100 prose-h2:pb-2
                         prose-p:text-xs prose-p:text-stone-700 prose-p:leading-relaxed
                         prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-1.5 prose-ul:text-xs prose-ul:text-stone-600
                         prose-ol:list-decimal prose-ol:pl-6 prose-ol:space-y-1.5 prose-ol:text-xs prose-ol:text-stone-600
                         prose-table:w-full prose-table:border-collapse prose-table:my-6
                         prose-th:bg-[#FDF6EC] prose-th:p-2.5 prose-th:border prose-th:border-stone-200 prose-th:text-left prose-th:text-xs prose-th:font-semibold
                         prose-td:p-2.5 prose-td:border prose-td:border-stone-200 prose-td:text-xs"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* References Block */}
            <div className="border-t border-stone-100 pt-6 space-y-3">
              <h4 className="font-bold text-[#113F48] text-sm">References &amp; Resource Guides</h4>
              <ol className="list-decimal pl-5 text-[11px] text-stone-500 space-y-1 font-medium">
                <li>National Institutes of Health (NIH). <a href="https://www.nih.gov" target="_blank" rel="noopener noreferrer" className="text-[#C9A15A] hover:underline">Official Health Indices (2026)</a>.</li>
                <li>U.S. Department of Health and Human Services (HHS). <a href="https://www.hhs.gov" target="_blank" rel="noopener noreferrer" className="text-[#C9A15A] hover:underline">National Senior Health Coverage Statistics</a>.</li>
              </ol>
            </div>

            {/* Social Share Box */}
            <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-4">
              <span className="text-xs font-bold text-[#113F48]">Share this educational guide:</span>
              <div className="flex gap-2">
                <button onClick={handleShareCopy} className="p-2 border border-stone-200 text-stone-600 hover:text-[#C9A15A] rounded-xl transition-all flex items-center gap-1.5 text-xs font-bold">
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copied" : "Copy Link"}
                </button>
              </div>
            </div>

            {/* Previous / Next Article */}
            <div className="border-t border-stone-100 pt-6 flex justify-between gap-4">
              <Link href="/blog" className="flex items-center gap-1.5 text-xs font-bold text-[#113F48] hover:text-[#C9A15A] transition-colors">
                <ArrowLeft className="h-4 w-4" /> All Guides
              </Link>
              {nextPost && (
                <Link href={`/blog/${nextPost.slug}`} className="flex items-center gap-1.5 text-xs font-bold text-[#C9A15A] hover:text-[#113F48] transition-colors text-right">
                  Next Guide <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>

            {/* Comments Form */}
            <div className="border-t border-stone-100 pt-8 space-y-6">
              <h3 className="text-lg font-bold text-[#113F48]">Reader Discussions ({comments.length})</h3>
              
              <div className="space-y-4">
                {comments.map((c, i) => (
                  <div key={i} className="bg-stone-50/50 border border-stone-100 p-4.5 rounded-2xl space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-[#113F48]">{c.name}</span>
                      <span className="text-stone-400">{c.date}</span>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">{c.text}</p>
                  </div>
                ))}
              </div>

              <form onSubmit={handleAddComment} className="space-y-4 bg-white border border-stone-200 p-5 rounded-2xl">
                <span className="text-xs font-bold text-[#113F48] uppercase tracking-wide block">Add a Comment</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    required
                    value={commentName}
                    onChange={(e) => setCommentName(e.target.value)}
                    placeholder="Your Name *"
                    className="w-full bg-[#FDFBF7] border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#C9A15A] text-[#113F48]"
                  />
                </div>
                <textarea
                  required
                  rows={3}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Share your thoughts or questions about this health guide..."
                  className="w-full bg-[#FDFBF7] border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#C9A15A] text-[#113F48]"
                />
                <button
                  type="submit"
                  className="bg-[#113F48] hover:bg-[#C9A15A] text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Send className="h-3.5 w-3.5" /> Submit Comment
                </button>
              </form>
            </div>

          </article>

          {/* Sidebar (4 Cols) */}
          <aside className="lg:col-span-4 space-y-8">
            
            {/* Table of Contents */}
            <div className="bg-white border border-stone-200 rounded-2xl p-6 space-y-4 shadow-sm">
              <h4 className="font-bold text-[#113F48] text-xs uppercase tracking-wider border-b border-stone-100 pb-2 flex items-center gap-1.5">
                <BookOpen className="h-4 w-4 text-[#C9A15A]" /> Table of Contents
              </h4>
              <ul className="text-xs space-y-2.5 font-medium text-stone-600">
                {headings.map((h) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`} className="hover:text-[#C9A15A] transition-colors">{h.text}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Author profile box */}
            <div className="bg-white border border-stone-200 rounded-2xl p-6 space-y-4 shadow-sm text-center">
              <div className="w-16 h-16 rounded-full bg-[#113F48] text-white font-extrabold text-lg flex items-center justify-center mx-auto border border-[#C9A15A]/30 shadow-sm">
                M
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#113F48] block">MediGuideHub Editorial</span>
                <span className="text-[10px] text-stone-400 block">E-E-A-T Verified Publisher</span>
              </div>
              <p className="text-[11px] text-stone-500 leading-relaxed">
                Objective health policy analysts reviews and updates of seniors health benefits under HHS and CMS provisions.
              </p>
            </div>

            {/* Related articles sidebar list */}
            {relatedPosts.length > 0 && (
              <div className="bg-white border border-stone-200 rounded-2xl p-6 space-y-4 shadow-sm">
                <h4 className="font-bold text-[#113F48] text-xs uppercase tracking-wider border-b border-stone-100 pb-2">Related Medical Guides</h4>
                <div className="space-y-3">
                  {relatedPosts.map((r) => (
                    <Link key={r.slug} href={`/blog/${r.slug}`} className="block group">
                      <span className="font-bold text-xs text-[#113F48] group-hover:text-[#C9A15A] transition-colors leading-snug block">{r.title}</span>
                      <span className="text-[9px] text-stone-400 block mt-0.5">{r.category}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Sidebar Medical Disclaimer */}
            <div className="bg-[#FDF6EC]/40 border border-[#C9A15A]/20 rounded-2xl p-6 space-y-2">
              <span className="text-[10px] font-bold text-[#113F48] uppercase tracking-wider block">Medical Disclaimer</span>
              <p className="text-[10px] text-stone-500 leading-relaxed">
                All contents published on MediGuideHub are created for educational purposes only. Always consult a physician or licensed coordinator before making changes to your health plan.
              </p>
            </div>

          </aside>

        </div>

      </main>

      <Footer />
    </div>
  );
}
