"use client";

import React, { useEffect, useState, use } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/authContext";
import { getPostBySlug, updateUserSavedPosts, BlogPost } from "@/lib/db";
import { Bookmark, Clock, ChevronLeft, User, Share2, Check } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function BlogPostDetail(props: PageProps) {
  const params = use(props.params);
  const router = useRouter();
  const { user } = useAuth(); // useAuth provides session info
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadPost() {
      const foundPost = await getPostBySlug(params.slug);
      if (foundPost) {
        setPost(foundPost);
        if (user) {
          setIsSaved(user.savedPosts.includes(params.slug));
        }
      }
      setLoading(false);
    }
    loadPost();
  }, [params.slug, user]);

  const handleToggleSave = async () => {
    if (!user) {
      // Redirect to login page if not logged in
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

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-[#FDF6EC]">
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
      <div className="flex flex-col min-h-screen bg-[#FDF6EC]">
        <Navbar />
        <div className="flex-grow max-w-md mx-auto text-center py-24 px-4 space-y-4">
          <h2 className="text-2xl font-bold text-[#113F48]">Guide Not Found</h2>
          <p className="text-stone-500">The Medicare guide you are looking for does not exist or has been removed.</p>
          <Link href="/blog" className="inline-flex items-center text-[#C9A15A] hover:underline font-semibold text-sm">
            <ChevronLeft className="h-4 w-4" /> Back to Guides
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FDF6EC]">
      <Navbar />

      <main className="flex-grow py-12">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link
            href="/blog"
            className="inline-flex items-center text-[#113F48] hover:text-[#C9A15A] text-sm font-semibold mb-8 group transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-1 group-hover:-translate-x-0.5 transition-transform" />
            Back to Medicare Guides
          </Link>

          {/* Article Container */}
          <article className="bg-white border border-[#C9A15A]/20 rounded-2xl overflow-hidden shadow-sm">
            {/* Featured Image */}
            <div className="h-72 sm:h-96 w-full relative">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-[#C9A15A] text-white px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wider shadow-md">
                {post.category}
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-10 space-y-8">
              {/* Header Info */}
              <div className="space-y-4 border-b border-stone-100 pb-6">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#113F48] leading-tight">
                  {post.title}
                </h1>
                
                <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-stone-500 pt-2">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center gap-1">
                      <User className="h-3.5 w-3.5 text-[#C9A15A]" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-[#C9A15A]" />
                      {post.readTime}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleToggleSave}
                      className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                        isSaved
                          ? "bg-[#C9A15A]/10 text-[#C9A15A] border-[#C9A15A]"
                          : "border-stone-200 text-stone-600 hover:border-[#C9A15A] hover:text-[#C9A15A]"
                      }`}
                      title={isSaved ? "Saved to Profile" : "Save for Later"}
                    >
                      <Bookmark className={`h-3.5 w-3.5 ${isSaved ? "fill-current" : ""}`} />
                      {isSaved ? "Saved" : "Save Guide"}
                    </button>
                    
                    <button
                      onClick={handleShare}
                      className="p-2 border border-stone-200 text-stone-600 hover:border-[#C9A15A] hover:text-[#C9A15A] rounded-xl transition-all"
                      title="Copy link to share"
                    >
                      {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Share2 className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Rich Text Content */}
              <div 
                className="prose max-w-none text-[#113F48] leading-relaxed space-y-6 
                           prose-headings:font-heading prose-headings:font-bold prose-headings:text-[#113F48]
                           prose-h2:text-xl prose-h2:pt-4 prose-h2:border-b prose-h2:border-stone-100 prose-h2:pb-2
                           prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2
                           prose-ol:list-decimal prose-ol:pl-6 prose-ol:space-y-2
                           prose-table:w-full prose-table:border-collapse prose-table:my-6
                           prose-th:bg-[#F8F1E4] prose-th:p-3 prose-th:border prose-th:border-stone-200 prose-th:text-left prose-th:text-xs prose-th:uppercase prose-th:font-semibold
                           prose-td:p-3 prose-td:border prose-td:border-stone-200 prose-td:text-sm"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* AdSense Compliant Disclaimer Card inside the Article */}
              <div className="bg-[#F9FAFB] border border-stone-200 p-6 rounded-xl space-y-2 mt-8 text-xs text-stone-600">
                <span className="font-bold text-[#113F48] uppercase tracking-wider block text-[10px]">Educational Disclaimer</span>
                <p>
                  The information provided in this guide is for general educational purposes only and should not be considered medical, legal, or financial advice. Plans, pricing, eligibility parameters, and enrollment rules vary by zip code, state, and year. Consult with a licensed professional for guidance tailored to your personal situation.
                </p>
              </div>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
