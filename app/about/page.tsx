import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About",
  description: "About DealPilot Travel and the practical, deal-first framework we use for global trip planning.",
  path: "/about",
  keywords: ["about dealpilot travel", "travel deal strategy", "deal-first travel"],
});

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight text-brand-primary">About DealPilot Travel</h1>
      <p className="mt-5 text-base leading-7 text-brand-secondary">
        DealPilot Travel is built around one idea: most people overpay because they choose destination and timing before they evaluate deal windows.
        We reverse that. Our process starts with practical price intelligence, then fits your preferences around high-value options.
      </p>
      <p className="mt-4 text-base leading-7 text-brand-secondary">
        We focus on tactics that hold up in real life: fee-aware hotel selection, flexible date framing, open-jaw routing, and fallback plans for volatile fares.
        No hacks, no hype, just repeatable booking logic.
      </p>
      <p className="mt-4 text-base leading-7 text-brand-secondary">
        If you want a trip that feels intentional and cost-aware without turning booking into a second job, we can help.
      </p>
    </div>
  );
}
