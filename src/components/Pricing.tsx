import { Check } from "lucide-react";

const plans = [
  {
    name: "Trial",
    tagline: "Try it on your own PC",
    cta: "Download free trial",
    ctaHref: "#top",
    highlight: false,
  },
  {
    name: "Monthly",
    tagline: "Flexible, cancel anytime",
    cta: "Contact for pricing",
    ctaHref: "#contact",
    highlight: false,
  },
  {
    name: "Quarterly",
    tagline: "Best for most shops",
    cta: "Contact for pricing",
    ctaHref: "#contact",
    highlight: true,
  },
  {
    name: "Yearly",
    tagline: "Best value, established shops",
    cta: "Contact for pricing",
    ctaHref: "#contact",
    highlight: false,
  },
];

const included = [
  "Full POS billing (all 3 styles)",
  "Inventory, customers & suppliers",
  "GST-ready reports",
  "WhatsApp bill & reminders",
  "Local + Google Drive backup",
  "Free updates during your plan",
];

export function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-7xl px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Simple plans, no surprises
        </h2>
        <p className="mt-4 text-lg text-ink/60">
          No per-transaction fees. Start with a free trial, no credit card required.
        </p>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`flex flex-col rounded-2xl border p-6 ${
              plan.highlight
                ? "border-brand-600 bg-brand-600 text-white shadow-xl shadow-brand-600/20"
                : "border-black/10 bg-white"
            }`}
          >
            <div className={`text-sm font-semibold ${plan.highlight ? "text-brand-50" : "text-brand-600"}`}>
              {plan.name}
            </div>
            <div className={`mt-1 text-sm ${plan.highlight ? "text-white/80" : "text-ink/50"}`}>
              {plan.tagline}
            </div>
            <a
              href={plan.ctaHref}
              className={`mt-6 inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
                plan.highlight
                  ? "bg-white text-brand-700 hover:bg-brand-50"
                  : "bg-brand-50 text-brand-700 hover:bg-brand-100"
              }`}
            >
              {plan.cta}
            </a>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-black/5 bg-white p-8">
        <div className="text-sm font-semibold text-ink">Every plan includes</div>
        <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {included.map((item) => (
            <li key={item} className="flex items-center gap-2.5 text-sm text-ink/70">
              <Check className="size-4 shrink-0 text-brand-600" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
