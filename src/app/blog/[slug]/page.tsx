import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  getPublishedBlogPostBySlug, 
  getPublishedBlogPosts, 
  getCategories,
  getCommentsForPost,
  BlogPost,
  BlogCategory
} from "@/lib/db";
import { 
  Clock, 
  BookOpen, 
  Calendar, 
  ArrowLeft, 
  ArrowRight, 
  Eye, 
  Check,
  Folder,
  ShieldCheck,
  HelpCircle,
  Share2
} from "lucide-react";
import { 
  BlogContentRenderer, 
  FAQSection, 
  ReferencesSection, 
  MedicalDisclaimer, 
  AuthorInfo, 
  MedicalReviewerInfo, 
  RichText 
} from "@/components/BlogComponents";
import { 
  ArticleBookmarkButton, 
  ArticleShareButton, 
  ArticleViewTracker 
} from "@/components/ArticleInteractions";
import PostCommentsSection from "@/components/PostCommentsSection";

export const revalidate = 60; // Revalidate every 60 seconds (ISR)
export const dynamicParams = true; // Allow newly published slugs to be rendered on-demand

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const posts = await getPublishedBlogPosts();
    return posts.filter(p => p.slug).map((post) => ({
      slug: post.slug,
    }));
  } catch (e) {
    console.error("Error generating static params for blog posts:", e);
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | mediguide4u",
      description: "The requested medical guide could not be found.",
    };
  }

  const pageTitle = post.metaTitle || `${post.title} | mediguide4u`;
  const pageDescription = post.metaDescription || post.summary;
  const canonicalUrl = post.canonicalUrl || `https://mediguide4u.com/blog/${post.slug}`;
  const ogImage = post.featuredImage || "https://mediguide4u.com/icon.png";

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.metaTitle || post.title,
      description: pageDescription,
      url: canonicalUrl,
      siteName: "mediguide4u",
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: ["Mediguide4u Editorial Staff"],
      section: post.category,
      tags: post.tags,
      images: [
        {
          url: ogImage,
          alt: post.imageAlt || post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle || post.title,
      description: pageDescription,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const [post, allPosts, categories, initialComments] = await Promise.all([
    getPublishedBlogPostBySlug(slug),
    getPublishedBlogPosts().catch(() => [] as BlogPost[]),
    getCategories().catch(() => [] as BlogCategory[]),
    getCommentsForPost(slug).catch(() => []),
  ]);

  if (!post || (post.status && post.status.toLowerCase() !== "published")) {
    notFound();
  }

  // Resolve Category Slug
  const categoryMatch = categories.find(
    c => c.name.toLowerCase() === post.category.toLowerCase() || c.slug.toLowerCase() === post.category.toLowerCase()
  );
  const categorySlug = categoryMatch ? categoryMatch.slug : post.category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  // Related posts from the same category or general fallback
  const sameCategoryPosts = allPosts.filter(p => p.category === post.category && p.slug !== post.slug);
  const otherPosts = allPosts.filter(p => p.category !== post.category && p.slug !== post.slug);
  const relatedPosts = [...sameCategoryPosts, ...otherPosts].slice(0, 3);

  // Previous & Next posts for contextual navigation
  const currentIndex = allPosts.findIndex(p => p.slug === post.slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex >= 0 && currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  // Dynamic headings list for TOC
  const headings = post.contentBlocks && post.contentBlocks.length > 0
    ? post.contentBlocks
        .filter(b => b.heading)
        .map(b => ({ text: b.heading!, id: b.id }))
    : [
        { text: "Overview", id: "overview" },
        { text: "Frequently Asked Questions", id: "faq" }
      ];

  // Build JSON-LD structured data
  const mainSchema: any = {
    "@context": "https://schema.org",
    "@type": post.schemaType || "MedicalWebPage",
    "name": post.title,
    "headline": post.title,
    "description": post.summary,
    "image": post.featuredImage || "https://mediguide4u.com/icon.png",
    "datePublished": post.publishedAt,
    "dateModified": post.updatedAt || post.publishedAt,
    "author": {
      "@type": "Organization",
      "name": "Mediguide4u Editorial Staff",
      "url": "https://mediguide4u.com/about"
    },
    "publisher": {
      "@type": "Organization",
      "name": "mediguide4u",
      "url": "https://mediguide4u.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://mediguide4u.com/icon.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://mediguide4u.com/blog/${post.slug}`
    },
    "reviewedBy": {
      "@type": "Organization",
      "name": "Mediguide4u Editorial Staff",
      "url": "https://mediguide4u.com/about"
    }
  };

  // Breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://mediguide4u.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Healthcare Guides",
        "item": "https://mediguide4u.com/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.category,
        "item": `https://mediguide4u.com/category/${categorySlug}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": post.title,
        "item": `https://mediguide4u.com/blog/${post.slug}`
      }
    ]
  };

  // FAQPage schema if FAQs are present
  const faqSchema = post.faqs && post.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": post.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <Navbar />

      {/* Dynamic JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(mainSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Client View / History Tracker */}
      <ArticleViewTracker postId={post.id} slug={post.slug} />

      <main className="flex-grow py-8 w-full mx-auto px-4 sm:px-8 md:px-12 lg:px-16 max-w-none">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="text-xs text-stone-500 mb-6 flex items-center gap-1.5 font-medium flex-wrap">
          <Link href="/" className="hover:text-[#C9A15A] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-[#C9A15A] transition-colors">Healthcare Guides</Link>
          <span>/</span>
          <Link href={`/category/${categorySlug}`} className="hover:text-[#C9A15A] transition-colors text-stone-600 font-semibold">{post.category}</Link>
          <span>/</span>
          <span className="text-[#113F48] font-bold truncate max-w-xs">{post.title}</span>
        </nav>

        {/* Outer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Article Stream (8 Cols) */}
          <article className="lg:col-span-8 bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-sm p-6 sm:p-10 space-y-8">
            
            {/* Header info */}
            <header className="space-y-4">
              <div className="flex flex-wrap gap-2 items-center">
                <Link 
                  href={`/category/${categorySlug}`}
                  className="text-[10px] font-bold text-[#C9A15A] hover:text-[#113F48] uppercase tracking-widest bg-[#C9A15A]/10 hover:bg-[#C9A15A]/20 px-2.5 py-1 rounded border border-[#C9A15A]/25 transition-colors inline-flex items-center gap-1"
                >
                  <Folder className="h-3 w-3" /> {post.category}
                </Link>
                {post.subcategory && (
                  <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest bg-stone-100 px-2.5 py-1 rounded border border-stone-200">
                    {post.subcategory}
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#113F48] leading-tight">
                {post.title}
              </h1>
              {post.summary && (
                <p className="text-stone-600 text-sm italic leading-relaxed">
                  {post.summary}
                </p>
              )}
              
              <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-500">
                <div className="flex flex-wrap items-center gap-4">
                  <AuthorInfo authorName="Mediguide4u Editorial Staff" />
                  <MedicalReviewerInfo reviewedAt={post.publishedAt} />
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-[#C9A15A]" /> Published {post.publishedAt}
                  </span>
                  {post.updatedAt && post.updatedAt !== post.publishedAt && (
                    <span className="text-stone-400">Revised: {post.updatedAt}</span>
                  )}
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-[#C9A15A]" /> {post.readTime || "5 min read"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="h-3.5 w-3.5 text-[#C9A15A]" /> {post.views || 0} Views
                  </span>
                  <ArticleBookmarkButton slug={post.slug} />
                </div>
              </div>
            </header>

            {/* Medical Disclaimer Alert Banner */}
            <div className="bg-amber-50/50 border border-amber-200/80 rounded-2xl p-4.5 text-xs text-amber-900 space-y-1">
              <span className="font-bold flex items-center gap-1.5 uppercase tracking-wide text-amber-800">
                <ShieldCheck className="h-4 w-4 text-[#C9A15A]" /> Educational Health Notice
              </span>
              <p className="text-stone-600 leading-relaxed text-[11px]">
                This educational guide is researched in accordance with our{" "}
                <Link href="/editorial-policy" className="text-[#C9A15A] font-semibold underline hover:text-[#113F48]">
                  Editorial Policy
                </Link>{" "}
                and public health guidelines. It is not personal medical advice. For clinical questions, read our{" "}
                <Link href="/medical-disclaimer" className="text-[#C9A15A] font-semibold underline hover:text-[#113F48]">
                  Medical Disclaimer
                </Link>{" "}
                or consult a qualified healthcare provider.
              </p>
            </div>

            {/* Featured Image */}
            {post.featuredImage && (
              <div className="space-y-2">
                <div className="rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 max-h-96 flex items-center justify-center">
                  <img
                    src={post.featuredImage}
                    alt={post.imageAlt || post.title}
                    className="w-full h-auto object-cover max-h-96"
                    loading="eager"
                  />
                </div>
                {post.imageCaption && (
                  <p className="text-[11px] text-stone-400 text-center italic">{post.imageCaption}</p>
                )}
              </div>
            )}

            {/* Quick Answer / Takeaway Card */}
            {post.quickAnswer && (
              <div className="bg-[#FDF6EC] border border-[#C9A15A]/30 p-5 rounded-2xl space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#113F48] flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-[#C9A15A]" /> Quick Summary &amp; Key Findings
                </h3>
                <p className="text-xs text-stone-700 leading-relaxed font-medium">
                  {post.quickAnswer}
                </p>
              </div>
            )}

            {/* Structured Content Blocks OR Fallback Content */}
            <div className="space-y-8 text-[#113F48] text-sm leading-relaxed">
              {post.contentBlocks && post.contentBlocks.length > 0 ? (
                <BlogContentRenderer blocks={post.contentBlocks} />
              ) : (
                <RichText content={post.content} />
              )}
            </div>

            {/* FAQs Block */}
            {post.faqs && post.faqs.length > 0 && (
              <FAQSection faqs={post.faqs} />
            )}

            {/* References Block */}
            {post.references && post.references.length > 0 ? (
              <ReferencesSection references={post.references} />
            ) : (
              <div className="border-t border-stone-100 pt-6 space-y-3">
                <h4 className="font-bold text-[#113F48] text-sm">References &amp; Resource Guides</h4>
                <ol className="list-decimal pl-5 text-[11px] text-stone-500 space-y-1 font-medium">
                  <li>National Institutes of Health (NIH). <a href="https://www.nih.gov" target="_blank" rel="noopener noreferrer" className="text-[#C9A15A] hover:underline">Official Health Indices</a>.</li>
                  <li>Centers for Disease Control and Prevention (CDC). <a href="https://www.cdc.gov" target="_blank" rel="noopener noreferrer" className="text-[#C9A15A] hover:underline">Public Health and Prevention Guidelines</a>.</li>
                  <li>World Health Organization (WHO). <a href="https://www.who.int" target="_blank" rel="noopener noreferrer" className="text-[#C9A15A] hover:underline">Global Clinical Guidelines and Fact Sheets</a>.</li>
                </ol>
              </div>
            )}

            {/* Social Share Box */}
            <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-4">
              <span className="text-xs font-bold text-[#113F48]">Share this educational guide:</span>
              <div className="flex gap-2">
                <ArticleShareButton />
              </div>
            </div>

            {/* Previous / Next Article Navigation */}
            <nav aria-label="Related guides navigation" className="border-t border-stone-150 pt-6 flex flex-col sm:flex-row justify-between gap-4">
              {prevPost ? (
                <Link 
                  href={`/blog/${prevPost.slug}`} 
                  className="flex items-start gap-2 text-xs font-semibold text-[#113F48] hover:text-[#C9A15A] transition-colors max-w-xs group"
                >
                  <ArrowLeft className="h-4 w-4 mt-0.5 flex-shrink-0 text-[#C9A15A] group-hover:-translate-x-0.5 transition-transform" />
                  <div>
                    <span className="text-[10px] text-stone-400 block uppercase font-bold">Previous Guide</span>
                    <span className="line-clamp-1">{prevPost.title}</span>
                  </div>
                </Link>
              ) : <div />}
              {nextPost && (
                <Link 
                  href={`/blog/${nextPost.slug}`} 
                  className="flex items-start gap-2 text-xs font-semibold text-[#113F48] hover:text-[#C9A15A] transition-colors max-w-xs sm:text-right group ml-auto"
                >
                  <div>
                    <span className="text-[10px] text-stone-400 block uppercase font-bold">Next Guide</span>
                    <span className="line-clamp-1">{nextPost.title}</span>
                  </div>
                  <ArrowRight className="h-4 w-4 mt-0.5 flex-shrink-0 text-[#C9A15A] group-hover:translate-x-0.5 transition-transform" />
                </Link>
              )}
            </nav>

            {/* ── RELATED HEALTHCARE GUIDES SECTION ── */}
            {relatedPosts.length > 0 && (
              <section aria-labelledby="related-guides-heading" className="border-t border-stone-200 pt-8 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-[#C9A15A] uppercase tracking-wider">Educational Resources</span>
                    <h3 id="related-guides-heading" className="text-xl font-extrabold text-[#113F48]">
                      Related Healthcare Guides
                    </h3>
                  </div>
                  <Link 
                    href={`/category/${categorySlug}`}
                    className="text-xs font-bold text-[#C9A15A] hover:text-[#113F48] hover:underline transition-colors hidden sm:block"
                  >
                    View all in {post.category} &rarr;
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {relatedPosts.map((r) => (
                    <article key={r.slug} className="bg-[#FDFBF7] border border-stone-200 rounded-2xl overflow-hidden hover:shadow-md hover:border-[#C9A15A]/60 transition-all flex flex-col justify-between">
                      <div className="space-y-3">
                        {r.featuredImage && (
                          <div className="h-32 w-full overflow-hidden bg-stone-100">
                            <img 
                              src={r.featuredImage} 
                              alt={r.title} 
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>
                        )}
                        <div className="p-4 pt-1 space-y-2">
                          <span className="text-[9px] font-bold text-[#C9A15A] uppercase tracking-wider block">
                            {r.category}
                          </span>
                          <h4 className="font-bold text-xs text-[#113F48] line-clamp-2 leading-snug hover:text-[#C9A15A] transition-colors">
                            <Link href={`/blog/${r.slug}`}>{r.title}</Link>
                          </h4>
                        </div>
                      </div>
                      <div className="p-4 pt-0">
                        <Link 
                          href={`/blog/${r.slug}`}
                          className="text-[11px] font-bold text-[#113F48] hover:text-[#C9A15A] flex items-center gap-1 transition-colors"
                        >
                          Read Guide <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {/* Comments Form & List */}
            <PostCommentsSection 
              postSlug={post.slug} 
              postTitle={post.title} 
              initialComments={initialComments} 
            />

          </article>

          {/* Sidebar (4 Cols) */}
          <aside className="lg:col-span-4 space-y-8">
            
            {/* Table of Contents */}
            <div className="bg-white border border-stone-200 rounded-2xl p-6 space-y-4 shadow-sm">
              <h4 className="font-bold text-[#113F48] text-xs uppercase tracking-wider border-b border-stone-100 pb-2 flex items-center gap-1.5">
                <BookOpen className="h-4 w-4 text-[#C9A15A]" /> Table of Contents
              </h4>
              <ul className="text-xs space-y-2.5 font-medium text-stone-600">
                {headings.map((h, i) => (
                  <li key={h.id || i}>
                    <a href={`#${h.id}`} className="hover:text-[#C9A15A] transition-colors">{h.text}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Author profile box */}
            <div className="bg-white border border-stone-200 rounded-2xl p-6 space-y-4 shadow-sm text-center">
              <div className="w-16 h-16 rounded-full bg-[#113F48] text-white font-extrabold text-lg flex items-center justify-center mx-auto border border-[#C9A15A]/30 shadow-sm">
                M
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#113F48] block">Mediguide4u Editorial Staff</span>
                <span className="text-[10px] text-stone-400 block">Health &amp; Wellness Editorial Team</span>
              </div>
              <p className="text-[11px] text-stone-500 leading-relaxed">
                Our editorial team produces educational health guides fact-checked against published medical literature and official public health guidelines.
              </p>
              <div className="pt-2 border-t border-stone-100">
                <Link href="/about" className="text-[11px] font-bold text-[#C9A15A] hover:underline">
                  About Our Editorial Standards &rarr;
                </Link>
              </div>
            </div>

            {/* Category Hub Quick Link */}
            <div className="bg-white border border-stone-200 rounded-2xl p-6 space-y-3 shadow-sm">
              <span className="text-[10px] font-bold text-[#C9A15A] uppercase tracking-wider block">Category Hub</span>
              <h4 className="font-bold text-sm text-[#113F48]">More on {post.category}</h4>
              <p className="text-[11px] text-stone-500 leading-relaxed">
                Explore our full catalog of health guides, preventive tips, and wellness strategies in this topic area.
              </p>
              <Link 
                href={`/category/${categorySlug}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#113F48] hover:text-[#C9A15A] transition-colors"
              >
                Browse {post.category} Category <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Related articles sidebar list */}
            {relatedPosts.length > 0 && (
              <div className="bg-white border border-stone-200 rounded-2xl p-6 space-y-4 shadow-sm">
                <h4 className="font-bold text-[#113F48] text-xs uppercase tracking-wider border-b border-stone-100 pb-2">Related Medical Guides</h4>
                <div className="space-y-3">
                  {relatedPosts.map((r) => (
                    <Link key={r.slug} href={`/blog/${r.slug}`} className="block group">
                      <span className="font-bold text-xs text-[#113F48] group-hover:text-[#C9A15A] transition-colors leading-snug block">{r.title}</span>
                      <span className="text-[9px] text-stone-400 block mt-0.5">{r.category}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Sidebar Medical Disclaimer */}
            <div className="bg-[#FDF6EC]/40 border border-[#C9A15A]/20 rounded-2xl p-6 space-y-2">
              <span className="text-[10px] font-bold text-[#113F48] uppercase tracking-wider block">Medical Disclaimer</span>
              <p className="text-[10px] text-stone-500 leading-relaxed">
                All contents published on mediguide4u are created for educational purposes only. Always consult a physician or qualified healthcare provider with any medical questions.
              </p>
              <Link href="/medical-disclaimer" className="text-[10px] font-bold text-[#C9A15A] hover:underline block pt-1">
                Read Full Disclaimer &rarr;
              </Link>
            </div>

          </aside>

        </div>

      </main>

      <Footer />
    </div>
  );
}
