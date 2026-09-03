import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { EDITORIAL_PROFILES } from "@/lib/mockData";
import { getAuthorBySlug, getPostsByAuthor } from "@/lib/db";
import { 
  User, 
  BookOpen, 
  ArrowRight, 
  Clock, 
  Calendar, 
  ShieldCheck, 
  ChevronRight,
  Award,
  Stethoscope
} from "lucide-react";

export const revalidate = 60;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return EDITORIAL_PROFILES.map((p) => ({
    slug: p.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);

  if (!author) {
    return {
      title: "Author Not Found | mediguide4u",
      description: "The requested author profile could not be found.",
    };
  }

  const title = `${author.name} (${author.credentials || "Contributor"}) - Articles & Bio | mediguide4u`;
  const description = author.bio || `Read evidence-based health guides and medical resources written and reviewed by ${author.name}.`;
  const canonicalUrl = `https://mediguide4u.com/author/${author.id}`;

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
      type: "profile",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function AuthorProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);

  if (!author) {
    notFound();
  }

  const posts = await getPostsByAuthor(author.name || author.id);

  const authorSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": author.name,
    "jobTitle": author.title,
    "description": author.bio,
    "url": `https://mediguide4u.com/author/${author.id}`,
    "worksFor": {
      "@type": "Organization",
      "name": "mediguide4u",
      "url": "https://mediguide4u.com"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://mediguide4u.com",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Editorial & Medical Board",
        "item": "https://mediguide4u.com/authors",
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": author.name,
        "item": `https://mediguide4u.com/author/${author.id}`,
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(authorSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="flex-grow py-10">
        <div className="w-full mx-auto px-4 sm:px-8 md:px-12 lg:px-16 max-w-none space-y-10">
          
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-xs text-stone-500 flex items-center gap-2 font-medium">
            <Link href="/" className="hover:text-[#C9A15A] transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3 text-stone-400" />
            <Link href="/authors" className="hover:text-[#C9A15A] transition-colors">Editorial &amp; Medical Board</Link>
            <ChevronRight className="h-3 w-3 text-stone-400" />
            <span className="text-[#113F48] font-bold">{author.name}</span>
          </nav>

          {/* Profile Card */}
          <header className="bg-white border border-stone-200 rounded-3xl p-8 sm:p-12 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="w-20 h-20 rounded-3xl bg-[#113F48] text-white flex items-center justify-center font-black text-3xl border-2 border-[#C9A15A]">
                {author.name[0]}
              </div>
              <div className="space-y-1.5 flex-grow">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C9A15A] bg-[#C9A15A]/10 px-2.5 py-1 rounded">
                  {author.credentials || "Medical Contributor"}
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#113F48]">{author.name}</h1>
                <p className="text-stone-500 text-xs font-semibold">{author.title}</p>
              </div>
            </div>

            <p className="text-stone-600 text-sm leading-relaxed max-w-3xl pt-2 border-t border-stone-100">
              {author.bio}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-xs text-stone-500 pt-2">
              <span className="flex items-center gap-1.5 font-bold text-[#113F48]">
                <BookOpen className="h-4 w-4 text-[#C9A15A]" /> {posts.length} Guides Published
              </span>
              <span className="flex items-center gap-1.5 font-semibold text-emerald-800">
                <ShieldCheck className="h-4 w-4 text-emerald-600" /> Evidence-Based Research &amp; Fact-Checking
              </span>
            </div>
          </header>

          {/* Published Articles Grid */}
          <section className="space-y-6">
            <div className="flex justify-between items-center border-b border-stone-200 pb-3">
              <h2 className="text-xl font-bold text-[#113F48]">Articles by {author.name}</h2>
              <span className="text-xs text-stone-500">{posts.length} Guides</span>
            </div>

            {posts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <article
                    key={post.slug}
                    className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full"
                  >
                    <div className="relative h-44 w-full bg-stone-50 overflow-hidden">
                      {post.featuredImage && (
                        <img
                          src={post.featuredImage}
                          alt={post.imageAlt || post.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      )}
                      <span className="absolute top-3 left-3 bg-[#113F48] text-white text-[9px] font-bold px-2 py-0.5 rounded">
                        {post.category}
                      </span>
                    </div>

                    <div className="p-5 flex-grow space-y-2.5">
                      <div className="flex items-center justify-between text-[10px] text-stone-400">
                        <span>{post.publishedAt}</span>
                        <span>{post.readTime || "5 min read"}</span>
                      </div>

                      <h3 className="font-extrabold text-[#113F48] text-sm hover:text-[#C9A15A] transition-colors leading-snug line-clamp-2">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h3>

                      <p className="text-stone-500 text-xs line-clamp-3 leading-relaxed">
                        {post.summary}
                      </p>
                    </div>

                    <div className="p-5 pt-3 border-t border-stone-100 flex justify-between items-center">
                      <span className="text-stone-400 text-[11px]">{post.category}</span>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="bg-[#113F48] text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#C9A15A] transition-colors shadow-sm inline-flex items-center gap-1"
                      >
                        Read Guide <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl border border-stone-200 p-6 space-y-2">
                <BookOpen className="h-10 w-10 text-stone-300 mx-auto" />
                <p className="text-sm font-semibold text-[#113F48]">Upcoming Publications</p>
                <p className="text-xs text-stone-500">More articles by this author are currently under medical review.</p>
              </div>
            )}
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
