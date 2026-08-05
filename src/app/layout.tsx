import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/authContext";

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

export const metadata: Metadata = {
  title: "MediGuide Hub - Your Trusted Healthcare Resource",
  description: "Learn about healthcare plans, wellness topics, preventive care, nutrition, and make informed healthcare decisions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        {/*
          GOOGLE ADSENSE SCRIPT TAG PLACEHOLDER
          To monetize this site with Google AdSense, paste your script tag here:
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
            crossOrigin="anonymous"
          ></script>
        */}
      </head>
      <body className="font-sans antialiased text-[#113F48] bg-white overflow-x-hidden" suppressHydrationWarning>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}


