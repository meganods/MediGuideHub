import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { slug, path } = body;

    // 1. Revalidate dynamic route segments
    revalidatePath("/blog/[slug]", "page");
    revalidatePath("/blog/[slug]", "layout");

    // 2. Revalidate specific route if provided
    if (slug) {
      revalidatePath(`/blog/${slug}`);
      revalidatePath(`/blog/${slug}`, "page");
    }
    if (path) {
      revalidatePath(path);
      revalidatePath(path, "page");
    }

    // 3. Revalidate listings, homepage, and taxonomy hubs
    revalidatePath("/blog", "page");
    revalidatePath("/blog");
    revalidatePath("/", "page");
    revalidatePath("/");
    revalidatePath("/category/[slug]", "page");
    revalidatePath("/category/[slug]", "layout");
    revalidatePath("/sitemap", "page");

    return NextResponse.json({
      revalidated: true,
      slug: slug || null,
      path: path || null,
      timestamp: Date.now(),
    });
  } catch (err: any) {
    console.error("Revalidation error:", err);
    return NextResponse.json(
      { message: err?.message || "Revalidation failed" },
      { status: 500 }
    );
  }
}

