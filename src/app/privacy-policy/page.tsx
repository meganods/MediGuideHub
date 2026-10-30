import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Mail, Home } from "lucide-react";
import { getLegalPage } from "@/lib/db";
import { RichText } from "@/components/BlogComponents";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Privacy Policy | mediguide4u",
  description:
    "Learn how mediguide4u protects reader data, manages cookies, adheres to privacy regulations, and handles third-party advertising policies.",
  alternates: {
    canonical: "https://www.mediguide4u.com/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | mediguide4u",
    description:
      "Learn how mediguide4u protects reader data, manages cookies, adheres to privacy regulations, and handles third-party advertising policies.",
    url: "https://www.mediguide4u.com/privacy-policy",
    siteName: "mediguide4u",
    type: "website",
  },
};

export default async function PrivacyPolicyPage() {
  const legalData = await getLegalPage("privacy-policy").catch(() => null);
  const hasCustomContent = legalData?.content && !legalData.content.startsWith("# Privacy Policy\n\nThis page contains");

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-grow">
        {/* ── BREADCRUMB ── */}
        <div className="bg-stone-50 border-b border-stone-100 py-3">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-none text-xs text-stone-500 flex gap-2">
            <Link href="/" className="hover:text-[#C9A15A] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#113F48] font-semibold">{legalData?.title || "Privacy Policy"}</span>
          </div>
        </div>

        {/* ── HERO ── */}
        <section className="py-14 bg-[#F9FAFB] border-b border-stone-100 print:bg-white print:border-0">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-none space-y-3">
            <p className="text-xs text-[#C9A15A] font-bold uppercase tracking-wider">
              Last Updated: {legalData?.lastUpdated || "August 2026"}
            </p>
            <h1 className="text-4xl font-extrabold text-[#113F48]">
              {legalData?.title || "Privacy Policy"}
            </h1>
            <p className="text-stone-600 leading-relaxed text-sm">
              This Privacy Policy explains how mediguide4u collects, uses, protects, and handles your personal information in accordance with international privacy standards and third-party advertising guidelines.
            </p>
          </div>
        </section>

        {/* ── POLICY CONTENT ── */}
        <section className="py-14 bg-white print:py-0">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-none">
            {hasCustomContent ? (
              <div className="prose prose-stone max-w-none text-stone-600 space-y-6 text-sm leading-relaxed">
                <RichText content={legalData!.content} className="text-stone-700 leading-relaxed text-sm" />
              </div>
            ) : (
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
                <h2 className="text-xl font-bold text-[#113F48]">2. Google AdSense &amp; Third-Party Advertising Cookies</h2>
                <p>
                  mediguide4u utilizes third-party advertising services, primarily <strong>Google AdSense</strong>, to serve relevant advertisements to our visitors. Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to our website or other websites on the internet.
                </p>
                <p>
                  <strong>Google&apos;s Use of the DART Cookie:</strong> Google&apos;s use of advertising cookies (including the DoubleClick DART cookie) enables it and its partners to serve ads to our users based on their visit to mediguide4u and/or other sites on the Internet.
                </p>
                <p>
                  <strong>How to Opt Out of Personalized Advertising:</strong>
                </p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>
                    Users may opt out of personalized advertising by visiting the official <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-[#C9A15A] underline font-semibold">Google Ads Settings</a>.
                  </li>
                  <li>
                    Alternatively, you can opt out of a third-party vendor&apos;s use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-[#C9A15A] underline font-semibold">www.aboutads.info</a> or the <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-[#C9A15A] underline font-semibold">Network Advertising Initiative Opt-Out Page</a>.
                  </li>
                  <li>
                    Learn more about how Google uses information from sites or apps that use its services at <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-[#C9A15A] underline font-semibold">Google&apos;s Privacy &amp; Terms Partner Site</a>.
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h2 className="text-xl font-bold text-[#113F48]">3. Log Files &amp; Web Analytics</h2>
                <p>
                  Like many other websites, mediguide4u makes use of log files. The information inside the log files includes internet protocol (IP) addresses, type of browser, Internet Service Provider (ISP), date/time stamp, referring/exit pages, and number of clicks to analyze trends, administer the site, track user&apos;s movement around the site, and gather demographic information. IP addresses and other such information are not linked to any information that is personally identifiable.
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
            )}
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
