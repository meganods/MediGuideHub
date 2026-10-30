"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { subscribeToPublishedBlogPostBySlug } from "@/lib/db";

interface ArticleLiveSyncProps {
  slug: string;
  initialUpdatedAt?: string;
  initialTitle?: string;
}

export default function ArticleLiveSync({ slug, initialUpdatedAt, initialTitle }: ArticleLiveSyncProps) {
  const router = useRouter();

  useEffect(() => {
    if (!slug) return;
    const unsubscribe = subscribeToPublishedBlogPostBySlug(slug, (livePost) => {
      if (!livePost) return;
      // If title or updatedAt changed compared to the initially rendered server version, refresh!
      if (
        (livePost.updatedAt && initialUpdatedAt && livePost.updatedAt !== initialUpdatedAt) ||
        (livePost.title && initialTitle && livePost.title !== initialTitle)
      ) {
        router.refresh();
      }
    });
    return () => unsubscribe();
  }, [slug, initialUpdatedAt, initialTitle, router]);

  return null;
}

