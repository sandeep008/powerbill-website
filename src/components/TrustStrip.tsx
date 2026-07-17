import { Languages, Receipt, ShieldOff, Store } from "lucide-react";

const items = [
  { icon: ShieldOff, label: "Offline-first", detail: "No internet required to bill" },
  { icon: Store, label: "3 POS styles", detail: "Standard, tiles, or table service" },
  { icon: Receipt, label: "GST-ready", detail: "Auto CGST/SGST vs IGST split" },
  { icon: Languages, label: "3 languages", detail: "English, Hindi, Marathi" },
];

export function TrustStrip() {
  return (
    <section className="border-y border-black/5 bg-white/60">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-8 sm:grid-cols-4">
        {items.map(({ icon: Icon, label, detail }) => (
          <div key={label} className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
              <Icon className="size-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-ink">{label}</div>
              <div className="text-xs text-ink/50">{detail}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
