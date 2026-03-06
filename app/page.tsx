import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { buildMetadata } from "@/lib/seo";
import { getBaseUrl } from "@/lib/siteUrl";

const cheapestDestinations = [
  { city: "Lisbon", blurb: "Atlantic gateway fares that often undercut other Western Europe arrivals." },
  { city: "Bangkok", blurb: "Long-haul value anchor for Southeast Asia itineraries and flexible stopovers." },
  { city: "Bogota", blurb: "South America entry point with frequent pricing swings worth monitoring." },
];

const trendingDeals = [
  { route: "New York to Madrid", note: "Strong shoulder-season pricing with nonstop competition." },
  { route: "Los Angeles to Tokyo", note: "Premium demand is softening around midweek departures." },
  { route: "Chicago to Mexico City", note: "Short-haul international fares remain attractive for quick getaways." },
];

const latestGuides = [
  ["/blog/travel-deals-checklist", "The Complete Travel Deals Checklist"],
  ["/blog/best-day-time-to-book-flights-what-matters", "Best Day and Time to Book Flights: What Matters and What Does Not"],
  ["/blog/when-to-book-flights-myths-vs-data", "When to Book Flights: Myths vs Data-Driven Rules"],
  ["/blog/how-to-use-price-alerts-properly", "How to Use Price Alerts Properly"],
  ["/blog/avoiding-dynamic-pricing-traps", "Avoiding Dynamic Pricing Traps"],
  ["/blog/booking-multi-city-trips-cheaper-open-jaw-logic", "Booking Multi-City Trips Cheaper: Open-Jaw Logic Explained"],
] as const;

export const metadata = buildMetadata({
  title: "Home",
  description: "Find cheap flights worldwide, track trending airfare deals, and browse SEO-friendly travel guides from DealPilot Travel.",
  path: "/",
  keywords: ["cheap flights worldwide", "flight deals", "airfare guides", "cheap destinations"],
});

export default function HomePage() {
  const baseUrl = getBaseUrl();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: siteConfig.siteName,
        url: baseUrl,
        slogan: siteConfig.siteTagline,
        sameAs: Object.values(siteConfig.socialLinks),
      },
      {
        "@type": "WebSite",
        name: siteConfig.siteName,
        url: baseUrl,
        potentialAction: {
          "@type": "SearchAction",
          target: `${baseUrl}/flights?origin={origin}&destination={destination}`,
          "query-input": ["required name=origin", "required name=destination"],
        },
      },
    ],
  };

  return (
    <div>
      <section className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-accent">Cheap Flights Worldwide</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-brand-primary sm:text-5xl">Find low fares before they disappear</h1>
          <p className="mt-4 text-lg text-brand-secondary">Search routes, scan destination trends, and move into affiliate booking flows fast.</p>
          <p className="mt-4 max-w-xl text-base leading-7 text-brand-secondary">
            DealPilot Travel is pivoting from planning services to airfare discovery. Start with flight search, review trending route ideas,
            and use our guides to book with better timing.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/flights" className="rounded-md bg-brand-primary px-5 py-3 text-sm font-semibold text-white hover:bg-brand-secondary">
              Search Flights
            </Link>
            <Link href="/blog/travel-deals-checklist" className="rounded-md border border-brand-muted bg-white px-5 py-3 text-sm font-semibold text-brand-primary hover:bg-brand-bg">
              Read Flight Guides
            </Link>
          </div>
        </div>
        <div className="overflow-hidden rounded-xl border border-brand-muted bg-white shadow-sm">
          <Image
            src="/dealpilot-hero.svg"
            alt="Illustration of global routes and airfare search dashboard"
            width={900}
            height={600}
            priority
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="rounded-[1.5rem] border border-brand-muted bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-accent">Affiliate Search Slot</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-brand-primary">Homepage flight-search module placeholder</h2>
            </div>
            <Link href="/flights" className="rounded-md bg-brand-primary px-4 py-2 text-sm font-semibold text-white hover:bg-brand-secondary">
              Open Full Search
            </Link>
          </div>
          <div className="mt-6 rounded-2xl border border-dashed border-brand-muted bg-brand-bg p-6 text-sm leading-7 text-brand-secondary">
            Drop a Travelpayouts search widget, fare calendar, or API-driven cheapest-date module here later. The
            <Link href="/flights" className="ml-1 font-semibold text-brand-primary hover:text-brand-secondary">
              `/flights`
            </Link>
            page is ready for the main affiliate flow.
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-3">
          <div className="rounded-xl border border-brand-muted bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold tracking-tight text-brand-primary">Cheapest Destinations</h2>
            <div className="mt-5 space-y-4">
              {cheapestDestinations.map((item) => (
                <article key={item.city} className="rounded-xl border border-brand-muted bg-brand-bg p-4">
                  <h3 className="text-lg font-semibold text-brand-primary">{item.city}</h3>
                  <p className="mt-2 text-sm leading-6 text-brand-secondary">{item.blurb}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-brand-muted bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold tracking-tight text-brand-primary">Trending Flight Deals</h2>
            <div className="mt-5 space-y-4">
              {trendingDeals.map((item) => (
                <article key={item.route} className="rounded-xl border border-brand-muted bg-brand-bg p-4">
                  <h3 className="text-lg font-semibold text-brand-primary">{item.route}</h3>
                  <p className="mt-2 text-sm leading-6 text-brand-secondary">{item.note}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-brand-muted bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold tracking-tight text-brand-primary">Latest Travel Guides</h2>
            <ul className="mt-4 space-y-3">
              {latestGuides.map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-sm font-semibold text-brand-primary hover:text-brand-secondary">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
