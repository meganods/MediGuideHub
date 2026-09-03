"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AlertCircle, RefreshCw, Home } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Application runtime error:", error);
  }, [error]);

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-24">
        <div className="max-w-md w-full mx-auto px-4 text-center space-y-6">
          <div className="w-20 h-20 bg-red-50 border border-red-200 text-red-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
            <AlertCircle className="h-10 w-10" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-bold text-red-500 bg-red-50 border border-red-200 px-2 py-0.5 rounded uppercase">System Error</span>
            <h1 className="text-2xl font-extrabold text-[#113F48]">An Unexpected Error Occred</h1>
            <p className="text-xs text-stone-500 leading-relaxed">
              We encountered a temporary server error. Click below to try reloading the page, or return to our homepage.
            </p>
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => reset()}
              className="inline-flex items-center gap-1.5 bg-[#113F48] hover:bg-[#C9A15A] text-white text-xs font-bold px-5 py-3 rounded-xl transition-all shadow shadow-[#113F48]/10"
            >
              <RefreshCw className="h-4 w-4" /> Retry Page
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 bg-white border border-stone-200 hover:border-[#C9A15A] text-[#113F48] text-xs font-bold px-5 py-3 rounded-xl transition-all"
            >
              <Home className="h-4 w-4" /> Go Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
