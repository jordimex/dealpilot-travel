"use client";

import { useMemo, useState } from "react";

type FormState = {
  name: string;
  email: string;
  destinations: string;
  dates: string;
  budget: string;
  travelers: string;
  notes: string;
  tier: string;
  priorities: string[];
};

const tierOptions = [
  { value: "deal-check", label: "Deal Check" },
  { value: "full-itinerary", label: "Full Itinerary + Deals" },
  { value: "premium-multi-city", label: "Premium: Multi-city + concierge" },
];

const priorityOptions = [
  "Lowest total cost",
  "Fewer layovers",
  "Better flight times",
  "Central hotel location",
  "Flexible cancellation",
  "Family-friendly logistics",
];

export function ContactForm({ preselectedTier = "" }: { preselectedTier?: string }) {
  const safeTier = tierOptions.some((opt) => opt.value === preselectedTier) ? preselectedTier : "";

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    destinations: "",
    dates: "",
    budget: "",
    travelers: "",
    notes: "",
    tier: safeTier,
    priorities: [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const summary = useMemo(() => {
    return [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Service Tier: ${form.tier || "Not selected"}`,
      `Destination(s): ${form.destinations}`,
      `Dates: ${form.dates}`,
      `Budget: ${form.budget}`,
      `Travelers: ${form.travelers}`,
      `Priorities: ${form.priorities.join(", ") || "None selected"}`,
      `Notes: ${form.notes || "None"}`,
    ].join("\n");
  }, [form]);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function togglePriority(priority: string) {
    setForm((prev) => {
      const exists = prev.priorities.includes(priority);
      return {
        ...prev,
        priorities: exists
          ? prev.priorities.filter((item) => item !== priority)
          : [...prev.priorities, priority],
      };
    });
  }

  function validate(): boolean {
    const nextErrors: Record<string, string> = {};

    if (!form.name.trim()) nextErrors.name = "Name is required.";
    if (!form.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!form.destinations.trim()) nextErrors.destinations = "Destination(s) are required.";
    if (!form.dates.trim()) nextErrors.dates = "Dates are required.";
    if (!form.budget.trim()) nextErrors.budget = "Budget is required.";
    if (!form.travelers.trim()) nextErrors.travelers = "Travelers is required.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) {
      setSubmitted(false);
      return;
    }

    setSubmitted(true);
  }

  return (
    <div className="mt-8">
      <form onSubmit={handleSubmit} noValidate className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm">
            <span className="mb-1 block font-semibold text-slate-800">Name</span>
            <input value={form.name} onChange={(e) => updateField("name", e.target.value)} className="w-full rounded-md border border-slate-300 px-3 py-2" />
            {errors.name && <span className="mt-1 block text-xs text-red-600">{errors.name}</span>}
          </label>

          <label className="text-sm">
            <span className="mb-1 block font-semibold text-slate-800">Email</span>
            <input type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} className="w-full rounded-md border border-slate-300 px-3 py-2" />
            {errors.email && <span className="mt-1 block text-xs text-red-600">{errors.email}</span>}
          </label>

          <label className="text-sm sm:col-span-2">
            <span className="mb-1 block font-semibold text-slate-800">Service tier (optional)</span>
            <select value={form.tier} onChange={(e) => updateField("tier", e.target.value)} className="w-full rounded-md border border-slate-300 px-3 py-2">
              <option value="">Select a tier</option>
              {tierOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </label>

          <label className="text-sm sm:col-span-2">
            <span className="mb-1 block font-semibold text-slate-800">Destination(s)</span>
            <input value={form.destinations} onChange={(e) => updateField("destinations", e.target.value)} placeholder="Example: Tokyo + Kyoto" className="w-full rounded-md border border-slate-300 px-3 py-2" />
            {errors.destinations && <span className="mt-1 block text-xs text-red-600">{errors.destinations}</span>}
          </label>

          <label className="text-sm">
            <span className="mb-1 block font-semibold text-slate-800">Dates</span>
            <input value={form.dates} onChange={(e) => updateField("dates", e.target.value)} placeholder="Example: Sep 12-22, flexible +/-3 days" className="w-full rounded-md border border-slate-300 px-3 py-2" />
            {errors.dates && <span className="mt-1 block text-xs text-red-600">{errors.dates}</span>}
          </label>

          <label className="text-sm">
            <span className="mb-1 block font-semibold text-slate-800">Budget</span>
            <input value={form.budget} onChange={(e) => updateField("budget", e.target.value)} placeholder="Example: $2,500 total" className="w-full rounded-md border border-slate-300 px-3 py-2" />
            {errors.budget && <span className="mt-1 block text-xs text-red-600">{errors.budget}</span>}
          </label>

          <label className="text-sm sm:col-span-2">
            <span className="mb-1 block font-semibold text-slate-800">Travelers</span>
            <input value={form.travelers} onChange={(e) => updateField("travelers", e.target.value)} placeholder="Example: 2 adults, 1 child" className="w-full rounded-md border border-slate-300 px-3 py-2" />
            {errors.travelers && <span className="mt-1 block text-xs text-red-600">{errors.travelers}</span>}
          </label>
        </div>

        <fieldset className="mt-6">
          <legend className="text-sm font-semibold text-slate-800">Priorities</legend>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {priorityOptions.map((option) => (
              <label key={option} className="flex items-center gap-2 text-sm text-slate-700">
                <input type="checkbox" checked={form.priorities.includes(option)} onChange={() => togglePriority(option)} />
                {option}
              </label>
            ))}
          </div>
        </fieldset>

        <label className="mt-6 block text-sm">
          <span className="mb-1 block font-semibold text-slate-800">Notes</span>
          <textarea value={form.notes} onChange={(e) => updateField("notes", e.target.value)} rows={5} className="w-full rounded-md border border-slate-300 px-3 py-2" />
        </label>

        <button type="submit" className="mt-6 rounded-md bg-sky-700 px-5 py-3 text-sm font-semibold text-white hover:bg-sky-800">Submit request</button>
      </form>

      {submitted && (
        <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-5">
          <p className="text-sm font-semibold text-emerald-800">Request captured successfully</p>
          <p className="mt-2 text-sm text-emerald-900">Copy this summary for your records:</p>
          <pre className="mt-3 overflow-x-auto rounded-md bg-white p-4 text-xs leading-6 text-slate-700">{summary}</pre>
          <button
            type="button"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(summary);
              } catch {
                // Clipboard write can fail in some browsers without permissions.
              }
            }}
            className="mt-3 rounded-md border border-emerald-300 bg-white px-3 py-2 text-xs font-semibold text-emerald-800"
          >
            Copy summary
          </button>
        </div>
      )}
    </div>
  );
}
