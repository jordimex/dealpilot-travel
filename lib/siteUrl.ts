function stripTrailingSlash(url: string): string {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

export function getBaseUrl(): string {
  const publicSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (publicSiteUrl) {
    return stripTrailingSlash(publicSiteUrl);
  }

  const vercelUrl = process.env.VERCEL_URL?.trim();
  if (vercelUrl) {
    const hostname = vercelUrl.replace(/^https?:\/\//, "");
    return `https://${stripTrailingSlash(hostname)}`;
  }

  return "http://localhost:3000";
}
