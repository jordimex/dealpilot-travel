import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { buildMetadata } from "@/lib/seo";
import { getBaseUrl } from "@/lib/siteUrl";

export const metadata = buildMetadata({
  title: "Home",
  description:
    "Find smarter global travel deals with practical tactics, examples, and custom plans tailored to your destination and budget.",
  path: "/",
  keywords: ["travel deals anywhere", "cheap flights and hotels", "deal-first travel planning"],
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
          target: `${baseUrl}/blog?tag={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <div>
      <section className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-accent">Global Travel Deals</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-brand-primary sm:text-5xl">
            {siteConfig.siteName}
          </h1>
          <p className="mt-4 text-lg text-brand-secondary">{siteConfig.siteTagline}</p>
          <p className="mt-4 max-w-xl text-base leading-7 text-brand-secondary">
            We help travelers book smarter by prioritizing value, flexibility, and practical booking tactics that actually work.
            Learn the framework, then request a custom deal plan.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="rounded-md bg-brand-primary px-5 py-3 text-sm font-semibold text-white hover:bg-brand-secondary">
              Get a custom deal plan
            </Link>
            <Link href="/blog/travel-deals-checklist" className="rounded-md border border-brand-muted bg-white px-5 py-3 text-sm font-semibold text-brand-primary hover:bg-brand-bg">
              Free deal checklist
            </Link>
          </div>
        </div>
        <div className="overflow-hidden rounded-xl border border-brand-muted bg-white shadow-sm">
          <Image
            src="/dealpilot-hero.svg"
            alt="Illustration of global routes and deal planning dashboard"
            width={900}
            height={600}
            priority
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-14 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-brand-primary">What You Get</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <article className="rounded-xl border border-brand-muted bg-white p-5">
            <h3 className="text-lg font-semibold">Deal-first planning</h3>
            <p className="mt-2 text-sm text-brand-secondary">Pick routes and dates based on best-value windows, not guesswork.</p>
          </article>
          <article className="rounded-xl border border-brand-muted bg-white p-5">
            <h3 className="text-lg font-semibold">Practical examples</h3>
            <p className="mt-2 text-sm text-brand-secondary">Use tested booking playbooks with real constraints and tradeoffs.</p>
          </article>
          <article className="rounded-xl border border-brand-muted bg-white p-5">
            <h3 className="text-lg font-semibold">Global scope</h3>
            <p className="mt-2 text-sm text-brand-secondary">From one-stop city breaks to complex multi-city itineraries worldwide.</p>
          </article>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-brand-muted bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold tracking-tight text-brand-primary">Latest Travel Guides</h2>
          <ul className="mt-4 space-y-3">
            <li>
              <Link href="/blog/travel-deals-checklist" className="text-sm font-semibold text-brand-primary hover:text-brand-secondary">
                The Complete Travel Deals Checklist
              </Link>
            </li>
            <li>
              <Link
                href="/blog/airport-vs-city-center-hotels-which-is-better"
                className="text-sm font-semibold text-brand-primary hover:text-brand-secondary"
              >
                Airport vs City-Center Hotels: When Each Is the Better Deal
              </Link>
            </li>
            <li>
              <Link href="/blog/avoiding-dynamic-pricing-traps" className="text-sm font-semibold text-brand-primary hover:text-brand-secondary">
                Avoiding Dynamic Pricing Traps
              </Link>
            </li>
            <li>
              <Link href="/blog/best-day-time-to-book-flights-what-matters" className="text-sm font-semibold text-brand-primary hover:text-brand-secondary">
                Best Day and Time to Book Flights: What Matters and What Does Not
              </Link>
            </li>
            <li>
              <Link
                href="/blog/booking-multi-city-trips-cheaper-open-jaw-logic"
                className="text-sm font-semibold text-brand-primary hover:text-brand-secondary"
              >
                Booking Multi-City Trips Cheaper: Open-Jaw Logic Explained
              </Link>
            </li>
            <li>
              <Link href="/blog/build-a-deal-first-itinerary" className="text-sm font-semibold text-brand-primary hover:text-brand-secondary">
                How to Build a Deal-First Itinerary
              </Link>
            </li>
            <li>
              <Link href="/blog/hidden-hotel-fees-and-how-to-avoid-them" className="text-sm font-semibold text-brand-primary hover:text-brand-secondary">
                Hidden Hotel Fees and How to Avoid Them
              </Link>
            </li>
            <li>
              <Link href="/blog/how-to-use-price-alerts-properly" className="text-sm font-semibold text-brand-primary hover:text-brand-secondary">
                How to Use Price Alerts Properly
              </Link>
            </li>
            <li>
              <Link href="/blog/points-basics-without-credit-card-hype" className="text-sm font-semibold text-brand-primary hover:text-brand-secondary">
                Points Basics Without Credit Card Hype
              </Link>
            </li>
            <li>
              <Link href="/blog/when-to-book-flights-myths-vs-data" className="text-sm font-semibold text-brand-primary hover:text-brand-secondary">
                When to Book Flights: Myths vs Data-Driven Rules
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
