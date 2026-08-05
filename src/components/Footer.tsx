"use client";

import React, { useState } from "react";
import Link from "next/link";
import { subscribeNewsletter } from "@/lib/db";
import { HeartPulse, CheckCircle2, ArrowRight, Mail, Phone, Clock, MapPin, ShieldCheck, Lock, Globe } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const isNew = await subscribeNewsletter(email);
      if (isNew) {
        setStatus("success");
        setMessage("Thank you! You are now subscribed to the MediGuide newsletter.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage("You are already subscribed to our newsletter list.");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setMessage("An unexpected error occurred. Please try again.");
    }
  };

  const companyLinks = [
    { label: "About Us", href: "/about" },
    { label: "Our Mission", href: "/about#mission" },
    { label: "Contact Us", href: "/contact" },
    { label: "Careers", href: "#" },
    { label: "FAQ", href: "/faq" },
    { label: "Health Blog", href: "/blog" },
  ];

  const healthcareLinks = [
    { label: "Find Doctors", href: "#" },
    { label: "Health Plans", href: "#" },
    { label: "Preventive Care", href: "#" },
    { label: "Prescription Guide", href: "#" },
    { label: "Health Articles", href: "/blog" },
    { label: "Medical Resources", href: "#" },
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
    { label: "Cookie Policy", href: "/cookie-policy" },
    { label: "Medical Disclaimer", href: "/medical-disclaimer" },
    { label: "Editorial Policy", href: "/editorial-policy" },
    { label: "Accessibility Statement", href: "/accessibility" },
  ];

  return (
    <footer className="bg-white border-t border-stone-200 pt-16 pb-8">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-100">
          
          {/* Column 1 — Brand */}
          <div className="lg:col-span-3 space-y-5">
            <Link href="/" className="flex items-center gap-2 w-fit">
              <div className="bg-[#F9FAFB] p-2 rounded-xl border border-stone-200">
                <HeartPulse className="h-6 w-6 text-[#C9A15A]" />
              </div>
              <span className="font-heading font-bold text-xl tracking-tight text-[#113F48]">
                MediGuide<span className="text-[#C9A15A]">Hub</span>
              </span>
            </Link>
            <p className="text-sm text-stone-500 leading-relaxed">
              Helping people make informed healthcare decisions through accurate, easy-to-understand medical information, trusted healthcare resources, and expert-reviewed educational content.
            </p>
          </div>

          {/* Columns 2, 3, 4 (Links Grid) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Column 2 — Company */}
            <div className="space-y-3.5">
              <h4 className="font-heading font-bold text-[#113F48] text-xs uppercase tracking-wider">
                Company
              </h4>
              <ul className="space-y-2.5">
                {companyLinks.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-stone-500 hover:text-[#C9A15A] transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 — Healthcare */}
            <div className="space-y-3.5">
              <h4 className="font-heading font-bold text-[#113F48] text-xs uppercase tracking-wider">
                Healthcare
              </h4>
              <ul className="space-y-2.5">
                {healthcareLinks.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-stone-500 hover:text-[#C9A15A] transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 — Legal */}
            <div className="space-y-3.5">
              <h4 className="font-heading font-bold text-[#113F48] text-xs uppercase tracking-wider">
                Legal
              </h4>
              <ul className="space-y-2.5">
                {legalLinks.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-stone-500 hover:text-[#C9A15A] transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 5 — Contact */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="font-heading font-bold text-[#113F48] text-xs uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-stone-500">
              <li className="flex items-start gap-2.5">
                <Mail className="h-4 w-4 text-[#C9A15A] mt-0.5 flex-shrink-0" />
                <div>
                  <span className="block text-xs font-bold text-[#113F48] uppercase tracking-wide">Email</span>
                  <a href="mailto:support@mediguidehub.com" className="hover:text-[#C9A15A] transition-colors">
                    support@mediguidehub.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="h-4 w-4 text-[#C9A15A] mt-0.5 flex-shrink-0" />
                <div>
                  <span className="block text-xs font-bold text-[#113F48] uppercase tracking-wide">Phone</span>
                  <span className="text-stone-500">+91 XXXXX XXXXX</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="h-4 w-4 text-[#C9A15A] mt-0.5 flex-shrink-0" />
                <div>
                  <span className="block text-xs font-bold text-[#113F48] uppercase tracking-wide">Business Hours</span>
                  <span className="text-stone-500">Monday – Saturday</span>
                  <span className="block text-xs text-stone-400">9:00 AM – 6:00 PM</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-[#C9A15A] mt-0.5 flex-shrink-0" />
                <div>
                  <span className="block text-xs font-bold text-[#113F48] uppercase tracking-wide">Location</span>
                  <span className="text-stone-500">New Delhi, India</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-8 border-b border-stone-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="max-w-md">
            <h4 className="font-heading font-bold text-[#113F48] text-sm uppercase tracking-wider">
              Newsletter
            </h4>
            <p className="text-sm text-stone-500 mt-1">
              Subscribe to receive trusted health tips, wellness guides, and important healthcare updates. No spam. Unsubscribe anytime.
            </p>
          </div>
          <form onSubmit={handleSubscribe} className="w-full md:w-auto min-w-[320px] max-w-md">
            <div className="relative flex">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A15A] pr-14 text-[#113F48]"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="absolute right-1 top-1 bottom-1 px-3 bg-[#113F48] text-white hover:bg-[#C9A15A] rounded-lg flex items-center justify-center transition-all disabled:opacity-50"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            {status === "success" && (
              <div className="flex items-center gap-1.5 text-emerald-700 text-xs mt-2 font-medium bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
                <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                <span>{message}</span>
              </div>
            )}
            {status === "error" && (
              <div className="text-red-700 text-xs mt-2 font-medium bg-red-50 p-2.5 rounded-lg border border-red-200">
                {message}
              </div>
            )}
          </form>
        </div>

        {/* Trust Badges & Signals Row */}
        <div className="py-6 border-b border-stone-100 flex flex-col sm:flex-row flex-wrap items-center justify-between gap-4 text-xs font-semibold text-stone-500">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 justify-center">
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-emerald-600" /> Educational Healthcare Platform</span>
            <span className="flex items-center gap-1.5"><Lock className="h-4 w-4 text-emerald-600" /> Privacy Protected</span>
            <span className="flex items-center gap-1.5"><Globe className="h-4 w-4 text-emerald-600" /> SSL Secured Website</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> Trusted Medical Resources</span>
          </div>
          <div className="text-stone-400 whitespace-nowrap bg-stone-50 border border-stone-200 px-2.5 py-1 rounded-md text-[11px]">
            Last Updated: August 2026
          </div>
        </div>

        {/* Bottom copyright & links */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-stone-400 gap-4">
          <div className="space-y-1.5 text-center md:text-left">
            <p>© {new Date().getFullYear()} MediGuideHub. All Rights Reserved.</p>
            <p className="text-[11px] text-stone-400 max-w-xl">
              Educational healthcare information only. Not a substitute for professional medical advice.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-1 justify-center md:justify-end">
            <Link href="/privacy-policy" className="hover:text-[#C9A15A] transition-colors">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="hover:text-[#C9A15A] transition-colors">Terms &amp; Conditions</Link>
            <Link href="/cookie-policy" className="hover:text-[#C9A15A] transition-colors">Cookie Policy</Link>
            <Link href="/medical-disclaimer" className="hover:text-[#C9A15A] transition-colors">Medical Disclaimer</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
