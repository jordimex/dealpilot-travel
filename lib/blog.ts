import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export type BlogPostFrontmatter = {
  title: string;
  description: string;
  date: string;
  tags: string[];
  author: string;
};

export type BlogPost = BlogPostFrontmatter & {
  slug: string;
  content: string;
  readingTimeMinutes: number;
};

const blogDir = path.join(process.cwd(), "content", "blog");

async function getBlogFilenames(): Promise<string[]> {
  const entries = await fs.readdir(blogDir);
  return entries.filter((file) => file.endsWith(".md"));
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function estimateReadingTime(content: string): number {
  const words = countWords(content);
  return Math.max(4, Math.ceil(words / 220));
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const files = await getBlogFilenames();

  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.md$/, "");
      const fullPath = path.join(blogDir, file);
      const raw = await fs.readFile(fullPath, "utf8");
      const { data, content } = matter(raw);

      const fm = data as BlogPostFrontmatter;

      return {
        slug,
        title: fm.title,
        description: fm.description,
        date: fm.date,
        tags: Array.isArray(fm.tags) ? fm.tags : [],
        author: fm.author,
        content,
        readingTimeMinutes: estimateReadingTime(content),
      } satisfies BlogPost;
    }),
  );

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export async function getPostBySlug(slug: string): Promise<(BlogPost & { contentHtml: string }) | null> {
  const fullPath = path.join(blogDir, `${slug}.md`);

  try {
    const raw = await fs.readFile(fullPath, "utf8");
    const { data, content } = matter(raw);
    const processed = await remark().use(html).process(content);

    const fm = data as BlogPostFrontmatter;

    return {
      slug,
      title: fm.title,
      description: fm.description,
      date: fm.date,
      tags: Array.isArray(fm.tags) ? fm.tags : [],
      author: fm.author,
      content,
      contentHtml: processed.toString(),
      readingTimeMinutes: estimateReadingTime(content),
    };
  } catch {
    return null;
  }
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  return [...new Set(posts.flatMap((post) => post.tags))].sort((a, b) => a.localeCompare(b));
}

export function getRelatedPosts(currentPost: BlogPost, allPosts: BlogPost[]): BlogPost[] {
  return allPosts
    .filter((post) => post.slug !== currentPost.slug)
    .map((post) => {
      const sharedTags = post.tags.filter((tag) => currentPost.tags.includes(tag));
      return { post, score: sharedTags.length };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((item) => item.post);
}
