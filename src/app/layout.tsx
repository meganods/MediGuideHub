import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { AuthProvider } from "@/lib/authContext";
import { AdminAuthProvider } from "@/lib/adminAuthContext";
import ScrollToTop from "@/components/ScrollToTop";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import CookieConsent from "@/components/CookieConsent";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "";

export const metadata: Metadata = {
  metadataBase: new URL("https://mediguide4u.com"),
  title: "mediguide4u - Evidence-Based Healthcare Guides & Wellness Resources",
  description: "Learn about healthcare plans, wellness topics, preventive care, nutrition, and make informed healthcare decisions.",
  other: adsenseClientId
    ? {
        "google-adsense-account": adsenseClientId,
      }
    : {},
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        {adsenseClientId && (
          <Script
            id="google-adsense"
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body className="font-sans antialiased text-[#113F48] bg-white overflow-x-hidden" suppressHydrationWarning>
        <AuthProvider>
          <AdminAuthProvider>
            <AnalyticsTracker />
            <ScrollToTop />
            {children}
            <CookieConsent />
          </AdminAuthProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
