import {
  BarChart3,
  Barcode,
  Cloud,
  MessageSquareText,
  Package,
  Palette,
  Receipt,
  ShieldCheck,
  Users,
} from "lucide-react";

const features = [
  {
    icon: Receipt,
    title: "Fast, flexible billing",
    body: "Barcode or search-based checkout, editable cart, discounts & tax, hold/resume bills, and every payment mode — cash, card, UPI, credit, mixed. Keyboard-only checkout in 3 keystrokes: scan, Enter, Enter.",
  },
  {
    icon: Package,
    title: "Inventory that keeps up",
    body: "Low-stock alerts, barcode generation and printable labels, bulk Excel import, and up to 4 photos per product.",
  },
  {
    icon: Users,
    title: "Customers & suppliers",
    body: "Running balances, payment recording, purchase entry and returns — the full ledger for both sides of your business.",
  },
  {
    icon: BarChart3,
    title: "Dashboard & reports",
    body: "Today's sales, low-stock count, top products, and a full report suite: GST/tax, sales return, purchase, day-end cash summary.",
  },
  {
    icon: MessageSquareText,
    title: "WhatsApp built in",
    body: "Send invoices and payment reminders straight to a customer's WhatsApp in one click — no separate app needed.",
  },
  {
    icon: ShieldCheck,
    title: "GST auto-split",
    body: "CGST/SGST vs. IGST calculated automatically from your shop's and your customer's state, shown live while billing.",
  },
  {
    icon: Users,
    title: "Role-based access",
    body: "Admin, Manager, Cashier roles out of the box — or build your own with per-screen View/Create/Edit/Delete permissions.",
  },
  {
    icon: Cloud,
    title: "Backup & restore",
    body: "One-click local backup, optional backup to your own Google Drive, and in-app restore — recovering never needs outside help.",
  },
  {
    icon: Barcode,
    title: "Built for India",
    body: "English, Hindi & Marathi UI, GST-ready from day one, and starter product catalogs so you're never starting from a blank list.",
  },
  {
    icon: Palette,
    title: "Make it yours",
    body: "Pick from Standard, Ocean Blue, or Royal Purple themes — applied consistently across the header, navigation, and every screen.",
  },
];

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Everything your shop needs, nothing it doesn't
        </h2>
        <p className="mt-4 text-lg text-ink/60">
          PowerBill isn't a stripped-down free tool or an overbuilt enterprise suite — it's
          built for the shop counter.
        </p>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ icon: Icon, title, body }) => (
          <div
            key={title}
            className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <Icon className="size-5.5" />
            </div>
            <h3 className="mt-4 text-base font-semibold text-ink">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/60">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
