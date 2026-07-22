import { LayoutGrid, Search, UtensilsCrossed } from "lucide-react";

const styles = [
  {
    icon: Search,
    name: "Standard",
    tagline: "Search-box driven",
    body: "Fast barcode scan or live product search. Ideal for a general store or kirana shop with a barcode scanner at the counter.",
  },
  {
    icon: LayoutGrid,
    name: "Image Grid",
    tagline: "Tap-to-add tiles",
    body: "A grid of product photo tiles for one-tap checkout. Ideal for boutiques, bakeries, and anywhere staff recognize products visually.",
  },
  {
    icon: UtensilsCrossed,
    name: "Restaurant",
    tagline: "Table service, Dine-In & Parcel",
    body: "A floor view grouped by section with live table status (Free, Running, KOT sent, Bill printed), category-browsed menu ordering, a dedicated Parcel/takeaway flow, and kitchen ticket printing.",
  },
];

export function PosStyles() {
  return (
    <section id="pos-styles" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            One app, three checkout styles
          </h2>
          <p className="mt-4 text-lg text-ink/60">
            Pick the POS layout that matches how your shop actually operates — switch anytime
            from Settings.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {styles.map(({ icon: Icon, name, tagline, body }) => (
            <div
              key={name}
              className="rounded-2xl border border-black/5 bg-gradient-to-b from-brand-50/60 to-transparent p-8"
            >
              <div className="flex size-12 items-center justify-center rounded-xl bg-brand-600 text-white">
                <Icon className="size-6" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-ink">{name}</h3>
              <div className="text-sm font-medium text-gold-600">{tagline}</div>
              <p className="mt-3 text-sm leading-relaxed text-ink/60">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
