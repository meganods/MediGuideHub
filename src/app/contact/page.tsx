"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/lib/authContext";
import { sendContactMessage } from "@/lib/db";
import { Mail, Send, CheckCircle2, MessageSquare, MapPin, Clock, Phone, Shield } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("Enrollment Help");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setFeedbackMessage("Please sign in to send your message.");
      setStatus("error");
      router.push(`/auth?redirect=${encodeURIComponent("/contact")}&message=${encodeURIComponent("Please sign in before sending your message.")}`);
      return;
    }
    if (!name || !email || !subject || !message) {
      setFeedbackMessage("Please fill out all required fields before sending your message.");
      setStatus("error");
      return;
    }
    setStatus("submitting");
    setFeedbackMessage("");
    try {
      await sendContactMessage({ name, email, subject, message, userId: user?.uid, userEmail: user?.email });
      setStatus("success");
      setFeedbackMessage("");
      setName("");
      setEmail("");
      setMessage("");

      // Auto reset success screen back to idle after 3 seconds
      setTimeout(() => {
        setStatus("idle");
      }, 3000);
    } catch (err) {
      console.error(err);
      setFeedbackMessage("Something went wrong. Please try again or email us directly at support@mediguidehub.com");
      setStatus("error");
    }
  };

  const inputClass = "w-full bg-white border border-stone-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A15A] text-[#113F48] placeholder:text-stone-400 transition-all";

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-grow">

        {/* Hero */}
        <section className="py-16 bg-[#F9FAFB] border-b border-stone-100">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-white border border-stone-200 rounded-2xl shadow-sm mx-auto">
              <MessageSquare className="h-7 w-7 text-[#C9A15A]" />
            </div>
            <h1 className="text-4xl font-extrabold text-[#113F48]">Contact MediGuide Hub</h1>
            <p className="text-stone-600 max-w-2xl mx-auto leading-relaxed">
              Have questions about our educational content, need help finding a specific Medicare resource, or want to report an inaccuracy? Our team reviews every message personally and responds within 2 business days.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 font-medium">
              <Shield className="h-4 w-4" />
              We do not provide insurance quotes or plan recommendations — our guidance is educational only.
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-14 bg-white">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

              {/* Info Column */}
              <div className="lg:col-span-2 space-y-7">
                <div className="bg-[#F9FAFB] border border-stone-200 p-7 rounded-2xl shadow-sm space-y-6">
                  <h2 className="text-xl font-bold text-[#113F48]">Contact Information</h2>

                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="bg-white border border-stone-200 p-2.5 rounded-xl flex-shrink-0">
                        <Mail className="h-5 w-5 text-[#C9A15A]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#113F48] text-sm">Email Support</h3>
                        <a href="mailto:support@mediguidehub.com" className="text-[#C9A15A] text-sm hover:underline">
                          support@mediguidehub.com
                        </a>
                        <p className="text-xs text-stone-400 mt-0.5">Response within 2 business days</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-white border border-stone-200 p-2.5 rounded-xl flex-shrink-0">
                        <Phone className="h-5 w-5 text-[#C9A15A]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#113F48] text-sm">Editorial Line</h3>
                        <p className="text-stone-500 text-sm">+1 (800) 555-MEDI</p>
                        <p className="text-xs text-stone-400 mt-0.5">Mon–Fri, 9am–5pm EST</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-white border border-stone-200 p-2.5 rounded-xl flex-shrink-0">
                        <MapPin className="h-5 w-5 text-[#C9A15A]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#113F48] text-sm">Office Location</h3>
                        <p className="text-stone-500 text-sm leading-relaxed">
                          MediGuide Hub LLC<br />
                          Gaur City Center<br />
                          Greater Noida<br />
                          Uttar Pradesh, India
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-white border border-stone-200 p-2.5 rounded-xl flex-shrink-0">
                        <Clock className="h-5 w-5 text-[#C9A15A]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#113F48] text-sm">Office Hours</h3>
                        <p className="text-stone-500 text-sm">Monday – Friday: 9:30 AM – 6:30 PM IST</p>
                        <p className="text-stone-500 text-sm">Saturday – Sunday: Closed</p>
                        <p className="text-xs text-stone-400 mt-0.5">Email monitored Mon–Fri</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* What We Can Help With */}
                <div className="bg-white border border-stone-200 rounded-2xl p-7 space-y-4">
                  <h3 className="font-bold text-[#113F48] text-sm uppercase tracking-wider">What We Can Help With</h3>
                  <ul className="space-y-2.5">
                    {[
                      "Explaining Medicare Parts A, B, C, and D",
                      "Clarifying enrollment windows and deadlines",
                      "Understanding late enrollment penalties",
                      "Content corrections or factual feedback",
                      "Website technical issues",
                      "Newsletter subscription management",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-stone-600 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-[#C9A15A] flex-shrink-0 mt-0.5" />{item}
                      </li>
                    ))}
                  </ul>
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800">
                    <strong>Please Note:</strong> We cannot provide personalized insurance quotes, compare plans for your zip code, or help with coverage claims. For those needs, contact your plan directly or call 1-800-MEDICARE.
                  </div>
                </div>

                {/* Map */}
                <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-sm">
                  <iframe
                    src="https://www.google.com/maps?q=Gaur%20City%20Center%20Greater%20Noida&z=14&output=embed"
                    title="Gaur City Center Greater Noida location"
                    className="w-full h-64 border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <div className="bg-[#F9FAFB] px-4 py-3 border-t border-stone-200">
                    <p className="text-sm font-medium text-[#113F48]">Gaur City Center, Greater Noida</p>
                    <p className="text-xs text-stone-400">Our location on the map</p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-3">
                {status === "success" ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-10 text-center space-y-4 h-full flex flex-col items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-emerald-800">Message Received!</h2>
                    <p className="text-emerald-700 leading-relaxed max-w-sm">
                      Thank you for reaching out to MediGuide Hub. Our team will review your message and respond within 2 business days.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="mt-4 px-6 py-3 bg-[#113F48] text-white font-semibold rounded-xl hover:bg-[#C9A15A] transition-all text-sm"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <div className="bg-white border border-stone-200 rounded-2xl p-8 shadow-sm space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-[#113F48]">Send Us a Message</h2>
                      <p className="text-stone-500 text-sm mt-1">All fields are required. Your message is private and goes directly to our editorial team.</p>
                    </div>

                    {(status === "error" || feedbackMessage) && (
                      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-sm">
                        {feedbackMessage || "Something went wrong. Please try again or email us directly at support@mediguidehub.com"}
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-[#113F48]">Full Name</label>
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Smith"
                            className={inputClass}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-[#113F48]">Email Address</label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="john@email.com"
                            className={inputClass}
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[#113F48]">Subject</label>
                        <select
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          className={inputClass}
                        >
                          <option>Enrollment Help</option>
                          <option>Understanding Coverage Types</option>
                          <option>Late Penalty Questions</option>
                          <option>Content Correction / Feedback</option>
                          <option>Technical Issue</option>
                          <option>Newsletter / Account</option>
                          <option>Other Educational Question</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[#113F48]">Your Message</label>
                        <textarea
                          rows={6}
                          required
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Please describe your question in as much detail as possible..."
                          className={`${inputClass} resize-none`}
                        />
                      </div>

                      <div className="bg-[#F9FAFB] border border-stone-200 rounded-xl p-4 text-xs text-stone-500">
                        <strong className="text-[#113F48]">Privacy Notice:</strong> Your message is saved securely in our system and reviewed only by MediGuide Hub team members. We do not sell or share your information. See our <a href="/privacy-policy" className="text-[#C9A15A] underline">Privacy Policy</a>.
                      </div>

                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="w-full flex items-center justify-center gap-2 bg-[#113F48] text-white py-4 hover:bg-[#C9A15A] rounded-xl font-semibold transition-all shadow-md disabled:opacity-50 text-sm"
                      >
                        {status === "submitting" ? (
                          "Sending..."
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            Send Message
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
