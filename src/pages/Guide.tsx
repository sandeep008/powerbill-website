import { VideoDemo } from "../components/VideoDemo";
import { FullDemoVideo } from "../components/FullDemoVideo";
import { RestaurantDemoVideo } from "../components/RestaurantDemoVideo";
import { CtaBand } from "../components/CtaBand";
import { Reveal } from "../components/Reveal";

export function Guide() {
  return (
    <>
      <section className="bg-white pb-4 pt-20">
        <Reveal className="mx-auto max-w-2xl px-6 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">User Guide</h1>
          <p className="mt-4 text-lg text-ink/60">
            Real, unscripted screen recordings of PowerBill in use — no mockups, no voiceover
            needed. Click any video to play.
          </p>
        </Reveal>
      </section>

      <Reveal>
        <VideoDemo />
      </Reveal>
      <Reveal>
        <FullDemoVideo />
      </Reveal>
      <Reveal>
        <RestaurantDemoVideo />
      </Reveal>

      <CtaBand />
    </>
  );
}
