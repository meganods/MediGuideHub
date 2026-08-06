"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/authContext";
import { Shield, Lock, Mail, ShieldAlert, CheckCircle2, AlertTriangle, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, logout, user, forgotPassword } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting">("idle");

  useEffect(() => {
    if (user && user.role === "admin") {
      router.push("/admin/dashboard");
    }
  }, [user, router]);

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
      if (loggedInUser.role !== "admin") {
        await logout();
        setError("This account doesn't have admin access.");
        setStatus("idle");
        return;
      }
      router.push("/admin/dashboard");
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Admin login failed. Please verify your credentials.");
      setStatus("idle");
    }
  };

  const handleForgotPassword = async () => {
    setError("");
    setResetMessage("");
    if (!email) {
      setError("Please enter your admin email address to reset your password.");
      return;
    }
    try {
      await forgotPassword(email);
      setResetMessage("Password reset email sent to your admin email address.");
    } catch (err: any) {
      setError(err?.message || "Failed to send password reset email.");
    }
  };

  return (
    <div className="w-full max-w-md bg-white border border-stone-200/80 p-8 sm:p-10 rounded-3xl shadow-xl shadow-stone-200/50 space-y-6">
      
      {/* Icon & Title */}
      <div className="text-center space-y-2.5">
        <div className="bg-[#113F48] p-3.5 rounded-2xl inline-block shadow-md shadow-[#113F48]/10">
          <Shield className="h-7 w-7 text-[#C9A15A]" />
        </div>
        <h1 className="text-2xl font-extrabold text-[#113F48]">Admin login</h1>
        <p className="text-stone-400 text-xs font-medium">
          Restricted access for MediGuide Hub staff
        </p>
      </div>

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

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#113F48]">Admin email</label>
          <div className="relative">
            <Mail className="absolute left-4 top-3.5 h-4 w-4 text-stone-400" />
            <input
              type="email"
              required
              placeholder="admin@mediguidehub.com"
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
          <div className="flex justify-end pt-1">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-xs text-blue-600 hover:text-blue-800 hover:underline font-semibold"
            >
              Forgot password?
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full bg-[#113F48] text-white py-3.5 hover:bg-[#C9A15A] rounded-xl font-bold transition-all shadow-md text-sm disabled:opacity-50"
        >
          {status === "submitting" ? "Verifying..." : "Log in to admin panel"}
        </button>

        {/* Warning Alert */}
        <div className="bg-[#FDF6EC] border border-[#C9A15A]/25 rounded-xl p-4 flex gap-3 items-start">
          <AlertTriangle className="h-4 w-4 text-[#C9A15A] flex-shrink-0 mt-0.5" />
          <p className="text-[#C9A15A] text-[11px] font-medium leading-relaxed">
            This login is for authorized administrators only. All access attempts are logged.
          </p>
        </div>
      </form>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F9FAFB] justify-center items-center py-20 px-4">
      <Suspense fallback={
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#C9A15A]" />
        </div>
      }>
        <AdminLoginForm />
      </Suspense>
    </div>
  );
}
