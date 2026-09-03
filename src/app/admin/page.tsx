"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/lib/adminAuthContext";

export default function AdminRootPage() {
  const router = useRouter();
  const { adminUser: user, adminLoading: loading } = useAdminAuth();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.replace("/admin/dashboard");
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
