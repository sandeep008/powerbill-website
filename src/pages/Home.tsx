import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import { Hero } from "../components/Hero";
import { TrustStrip } from "../components/TrustStrip";
import { Features } from "../components/Features";
import { PosStyles } from "../components/PosStyles";
import { ProductCarousel } from "../components/ProductCarousel";
import { CtaBand } from "../components/CtaBand";
import { Reveal } from "../components/Reveal";

const plans = [
  { label: "Monthly", price: "₹999" },
  { label: "Yearly", price: "₹8,999" },
  { label: "One-time (3 yrs)", price: "₹9,999" },
];

function PricingTeaser() {
  return (
    <section className="bg-white py-24">
      <Reveal className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Simple plans, no surprises
        </h2>
        <p className="mt-4 text-lg text-ink/60">
          No per-transaction fees. Start with a free 14-day trial, no card required.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-8">
          {plans.map((p) => (
            <div key={p.label} className="rounded-xl border border-black/10 px-6 py-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-ink/40">{p.label}</div>
              <div className="mt-1 text-2xl font-bold text-ink">{p.price}</div>
            </div>
          ))}
        </div>

        <Link
          to="/pricing"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-600"
        >
          See full pricing &amp; how we compare
          <ArrowRight className="size-4" />
        </Link>
      </Reveal>
    </section>
  );
}

function GuideTeaser() {
  return (
    <section className="bg-canvas py-20">
      <Reveal className="mx-auto max-w-3xl px-6 text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-brand-600 text-white">
          <Play className="ml-0.5 size-6" fill="currentColor" />
        </div>
        <h2 className="mt-5 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          See it in action
        </h2>
        <p className="mt-3 text-ink/60">
          Real, unscripted screen recordings — a full sale start to finish, and the Restaurant
          template end to end.
        </p>
        <Link
          to="/guide"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700"
        >
          Watch the User Guide
          <ArrowRight className="size-4" />
        </Link>
      </Reveal>
    </section>
  );
}

export function Home() {
  const location = useLocation();

  useEffect(() => {
    const scrollTo = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (scrollTo) {
      // Wait a tick for the page to render before measuring/scrolling.
      const id = window.setTimeout(() => {
        document.getElementById(scrollTo)?.scrollIntoView({ behavior: "smooth" });
      }, 50);
      return () => window.clearTimeout(id);
    }
  }, [location.state]);

  return (
    <>
      <Hero />
      <TrustStrip />
      <Reveal>
        <Features />
      </Reveal>
      <Reveal>
        <PosStyles />
      </Reveal>

      <section className="bg-canvas py-24">
        <Reveal className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            The real product, not a mockup
          </h2>
          <p className="mt-4 text-lg text-ink/60">
            Screenshots straight from a running install — Dashboard, the Restaurant floor view,
            category ordering, and reports.
          </p>
        </Reveal>
        <Reveal delay={150} className="mt-12 px-6">
          <ProductCarousel />
        </Reveal>
      </section>

      <GuideTeaser />
      <PricingTeaser />
      <CtaBand />
    </>
  );
}
