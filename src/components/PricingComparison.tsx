import { Check, Minus } from "lucide-react";

const rows: { label: string; retail: boolean | string; restaurant: boolean | string; powerbill: boolean | string }[] = [
  { label: "Works fully offline", retail: true, restaurant: false, powerbill: true },
  { label: "Full restaurant table service", retail: false, restaurant: true, powerbill: true },
  { label: "One-time purchase option", retail: false, restaurant: false, powerbill: true },
  { label: "Per-transaction fees", retail: "None", restaurant: "Common", powerbill: "None" },
  { label: "Setup / hardware bundling required", retail: "Rarely", restaurant: "Often", powerbill: "Never" },
  { label: "Typical annual cost", retail: "₹2,000–6,000", restaurant: "₹15,000–30,000+", powerbill: "₹8,999 (or ₹9,999 one-time, 3 yrs)" },
];

function Cell({ value }: { value: boolean | string }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="mx-auto size-5 text-brand-600" />
    ) : (
      <Minus className="mx-auto size-5 text-ink/25" />
    );
  }
  return <span>{value}</span>;
}

export function PricingComparison() {
  return (
    <div className="mx-auto mt-16 max-w-4xl">
      <div className="mx-auto max-w-2xl text-center">
        <h3 className="text-2xl font-bold tracking-tight text-ink">How PowerBill compares</h3>
        <p className="mt-3 text-sm text-ink/60">
          Most shops choose between a bare-bones retail billing app or a dedicated restaurant POS
          platform. PowerBill is priced to sit between them, because it does the job of both.
        </p>
      </div>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[640px] border-separate border-spacing-0 overflow-hidden rounded-2xl border border-black/10 bg-white text-sm">
          <thead>
            <tr>
              <th className="border-b border-black/10 bg-canvas px-5 py-4 text-left font-semibold text-ink/70">
                &nbsp;
              </th>
              <th className="border-b border-black/10 bg-canvas px-5 py-4 text-center font-semibold text-ink/70">
                Typical retail billing app
              </th>
              <th className="border-b border-black/10 bg-canvas px-5 py-4 text-center font-semibold text-ink/70">
                Typical restaurant POS
              </th>
              <th className="border-b border-l border-black/10 bg-brand-50 px-5 py-4 text-center font-bold text-brand-700">
                PowerBill
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.label}>
                <td
                  className={`px-5 py-4 font-medium text-ink/80 ${i !== rows.length - 1 ? "border-b border-black/5" : ""}`}
                >
                  {row.label}
                </td>
                <td
                  className={`px-5 py-4 text-center text-ink/60 ${i !== rows.length - 1 ? "border-b border-black/5" : ""}`}
                >
                  <Cell value={row.retail} />
                </td>
                <td
                  className={`px-5 py-4 text-center text-ink/60 ${i !== rows.length - 1 ? "border-b border-black/5" : ""}`}
                >
                  <Cell value={row.restaurant} />
                </td>
                <td
                  className={`border-l border-black/5 bg-brand-50/40 px-5 py-4 text-center font-semibold text-brand-700 ${i !== rows.length - 1 ? "border-b border-black/5" : ""}`}
                >
                  <Cell value={row.powerbill} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mx-auto mt-4 max-w-2xl text-center text-xs text-ink/40">
        Typical ranges based on publicly listed pricing of comparable retail billing and
        restaurant POS software in India, 2026 — not a comparison against any specific named
        product.
      </p>
    </div>
  );
}
