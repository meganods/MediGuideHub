"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/authContext";
import { Lock, Mail, User as UserIcon, ShieldAlert, CheckCircle2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

function RegisterFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signup, user, logout } = useAuth();

  const redirectParam = searchParams.get("redirect") || "";
  const noticeMessage = searchParams.get("message") || "";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting">("idle");

  // If user is already logged in, redirect them
  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        logout();
      } else {
        const decoded = redirectParam ? decodeURIComponent(redirectParam) : "";
        if (decoded && !decoded.startsWith("/dashboard")) {
          router.push(decoded);
        } else {
          router.push("/");
        }
      }
    }
  }, [user, redirectParam, router, logout]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    if (!email || !password || !name) {
      setError("Please fill out all required fields.");
      return;
    }

    setStatus("submitting");
    try {
      const newUser = await signup(email, password, name);
      if (newUser.role === "admin") {
        throw new Error("Admin registration is not permitted on this portal.");
      }
      setSuccessMessage("Account created successfully! Redirecting to login...");
      setTimeout(() => {
        router.push("/login?message=" + encodeURIComponent("Account created successfully! Please sign in."));
      }, 2000);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Registration failed. Please try again.");
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
            <Image src="/logo.png" alt="Logo" width={24} height={24} className="h-6 w-6 brightness-0 invert" />
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
            <h3 className="text-2xl font-bold text-[#113F48]">Create your account</h3>
            <p className="text-stone-400 text-xs mt-1.5">Join mediguide4u in seconds.</p>
          </div>

          {noticeMessage && (
            <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl text-xs font-semibold flex items-start gap-2">
              <ShieldAlert className="h-4 w-4 flex-shrink-0" />
              <span>{noticeMessage}</span>
            </div>
          )}

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
              <label className="text-xs font-semibold text-[#113F48]">Full name</label>
              <div className="relative">
                <UserIcon className="absolute left-4 top-3.5 h-4 w-4 text-stone-400" />
                <input
                  type="text"
                  required
                  placeholder="Jane Smith"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-stone-50/50 border border-stone-200 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A15A] text-[#113F48] transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#113F48]">Email</label>
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

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#113F48]">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 h-4 w-4 text-stone-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-stone-50/50 border border-stone-200 rounded-xl py-3 pl-11 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A15A] text-[#113F48] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-3.5 text-stone-400 hover:text-[#113F48]"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full bg-[#113F48] text-white py-3.5 hover:bg-[#C9A15A] rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50 text-sm"
            >
              {status === "submitting" ? "Please wait..." : "Create account"}
            </button>
          </form>

          <div className="text-center pt-2">
            <p className="text-xs text-stone-500">
              Already have an account?{" "}
              <Link 
                href="/login"
                className="text-[#C9A15A] hover:underline font-semibold"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F9FAFB] items-center justify-center p-4">
      <Suspense fallback={
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#C9A15A]" />
        </div>
      }>
        <RegisterFormContent />
      </Suspense>
    </div>
  );
}
