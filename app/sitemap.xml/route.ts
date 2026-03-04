const BASE_URL = "https://dealpilot-travel-git-main-jordimexs-projects.vercel.app";
export const dynamic = "force-dynamic";
export const revalidate = 0;

const URLS = [
  "/",
  "/services",
  "/blog",
  "/about",
  "/contact",
  "/blog/airport-vs-city-center-hotels-which-is-better",
  "/blog/avoiding-dynamic-pricing-traps",
  "/blog/best-day-time-to-book-flights-what-matters",
  "/blog/booking-multi-city-trips-cheaper-open-jaw-logic",
  "/blog/build-a-deal-first-itinerary",
  "/blog/hidden-hotel-fees-and-how-to-avoid-them",
  "/blog/how-to-use-price-alerts-properly",
  "/blog/points-basics-without-credit-card-hype",
  "/blog/travel-deals-checklist",
  "/blog/when-to-book-flights-myths-vs-data",
];

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${URLS.map((path) => `  <url><loc>${BASE_URL}${path}</loc></url>`).join("\n")}
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
