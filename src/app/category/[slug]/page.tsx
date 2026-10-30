import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound, permanentRedirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdBanner from "@/components/AdBanner";
import { getCategories, getPublishedBlogPosts, BlogPost, BlogCategory } from "@/lib/db";
import { getAuthorProfileUrl, INITIAL_CATEGORIES } from "@/lib/mockData";
import { 
  BookOpen, 
  ArrowRight, 
  Calendar, 
  Eye, 
  ChevronRight, 
  ShieldCheck, 
  Grid,
  FileText 
} from "lucide-react";

export const dynamicParams = true;
export const revalidate = 60;

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categories = await getCategories().catch(() => []);
  const staticSlugs = new Set<string>();
  categories.forEach((cat) => { if (cat.slug) staticSlugs.add(cat.slug); });
  INITIAL_CATEGORIES.forEach((cat) => { if (cat.slug) staticSlugs.add(cat.slug); });
  return Array.from(staticSlugs).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug || "").trim().toLowerCase();
  const normalize = (str: string) => (str || "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const targetNorm = normalize(decodedSlug);

  const categories = await getCategories().catch(() => []);
  let category = categories.find((c) => c.slug === slug || c.slug.toLowerCase() === decodedSlug || normalize(c.slug) === targetNorm);
  if (!category) {
    category = INITIAL_CATEGORIES.find((c) => c.slug === slug || c.slug.toLowerCase() === decodedSlug || normalize(c.slug) === targetNorm);
  }

  if (!category) {
    return {
      title: "Category Not Found | mediguide4u",
      description: "The requested health category could not be found.",
    };
  }

  const title = category.seoTitle || `${category.name} Health Guides & Resources | mediguide4u`;
  const description =
    category.seoDesc ||
    `Explore doctor-reviewed medical guides, symptoms, and clinical wellness resources on ${category.name} at mediguide4u.`;
  const canonicalUrl = `https://www.mediguide4u.com/category/${category.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "mediguide4u",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function CategoryDetailPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug || "").trim().toLowerCase();
  const normalize = (str: string) => (str || "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const targetNorm = normalize(decodedSlug);

  const [categories, allPosts] = await Promise.all([
    getCategories().catch(() => []),
    getPublishedBlogPosts().catch(() => []),
  ]);

  let category = categories.find((c) => c.slug === slug || c.slug.toLowerCase() === decodedSlug || normalize(c.slug) === targetNorm);
  if (!category) {
    category = INITIAL_CATEGORIES.find((c) => c.slug === slug || c.slug.toLowerCase() === decodedSlug || normalize(c.slug) === targetNorm);
  }

  if (!category) {
    notFound();
  }

  if (slug !== category.slug) {
    permanentRedirect(`/category/${category.slug}`);
  }

  // Filter posts matching this category cleanly
  const catSlugNorm = normalize(category.slug);
  const catNameNorm = normalize(category.name);

  const matchingPosts = allPosts.filter((post) => {
    const postCategoryNorm = normalize(post.category);
    const postSubcategoryNorm = normalize(post.subcategory || "");
    
    // Direct slug/name match
    if (
      postCategoryNorm === catSlugNorm ||
      postCategoryNorm === catNameNorm ||
      postSubcategoryNorm === catSlugNorm ||
      postSubcategoryNorm === catNameNorm
    ) {
      return true;
    }

    // Keyword / Substring match fallback
    return (
      postCategoryNorm.includes(catSlugNorm) ||
      catSlugNorm.includes(postCategoryNorm) ||
      (catSlugNorm.includes("heart") && postCategoryNorm.includes("heart")) ||
      (catSlugNorm.includes("fitness") && (postCategoryNorm.includes("fitness") || postCategoryNorm.includes("exercise"))) ||
      (catSlugNorm.includes("wellness") && (postCategoryNorm.includes("wellness") || postCategoryNorm.includes("health"))) ||
      (catSlugNorm.includes("senior") && (postCategoryNorm.includes("senior") || postCategoryNorm.includes("aging"))) ||
      (catSlugNorm.includes("nutrition") && (postCategoryNorm.includes("nutrition") || postCategoryNorm.includes("diet"))) ||
      (catSlugNorm.includes("diabetes") && (postCategoryNorm.includes("diabetes") || postCategoryNorm.includes("glucose"))) ||
      (catSlugNorm.includes("women") && postCategoryNorm.includes("women")) ||
      (catSlugNorm.includes("child") && (postCategoryNorm.includes("child") || postCategoryNorm.includes("pediatric"))) ||
      (catSlugNorm.includes("preventive") && (postCategoryNorm.includes("preventive") || postCategoryNorm.includes("prevention")))
    );
  });

  // Other categories for exploration
  const otherCategories = categories.filter((c) => c.slug !== slug);

  // Structured Data (CollectionPage & BreadcrumbList)
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${category.name} Health Guides`,
    "description": category.description || `Educational guides on ${category.name}`,
    "url": `https://www.mediguide4u.com/category/${category.slug}`,
    "publisher": {
      "@type": "MedicalOrganization",
      "name": "mediguide4u",
      "url": "https://www.mediguide4u.com",
      "logo": "https://www.mediguide4u.com/logo.png"
    },
    "hasPart": matchingPosts.map((post) => ({
      "@type": "MedicalWebPage",
      "name": post.title,
      "headline": post.title,
      "url": `https://www.mediguide4u.com/blog/${post.slug}`,
      "description": post.summary,
      "datePublished": post.publishedAt,
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.mediguide4u.com",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://www.mediguide4u.com/blog",
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": category.name,
        "item": `https://www.mediguide4u.com/category/${category.slug}`,
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <Navbar />

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="flex-grow">
        {/* ── BREADCRUMB & HERO ── */}
        <section className="bg-gradient-to-b from-stone-50 to-[#FDFBF7] py-12 md:py-16 border-b border-stone-100">
          <div className="w-full mx-auto px-4 sm:px-8 md:px-12 lg:px-16 max-w-none space-y-6">
            
            {/* Breadcrumb Links */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-stone-500">
              <Link href="/" className="hover:text-[#C9A15A] transition-colors">Home</Link>
              <ChevronRight className="h-3.5 w-3.5 text-stone-400" />
              <Link href="/blog" className="hover:text-[#C9A15A] transition-colors">Blog</Link>
              <ChevronRight className="h-3.5 w-3.5 text-stone-400" />
              <span className="font-semibold text-[#113F48]">{category.name}</span>
            </nav>

            <div className="max-w-3xl space-y-4">
              <span className="text-xs font-bold text-[#C9A15A] uppercase tracking-[0.2em] bg-[#C9A15A]/10 px-3.5 py-1.5 rounded-full border border-[#C9A15A]/20 inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" /> Health Category
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#113F48] leading-tight">
                {category.name} Guides &amp; Resources
              </h1>
              <p className="text-stone-600 text-sm md:text-base leading-relaxed">
                {category.description || `Explore doctor-reviewed clinical guides, symptoms overviews, and health resources on ${category.name}.`}
              </p>
            </div>
          </div>
        </section>

        {/* ── MAIN ARTICLES GRID ── */}
        <section className="py-16">
          <div className="w-full mx-auto px-4 sm:px-8 md:px-12 lg:px-16 max-w-none space-y-8">
            <AdBanner format="leaderboard" />

            <div className="flex justify-between items-center border-b border-stone-200 pb-4">
              <h2 className="text-xl font-bold text-[#113F48] flex items-center gap-2">
                <FileText className="h-5 w-5 text-[#C9A15A]" />
                Articles in {category.name} ({matchingPosts.length})
              </h2>
              <Link 
                href="/blog" 
                className="text-xs font-bold text-[#C9A15A] hover:underline flex items-center gap-1"
              >
                View all articles <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {matchingPosts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {matchingPosts.map((post) => (
                  <article 
                    key={post.id || post.slug} 
                    className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full"
                  >
                    <div className="relative h-44 w-full bg-stone-50 overflow-hidden">
                      {post.featuredImage && (
                        <Image 
                          src={post.featuredImage} 
                          alt={post.imageAlt || post.title} 
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      )}
                      <span className="absolute top-3 left-3 bg-[#113F48]/90 text-white text-[9px] font-bold px-2 py-0.5 rounded z-10">
                        {post.category}
                      </span>
                    </div>
                    <div className="p-5 flex flex-col justify-between flex-grow space-y-3">
                      <div className="space-y-2">
                        <span className="text-[10px] text-stone-400 flex items-center justify-between">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-stone-400" /> {post.publishedAt}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3 text-[#C9A15A]" /> {post.views || 0}
                          </span>
                        </span>
                        <h3 className="font-extrabold text-[#113F48] text-base leading-snug line-clamp-2 hover:text-[#C9A15A] transition-colors">
                          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                        </h3>
                        <p className="text-stone-500 text-xs leading-relaxed line-clamp-3">
                          {post.summary}
                        </p>
                      </div>
                      <div className="pt-4 border-t border-stone-100 flex justify-between items-center mt-2">
                        <span className="text-stone-500 text-xs font-medium truncate max-w-[140px]">
                          By{" "}
                          <Link
                            href={getAuthorProfileUrl(post.author)}
                            className="text-[#113F48] hover:text-[#C9A15A] hover:underline font-semibold transition-colors"
                          >
                            {post.author || "Mediguide4u Editorial Staff"}
                          </Link>
                        </span>
                        <Link 
                          href={`/blog/${post.slug}`} 
                          className="bg-[#113F48] text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#C9A15A] transition-colors shadow"
                        >
                          Read Guide
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white border border-stone-200 rounded-2xl p-8 space-y-3">
                <BookOpen className="h-12 w-12 text-stone-300 mx-auto" />
                <h3 className="text-lg font-bold text-stone-700">Guides Coming Soon</h3>
                <p className="text-xs text-stone-500 max-w-md mx-auto">
                  Our editorial team is currently developing comprehensive guides for {category.name}. Check back soon or explore other active topics.
                </p>
                <Link 
                  href="/blog" 
                  className="inline-block bg-[#113F48] text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-[#C9A15A] transition-colors mt-2"
                >
                  Browse All Health Guides
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* ── EXPLORE OTHER CATEGORIES ── */}
        <section className="py-12 bg-white border-t border-stone-100">
          <div className="w-full mx-auto px-4 sm:px-8 md:px-12 lg:px-16 max-w-none space-y-6">
            <h3 className="text-lg font-bold text-[#113F48] flex items-center gap-2">
              <Grid className="h-4.5 w-4.5 text-[#C9A15A]" /> Explore Other Health Categories
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {otherCategories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="p-3.5 rounded-xl border border-stone-200 bg-[#FDFBF7] hover:border-[#C9A15A] hover:bg-[#FDF6EC]/25 transition-all text-center block group"
                >
                  <span className="text-xs font-bold text-stone-700 group-hover:text-[#113F48] block truncate">
                    {cat.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
