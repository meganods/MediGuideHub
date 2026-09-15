"use client";

import React, { useState } from "react";
import { addComment, BlogComment } from "@/lib/db";
import { Send, Star, ShieldCheck, CheckCircle2, MessageSquare, User } from "lucide-react";

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
  const [commentRole, setCommentRole] = useState("Verified Reader");
  const [commentRating, setCommentRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [commentText, setCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState(false);

  // Calculate average rating
  const ratingsList = comments.map(c => c.rating || 5);
  const averageRating = ratingsList.length > 0 
    ? (ratingsList.reduce((acc, r) => acc + r, 0) / ratingsList.length).toFixed(1) 
    : "5.0";

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim()) return;

    setSubmitting(true);
    const newComment: BlogComment = {
      id: `comment-${Date.now()}`,
      postSlug,
      postTitle,
      name: commentName.trim(),
      userRole: commentRole,
      rating: commentRating,
      text: commentText.trim(),
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      createdAt: new Date().toISOString(),
    };

    try {
      await addComment(newComment);
      setComments((prev) => [newComment, ...prev]);
      setCommentName("");
      setCommentText("");
      setSubmittedMessage(true);
      setTimeout(() => setSubmittedMessage(false), 5000);
    } catch (err) {
      console.error("Error adding comment:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase() || "U";
  };

  return (
    <section aria-labelledby="reviews-section-heading" className="border-t border-stone-200 pt-10 space-y-8">
      {/* Section Header & Rating Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#FDFBF7] border border-stone-200 p-6 rounded-3xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-[#C9A15A] uppercase tracking-wider">Patient Community</span>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              <ShieldCheck className="h-3 w-3" /> Doctor Reviewed
            </span>
          </div>
          <h3 id="reviews-section-heading" className="text-xl font-extrabold text-[#113F48]">
            Reader Reviews &amp; Clinical Q&amp;A
          </h3>
          <p className="text-xs text-stone-500">
            Real experiences, reader questions, and verified physician guidance.
          </p>
        </div>

        {/* Rating Summary Badge */}
        <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-2xl border border-stone-200 shadow-sm self-start sm:self-auto">
          <div className="text-right">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-[11px] text-stone-500 font-semibold block mt-0.5">
              {averageRating} out of 5 ({comments.length} {comments.length === 1 ? "review" : "reviews"})
            </span>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {comments.map((c, i) => {
          const rating = c.rating || 5;
          return (
            <div 
              key={c.id || `comment-${i}`} 
              className="bg-white border border-stone-200 rounded-3xl p-6 shadow-sm space-y-4 hover:border-stone-300 transition-colors"
            >
              {/* Reviewer Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#113F48]/10 text-[#113F48] font-bold text-xs flex items-center justify-center border border-[#113F48]/15 flex-shrink-0">
                    {getInitials(c.name)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#113F48]">{c.name}</span>
                      {c.userRole && (
                        <span className="text-[10px] font-semibold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full border border-stone-200">
                          {c.userRole}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            className={`h-3 w-3 ${star <= rating ? "fill-amber-400 text-amber-400" : "text-stone-300"}`} 
                          />
                        ))}
                      </div>
                      <span className="text-[10px] text-stone-400">&bull;</span>
                      <span className="text-[11px] text-stone-400">{c.date}</span>
                    </div>
                  </div>
                </div>

                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-150 hidden sm:inline-flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Verified Reader
                </span>
              </div>

              {/* Review Text */}
              <p className="text-stone-700 text-xs sm:text-sm leading-relaxed pl-13 sm:pl-13">
                {c.text}
              </p>

              {/* Physician / Editorial Reply */}
              {c.reply && (
                <div className="ml-4 sm:ml-8 mt-4 bg-[#FDFBF7] border-l-3 border-[#113F48] rounded-r-2xl p-4 sm:p-5 space-y-2.5 border-t border-r border-b border-stone-200">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#113F48] text-white flex items-center justify-center text-[10px] font-bold">
                        <ShieldCheck className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <span className="font-bold text-[#113F48] block leading-tight">{c.reply.author}</span>
                        {c.reply.role && (
                          <span className="text-[10px] text-[#C9A15A] font-semibold block">{c.reply.role}</span>
                        )}
                      </div>
                    </div>
                    <span className="text-[10px] text-stone-400 font-medium">{c.reply.date}</span>
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed font-normal pl-8">
                    {c.reply.text}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Review / Discussion Form */}
      <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-[#C9A15A]" />
          <h4 className="text-base font-bold text-[#113F48]">
            Leave a Review or Ask a Medical Question
          </h4>
        </div>

        {submittedMessage && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-3.5 rounded-2xl flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
            <span>Thank you! Your feedback has been published and submitted for physician review.</span>
          </div>
        )}

        <form onSubmit={handleAddComment} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#113F48] block">Your Name *</label>
              <input
                required
                value={commentName}
                onChange={(e) => setCommentName(e.target.value)}
                placeholder="e.g., Jennifer M. or David L."
                className="w-full bg-[#FDFBF7] border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#C9A15A] text-[#113F48]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#113F48] block">Your Perspective</label>
              <select
                value={commentRole}
                onChange={(e) => setCommentRole(e.target.value)}
                className="w-full bg-[#FDFBF7] border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#C9A15A] text-[#113F48]"
              >
                <option value="Verified Patient">Patient / Family Member</option>
                <option value="Caregiver">Caregiver</option>
                <option value="Healthcare Professional">Healthcare Professional / Nurse</option>
                <option value="Verified Reader">General Reader</option>
              </select>
            </div>
          </div>

          {/* Star Rating Picker */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#113F48] block">Rating</label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setCommentRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 focus:outline-none transition-transform hover:scale-110"
                  aria-label={`Rate ${star} star`}
                >
                  <Star
                    className={`h-5 w-5 ${
                      star <= (hoverRating || commentRating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-stone-300"
                    }`}
                  />
                </button>
              ))}
              <span className="text-xs text-stone-500 font-semibold ml-2">
                {commentRating} / 5 Stars
              </span>
            </div>
          </div>

          {/* Comment Textarea */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#113F48] block">Your Review or Question *</label>
            <textarea
              required
              rows={4}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Share your experience, tips, or questions regarding this clinical guide..."
              className="w-full bg-[#FDFBF7] border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-[#C9A15A] text-[#113F48] leading-relaxed"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
            <span className="text-[11px] text-stone-400">
              * Reviews are reviewed by our clinical editorial team in accordance with our medical policies.
            </span>
            <button
              type="submit"
              disabled={submitting}
              className="bg-[#113F48] hover:bg-[#C9A15A] text-white font-bold px-6 py-3 rounded-xl text-xs flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50 shadow-sm hover:shadow"
            >
              <Send className="h-3.5 w-3.5" /> {submitting ? "Submitting Review..." : "Submit Review & Question"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
