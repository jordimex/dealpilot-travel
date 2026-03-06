import { siteConfig } from "@/lib/config";

function stripTrailingSlash(url: string): string {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

export function getBaseUrl(): string {
  const publicSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (publicSiteUrl) {
    return stripTrailingSlash(publicSiteUrl);
  }

  return stripTrailingSlash(siteConfig.siteUrl);
}
