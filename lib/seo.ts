import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";
import { getBaseUrl } from "@/lib/siteUrl";

type SeoInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article";
  image?: string;
};

export function buildMetadata({
  title,
  description,
  path,
  keywords = [],
  type = "website",
  image = "/og-default.svg",
}: SeoInput): Metadata {
  const canonical = `${getBaseUrl()}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    keywords,
    openGraph: {
      title,
      description,
      type,
      url: canonical,
      siteName: siteConfig.siteName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${siteConfig.siteName} preview image`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}


