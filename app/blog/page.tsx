import { getAllPosts, getAllTags } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";
import { BlogFilter } from "./blog-filter";

export const metadata = buildMetadata({
  title: "Blog",
  description:
    "Actionable guides for finding better travel deals anywhere, including booking windows, pricing traps, and itinerary strategy.",
  path: "/blog",
  keywords: ["travel deals blog", "book cheaper flights", "hotel fee guide"],
});

export default async function BlogIndexPage() {
  const [posts, tags] = await Promise.all([getAllPosts(), getAllTags()]);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight text-brand-primary">Travel Deals Blog</h1>
      <p className="mt-4 max-w-3xl text-base leading-7 text-brand-secondary">
        Browse practical, data-aware travel deal tactics. Filter posts by tag to focus on flights, hotels, itinerary planning, and pricing behavior.
      </p>
      <BlogFilter initialPosts={posts} allTags={tags} />
    </div>
  );
}
