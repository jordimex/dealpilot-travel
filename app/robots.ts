import type { MetadataRoute } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://dealpilot-travel-git-main-jordimexs-projects.vercel.app/sitemap.xml",
  };
}
