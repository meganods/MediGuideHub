"use client";

import React, { useState } from "react";
import Link from "next/link";
import { subscribeNewsletter } from "@/lib/db";
import { HeartPulse, CheckCircle2, ArrowRight, Globe, Share2, Video, ExternalLink, Mail } from "lucide-react";

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
    { label: "Contact Us", href: "/contact" },
    { label: "Blog & Guides", href: "/blog" },
    { label: "FAQ", href: "/faq" },
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-conditions" },
    { label: "Medical Disclaimer", href: "/disclaimer" },
    { label: "Cookie Policy", href: "/cookie-policy" },
  ];

  const accountLinks = [
    { label: "User Login", href: "/auth" },
    { label: "Admin Login", href: "/admin/login" },
  ];

  const servicesLinks = [
    { label: "Medicare Part A", href: "/services/part-a" },
    { label: "Medicare Part B", href: "/services/part-b" },
    { label: "Medicare Part C", href: "/services/part-c" },
    { label: "Medicare Part D", href: "/services/part-d" },
  ];

  const socialLinks = [
    { icon: <Globe className="h-4 w-4" />, href: "https://twitter.com", label: "Twitter" },
    { icon: <Share2 className="h-4 w-4" />, href: "https://facebook.com", label: "Facebook" },
    { icon: <Video className="h-4 w-4" />, href: "https://youtube.com", label: "YouTube" },
    { icon: <ExternalLink className="h-4 w-4" />, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: <Mail className="h-4 w-4" />, href: "mailto:support@mediguidehub.com", label: "Email" },
  ];

  return (
    <footer className="bg-white border-t border-stone-200 pt-16 pb-8">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-100">

          {/* Brand + Newsletter Col */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="flex items-center gap-2 w-fit">
              <div className="bg-[#F9FAFB] p-2 rounded-xl border border-stone-200">
                <HeartPulse className="h-6 w-6 text-[#C9A15A]" />
              </div>
              <span className="font-heading font-bold text-xl tracking-tight text-[#113F48]">
                MediGuide<span className="text-[#C9A15A]">Hub</span>
              </span>
            </Link>
            <p className="text-sm text-stone-500 leading-relaxed">
              Navigating Medicare doesn&apos;t have to be overwhelming. We provide free, objective, plain-language guides so you can make confident healthcare decisions.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#F9FAFB] border border-stone-200 text-stone-500 hover:text-[#C9A15A] hover:border-[#C9A15A] transition-all"
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Newsletter */}
            <div className="space-y-3">
              <h4 className="font-heading font-semibold text-[#113F48] text-sm uppercase tracking-wider">
                Newsletter
              </h4>
              <p className="text-sm text-stone-500">
                Get enrollment deadline updates &amp; policy changes directly in your inbox.
              </p>
              <form onSubmit={handleSubscribe} className="space-y-2">
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
                  <div className="flex items-center gap-1.5 text-emerald-700 text-xs mt-1 font-medium bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                    <span>{message}</span>
                  </div>
                )}
                {status === "error" && (
                  <div className="text-red-700 text-xs mt-1 font-medium bg-red-50 p-2.5 rounded-lg border border-red-200">
                    {message}
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Company */}
            <div className="space-y-3">
              <h4 className="font-heading font-semibold text-[#113F48] text-sm uppercase tracking-wider">
                Company
              </h4>
              <ul className="space-y-2.5">
                {companyLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-stone-500 hover:text-[#C9A15A] transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-3">
              <h4 className="font-heading font-semibold text-[#113F48] text-sm uppercase tracking-wider">
                Medicare Parts
              </h4>
              <ul className="space-y-2.5">
                {servicesLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-stone-500 hover:text-[#C9A15A] transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div className="space-y-3">
              <h4 className="font-heading font-semibold text-[#113F48] text-sm uppercase tracking-wider">
                Legal
              </h4>
              <ul className="space-y-2.5">
                {legalLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-stone-500 hover:text-[#C9A15A] transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Account */}
            <div className="space-y-3">
              <h4 className="font-heading font-semibold text-[#113F48] text-sm uppercase tracking-wider">
                Account
              </h4>
              <ul className="space-y-2.5">
                {accountLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-stone-500 hover:text-[#C9A15A] transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 space-y-4">
          <div className="bg-[#F9FAFB] border border-stone-200 p-4 rounded-xl text-[11px] text-stone-500 leading-relaxed">
            <strong className="text-[#113F48]">Educational Disclaimer:</strong> MediGuide Hub is an independent informational publication created for general educational purposes only. We do not sell insurance, act as a licensed broker, or bind coverage.
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-stone-400 gap-4">
            <p>© {new Date().getFullYear()} MediGuide Hub. All rights reserved. Designed for educational purposes only.</p>
            <div className="flex flex-wrap gap-x-6 gap-y-1 justify-center">
              <Link href="/privacy-policy" className="hover:text-[#C9A15A] transition-colors">Privacy Policy</Link>
              <Link href="/terms-conditions" className="hover:text-[#C9A15A] transition-colors">Terms &amp; Conditions</Link>
              <Link href="/disclaimer" className="hover:text-[#C9A15A] transition-colors">Medical Disclaimer</Link>
              <Link href="/cookie-policy" className="hover:text-[#C9A15A] transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
