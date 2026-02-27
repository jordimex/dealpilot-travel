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
            activeTag === "all" ? "bg-slate-900 text-white" : "bg-slate-200 text-slate-700"
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
              activeTag === tag ? "bg-sky-700 text-white" : "bg-sky-100 text-sky-700"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-5">
        {filteredPosts.map((post) => (
          <article key={post.slug} className="rounded-xl border border-slate-200 bg-white p-6">
            <p className="text-xs text-slate-500">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              - {post.readingTimeMinutes} min read
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
              <Link href={`/blog/${post.slug}`} className="hover:text-sky-700">
                {post.title}
              </Link>
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{post.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={`${post.slug}-${tag}`} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">
                  {tag}
                </span>
              ))}
            </div>
            <p className="mt-4 text-xs font-medium uppercase tracking-wide text-slate-500">By {post.author}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
