"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type BlogCard = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  author: string;
  readingTimeMinutes: number;
};

type BlogFilterProps = {
  initialPosts: BlogCard[];
  allTags: string[];
};

export function BlogFilter({ initialPosts, allTags }: BlogFilterProps) {
  const [activeTag, setActiveTag] = useState<string>("all");

  const filteredPosts = useMemo(() => {
    if (activeTag === "all") {
      return initialPosts;
    }
    return initialPosts.filter((post) => post.tags.includes(activeTag));
  }, [activeTag, initialPosts]);

  return (
    <div className="mt-8">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveTag("all")}
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            activeTag === "all" ? "bg-brand-primary text-white" : "bg-brand-bg text-brand-secondary"
          }`}
        >
          All tags
        </button>
        {allTags.map((tag) => (
          <button
            type="button"
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              activeTag === tag ? "bg-brand-primary text-white" : "bg-brand-bg text-brand-primary"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-5">
        {filteredPosts.map((post) => (
          <article key={post.slug} className="rounded-xl border border-brand-muted bg-white p-6">
            <p className="text-xs text-brand-secondary">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              - {post.readingTimeMinutes} min read
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-brand-primary">
              <Link href={`/blog/${post.slug}`} className="hover:text-brand-secondary">
                {post.title}
              </Link>
            </h2>
            <p className="mt-3 text-sm leading-6 text-brand-secondary">{post.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={`${post.slug}-${tag}`} className="rounded-full bg-brand-bg px-2.5 py-1 text-xs text-brand-secondary">
                  {tag}
                </span>
              ))}
            </div>
            <p className="mt-4 text-xs font-medium uppercase tracking-wide text-brand-secondary">By {post.author}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
