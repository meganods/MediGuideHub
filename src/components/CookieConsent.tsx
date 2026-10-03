"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, ShieldCheck, X } from "lucide-react";

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

export function updateGoogleConsent(status: "accepted" | "essential_only") {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    if (status === "accepted") {
      window.gtag("consent", "update", {
        ad_storage: "granted",
        ad_user_data: "granted",
        ad_personalization: "granted",
        analytics_storage: "granted",
      });
    } else {
      window.gtag("consent", "update", {
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        analytics_storage: "granted",
      });
    }
  }
}

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("mediguide4u_cookie_consent");
    if (!consent) {
      // Small delay for smooth entry
      const timer = setTimeout(() => setShowBanner(true), 800);
      return () => clearTimeout(timer);
    } else {
      updateGoogleConsent(consent as "accepted" | "essential_only");
    }

    // Listen to custom open event from footer
    const handleOpenSettings = () => {
      setShowBanner(true);
    };

    window.addEventListener("open-cookie-settings", handleOpenSettings);
    return () => {
      window.removeEventListener("open-cookie-settings", handleOpenSettings);
    };
  }, []);

  const handleAccept = () => {
    localStorage.setItem("mediguide4u_cookie_consent", "accepted");
    updateGoogleConsent("accepted");
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem("mediguide4u_cookie_consent", "essential_only");
    updateGoogleConsent("essential_only");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div
      role="region"
      aria-label="Cookie Consent Banner"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 bg-[#113F48] text-white p-5 rounded-2xl shadow-2xl border border-[#C9A15A]/30 backdrop-blur-md animate-in fade-in slide-in-from-bottom duration-300"
    >
      <div className="flex items-start gap-3">
        <div className="p-2.5 bg-[#C9A15A]/20 rounded-xl text-[#C9A15A] shrink-0 mt-0.5">
          <Cookie className="h-5 w-5" />
        </div>
        <div className="space-y-2 flex-1 text-xs">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
              <span>Cookie &amp; Privacy Notice</span>
            </h4>
            <button
              onClick={handleDecline}
              className="text-stone-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Dismiss cookie notice"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <p className="text-stone-300 leading-relaxed text-[11px]">
            mediguide4u uses cookies and third-party advertising partners (including Google AdSense) to deliver medically-reviewed health resources, analyze traffic, and display relevant educational content in accordance with our{" "}
            <Link href="/privacy-policy" className="text-[#C9A15A] underline hover:text-white font-medium">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="/cookie-policy" className="text-[#C9A15A] underline hover:text-white font-medium">
              Cookie Policy
            </Link>.
          </p>
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleAccept}
              className="flex-1 bg-[#C9A15A] hover:bg-[#B58F4E] text-[#113F48] font-bold text-xs py-2 px-3 rounded-xl transition-all shadow cursor-pointer text-center"
            >
              Accept All
            </button>
            <button
              onClick={handleDecline}
              className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs py-2 px-3 rounded-xl transition-all border border-white/10 cursor-pointer text-center"
            >
              Essential Only
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

