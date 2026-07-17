import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Does PowerBill need the internet to work?",
    a: "No. Billing, inventory, customers, and reports all work fully offline. Internet is only used if you choose to back up to Google Drive, send a WhatsApp message, or check for updates.",
  },
  {
    q: "Where is my data stored?",
    a: "On your own computer, in a single local database file. It is never uploaded to our servers as part of normal use.",
  },
  {
    q: "What happens if I don't renew my subscription?",
    a: "You get an advance-warning banner as your plan nears expiry, then a 10-day grace period after expiry where the software keeps working normally. Only after that does it lock until a new license is applied — your data is never deleted or touched.",
  },
  {
    q: "Can I use PowerBill for a restaurant, not just a retail shop?",
    a: "Yes — the Restaurant POS style gives you table/floor management, per-table running orders, and kitchen ticket printing.",
  },
  {
    q: "Does it support GST?",
    a: "Yes, including automatic CGST/SGST vs. IGST splitting and dedicated GST/tax reports.",
  },
  {
    q: "What languages is it available in?",
    a: "English, Hindi, and Marathi today.",
  },
  {
    q: "Can multiple staff use it with different access levels?",
    a: "Yes — role-based permissions let you control exactly what each user (Admin, Manager, Cashier, or a custom role) can see and do.",
  },
  {
    q: "How do I get support?",
    a: "Reach us via WhatsApp, phone, or email — see the Support section below.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white py-24">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-center text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Frequently asked questions
        </h2>

        <div className="mt-10 divide-y divide-black/5 rounded-2xl border border-black/5">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.q}>
                <button
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-ink">{item.q}</span>
                  <ChevronDown
                    className={`size-5 shrink-0 text-ink/40 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen && <p className="px-6 pb-5 text-sm leading-relaxed text-ink/60">{item.a}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
