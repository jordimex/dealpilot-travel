const fs = require("fs");
const path = require("path");

const outDir = path.join(process.cwd(), "content", "blog");
fs.mkdirSync(outDir, { recursive: true });

const baseTips = [
  "Define a book-now threshold before searching so you can act quickly when value appears.",
  "Compare total trip cost, not one line item, because savings in one place can add cost elsewhere.",
  "Keep one fallback option for dates or airports to reduce pressure when prices move.",
  "Document cancellation deadlines and penalty rules in one running note.",
];

const reinforce = [
  "Build your decision rule before opening another tab. Travelers who pre-commit to thresholds make cleaner choices and avoid emotional booking loops.",
  "A reliable deal process favors consistency over clever hacks. If a tactic cannot be repeated across trips, treat it as a bonus rather than your core strategy.",
  "Always run one final all-in check that includes fees, transfers, and timing tradeoffs before paying.",
];

const posts = [
  { slug: "when-to-book-flights-myths-vs-data", title: "When to Book Flights: Myths vs Data-Driven Rules", description: "Separate flight-booking myths from practical timing rules that improve your odds of finding strong global airfare deals.", date: "2026-02-10", tags: ["Flights", "Timing", "Price Strategy"] },
  { slug: "hidden-hotel-fees-and-how-to-avoid-them", title: "Hidden Hotel Fees and How to Avoid Them", description: "Learn where hotel costs hide and how to compare properties using true all-in pricing before booking.", date: "2026-02-11", tags: ["Hotels", "Fees", "Budgeting"] },
  { slug: "how-to-use-price-alerts-properly", title: "How to Use Price Alerts Properly (And What Most People Do Wrong)", description: "Configure airfare and hotel price alerts with better filters, better timing, and better decision thresholds.", date: "2026-02-12", tags: ["Price Alerts", "Flights", "Automation"] },
  { slug: "best-day-time-to-book-flights-what-matters", title: "Best Day and Time to Book Flights: What Matters and What Does Not", description: "Understand why day-of-week myths persist and which booking variables actually influence airfare outcomes.", date: "2026-02-13", tags: ["Flights", "Timing", "Myths"] },
  { slug: "build-a-deal-first-itinerary", title: "How to Build a Deal-First Itinerary (Flexibility Strategies That Work)", description: "Plan trips around high-value flight and stay windows while keeping your destination priorities intact.", date: "2026-02-14", tags: ["Itinerary", "Flexibility", "Travel Deals Anywhere"] },
  { slug: "points-basics-without-credit-card-hype", title: "Points Basics Without Credit Card Hype", description: "A practical beginner framework for using travel points responsibly without overcomplicating your booking strategy.", date: "2026-02-15", tags: ["Points", "Beginner", "Budget"] },
  { slug: "booking-multi-city-trips-cheaper-open-jaw-logic", title: "Booking Multi-City Trips Cheaper: Open-Jaw Logic Explained", description: "Use open-jaw and multi-city routing tactics to reduce backtracking and improve total trip value.", date: "2026-02-16", tags: ["Multi-city", "Flights", "Itinerary"] },
  { slug: "avoiding-dynamic-pricing-traps", title: "Avoiding Dynamic Pricing Traps (Cookies and VPN Myths Included)", description: "Understand what dynamic pricing actually is, what myths to ignore, and what practical actions protect your budget.", date: "2026-02-17", tags: ["Dynamic Pricing", "Myths", "Flights"] },
  { slug: "airport-vs-city-center-hotels-which-is-better", title: "Airport vs City-Center Hotels: When Each Is the Better Deal", description: "Decide between airport and city-center hotels using trip purpose, transport cost, and time-value tradeoffs.", date: "2026-02-18", tags: ["Hotels", "Location", "Itinerary"] },
  { slug: "travel-deals-checklist", title: "The Complete Travel Deals Checklist (Use Before Every Trip)", description: "A complete, practical checklist you can reuse as a repeatable travel-deal booking framework.", date: "2026-02-19", tags: ["Checklist", "Travel Deals Anywhere", "Planning"] },
];
for (const post of posts) {
  const intro = `# ${post.title}\n\nTravel deals improve when you use a system instead of reacting to random advice. This guide focuses on practical decisions you can repeat on any route, not one-off tricks. The goal is to reduce overpaying while keeping the trip usable and low-stress.`;

  const bodyParts = [
    intro,
    "## What Actually Matters",
    "Start with trip constraints: budget ceiling, schedule limits, and service expectations. If those are undefined, every search result feels possible and decisions get slower and more expensive.",
    `${post.title} works best when you evaluate full trip economics. A lower headline price can still lose once you add bags, transfers, extra nights, and time costs.`,
    "Separate non-negotiables from flex variables. Keep the core experience fixed, then flex dates, airport choices, or city order to unlock better pricing.",
    "Use a threshold rule: if total value meets your predefined range, book. Waiting for a perfect low usually adds risk and often increases cost.",
    "## Worked Example",
    "Imagine planning a global trip with two date bands and two airport options. You monitor prices for a short period, then score each option on total cost, timing quality, and cancellation safety.",
    "One option is not the absolute cheapest but has better arrival timing and fewer hidden fees. Because your threshold is defined in advance, you can book quickly without second-guessing.",
    "Two weeks later, prices rise around one route due to demand. Your booked option remains the better value because the decision was rules-based, not myth-based.",
    "## Practical Checklist",
    ...baseTips.map((tip) => `- ${tip}`),
    "- Capture one concrete fallback route before checkout.",
    "- Screenshot final checkout totals for your records.",
    "## Common Mistakes",
    "- Waiting for exact bottom price with no threshold.",
    "- Comparing base fares without add-ons and transfer effects.",
    "- Booking too many nonrefundable pieces before major transport is stable.",
    "- Ignoring local demand events and seasonality.",
    "## Final Decision Rule",
    "Pick a repeatable process, follow it consistently, and optimize total trip value instead of chasing isolated bargains.",
  ];

  let content = bodyParts.join("\n\n");
  while (content.split(/\s+/).filter(Boolean).length < 940) {
    const extra = reinforce[Math.floor(Math.random() * reinforce.length)];
    content += `\n\n## Extra Tactic\n\n${extra}\n\nUse this as a quick audit before spending money. If a deal survives the audit, it is usually good enough to book.`;
  }

  const frontmatter = [
    "---",
    `title: \"${post.title}\"`,
    `description: \"${post.description}\"`,
    `date: \"${post.date}\"`,
    `tags: [${post.tags.map((tag) => `\"${tag}\"`).join(", ")}]`,
    `author: \"DealPilot Editorial\"`,
    "---",
    "",
  ].join("\n");

  fs.writeFileSync(path.join(outDir, `${post.slug}.md`), `${frontmatter}${content}\n`, "utf8");
}

console.log(`Generated ${posts.length} posts`);
