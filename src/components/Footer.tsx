import mark from "../assets/brand/mark.png";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "POS Styles", href: "#pos-styles" },
      { label: "Pricing", href: "#pricing" },
      { label: "Download", href: "#top" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "FAQ", href: "#faq" },
      { label: "Support", href: "#contact" },
      { label: "Request a Demo", href: "#contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      {
        label: "License Agreement",
        href: "https://github.com/sandeep008/powerbill-releases/releases/latest",
      },
      { label: "Releases", href: "https://github.com/sandeep008/powerbill-releases/releases" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-black/5 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <img src={mark} alt="" className="size-8" />
              <span className="text-lg font-bold text-ink">PowerBill</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-ink/50">
              Offline-first retail billing &amp; POS software, built for shops of every size.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <div className="text-sm font-semibold text-ink">{col.title}</div>
              <ul className="mt-3 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-sm text-ink/50 hover:text-ink">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-black/5 pt-6 text-xs text-ink/40 sm:flex-row sm:items-center sm:justify-between">
          <span>&copy; {new Date().getFullYear()} PowerBill Technologies Pvt. Ltd. All rights reserved.</span>
          <span>Keshav Nagar, Pune, Maharashtra, India</span>
        </div>
      </div>
    </footer>
  );
}
