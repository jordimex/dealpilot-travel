import { FlightSearch } from "@/app/flights/flight-search";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Flights",
  description: "Search flights through DealPilot Travel and continue to Travelpayouts affiliate booking results.",
  path: "/flights",
  keywords: ["flight search", "travelpayouts flights", "affiliate airfare search"],
});

export default function FlightsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-accent">Flights</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-brand-primary sm:text-5xl">Find fares without leaving the DealPilot flow</h1>
        <p className="mt-4 text-base leading-7 text-brand-secondary">
          Start with a simple search, then continue to the Travelpayouts-powered affiliate results page to compare booking options.
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
