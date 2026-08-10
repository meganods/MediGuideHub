"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/authContext";
import { HeartPulse, Mail, ShieldAlert, CheckCircle2 } from "lucide-react";
import Link from "next/link";

function ForgotPasswordContent() {
  const { forgotPassword, user, logout } = useAuth();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting">("idle");

  // If user is already logged in as admin, log out.
  useEffect(() => {
    if (user && user.role === "admin") {
      logout();
    }
  }, [user, logout]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    if (!email) {
      setError("Please enter your email address to reset your password.");
      return;
    }

    setStatus("submitting");
    try {
      await forgotPassword(email);
      setSuccessMessage("Password reset email sent! Please check your inbox.");
      setEmail("");
      setStatus("idle");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Failed to send password reset email. Please verify your address.");
      setStatus("idle");
    }
  };

  return (
    <div className="w-full max-w-6xl bg-white rounded-3xl overflow-hidden shadow-2xl shadow-stone-200/80 border border-stone-100 flex flex-col lg:flex-row min-h-[720px]">
      {/* Left Visual Panel */}
      <div className="w-full lg:w-1/2 bg-[#113F48] p-10 sm:p-12 lg:p-16 flex flex-col justify-between text-white relative overflow-hidden select-none">
        <div className="absolute -top-10 -left-10 w-40 h-40 border border-white/5 rounded-full pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 border-2 border-[#C9A15A]/10 rounded-full pointer-events-none" />
        
        <div className="flex items-center gap-3.5 z-10">
          <div className="w-12 h-12 rounded-2xl bg-[#C9A15A] flex items-center justify-center shadow-lg shadow-[#C9A15A]/20">
            <HeartPulse className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight">mediguide4u</h1>
            <p className="text-[10px] text-[#C9A15A] tracking-widest uppercase font-semibold">Independent Portal</p>
          </div>
        </div>

        <div className="my-12 lg:my-0 space-y-4 z-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
            Healthcare decisions <br />made <span className="text-[#C9A15A]">transparent</span>.
          </h2>
          <p className="text-white/80 text-sm leading-relaxed max-w-sm">
            Clear, plain-language guidance to help you understand your healthcare options. Save guides, create checklists, and navigate wellness options with zero jargon.
          </p>
        </div>

        <div className="z-10 mt-auto pt-4 border-t border-white/10">
          <Link href="/" className="text-xs text-[#C9A15A] hover:text-white transition-all font-semibold flex items-center gap-1.5">
            ← Return to public website
          </Link>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="w-full lg:w-1/2 relative bg-white p-8 sm:p-12 lg:p-14 flex flex-col justify-center">
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-[#113F48]">Reset your password</h3>
            <p className="text-stone-400 text-xs mt-1.5">Enter your email and we&apos;ll send you a password recovery link.</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-xs font-semibold flex items-start gap-2">
              <ShieldAlert className="h-4 w-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successMessage && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-xl text-xs font-semibold flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-600" />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#113F48]">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 h-4 w-4 text-stone-400" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-stone-50/50 border border-stone-200 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A15A] text-[#113F48] transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full bg-[#113F48] text-white py-3.5 hover:bg-[#C9A15A] rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50 text-sm"
            >
              {status === "submitting" ? "Sending link..." : "Send Reset Link"}
            </button>
          </form>

          <div className="text-center pt-2">
            <p className="text-xs text-stone-500">
              <Link 
                href="/login"
                className="text-[#C9A15A] hover:underline font-semibold"
              >
                Return to Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F9FAFB] items-center justify-center p-4">
      <Suspense fallback={
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#C9A15A]" />
        </div>
      }>
        <ForgotPasswordContent />
      </Suspense>
    </div>
  );
}
