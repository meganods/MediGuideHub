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

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-grow">
        <section className="py-14 bg-[#F9FAFB] border-b border-stone-100">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
            <p className="text-xs text-stone-400 font-medium">Last Updated: January 1, 2025</p>
            <h1 className="text-4xl font-extrabold text-[#113F48]">Terms &amp; Conditions</h1>
            <p className="text-stone-600 max-w-2xl leading-relaxed">
              Please read these Terms &amp; Conditions carefully before using MediGuide Hub. By accessing or using our website, you agree to be bound by these terms.
            </p>
          </div>
        </section>
        <section className="py-14 bg-white">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

            <div className="space-y-4">
              <p className="text-stone-600 text-sm">Welcome to MediGuide Hub. By accessing or using this website, you agree to the following terms.</p>
            </div>

            <Section title="1. Use of Content">
              <p>All content on this site — including articles, graphics, and layout — is provided for general informational purposes only. You may read and share our content for personal, non-commercial use. Reproducing, redistributing, or republishing our content without permission is not permitted.</p>
            </Section>

            <Section title="2. No Professional Advice">
              <p>Nothing on this site constitutes medical, legal, financial, or insurance advice. See our full <Link href="/disclaimer" className="text-[#C9A15A] underline">Disclaimer</Link> for details. Use of this site does not create any advisor-client or professional relationship between you and MediGuide Hub.</p>
            </Section>

            <Section title="3. User Accounts">
              <p>If you create an account, you're responsible for maintaining the confidentiality of your login credentials and for all activity under your account. You agree to provide accurate information when registering.</p>
            </Section>

            <Section title="4. Acceptable Use">
              <p>You agree not to:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-stone-600">
                <li>Use the site for any unlawful purpose</li>
                <li>Attempt to gain unauthorized access to any part of the site, including the Admin Panel</li>
                <li>Upload harmful, offensive, or infringing content through any submission form</li>
                <li>Interfere with the site's normal operation</li>
              </ul>
            </Section>

            <Section title="5. Third-Party Links and Advertising">
              <p>This site may contain links to third-party websites and displays advertising through Google AdSense. We are not responsible for the content, accuracy, or practices of third-party sites or advertisers.</p>
            </Section>

            <Section title="6. Limitation of Liability">
              <p>MediGuide Hub is provided "as is" without warranties of any kind. We are not liable for any damages arising from your use of, or inability to use, this site or reliance on its content.</p>
            </Section>

            <Section title="7. Changes to These Terms">
              <p>We may revise these Terms &amp; Conditions at any time. Continued use of the site after changes are posted constitutes acceptance of the updated terms.</p>
            </Section>

            <Section title="8. Contact">
              <p>Questions about these Terms can be sent through our <Link href="/contact" className="text-[#C9A15A] underline">Contact Us</Link> page.</p>
            </Section>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
