"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Mail, Home } from "lucide-react";

export default function CookiePolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-grow">
        {/* ── BREADCRUMB ── */}
        <div className="bg-stone-50 border-b border-stone-100 py-3">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-none text-xs text-stone-500 flex gap-2">
            <Link href="/" className="hover:text-[#C9A15A] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#113F48] font-semibold">Cookie Policy</span>
          </div>
        </div>

        {/* ── HERO ── */}
        <section className="py-14 bg-[#F9FAFB] border-b border-stone-100 print:bg-white print:border-0">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-none space-y-3">
            <p className="text-xs text-[#C9A15A] font-bold uppercase tracking-wider">Last Updated: August 2026</p>
            <h1 className="text-4xl font-extrabold text-[#113F48]">Cookie Policy</h1>
            <p className="text-stone-600 leading-relaxed text-sm">
              This Cookie Policy details how cookies are used on mediguide4u to support site speed, performance metrics, and AdSense advertisements.
            </p>
          </div>
        </section>

        {/* ── CONTENT ── */}
        <section className="py-14 bg-white print:py-0">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-none">
            <div className="prose prose-stone max-w-none text-stone-600 space-y-8 text-sm leading-relaxed">
              
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-[#113F48]">1. What Are Cookies?</h2>
                <p>
                  Cookies are small text files stored by your browser when you visit a website. They help the platform remember preferences, keep connection states secure, track page navigation data, and deliver relevant advertisements.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl font-bold text-[#113F48]">2. Essential Cookies</h2>
                <p>
                  These cookies are vital to navigate the website and use basic security features. Without these cookies, services like logging into dashboards or submitting contact forms would not work correctly. Essential cookies do not track marketing profiles.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl font-bold text-[#113F48]">3. Analytics &amp; Preference Cookies</h2>
                <p>
                  We utilize analytics logs to measure layout performance and article popularity. These cookies track anonymous metrics, such as what browser you use, how long you stay, and which article slugs you select. Preference cookies allow us to remember local settings like text sizing.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl font-bold text-[#113F48]">4. Google AdSense Advertising Cookies</h2>
                <p>
                  Google AdSense uses cookies to serve ads based on your visits to our site and other pages across the web. The AdSense system uses mobile identifiers and DoubleClick cookies to avoid showing repetitive ads and target ads matching user demographics.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl font-bold text-[#113F48]">5. Managing and Opting Out</h2>
                <p>
                  You can configure your browser to block all cookies, accept them, or alert you when a cookie is placed. Note that disabling essential cookies may impact certain interface options on mediguide4u.
                </p>
                <p>
                  To manage cookies across search engines, you can visit the official <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-[#C9A15A] underline">Google Ads Settings</a> to toggle personalized ads off, or consult your browser&apos;s Help panel for detailed setup parameters.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ── BOTTOM CTA ── */}
        <section className="py-16 bg-[#F9FAFB] border-t border-stone-200 print:hidden">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-none text-center space-y-5">
            <h3 className="text-xl font-bold text-[#113F48]">Need Assistance?</h3>
            <p className="text-stone-500 text-sm max-w-md mx-auto">
              If you have any questions regarding our terms, policies, or data handling, reach out to our team.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#113F48] hover:bg-[#C9A15A] text-white text-xs font-semibold rounded-xl transition-all shadow"
              >
                <Mail className="h-4 w-4" /> Contact Us
              </Link>
              <Link 
                href="/" 
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 text-xs font-semibold rounded-xl transition-all"
              >
                <Home className="h-4 w-4" /> Return Home
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
