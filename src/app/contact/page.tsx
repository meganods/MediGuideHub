"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Script from "next/script";
import { useAuth } from "@/lib/authContext";
import { sendContactMessage } from "@/lib/db";
import { 
  Mail, 
  Clock, 
  MapPin, 
  AlertCircle, 
  ShieldCheck, 
  Send, 
  BookOpen, 
  ArrowRight, 
  HelpCircle, 
  Home, 
  AlertTriangle,
  FileText,
  CheckCircle2
} from "lucide-react";

export default function ContactPage() {
  const { user } = useAuth();
  
  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("General Question");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [sentSubject, setSentSubject] = useState("");
  const [sentEmail, setSentEmail] = useState("");
  
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !subject || !message) {
      setFeedbackMessage("Please fill out all required fields.");
      setStatus("error");
      return;
    }
    
    if (!consent) {
      setFeedbackMessage("You must agree to the Privacy Policy and Terms & Conditions to send a message.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setFeedbackMessage("");
    
    try {
      await sendContactMessage({
        name,
        email,
        subject,
        message,
        userId: user?.uid || "guest",
        userEmail: user?.email || email
      });
      
      setSentSubject(subject);
      setSentEmail(email);
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
      setConsent(false);
    } catch (err) {
      console.error(err);
      setFeedbackMessage("An unexpected error occurred. Please try again or email us directly at support@mediguidehub.com.");
      setStatus("error");
    }
  };

  const faqs = [
    {
      q: "How can I contact MediGuideHub?",
      a: "You can reach us through our secure contact form on this page or by sending an email directly to support@mediguidehub.com. Our support team is available Monday through Saturday."
    },
    {
      q: "How quickly will I receive a response?",
      a: "Our customer support team usually responds to all legitimate inquiries within 24 to 48 business hours."
    },
    {
      q: "Can I request corrections to health content?",
      a: "Yes. In keeping with our strict Editorial Standards, we welcome factual updates, medical corrections, and content feedback. Please choose 'Content Correction' as your form subject."
    },
    {
      q: "Can I submit partnership inquiries?",
      a: "We welcome educational partnerships, media requests, and content collaborations. Please send us a message choosing 'Business Partnership' as the subject."
    },
    {
      q: "Can I report a technical issue?",
      a: "Yes. To report display bugs, page load errors, or security concerns, use our contact form and select 'Technical Support'."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <Script 
        src="https://challenges.cloudflare.com/turnstile/v0/api.js" 
        async 
        defer 
      />

      <main className="flex-grow">
        
        {/* ── HERO SECTION ── */}
        <section className="relative py-20 bg-white overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A15A]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              
              {/* Left Content */}
              <div className="space-y-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#C9A15A] bg-[#C9A15A]/10 px-3 py-1.5 rounded-full border border-[#C9A15A]/20 inline-block">
                  Support Hub
                </span>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-[#113F48] leading-tight">
                  Contact MediGuideHub
                </h1>
                <p className="text-lg text-stone-600 leading-relaxed">
                  We&apos;re here to help. Reach out with questions, feedback, partnership inquiries, or support requests.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <a 
                    href="#contact-form-section" 
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 font-semibold text-white bg-[#113F48] hover:bg-[#C9A15A] rounded-xl transition-all shadow-md text-sm"
                  >
                    Send a Message <ArrowRight className="h-4 w-4" />
                  </a>
                  <Link 
                    href="/blog" 
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 font-semibold text-[#113F48] bg-white hover:bg-[#F9FAFB] border border-stone-200 hover:border-[#C9A15A] rounded-xl transition-all text-sm"
                  >
                    Browse Health Resources
                  </Link>
                </div>
              </div>

              {/* Right Illustration */}
              <div className="hidden lg:block relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#113F48]/10 to-[#C9A15A]/10 rounded-[2rem] transform translate-x-3 translate-y-3" />
                <div className="relative bg-white border border-stone-200 rounded-[2rem] p-8 shadow-xl space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-[#113F48]/10 p-3 rounded-2xl">
                      <ShieldCheck className="h-7 w-7 text-[#113F48]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#113F48]">Verification & Trust</h4>
                      <p className="text-xs text-stone-500 mt-0.5">Verified Medical Information Portal</p>
                    </div>
                  </div>
                  <hr className="border-stone-100" />
                  <ul className="space-y-3.5 text-xs text-stone-600">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      100% Private, Secure Contact Handling
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      Reviewed directly by Editorial Advisors
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      Response guaranteed in 24-48 business hours
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── CONTACT INFORMATION ── */}
        <section className="py-14 bg-[#F9FAFB] border-t border-stone-200">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              
              {/* Card 1: Email */}
              <div className="bg-white border border-stone-200 rounded-2xl p-6 space-y-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-[#C9A15A]/10 w-10 h-10 rounded-lg flex items-center justify-center border border-[#C9A15A]/20">
                  <Mail className="h-5 w-5 text-[#C9A15A]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#113F48] text-sm">Email Support</h3>
                  <a href="mailto:support@mediguidehub.com" className="text-[#C9A15A] font-semibold text-sm hover:underline block mt-1">
                    support@mediguidehub.com
                  </a>
                  <p className="text-xs text-stone-400 mt-2">General questions and customer support.</p>
                </div>
              </div>

              {/* Card 2: Business Hours */}
              <div className="bg-white border border-stone-200 rounded-2xl p-6 space-y-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-[#113F48]/10 w-10 h-10 rounded-lg flex items-center justify-center border border-[#113F48]/20">
                  <Clock className="h-5 w-5 text-[#113F48]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#113F48] text-sm">Business Hours</h3>
                  <p className="text-stone-700 text-sm mt-1 font-semibold">Monday – Saturday</p>
                  <p className="text-xs text-stone-500">9:00 AM – 6:00 PM</p>
                  <p className="text-[10px] text-stone-400 mt-1.5 uppercase font-bold tracking-wider">Timezone: IST (UTC +5:30)</p>
                </div>
              </div>

              {/* Card 3: Location */}
              <div className="bg-white border border-stone-200 rounded-2xl p-6 space-y-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-[#113F48]/10 w-10 h-10 rounded-lg flex items-center justify-center border border-[#113F48]/20">
                  <MapPin className="h-5 w-5 text-[#113F48]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#113F48] text-sm">Office Location</h3>
                  <p className="text-stone-700 text-sm mt-1 font-semibold">New Delhi, India</p>
                  <p className="text-xs text-stone-400 mt-2">Visits are by appointment only.</p>
                </div>
              </div>

              {/* Card 4: Response Time */}
              <div className="bg-white border border-stone-200 rounded-2xl p-6 space-y-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-[#C9A15A]/10 w-10 h-10 rounded-lg flex items-center justify-center border border-[#C9A15A]/20">
                  <ShieldCheck className="h-5 w-5 text-[#C9A15A]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#113F48] text-sm">Response Time</h3>
                  <p className="text-stone-700 text-sm mt-1 leading-relaxed font-semibold">
                    We usually respond within 24–48 business hours.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── CONTACT FORM & NOTICE SECTION ── */}
        <section id="contact-form-section" className="py-20 bg-white border-t border-stone-200">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
              
              {/* Form Side */}
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-[#113F48]">Send Us a Message</h2>
                    <p className="text-stone-500 text-sm mt-1">Submit your message below. All fields marked with * are required.</p>
                  </div>

                  {status === "success" ? (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-6">
                      <div className="w-12 h-12 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center mx-auto">
                        <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-emerald-800">Message Sent Successfully!</h3>
                        <p className="text-emerald-700 text-sm leading-relaxed max-w-md mx-auto">
                          Thank you for contacting MediGuideHub. Our team has received your ticket regarding <strong>{sentSubject}</strong> and will respond within 24–48 business hours.
                        </p>
                      </div>
                      
                      {/* Simulated Auto-Reply Confirmation Copy */}
                      <div className="bg-white border border-emerald-200/50 p-4 rounded-xl text-left max-w-md mx-auto space-y-2">
                        <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">Auto Email Reply Sent to {sentEmail}:</span>
                        <p className="text-xs text-stone-600 leading-relaxed italic">
                          &ldquo;Thank you for contacting MediGuideHub. Our team has received your inquiry regarding &apos;{sentSubject}&apos; and will respond within 24–48 business hours.&rdquo;
                        </p>
                      </div>

                      <button
                        onClick={() => setStatus("idle")}
                        className="px-6 py-2.5 bg-[#113F48] text-white font-semibold rounded-lg hover:bg-[#C9A15A] transition-all text-xs"
                      >
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      
                      {status === "error" && (
                        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-xs font-semibold flex items-center gap-2">
                          <AlertCircle className="h-4.5 w-4.5 flex-shrink-0" />
                          <span>{feedbackMessage}</span>
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                          <label htmlFor="fullName" className="text-xs font-bold text-[#113F48] uppercase tracking-wide">
                            Full Name *
                          </label>
                          <input
                            id="fullName"
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Smith"
                            className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A15A] text-[#113F48] transition-all"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label htmlFor="emailAddress" className="text-xs font-bold text-[#113F48] uppercase tracking-wide">
                            Email Address *
                          </label>
                          <input
                            id="emailAddress"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="john@email.com"
                            className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A15A] text-[#113F48] transition-all"
                          />
                        </div>
                      </div>

                      {/* Inquiry Type Dropdown */}
                      <div className="space-y-1.5">
                        <label htmlFor="subjectSelect" className="text-xs font-bold text-[#113F48] uppercase tracking-wide">
                          Inquiry Type *
                        </label>
                        <select
                          id="subjectSelect"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A15A] text-[#113F48] transition-all"
                        >
                          <option value="General Question">General Question</option>
                          <option value="Content Correction">Content Correction</option>
                          <option value="Business Partnership">Business Partnership</option>
                          <option value="Technical Support">Technical Support</option>
                          <option value="Feedback">Feedback</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="messageBody" className="text-xs font-bold text-[#113F48] uppercase tracking-wide">
                          Message *
                        </label>
                        <textarea
                          id="messageBody"
                          rows={6}
                          required
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="How can we help you? Please provide detailed information..."
                          className="w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A15A] text-[#113F48] resize-none transition-all"
                        />
                      </div>

                      {/* Consent Checkbox */}
                      <div className="flex items-start gap-2.5 pt-2">
                        <input
                          id="consentCheckbox"
                          type="checkbox"
                          checked={consent}
                          onChange={(e) => setConsent(e.target.checked)}
                          className="mt-1 h-4 w-4 rounded border-stone-300 text-[#113F48] focus:ring-[#C9A15A]"
                        />
                        <label htmlFor="consentCheckbox" className="text-xs text-stone-500 leading-normal">
                          I agree to the <Link href="/privacy-policy" className="text-[#C9A15A] underline hover:text-[#B58F4E]">Privacy Policy</Link> and <Link href="/terms-and-conditions" className="text-[#C9A15A] underline hover:text-[#B58F4E]">Terms &amp; Conditions</Link>.
                        </label>
                      </div>

                      {/* Cloudflare Turnstile Spam Protection */}
                      <div className="flex justify-center py-2 border-t border-stone-100">
                        <div 
                          className="cf-turnstile" 
                          data-sitekey="1x00000000000000000000AA"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="w-full flex items-center justify-center gap-2 bg-[#113F48] hover:bg-[#C9A15A] text-white py-4 rounded-xl font-semibold transition-all shadow-md disabled:opacity-50 text-sm mt-3"
                      >
                        {status === "submitting" ? (
                          "Sending Message..."
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            Send Message
                          </>
                        )}
                      </button>

                    </form>
                  )}
                </div>
              </div>

              {/* Emergency Notice & Privacy Side */}
              <div className="lg:col-span-5 space-y-8">
                
                {/* Medical Emergency Notice */}
                <div className="bg-red-50/50 border border-red-200 rounded-2xl p-6 sm:p-8 space-y-3.5 shadow-sm">
                  <div className="flex items-center gap-2 text-red-800">
                    <AlertTriangle className="h-5 w-5 flex-shrink-0" />
                    <h3 className="font-bold text-sm uppercase tracking-wide">Medical Notice</h3>
                  </div>
                  <p className="text-red-900 text-xs font-semibold leading-relaxed">
                    MediGuideHub does not provide emergency medical services. If you are experiencing a medical emergency, immediately contact your local emergency services or visit the nearest hospital.
                  </p>
                </div>

                {/* Privacy Commitment Box */}
                <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 sm:p-8 space-y-3.5 shadow-sm">
                  <div className="flex items-center gap-2 text-[#113F48]">
                    <ShieldCheck className="h-5 w-5 flex-shrink-0 text-[#C9A15A]" />
                    <h3 className="font-bold text-sm uppercase tracking-wide">Privacy Commitment</h3>
                  </div>
                  <ul className="space-y-2.5 text-stone-500 text-xs leading-relaxed">
                    <li>✓ Personal information is handled securely using SSL encryption.</li>
                    <li>✓ Contact requests are never sold to third parties or insurance agencies.</li>
                    <li>✓ Submitted information is used strictly to respond to your specific inquiry.</li>
                  </ul>
                </div>

                {/* FAQ Quick Link Banner */}
                <div className="bg-white border border-stone-200 rounded-2xl p-6 text-center space-y-3">
                  <HelpCircle className="h-8 w-8 text-[#C9A15A] mx-auto" />
                  <h4 className="font-bold text-[#113F48] text-sm">Have a Quick Question?</h4>
                  <p className="text-stone-500 text-xs leading-relaxed">
                    Read our Frequently Asked Questions below to find quick resolutions before submitting a ticket.
                  </p>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* ── GOOGLE MAP SECTION ── */}
        <section className="bg-[#F9FAFB] border-t border-stone-200">
          <div className="w-full mx-auto">
            <div className="relative h-96 w-full">
              <iframe
                src="https://www.google.com/maps?q=New%20Delhi%20India&z=12&output=embed"
                title="New Delhi, India Map"
                className="w-full h-full border-0 grayscale opacity-90"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute bottom-6 left-6 bg-white border border-stone-200 p-4 rounded-xl shadow-lg max-w-xs">
                <h4 className="font-bold text-[#113F48] text-xs">Delhi Headquarters</h4>
                <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">
                  Serving health content readers worldwide from New Delhi, India.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── FREQUENTLY ASKED QUESTIONS ── */}
        <section className="py-20 bg-white border-t border-stone-200">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="text-center mb-14 space-y-3">
              <h2 className="text-3xl font-extrabold text-[#113F48]">Frequently Asked Questions</h2>
              <p className="text-stone-500 text-sm">Quick answers to common questions about contacting our team.</p>
            </div>
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-stone-50 border border-stone-200 rounded-xl p-5 shadow-sm">
                  <h4 className="font-bold text-sm text-[#113F48] flex items-start gap-2">
                    <HelpCircle className="h-4.5 w-4.5 text-[#C9A15A] mt-0.5 flex-shrink-0" />
                    {faq.q}
                  </h4>
                  <p className="text-xs text-stone-500 mt-2 pl-6 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BOTTOM CTA ── */}
        <section className="py-20 bg-[#113F48] text-white">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 max-w-4xl">
            <h2 className="text-3xl font-extrabold tracking-tight leading-tight">
              Need More Healthcare Information?
            </h2>
            <p className="text-stone-300 max-w-md mx-auto text-sm">
              We update our editorial catalogs daily with healthcare resources and guides.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
              <Link 
                href="/blog" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold text-[#113F48] bg-white hover:bg-stone-50 rounded-xl transition-all text-sm shadow-md"
              >
                <BookOpen className="h-4 w-4" /> Browse Health Articles
              </Link>
              <Link 
                href="/" 
                className="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold text-white bg-[#C9A15A] hover:bg-[#B58F4E] rounded-xl transition-all text-sm"
              >
                <Home className="h-4 w-4" /> Return to Home
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
