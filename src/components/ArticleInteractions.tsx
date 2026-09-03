"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/authContext";
import { updateUserSavedPosts, saveUserProfile, incrementPostViews } from "@/lib/db";
import { Bookmark, Copy, Check } from "lucide-react";

interface ArticleInteractionsProps {
  postId?: string;
  slug: string;
  views?: number;
}

export function ArticleBookmarkButton({ slug }: { slug: string }) {
  const { user } = useAuth();
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (user?.savedPosts) {
      setIsSaved(user.savedPosts.includes(slug));
    } else {
      setIsSaved(false);
    }
  }, [user, slug]);

  const handleToggleSave = async () => {
    if (!user) {
      router.push("/auth?redirect=" + encodeURIComponent(`/blog/${slug}`));
      return;
    }
    try {
      const action = isSaved ? "unsave" : "save";
      const updatedProfile = await updateUserSavedPosts(user.uid, slug, action);
      if (updatedProfile) {
        localStorage.setItem("mediguide4u_current_user", JSON.stringify(updatedProfile));
      }
      setIsSaved(!isSaved);
      setToastMessage(action === "save" ? "Article bookmarked successfully!" : "Article removed from bookmarks.");
      setTimeout(() => setToastMessage(null), 3000);
    } catch (e) {
      console.error("Failed to save post status:", e);
      setToastMessage("Failed to update bookmark.");
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  return (
    <>
      <button 
        onClick={handleToggleSave} 
        className="hover:text-[#C9A15A] flex items-center gap-1 cursor-pointer transition-colors"
        title={isSaved ? "Remove from bookmarks" : "Save article"}
      >
        <Bookmark className={`h-4 w-4 ${isSaved ? "fill-[#C9A15A] text-[#C9A15A]" : ""}`} /> Save
      </button>

      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#113F48] text-white border border-[#C9A15A]/30 px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-2.5 animate-in fade-in slide-in-from-top-5 duration-300">
          <Bookmark className="h-4.5 w-4.5 text-[#C9A15A] fill-[#C9A15A]" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}
    </>
  );
}

export function ArticleShareButton() {
  const [copied, setCopied] = useState(false);

  const handleShareCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button 
      onClick={handleShareCopy} 
      className="p-2 border border-stone-200 text-stone-600 hover:text-[#C9A15A] rounded-xl transition-all flex items-center gap-1.5 text-xs font-bold cursor-pointer"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5 text-stone-500" />}
      {copied ? "Copied" : "Copy Link"}
    </button>
  );
}

export function ArticleViewTracker({ postId, slug }: { postId?: string; slug: string }) {
  const { user } = useAuth();
  const hasIncremented = useRef(false);

  useEffect(() => {
    if (postId && !hasIncremented.current) {
      hasIncremented.current = true;
      incrementPostViews(postId).catch(console.error);
    }

    if (user && slug) {
      const existingHistory = (user as any).readingHistory || [];
      const alreadyLogged = existingHistory.some((h: any) => h.slug === slug);
      if (!alreadyLogged) {
        const newHistoryItem = {
          slug,
          date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
          progress: 100,
        };
        const updatedHistory = [newHistoryItem, ...existingHistory];
        const updatedProfile = {
          ...user,
          readingHistory: updatedHistory,
        };
        saveUserProfile(updatedProfile)
          .then(() => {
            localStorage.setItem("mediguide4u_current_user", JSON.stringify(updatedProfile));
          })
          .catch((err) => console.error("Failed to log reading history:", err));
      }
    }
  }, [postId, slug, user]);

  return null;
}
