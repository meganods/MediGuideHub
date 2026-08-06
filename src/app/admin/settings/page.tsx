"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/authContext";

export default function AdminSettingsPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (user && user.role === "admin") {
        router.replace("/admin/dashboard?tab=settings");
      } else {
        router.replace("/admin/login");
      }
    }
  }, [user, loading, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F9FAFB]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#C9A15A]" />
    </div>
  );
}
