"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AuthRedirectPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const tab = searchParams.get("tab") || "signin";
    const redirect = searchParams.get("redirect") || "";
    
    let path = "/login";
    if (tab === "signup") {
      path = "/register";
    }
    
    if (redirect) {
      path += `?redirect=${encodeURIComponent(redirect)}`;
    }
    
    router.replace(path);
  }, [router, searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F9FAFB]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#C9A15A]" />
    </div>
  );
}
