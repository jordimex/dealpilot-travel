import { FlightSearch } from "@/app/flights/flight-search";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Flights",
  description: "Search cheap flights worldwide through DealPilot Travel and continue into affiliate booking results.",
  path: "/flights",
  keywords: ["cheap flights worldwide", "flight search", "affiliate airfare search"],
});

export default function FlightsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-accent">Flights</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-brand-primary sm:text-5xl">Search cheap flights worldwide</h1>
        <p className="mt-4 text-base leading-7 text-brand-secondary">
          Compare routes, capture affiliate-ready clicks, and keep space open for Travelpayouts widgets or API-driven deal modules.
        </p>
      </div>

      <div className="mt-10">
        <FlightSearch
          affiliateMarker={process.env.NEXT_PUBLIC_TRAVELPAYOUTS_MARKER}
          widgetSrc={process.env.NEXT_PUBLIC_TRAVELPAYOUTS_WIDGET_SRC}
        />
      </div>
    </div>
  );
}
