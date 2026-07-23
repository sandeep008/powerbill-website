import { Link } from "react-router-dom";
import mark from "../assets/brand/mark.png";
import { useAnchorNav } from "../hooks/useAnchorNav";
import { VisitorCounter } from "./VisitorCounter";

const companyLinks = [
  { label: "User Guide", to: "/guide" },
  { label: "Register your Business", to: "/register" },
  { label: "Support & FAQ", to: "/support" },
  { label: "Request a Demo", to: "/support" },
];

const legalLinks = [
  {
    label: "License Agreement",
    href: "https://github.com/powerbilltech/powerbill-releases/releases/latest",
  },
  { label: "Releases", href: "https://github.com/powerbilltech/powerbill-releases/releases" },
];

export function Footer() {
  const scrollToAnchor = useAnchorNav();

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

          <div>
            <div className="text-sm font-semibold text-ink">Product</div>
            <ul className="mt-3 space-y-2.5">
              <li>
                <button onClick={() => scrollToAnchor("features")} className="text-sm text-ink/50 hover:text-ink">
                  Features
                </button>
              </li>
              <li>
                <button onClick={() => scrollToAnchor("pos-styles")} className="text-sm text-ink/50 hover:text-ink">
                  POS Styles
                </button>
              </li>
              <li>
                <Link to="/pricing" className="text-sm text-ink/50 hover:text-ink">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-ink/50 hover:text-ink">
                  Download
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold text-ink">Company</div>
            <ul className="mt-3 space-y-2.5">
              {companyLinks.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-ink/50 hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold text-ink">Legal</div>
            <ul className="mt-3 space-y-2.5">
              {legalLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-ink/50 hover:text-ink">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-black/5 pt-6 text-xs text-ink/40 sm:flex-row sm:items-center sm:justify-between">
          <span>&copy; {new Date().getFullYear()} PowerBill Technologies Pvt. Ltd. All rights reserved.</span>
          <span className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
            <VisitorCounter />
            <span>Pune, Maharashtra, India</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
