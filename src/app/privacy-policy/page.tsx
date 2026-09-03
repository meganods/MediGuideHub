import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Mail, Home } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | mediguide4u",
  description:
    "Learn how mediguide4u protects reader data, manages cookies, adheres to privacy regulations, and handles third-party advertising policies.",
  alternates: {
    canonical: "https://mediguide4u.com/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | mediguide4u",
    description:
      "Learn how mediguide4u protects reader data, manages cookies, adheres to privacy regulations, and handles third-party advertising policies.",
    url: "https://mediguide4u.com/privacy-policy",
    siteName: "mediguide4u",
    type: "website",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-grow">
        {/* ── BREADCRUMB ── */}
        <div className="bg-stone-50 border-b border-stone-100 py-3">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-none text-xs text-stone-500 flex gap-2">
            <Link href="/" className="hover:text-[#C9A15A] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#113F48] font-semibold">Privacy Policy</span>
          </div>
        </div>

        {/* ── HERO ── */}
        <section className="py-14 bg-[#F9FAFB] border-b border-stone-100 print:bg-white print:border-0">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-none space-y-3">
            <p className="text-xs text-[#C9A15A] font-bold uppercase tracking-wider">Last Updated: August 2026</p>
            <h1 className="text-4xl font-extrabold text-[#113F48]">Privacy Policy</h1>
            <p className="text-stone-600 leading-relaxed text-sm">
              This Privacy Policy explains how mediguide4u collects, uses, protects, and handles your personal information in accordance with international privacy standards and third-party advertising guidelines.
            </p>
          </div>
        </section>

        {/* ── POLICY CONTENT ── */}
        <section className="py-14 bg-white print:py-0">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-none">
            <div className="prose prose-stone max-w-none text-stone-600 space-y-8 text-sm leading-relaxed">
              
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-[#113F48]">1. Information We Collect</h2>
                <p>
                  At mediguide4u, we only collect information necessary to deliver educational health resources, respond to inquiries, and display relevant context. We collect information in the following ways:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Contact Form Submissions:</strong> When you send a message, we collect your full name, email address, selected subject, and the contents of your inquiry.</li>
                  <li><strong>Newsletter Subscriptions:</strong> When you subscribe to receive health updates, we collect your email address.</li>
                  <li><strong>Usage Data & Cookies:</strong> We automatically gather standard logs, IP addresses, browser configurations, page visit metrics, and click tracking to optimize site speeds and layouts.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl font-bold text-[#113F48]">2. Cookies and Advertising Policy</h2>
                <p>
                  mediguide4u is designed to support third-party advertising networks, such as Google AdSense, to fund educational health research and website operations. When advertising networks or analytics tools are active, third-party vendors use cookies to serve ads or measure interactions based on prior visits to this and other websites across the internet.
                </p>
                <p>
                  Users may opt out of personalized advertising by visiting the official <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-[#C9A15A] underline">Google Ads Settings</a> page.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl font-bold text-[#113F48]">3. Analytics</h2>
                <p>
                  We employ analytics tracking to understand traffic patterns and article performance. These services help us measure bounce rates, session durations, and article reach so we can continuously write better health resources. The logs are entirely anonymized.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl font-bold text-[#113F48]">4. Information Security</h2>
                <p>
                  We implement robust database configurations, secure HTTPS connections, and strict server access controls. All forms are encrypted via SSL during transmission to prevent unauthorized extraction.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl font-bold text-[#113F48]">5. Third-Party Services</h2>
                <p>
                  We utilize secure cloud hosting systems (Google Firebase, Cloudinary) to store site database logs and display images. These services adhere to rigorous security standards and handle data in accordance with their respective compliance policies.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl font-bold text-[#113F48]">6. Your Rights &amp; Data Control</h2>
                <p>
                  You have full rights over your data. You may request deletion of any comments, newsletter subscriptions, or stored profile info at any time by contacting our support desk.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl font-bold text-[#113F48]">7. Policy Updates</h2>
                <p>
                  We may revise this Privacy Policy periodically to reflect changes in regulatory standards or site features. Continued use of mediguide4u after modifications constitutes acceptance of the revised terms.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl font-bold text-[#113F48]">8. Contact Us</h2>
                <p>
                  For privacy concerns, data removal requests, or questions regarding advertising and cookie practices, please email: <a href="mailto:support@mediguide4u.com" className="text-[#C9A15A] underline font-semibold">support@mediguide4u.com</a>.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ── BOTTOM CTA ── */}
        <section className="py-16 bg-[#F9FAFB] border-t border-stone-200 print:hidden">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center space-y-5">
            <h3 className="text-xl font-bold text-[#113F48]">Have Privacy Questions?</h3>
            <p className="text-stone-500 text-sm max-w-md mx-auto">
              Our compliance team is ready to answer any questions about our privacy policies and data protection practices.
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
