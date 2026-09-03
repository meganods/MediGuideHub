"use client";

import React, { useState } from "react";
import { addComment, BlogComment } from "@/lib/db";
import { Send } from "lucide-react";

interface PostCommentsSectionProps {
  postSlug: string;
  postTitle: string;
  initialComments: BlogComment[];
}

export default function PostCommentsSection({
  postSlug,
  postTitle,
  initialComments,
}: PostCommentsSectionProps) {
  const [comments, setComments] = useState<BlogComment[]>(initialComments);
  const [commentName, setCommentName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim()) return;

    setSubmitting(true);
    const newComment: BlogComment = {
      postSlug,
      postTitle,
      name: commentName.trim(),
      text: commentText.trim(),
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      createdAt: new Date().toISOString(),
    };

    try {
      await addComment(newComment);
      setComments((prev) => [...prev, newComment]);
      setCommentName("");
      setCommentText("");
    } catch (err) {
      console.error("Error adding comment:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="border-t border-stone-100 pt-8 space-y-6">
      <h3 className="text-lg font-bold text-[#113F48]">Reader Discussions ({comments.length})</h3>
      
      <div className="space-y-4">
        {comments.map((c, i) => (
          <div key={c.id || `comment-${i}`} className="bg-stone-50/50 border border-stone-100 p-4.5 rounded-2xl space-y-1.5">
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
          disabled={submitting}
          className="bg-[#113F48] hover:bg-[#C9A15A] text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
        >
          <Send className="h-3.5 w-3.5" /> {submitting ? "Submitting..." : "Submit Comment"}
        </button>
      </form>
    </div>
  );
}
