"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

function LegalLayout({ title, subtitle, lastUpdated, children }: {
  title: string;
  subtitle: string;
  lastUpdated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-grow">
        <section className="py-14 bg-[#F9FAFB] border-b border-stone-100">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
            <p className="text-xs text-stone-400 font-medium">Last Updated: {lastUpdated}</p>
            <h1 className="text-4xl font-extrabold text-[#113F48]">{title}</h1>
            <p className="text-stone-600 max-w-2xl leading-relaxed">{subtitle}</p>
          </div>
        </section>
        <section className="py-14 bg-white">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-stone max-w-none text-stone-600 leading-relaxed space-y-8">
              {children}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4 border-t border-stone-100 pt-8 first:border-t-0 first:pt-0">
      <h2 className="text-xl font-bold text-[#113F48]">{title}</h2>
      <div className="text-stone-600 text-sm leading-relaxed space-y-3">{children}</div>
    </div>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      subtitle="This Privacy Policy explains how MediGuide Hub collects, uses, and protects your personal information when you visit our website."
      lastUpdated="August 4, 2026"
    >
      <Section title="1. Information We Collect">
        <p><strong>Account information:</strong> If you create an account, we collect your name, email address, and a securely hashed password (via Firebase Authentication).</p>
        <p><strong>Contact form submissions:</strong> If you use our Contact Us form, we collect your name, email address, and message content.</p>
        <p><strong>Newsletter signups:</strong> If you subscribe to our newsletter, we collect your email address.</p>
        <p><strong>Usage data:</strong> We may automatically collect information about how you use the site, including pages visited, time spent, browser type, and device information, typically through cookies and analytics tools.</p>
        <p><strong>Advertising data:</strong> This site displays advertisements served by Google AdSense. Google and its partners may use cookies to serve ads based on your prior visits to this or other websites.</p>
      </Section>

      <Section title="2. How We Use Your Information">
        <p>We use the information we collect to:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Create and manage your account</li>
          <li>Respond to inquiries submitted through our Contact form</li>
          <li>Send newsletter updates, if you've subscribed (you can unsubscribe at any time)</li>
          <li>Improve our website's content and user experience</li>
          <li>Display relevant advertising through Google AdSense</li>
        </ul>
      </Section>

      <Section title="3. How We Store Your Information">
        <p>Account and message data is stored securely using Firebase (a Google Cloud service), with access restricted through security rules so that only you (or authorized administrators) can access your personal account data. Images you upload (such as a profile avatar) are hosted through Cloudinary.</p>
      </Section>

      <Section title="4. Third-Party Services">
        <p>We use the following third-party services, each with its own privacy policy:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Google Firebase (authentication and database)</li>
          <li>Cloudinary (image hosting)</li>
          <li>Google AdSense (advertising)</li>
        </ul>
      </Section>

      <Section title="5. Cookies and Google AdSense">
        <p>This site uses cookies, including third-party cookies from Google, to serve ads based on your visits to this and other sites. You may opt out of personalized advertising by visiting Google's Ads Settings page, or opt out of some third-party vendor cookies by visiting the Network Advertising Initiative opt-out page. See our full <Link href="/cookie-policy" className="text-[#C9A15A] underline">Cookie Policy</Link> for more detail.</p>
      </Section>

      <Section title="6. Your Choices">
        <p>You may:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Update or delete your account information at any time through your User Dashboard</li>
          <li>Unsubscribe from our newsletter using the link in any email</li>
          <li>Contact us to request deletion of your personal data</li>
        </ul>
      </Section>

      <Section title="7. Children's Privacy">
        <p>This site is not directed at children under 13, and we do not knowingly collect personal information from children.</p>
      </Section>

      <Section title="8. Changes to This Policy">
        <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date.</p>
      </Section>

      <Section title="9. Contact Us">
        <p>If you have questions about this Privacy Policy, please reach out via our <Link href="/contact" className="text-[#C9A15A] underline">Contact Us</Link> page.</p>
      </Section>
    </LegalLayout>
  );
}
