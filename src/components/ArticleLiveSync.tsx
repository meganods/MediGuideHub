"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { subscribeToPublishedBlogPostBySlug } from "@/lib/db";

interface ArticleLiveSyncProps {
  slug: string;
  initialUpdatedAt?: string;
  initialTitle?: string;
}

export default function ArticleLiveSync({ slug, initialUpdatedAt, initialTitle }: ArticleLiveSyncProps) {
  const router = useRouter();
  const lastState = useRef({
    updatedAt: initialUpdatedAt || "",
    title: initialTitle || "",
  });

  useEffect(() => {
    if (!slug) return;
    const unsubscribe = subscribeToPublishedBlogPostBySlug(slug, (livePost) => {
      if (!livePost) return;
      const prev = lastState.current;
      const isChanged =
        (livePost.updatedAt && prev.updatedAt && livePost.updatedAt !== prev.updatedAt) ||
        (livePost.title && prev.title && livePost.title !== prev.title);

      if (isChanged) {
        lastState.current = {
          updatedAt: livePost.updatedAt || "",
          title: livePost.title || "",
        };
        router.refresh();
      }
    });
    return () => unsubscribe();
  }, [slug, router]);

  return null;
}

