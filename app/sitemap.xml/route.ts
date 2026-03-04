import fs from "node:fs/promises";
import path from "node:path";

const BASE_URL = "https://dealpilot-travel-git-main-jordimexs-projects.vercel.app";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const STATIC_PATHS = ["/", "/services", "/blog", "/about", "/contact"];

async function getBlogPaths(): Promise<string[]> {
  const blogDir = path.join(process.cwd(), "content", "blog");
  const files = await fs.readdir(blogDir);
  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""))
    .sort((a, b) => a.localeCompare(b))
    .map((slug) => `/blog/${slug}`);
}

export async function GET() {
  const blogPaths = await getBlogPaths();
  const allPaths = [...STATIC_PATHS, ...blogPaths];
  const absoluteUrls = allPaths.map((urlPath) => (urlPath === "/" ? `${BASE_URL}/` : `${BASE_URL}${urlPath}`));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<!-- ROUTE_HANDLER_SITEMAP_v2_2026-03-04 -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${absoluteUrls.map((url) => `  <url><loc>${url}</loc></url>`).join("\n")}
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
}
