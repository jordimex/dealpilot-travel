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
  tripType: "roundtrip" | "oneway";
  adults: string;
  children: string;
  infants: string;
  cabinClass: "0" | "1";
};

const initialState: SearchState = {
  origin: "",
  destination: "",
  departDate: "",
  returnDate: "",
  tripType: "roundtrip",
  adults: "1",
  children: "0",
  infants: "0",
  cabinClass: "0",
};

function normalizeIataCode(value: string): string {
  return value.trim().toUpperCase().replace(/[^A-Z]/g, "").slice(0, 3);
}

export function FlightSearch({ affiliateMarker, widgetSrc }: FlightSearchProps) {
  const [form, setForm] = useState<SearchState>(initialState);
  const [error, setError] = useState<string>("");

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

    if (!form.departDate) {
      setError("Choose a departure date.");
      return;
    }

    if (form.tripType === "roundtrip" && !form.returnDate) {
      setError("Choose a return date or switch to one-way.");
      return;
    }

    setError("");

    const params = new URLSearchParams({
      origin_iata: origin,
      destination_iata: destination,
      depart_date: form.departDate,
      adults: form.adults,
      children: form.children,
      infants: form.infants,
      trip_class: form.cabinClass,
      locale: "en",
      currency: "usd",
      oneway: form.tripType === "oneway" ? "1" : "0",
    });

    if (form.tripType === "roundtrip" && form.returnDate) {
      params.set("return_date", form.returnDate);
    }

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
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-brand-primary">Search affiliate fares in one step</h2>
          </div>
          <div className="rounded-full border border-brand-muted bg-brand-bg px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-secondary">
            Powered by Travelpayouts
          </div>
        </div>

        <form className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className="text-sm font-semibold text-brand-primary">From</span>
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
            <span className="text-sm font-semibold text-brand-primary">To</span>
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
            <span className="text-sm font-semibold text-brand-primary">Departure</span>
            <input
              type="date"
              value={form.departDate}
              onChange={(event) => updateField("departDate", event.target.value)}
              className="mt-2 w-full rounded-xl border border-brand-muted bg-brand-bg px-4 py-3 text-sm text-brand-primary outline-none transition focus:border-brand-primary"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-brand-primary">Return</span>
            <input
              type="date"
              value={form.returnDate}
              onChange={(event) => updateField("returnDate", event.target.value)}
              disabled={form.tripType === "oneway"}
              className="mt-2 w-full rounded-xl border border-brand-muted bg-brand-bg px-4 py-3 text-sm text-brand-primary outline-none transition disabled:cursor-not-allowed disabled:opacity-60 focus:border-brand-primary"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-brand-primary">Trip Type</span>
            <select
              value={form.tripType}
              onChange={(event) => updateField("tripType", event.target.value as SearchState["tripType"])}
              className="mt-2 w-full rounded-xl border border-brand-muted bg-brand-bg px-4 py-3 text-sm text-brand-primary outline-none transition focus:border-brand-primary"
            >
              <option value="roundtrip">Roundtrip</option>
              <option value="oneway">One-way</option>
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-brand-primary">Adults</span>
            <select
              value={form.adults}
              onChange={(event) => updateField("adults", event.target.value)}
              className="mt-2 w-full rounded-xl border border-brand-muted bg-brand-bg px-4 py-3 text-sm text-brand-primary outline-none transition focus:border-brand-primary"
            >
              {Array.from({ length: 9 }, (_, index) => String(index + 1)).map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-brand-primary">Children</span>
            <select
              value={form.children}
              onChange={(event) => updateField("children", event.target.value)}
              className="mt-2 w-full rounded-xl border border-brand-muted bg-brand-bg px-4 py-3 text-sm text-brand-primary outline-none transition focus:border-brand-primary"
            >
              {Array.from({ length: 7 }, (_, index) => String(index)).map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-brand-primary">Infants</span>
            <select
              value={form.infants}
              onChange={(event) => updateField("infants", event.target.value)}
              className="mt-2 w-full rounded-xl border border-brand-muted bg-brand-bg px-4 py-3 text-sm text-brand-primary outline-none transition focus:border-brand-primary"
            >
              {Array.from({ length: 7 }, (_, index) => String(index)).map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>

          <label className="block xl:col-span-2">
            <span className="text-sm font-semibold text-brand-primary">Cabin</span>
            <select
              value={form.cabinClass}
              onChange={(event) => updateField("cabinClass", event.target.value as SearchState["cabinClass"])}
              className="mt-2 w-full rounded-xl border border-brand-muted bg-brand-bg px-4 py-3 text-sm text-brand-primary outline-none transition focus:border-brand-primary"
            >
              <option value="0">Economy</option>
              <option value="1">Business</option>
            </select>
          </label>

          <div className="md:col-span-2 xl:col-span-4">
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
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-accent">Widget</p>
              <h3 className="mt-2 text-2xl font-bold tracking-tight text-brand-primary">Embedded Travelpayouts search tool</h3>
            </div>
          </div>

          {widgetSrc ? (
            <div className="mt-6 min-h-64 rounded-2xl border border-dashed border-brand-muted bg-brand-bg p-4">
              <Script src={widgetSrc} strategy="afterInteractive" />
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-dashed border-brand-muted bg-brand-bg p-5 text-sm leading-7 text-brand-secondary">
              Add `NEXT_PUBLIC_TRAVELPAYOUTS_WIDGET_SRC` to load your exact Travelpayouts widget embed code on this page. The
              search form above already redirects to your affiliate results URL.
            </div>
          )}
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
