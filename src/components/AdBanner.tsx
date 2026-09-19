"use client";

import React, { useEffect, useRef } from "react";

interface AdBannerProps {
  format?: "in-article" | "sidebar" | "leaderboard" | "responsive";
  slot?: string;
  className?: string;
}

export default function AdBanner({
  format = "responsive",
  slot = "0000000000",
  className = "",
}: AdBannerProps) {
  const adRef = useRef<HTMLModElement | null>(null);
  const pushedRef = useRef(false);
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-5266755800049907";

  useEffect(() => {
    if (!clientId) return;
    if (pushedRef.current) return;

    try {
      if (typeof window !== "undefined") {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        pushedRef.current = true;
      }
    } catch (err) {
      console.warn("AdSense adsbygoogle error:", err);
    }
  }, [clientId]);

  // Dimension & styling presets
  const formatStyles = {
    "in-article": "my-8 min-h-[120px] max-w-2xl mx-auto",
    "sidebar": "my-6 min-h-[250px] w-full max-w-[336px] mx-auto",
    "leaderboard": "my-8 min-h-[90px] w-full max-w-4xl mx-auto",
    "responsive": "my-6 min-h-[100px] w-full",
  };

  return (
    <div
      className={`ad-container w-full overflow-hidden text-center transition-all ${formatStyles[format]} ${className}`}
      aria-label="Advertisement"
    >
      {/* Mandatory Google Policy Ad Label */}
      <div className="flex items-center justify-center gap-2 mb-1.5">
        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-stone-400 bg-stone-100/80 px-2 py-0.5 rounded border border-stone-200/60">
          Advertisement
        </span>
      </div>

      {clientId ? (
        <div className="bg-stone-50/50 border border-stone-150 rounded-xl p-2 flex items-center justify-center overflow-hidden min-h-[90px]">
          <ins
            ref={adRef}
            className="adsbygoogle block"
            style={{ display: "block", textAlign: "center" }}
            data-ad-client={clientId}
            data-ad-slot={slot}
            data-ad-format={format === "in-article" ? "fluid" : "auto"}
            data-ad-layout={format === "in-article" ? "in-article" : undefined}
            data-full-width-responsive="true"
          />
        </div>
      ) : (
        <div className="bg-[#FDFBF7] border border-dashed border-stone-300/80 rounded-xl p-6 text-center text-stone-400 flex flex-col items-center justify-center gap-1 min-h-[90px]">
          <span className="text-xs font-semibold text-stone-500">Google AdSense Placement</span>
          <span className="text-[10px] text-stone-400">
            {format === "in-article" && "In-Article Fluid Responsive Ad"}
            {format === "sidebar" && "Sidebar Display Ad (300x250 / 300x600)"}
            {format === "leaderboard" && "Leaderboard Responsive Horizontal Ad"}
            {format === "responsive" && "Universal Responsive Display Ad"}
          </span>
        </div>
      )}
    </div>
  );
}
