import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/config";
import { getBaseUrl } from "@/lib/siteUrl";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const canonical = `${getBaseUrl()}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical,
    },
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.description,
      url: canonical,
      type: "article",
      siteName: siteConfig.siteName,
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: "/og-default.svg",
          width: 1200,
          height: 630,
          alt: `${post.title} preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: ["/og-default.svg"],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getAllPosts();
  const relatedPosts = getRelatedPosts(post, allPosts);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.siteName,
      url: getBaseUrl(),
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${getBaseUrl()}/blog/${post.slug}`,
    },
    keywords: post.tags.join(", "),
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <article>
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-accent">Blog Post</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-brand-primary">{post.title}</h1>
        <p className="mt-3 text-base leading-7 text-brand-secondary">{post.description}</p>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-brand-secondary">
          <span>
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span>-</span>
          <span>{post.readingTimeMinutes} min read</span>
          <span>-</span>
          <span>By {post.author}</span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-brand-bg px-2.5 py-1 text-xs text-brand-secondary">
              {tag}
            </span>
          ))}
        </div>

        <div
          className="prose-content mt-8 rounded-xl border border-brand-muted bg-white p-6 sm:p-8"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>

      {relatedPosts.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold tracking-tight text-brand-primary">Related posts</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {relatedPosts.map((related) => (
              <article key={related.slug} className="rounded-xl border border-brand-muted bg-white p-5">
                <h3 className="text-lg font-semibold">
                  <Link href={`/blog/${related.slug}`} className="hover:text-brand-secondary">
                    {related.title}
                  </Link>
                </h3>
                <p className="mt-2 text-sm text-brand-secondary">{related.description}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
    </div>
  );
}

