import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Services",
  description: "Choose a travel deal planning tier from quick checks to full premium multi-city concierge support.",
  path: "/services",
  keywords: ["travel deal service", "custom itinerary deals", "multi-city travel planning"],
});

const tiers = [
  {
    id: "deal-check",
    name: "Deal Check",
    subtitle: "Flight + hotel shortlist",
    price: "$149 placeholder",
    bullets: [
      "Best-value flight options with timing notes",
      "Hotel shortlist with fee and location checks",
      "Booking window recommendations",
    ],
  },
  {
    id: "full-itinerary",
    name: "Full Itinerary + Deals",
    subtitle: "Complete trip structure",
    price: "$399 placeholder",
    bullets: [
      "Day-by-day skeleton itinerary",
      "Transit, stay, and booking sequence plan",
      "Price-risk fallback options",
    ],
  },
  {
    id: "premium-multi-city",
    name: "Premium: Multi-city + concierge",
    subtitle: "Complex trip optimization",
    price: "$899 placeholder",
    bullets: [
      "Open-jaw and multi-city fare logic",
      "Region-by-region accommodation strategy",
      "Priority concierge support",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight text-brand-primary">Services</h1>
      <p className="mt-4 max-w-3xl text-base leading-7 text-brand-secondary">
        Choose the support level based on trip complexity. Every tier is built to maximize practical savings while keeping logistics realistic.
      </p>
      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {tiers.map((tier) => (
          <article key={tier.id} className="rounded-xl border border-brand-muted bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-accent">{tier.subtitle}</p>
            <h2 className="mt-2 text-2xl font-bold">{tier.name}</h2>
            <p className="mt-2 text-lg font-semibold text-brand-primary">{tier.price}</p>
            <ul className="mt-4 space-y-2 text-sm text-brand-secondary">
              {tier.bullets.map((bullet) => (
                <li key={bullet}>- {bullet}</li>
              ))}
            </ul>
            <Link
              href={`/contact?tier=${tier.id}`}
              className="mt-6 inline-flex rounded-md bg-brand-primary px-4 py-2 text-sm font-semibold text-white hover:bg-brand-secondary"
            >
              Request this
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
