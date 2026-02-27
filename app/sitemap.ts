import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/siteUrl";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "edge";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  const blogSlugs = [
    "airport-vs-city-center-hotels-which-is-better",
    "avoiding-dynamic-pricing-traps",
    "best-day-time-to-book-flights-what-matters",
    "booking-multi-city-trips-cheaper-open-jaw-logic",
    "build-a-deal-first-itinerary",
    "hidden-hotel-fees-and-how-to-avoid-them",
    "how-to-use-price-alerts-properly",
    "points-basics-without-credit-card-hype",
    "travel-deals-checklist",
    "when-to-book-flights-myths-vs-data",
  ];

  const postEntries: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...staticPages, ...postEntries];
}
