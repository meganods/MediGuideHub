"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/authContext";
import { HeartPulse, Lock, Mail, ShieldAlert, CheckCircle2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

const GoogleIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
  </svg>
);

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, user, logout, signInWithGoogle } = useAuth();

  const redirectParam = searchParams.get("redirect") || "";
  const noticeMessage = searchParams.get("message") || "";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [resetMessage, setResetMessage] = useState("");
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
    setResetMessage("");
    if (!email || !password) {
      setError("Please fill out all required fields.");
      return;
    }

    setStatus("submitting");
    try {
      const loggedInUser = await login(email, password);
      if (loggedInUser.role === "admin") {
        await logout();
        throw new Error("Admin accounts must log in via the secure admin URL portal.");
      }
      const decoded = redirectParam ? decodeURIComponent(redirectParam) : "";
      if (decoded && !decoded.startsWith("/dashboard")) {
        router.push(decoded);
      } else {
        router.push("/");
      }
    } catch (err: any) {
      console.error(err);
      let errMsg = "Authentication failed. Please verify your credentials.";
      if (err?.message && err.message.includes("auth/invalid-credential")) {
        errMsg = "Incorrect email address or password. Please try again.";
      } else if (err?.code === "auth/invalid-credential") {
        errMsg = "Incorrect email address or password. Please try again.";
      }
      setError(errMsg);
      setStatus("idle");
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setResetMessage("");
    try {
      const loggedInUser = await signInWithGoogle();
      if (loggedInUser.role === "admin") {
        await logout();
        throw new Error("Admin accounts must log in via the secure admin URL portal.");
      }
      const decoded = redirectParam ? decodeURIComponent(redirectParam) : "";
      if (decoded && !decoded.startsWith("/dashboard")) {
        router.push(decoded);
      } else {
        router.push("/");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Google Sign-In failed.");
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
            <h3 className="text-2xl font-bold text-[#113F48]">Welcome Back</h3>
            <p className="text-stone-400 text-xs mt-1.5">Sign in to access your custom checklists and bookmarks.</p>
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

          {resetMessage && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-xl text-xs font-semibold flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-600" />
              <span>{resetMessage}</span>
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

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-[#113F48]">Password</label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-[#C9A15A] hover:underline font-semibold"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 h-4 w-4 text-stone-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Enter your password"
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
              {status === "submitting" ? "Please wait..." : "Log in"}
            </button>
          </form>

          <div className="text-center pt-2">
            <p className="text-xs text-stone-500">
              New here?{" "}
              <Link 
                href="/register"
                className="text-[#C9A15A] hover:underline font-semibold"
              >
                Create an account
              </Link>
            </p>
          </div>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-stone-200"></div>
            <span className="flex-shrink mx-4 text-stone-400 text-xs font-medium uppercase tracking-wider bg-white">or</span>
            <div className="flex-grow border-t border-stone-200"></div>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full border border-stone-200 bg-white hover:bg-stone-50 text-[#113F48] py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2.5 text-sm"
          >
            <GoogleIcon />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F9FAFB] items-center justify-center p-4">
      <Suspense fallback={
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#C9A15A]" />
        </div>
      }>
        <LoginFormContent />
      </Suspense>
    </div>
  );
}
