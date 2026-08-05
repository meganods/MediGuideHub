"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4 border-t border-stone-100 pt-8 first:border-t-0 first:pt-0">
      <h2 className="text-xl font-bold text-[#113F48]">{title}</h2>
      <div className="text-stone-600 text-sm leading-relaxed space-y-3">{children}</div>
    </div>
  );
}

export default function CookiePolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-grow">
        <section className="py-14 bg-[#F9FAFB] border-b border-stone-100">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
            <p className="text-xs text-stone-400 font-medium">Last Updated: January 1, 2025</p>
            <h1 className="text-4xl font-extrabold text-[#113F48]">Cookie Policy</h1>
            <p className="text-stone-600 max-w-2xl leading-relaxed">
              This Cookie Policy explains how MediGuide Hub uses cookies and similar tracking technologies when you visit our website, including specifically how Google AdSense uses cookies to deliver personalized advertising.
            </p>
          </div>
        </section>

        <section className="py-14 bg-white">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

            <Section title="What Are Cookies?">
              <p>Cookies are small text files stored on your device when you visit a website. They help websites function properly, remember your preferences, and — in the case of advertising cookies — show you more relevant ads.</p>
            </Section>

            <Section title="Types of Cookies We Use">
              <p><strong>Essential cookies:</strong> Required for core site functionality, such as keeping you logged into your account.</p>
              <p><strong>Analytics cookies:</strong> Help us understand how visitors use the site so we can improve content and navigation.</p>
              <p><strong>Advertising cookies:</strong> This site displays ads through Google AdSense. Google and its advertising partners use cookies to serve ads based on your visits to this and other websites, and to measure ad performance.</p>
            </Section>

            <Section title="Google AdSense and Cookies">
              <p>Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this website or other websites. Google's use of advertising cookies enables it and its partners to serve ads based on your visit to this site and/or other sites on the internet. You can opt out of personalized advertising by visiting Google's Ads Settings. You can also opt out of some third-party vendors' use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info/choices" target="_blank" rel="noopener noreferrer" className="text-[#C9A15A] underline">www.aboutads.info</a>.</p>
            </Section>

            <Section title="Managing Cookies">
              <p>Most web browsers allow you to control cookies through their settings. You can typically block or delete cookies, though doing so may affect how parts of this site function (for example, staying logged in).</p>
            </Section>

            <Section title="Changes to This Policy">
              <p>We may update this Cookie Policy periodically. Changes will be posted here with a revised date.</p>
            </Section>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
