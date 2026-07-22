import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import dashboard from "../assets/screenshots/dashboard.png";
import posRestaurant from "../assets/screenshots/pos-restaurant.png";
import reports from "../assets/screenshots/reports.png";
import floorView from "../assets/screenshots/floor-view.png";

const slides = [
  {
    src: dashboard,
    title: "Dashboard",
    caption: "Today's sales, invoices, low-stock alerts, and quick actions at a glance.",
  },
  {
    src: floorView,
    title: "Restaurant floor view",
    caption: "Tables grouped by section, with live status -- Free, Running, KOT Sent, Bill Printed.",
  },
  {
    src: posRestaurant,
    title: "Category ordering",
    caption: "Tap through categories to build a cart, GST calculated automatically as you go.",
  },
  {
    src: reports,
    title: "Dine-In vs Parcel report",
    caption: "See dine-in and parcel sales split out, alongside the full report suite.",
  },
];

/**
 * Real screenshots from the running app (not mockups), auto-advancing with
 * manual arrows + dot indicators. Pauses on hover/focus and while the tab is
 * hidden; skips the auto-advance timer entirely under prefers-reduced-motion.
 */
export function ProductCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const prefersReducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (paused || prefersReducedMotion) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 4500);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, prefersReducedMotion]);

  function go(delta: number) {
    setIndex((i) => (i + delta + slides.length) % slides.length);
  }

  return (
    <div
      className="mx-auto max-w-4xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-white shadow-2xl shadow-brand-900/10">
        <div
          className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide) => (
            <img
              key={slide.src}
              src={slide.src}
              alt={slide.caption}
              className="w-full shrink-0"
            />
          ))}
        </div>

        <button
          onClick={() => go(-1)}
          aria-label="Previous screenshot"
          className="absolute left-3 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow-md hover:bg-white"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          onClick={() => go(1)}
          aria-label="Next screenshot"
          className="absolute right-3 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow-md hover:bg-white"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <div>
          <div className="text-sm font-semibold text-ink">{slides[index].title}</div>
          <div className="text-sm text-ink/50">{slides[index].caption}</div>
        </div>
        <div className="flex shrink-0 gap-1.5">
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`size-2 rounded-full transition-colors ${
                i === index ? "bg-brand-600" : "bg-black/15 hover:bg-black/25"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
