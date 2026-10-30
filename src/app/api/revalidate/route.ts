import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { slug, path } = body;

    if (slug) {
      revalidatePath(`/blog/${slug}`, "page");
    }
    if (path) {
      revalidatePath(path, "page");
    }

    // Always revalidate the listing pages and homepage
    revalidatePath("/blog", "page");
    revalidatePath("/", "page");
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

