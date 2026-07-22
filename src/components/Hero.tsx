import { Link } from "react-router-dom";
import { MessageCircle, ShieldCheck } from "lucide-react";
import screenshot from "../assets/brand/dashboard-screenshot.png";
import { DownloadButton } from "./DownloadButton";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50 via-canvas to-canvas" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 pt-16 pb-20 lg:grid-cols-2 lg:pt-24 lg:pb-28">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-600/20 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
            <ShieldCheck className="size-3.5" />
            Works fully offline — your data never leaves your PC
          </div>

          <h1 className="mt-5 text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Billing software that works
            <span className="text-brand-600"> even when the internet doesn't.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/70">
            PowerBill is a complete offline billing &amp; POS system for retail shops of every
            size — kirana stores, restaurants, boutiques, supermarkets. Billing, inventory,
            customers, GST-ready reports, and WhatsApp reminders, all running on your own
            computer under your own control.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <DownloadButton variant="hero" />
            <Link
              to="/support"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-ink/15 px-7 py-4 text-base font-semibold text-ink hover:bg-ink/5"
            >
              <MessageCircle className="size-5" />
              Request a Demo
            </Link>
          </div>

          <p className="mt-4 text-sm text-ink/50">Free trial · No credit card needed · Windows 10/11</p>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-brand-300/30 to-gold-400/20 blur-2xl" />
          <div className="overflow-hidden rounded-2xl border border-black/10 shadow-2xl shadow-brand-900/10">
            <img src={screenshot} alt="PowerBill dashboard showing today's sales, invoices, low-stock alerts, and quick actions" className="w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
