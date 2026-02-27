import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/siteUrl";

export const revalidate = 3600;

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
