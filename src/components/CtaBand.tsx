import { DownloadButton } from "./DownloadButton";

export function CtaBand() {
  return (
    <section className="bg-brand-700">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 py-16 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Ready to run your shop your way?
        </h2>
        <p className="max-w-xl text-brand-50/80">
          Download the free trial today — no credit card, no cloud lock-in, your data stays on
          your own computer from day one.
        </p>
        <DownloadButton variant="onDark" />
      </div>
    </section>
  );
}
