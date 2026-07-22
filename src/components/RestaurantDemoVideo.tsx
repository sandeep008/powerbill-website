import { useRef, useState } from "react";
import { Play } from "lucide-react";
import poster from "../assets/brand/restaurant-demo-poster.png";

const STEPS = [
  "Dine-In: floor view grouped by section, live table status",
  "Category ordering & Send to Kitchen",
  "Parcel: skip the floor view, order & complete",
  "Dine-In vs Parcel report",
  "Dashboard reflects both sales instantly",
];

/**
 * The Restaurant template in action -- a dine-in order from floor view through
 * checkout, a parcel order, the new Dine-In vs Parcel report, and the dashboard.
 * Same click-to-play, real-recording pattern as FullDemoVideo.
 */
export function RestaurantDemoVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  function handlePlay() {
    setPlaying(true);
    videoRef.current?.play();
  }

  return (
    <section id="restaurant-demo" className="bg-canvas py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Restaurant billing, start to finish
          </h2>
          <p className="mt-4 text-lg text-ink/60">
            A dine-in order from the floor view to a completed sale, a parcel order, and the
            Dine-In vs Parcel report on the dashboard — one continuous, real recording.
          </p>
        </div>

        <div className="mx-auto mt-6 flex flex-wrap justify-center gap-2">
          {STEPS.map((step, i) => (
            <span
              key={step}
              className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-medium text-ink/70"
            >
              {i + 1}. {step}
            </span>
          ))}
        </div>

        <div className="relative mx-auto mt-10 overflow-hidden rounded-2xl border border-black/10 shadow-2xl shadow-brand-900/10">
          <video
            ref={videoRef}
            src={`${import.meta.env.BASE_URL}demo/powerbill-restaurant-demo.mp4`}
            poster={poster}
            controls={playing}
            playsInline
            className="w-full"
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
          />

          {!playing && (
            <button
              onClick={handlePlay}
              aria-label="Play restaurant billing demo video"
              className="group absolute inset-0 flex items-center justify-center bg-ink/20 transition-colors hover:bg-ink/30"
            >
              <span className="flex size-20 items-center justify-center rounded-full bg-white shadow-xl transition-transform group-hover:scale-105">
                <Play className="ml-1 size-8 text-brand-600" fill="currentColor" />
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
