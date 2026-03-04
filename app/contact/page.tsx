import { buildMetadata } from "@/lib/seo";
import { ContactForm } from "./contact-form";

export const metadata = buildMetadata({
  title: "Contact",
  description: "Request a custom travel deal plan with your destination, budget, dates, and booking priorities.",
  path: "/contact",
  keywords: ["travel deal consultation", "custom trip request", "travel planning contact"],
});

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ tier?: string }>;
}) {
  const params = await searchParams;
  const preselectedTier = params.tier ?? "";

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight text-brand-primary">Request a Custom Deal Plan</h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-brand-secondary">
        Share your trip details and priorities. We will use this as your planning brief.
      </p>
      <ContactForm preselectedTier={preselectedTier} />
    </div>
  );
}
