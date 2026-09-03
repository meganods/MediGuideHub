"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { initAnalyticsSession, updateAnalyticsSession } from "@/lib/analytics";

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (pathname?.startsWith("/admin")) return;
    if (isFirstMount.current) {
      isFirstMount.current = false;
      initAnalyticsSession();
    } else {
      updateAnalyticsSession();
    }
  }, [pathname]);

  return null;
}
