"use client";

import Script from "next/script";
import { useState } from "react";

type FlightSearchProps = {
  affiliateMarker?: string;
  widgetSrc?: string;
};

type SearchState = {
  origin: string;
  destination: string;
  departDate: string;
  returnDate: string;
  passengers: string;
};

const initialState: SearchState = {
  origin: "",
  destination: "",
  departDate: "",
  returnDate: "",
  passengers: "1",
};

function normalizeIataCode(value: string): string {
  return value.trim().toUpperCase().replace(/[^A-Z]/g, "").slice(0, 3);
}

export function FlightSearch({ affiliateMarker, widgetSrc }: FlightSearchProps) {
  const [form, setForm] = useState<SearchState>(initialState);
  const [error, setError] = useState("");

  function updateField<Key extends keyof SearchState>(key: Key, value: SearchState[Key]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const origin = normalizeIataCode(form.origin);
    const destination = normalizeIataCode(form.destination);

    if (origin.length !== 3 || destination.length !== 3) {
      setError("Enter valid 3-letter IATA airport or city codes, such as NYC and LAX.");
      return;
    }

    if (!form.departDate || !form.returnDate) {
      setError("Choose both departure and return dates.");
      return;
    }

    setError("");

    const params = new URLSearchParams({
      origin_iata: origin,
      destination_iata: destination,
      depart_date: form.departDate,
      return_date: form.returnDate,
      adults: form.passengers,
      locale: "en",
      currency: "usd",
      oneway: "0",
    });

    if (affiliateMarker) {
      params.set("marker", affiliateMarker);
    }

    window.location.href = `https://search.aviasales.com/flights/?${params.toString()}`;
  }

  return (
    <div className="space-y-8">
      <section className="rounded-[1.5rem] border border-brand-muted bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-accent">Flight Search</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-brand-primary">Search cheap flights and send traffic to affiliate booking</h2>
          </div>
          <div className="rounded-full border border-brand-muted bg-brand-bg px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-secondary">
            Powered by Travelpayouts
          </div>
        </div>

        <form className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5" onSubmit={handleSubmit}>
          <label className="block">
            <span className="text-sm font-semibold text-brand-primary">Origin</span>
            <input
              type="text"
              inputMode="text"
              placeholder="NYC"
              value={form.origin}
              onChange={(event) => updateField("origin", event.target.value)}
              className="mt-2 w-full rounded-xl border border-brand-muted bg-brand-bg px-4 py-3 text-sm uppercase text-brand-primary outline-none transition focus:border-brand-primary"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-brand-primary">Destination</span>
            <input
              type="text"
              inputMode="text"
              placeholder="LAX"
              value={form.destination}
              onChange={(event) => updateField("destination", event.target.value)}
              className="mt-2 w-full rounded-xl border border-brand-muted bg-brand-bg px-4 py-3 text-sm uppercase text-brand-primary outline-none transition focus:border-brand-primary"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-brand-primary">Departure Date</span>
            <input
              type="date"
              value={form.departDate}
              onChange={(event) => updateField("departDate", event.target.value)}
              className="mt-2 w-full rounded-xl border border-brand-muted bg-brand-bg px-4 py-3 text-sm text-brand-primary outline-none transition focus:border-brand-primary"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-brand-primary">Return Date</span>
            <input
              type="date"
              value={form.returnDate}
              onChange={(event) => updateField("returnDate", event.target.value)}
              className="mt-2 w-full rounded-xl border border-brand-muted bg-brand-bg px-4 py-3 text-sm text-brand-primary outline-none transition focus:border-brand-primary"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-brand-primary">Passengers</span>
            <select
              value={form.passengers}
              onChange={(event) => updateField("passengers", event.target.value)}
              className="mt-2 w-full rounded-xl border border-brand-muted bg-brand-bg px-4 py-3 text-sm text-brand-primary outline-none transition focus:border-brand-primary"
            >
              {Array.from({ length: 9 }, (_, index) => String(index + 1)).map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>

          <div className="md:col-span-2 xl:col-span-5">
            {error ? <p className="mb-4 text-sm font-medium text-red-700">{error}</p> : null}
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-xl bg-brand-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-secondary sm:w-auto"
            >
              Search Flights
            </button>
          </div>
        </form>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-[1.5rem] border border-brand-muted bg-white p-6 shadow-sm sm:p-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-accent">Affiliate Module</p>
            <h3 className="mt-2 text-2xl font-bold tracking-tight text-brand-primary">Travelpayouts widget drop zone</h3>
          </div>

          {widgetSrc ? (
            <div className="mt-6 min-h-64 rounded-2xl border border-dashed border-brand-muted bg-brand-bg p-4">
              <Script src={widgetSrc} strategy="afterInteractive" />
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-dashed border-brand-muted bg-brand-bg p-5 text-sm leading-7 text-brand-secondary">
              Add `NEXT_PUBLIC_TRAVELPAYOUTS_WIDGET_SRC` to load your Travelpayouts widget here. This keeps the layout ready for the
              monetized search component you want to drop in later.
            </div>
          )}

          <div className="mt-6 rounded-2xl border border-brand-muted bg-white p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-accent">Placeholder Results</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {[
                "Best value fare result",
                "Lowest nonstop fare result",
                "Flexible dates fare result",
                "Sponsored airline or OTA slot",
              ].map((item) => (
                <div key={item} className="rounded-xl border border-dashed border-brand-muted bg-brand-bg px-4 py-5 text-sm font-medium text-brand-secondary">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="rounded-[1.5rem] border border-brand-muted bg-brand-primary p-6 text-white shadow-sm sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-accent">Setup</p>
          <h3 className="mt-2 text-2xl font-bold tracking-tight">Affiliate configuration</h3>
          <ul className="mt-5 space-y-3 text-sm leading-7 text-white/85">
            <li>Use `NEXT_PUBLIC_TRAVELPAYOUTS_MARKER` for client-side affiliate redirects.</li>
            <li>Keep `TRAVELPAYOUTS_TOKEN` server-side for future API integrations.</li>
            <li>Paste the widget script URL from your Travelpayouts dashboard into `NEXT_PUBLIC_TRAVELPAYOUTS_WIDGET_SRC`.</li>
          </ul>
        </aside>
      </section>
    </div>
  );
}
