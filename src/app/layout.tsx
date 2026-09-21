import type { Metadata, Viewport } from "next";
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
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#113F48",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-5266755800049907";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mediguide4u.com"),
  title: {
    default: "mediguide4u - Physician-Reviewed Healthcare & Wellness Guides",
    template: "%s | mediguide4u",
  },
  description:
    "Explore clear, doctor-reviewed healthcare guides covering symptoms, conditions, nutrition science, preventive medicine, and everyday wellness.",
  applicationName: "mediguide4u",
  authors: [{ name: "mediguide4u Editorial & Medical Board", url: "https://www.mediguide4u.com/authors" }],
  generator: "Next.js",
  keywords: [
    "healthcare guides",
    "doctor-reviewed health",
    "preventive medicine",
    "nutrition science",
    "blood pressure management",
    "diabetes health",
    "heart health",
    "medical literacy",
  ],
  referrer: "origin-when-cross-origin",
  creator: "mediguide4u Editorial Board",
  publisher: "mediguide4u",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    types: {
      "application/rss+xml": "https://www.mediguide4u.com/feed.xml",
    },
  },
  openGraph: {
    title: "mediguide4u - Physician-Reviewed Healthcare & Wellness Guides",
    description:
      "Explore clear, doctor-reviewed healthcare guides covering symptoms, conditions, nutrition science, preventive medicine, and everyday wellness.",
    url: "https://www.mediguide4u.com",
    siteName: "mediguide4u",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://www.mediguide4u.com/logo.png",
        width: 1200,
        height: 630,
        alt: "mediguide4u - Physician-Reviewed Healthcare Guides",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "mediguide4u - Physician-Reviewed Healthcare & Wellness Guides",
    description:
      "Explore clear, doctor-reviewed healthcare guides covering symptoms, conditions, nutrition science, preventive medicine, and everyday wellness.",
    site: "@mediguide4u",
    creator: "@mediguide4u",
    images: ["https://www.mediguide4u.com/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "dQLbGcUPVRmr8pbyXY_tb6_LgcMBf5JuK4djQpKVquI",
  },
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
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    "name": "mediguide4u",
    "url": "https://www.mediguide4u.com",
    "logo": "https://www.mediguide4u.com/logo.png",
    "description": "An independent educational platform providing clear, physician-reviewed healthcare and wellness guides covering symptoms, conditions, nutrition, and preventive care.",
    "publishingPrinciples": "https://www.mediguide4u.com/editorial-policy",
    "correctionsPolicy": "https://www.mediguide4u.com/corrections-policy",
    "knowsAbout": [
      "Internal Medicine",
      "Cardiovascular Health",
      "Preventive Healthcare",
      "Endocrinology & Diabetes",
      "Clinical Nutrition",
      "Public Health Literacy"
    ],
    "sameAs": [],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Editorial Inquiries",
      "url": "https://www.mediguide4u.com/contact"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "mediguide4u",
    "url": "https://www.mediguide4u.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.mediguide4u.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        {/* Google AdSense Script for Site Verification & Ad Units */}
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
          crossOrigin="anonymous"
        />
        <meta name="google-adsense-account" content={adsenseClientId} />
        <link rel="alternate" type="application/rss+xml" title="mediguide4u Health Guides" href="/feed.xml" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              
              var storedConsent = null;
              try {
                storedConsent = localStorage.getItem('mediguide4u_cookie_consent');
              } catch(e){}

              if (storedConsent === 'accepted') {
                gtag('consent', 'default', {
                  'ad_storage': 'granted',
                  'ad_user_data': 'granted',
                  'ad_personalization': 'granted',
                  'analytics_storage': 'granted'
                });
              } else if (storedConsent === 'essential_only') {
                gtag('consent', 'default', {
                  'ad_storage': 'denied',
                  'ad_user_data': 'denied',
                  'ad_personalization': 'denied',
                  'analytics_storage': 'granted'
                });
              } else {
                gtag('consent', 'default', {
                  'ad_storage': 'denied',
                  'ad_user_data': 'denied',
                  'ad_personalization': 'denied',
                  'analytics_storage': 'denied'
                });
              }
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
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

