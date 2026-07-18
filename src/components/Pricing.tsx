import { Check, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Trial",
    price: "₹0",
    period: "14 days",
    tagline: "Try it on your own PC",
    cta: "Download free trial",
    ctaHref: "#top",
    highlight: false,
  },
  {
    name: "Monthly",
    price: "₹999",
    period: "/ month",
    tagline: "Flexible, cancel anytime",
    cta: "Get Started",
    ctaHref: "#contact",
    highlight: false,
  },
  {
    name: "Quarterly",
    price: "₹2,699",
    period: "/ 3 months",
    tagline: "Save 10% vs. monthly",
    cta: "Get Started",
    ctaHref: "#contact",
    highlight: false,
  },
  {
    name: "Yearly",
    price: "₹8,999",
    period: "/ year",
    tagline: "Save 25% vs. monthly",
    cta: "Get Started",
    ctaHref: "#contact",
    highlight: true,
  },
];

const oneTimeOffer = {
  original: "₹24,999",
  offer: "₹9,999",
  savingsPct: "60%",
};

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
            <div className="mt-3 flex items-baseline gap-1.5">
              <span className="text-3xl font-bold tracking-tight">{plan.price}</span>
              <span className={`text-sm ${plan.highlight ? "text-white/70" : "text-ink/50"}`}>{plan.period}</span>
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

      <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-2xl border border-gold-400/40 bg-gradient-to-br from-brand-700 to-brand-600 p-8 text-white shadow-xl">
        <div className="flex items-center gap-2 text-gold-400">
          <Sparkles className="size-4" />
          <span className="text-xs font-bold uppercase tracking-wider">Limited-time launch offer</span>
        </div>
        <div className="mt-3 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-xl font-bold">One-Time Purchase — 3 Years Support &amp; Updates</div>
            <p className="mt-1 text-sm text-white/70">
              Pay once, own it for 3 years. No renewals to track, no surprise invoices.
            </p>
          </div>
          <div className="shrink-0 text-left sm:text-right">
            <div className="flex items-baseline gap-2 sm:justify-end">
              <span className="text-lg text-white/50 line-through">{oneTimeOffer.original}</span>
              <span className="text-3xl font-bold text-gold-400">{oneTimeOffer.offer}</span>
            </div>
            <div className="text-xs font-semibold text-gold-400">Save {oneTimeOffer.savingsPct} — one-time payment</div>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-lg bg-gold-400 px-5 py-2.5 text-sm font-semibold text-brand-700 hover:bg-gold-100"
          >
            Claim the one-time deal
          </a>
          <a
            href={`${import.meta.env.BASE_URL}brochure/powerbill-flyer.png`}
            download
            className="inline-flex items-center justify-center rounded-lg border border-white/30 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
          >
            Download brochure (English)
          </a>
          <a
            href={`${import.meta.env.BASE_URL}brochure/powerbill-flyer-mr.png`}
            download
            className="inline-flex items-center justify-center rounded-lg border border-white/30 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
          >
            ब्रोशर डाउनलोड करा (मराठी)
          </a>
        </div>
      </div>

      <div className="mx-auto mt-6 max-w-3xl rounded-2xl border border-black/5 bg-white p-8">
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
