import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import mark from "../assets/brand/mark.png";
import { DownloadButton } from "./DownloadButton";
import { useAnchorNav } from "../hooks/useAnchorNav";

const pageLinks = [
  { to: "/pricing", label: "Pricing" },
  { to: "/guide", label: "User Guide" },
  { to: "/register", label: "Register" },
  { to: "/support", label: "Support" },
];

function navLinkClass({ isActive }: { isActive: boolean }) {
  return `text-sm font-medium ${isActive ? "text-ink" : "text-ink/70 hover:text-ink"}`;
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const scrollToAnchor = useAnchorNav();

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-canvas/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-3">
        <Link to="/" className="flex shrink-0 items-center gap-2.5">
          <img src={mark} alt="" className="size-9" />
          <span className="text-lg font-bold tracking-tight">PowerBill</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          <button onClick={() => scrollToAnchor("features")} className="text-sm font-medium text-ink/70 hover:text-ink">
            Features
          </button>
          <button onClick={() => scrollToAnchor("pos-styles")} className="text-sm font-medium text-ink/70 hover:text-ink">
            POS Styles
          </button>
          {pageLinks.map((l) => (
            <NavLink key={l.to} to={l.to} className={navLinkClass}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 md:flex">
          <Link to="/support" className="text-sm font-semibold text-ink/80 hover:text-ink">
            Request a Demo
          </Link>
          <DownloadButton />
        </div>

        <button className="md:hidden" aria-label="Toggle menu" onClick={() => setOpen((o) => !o)}>
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-black/5 bg-canvas px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            <button
              onClick={() => {
                setOpen(false);
                scrollToAnchor("features");
              }}
              className="text-left text-sm font-medium"
            >
              Features
            </button>
            <button
              onClick={() => {
                setOpen(false);
                scrollToAnchor("pos-styles");
              }}
              className="text-left text-sm font-medium"
            >
              POS Styles
            </button>
            {pageLinks.map((l) => (
              <Link key={l.to} to={l.to} className="text-sm font-medium" onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            ))}
            <Link to="/support" className="mt-1 text-sm font-semibold" onClick={() => setOpen(false)}>
              Request a Demo
            </Link>
            <DownloadButton />
          </nav>
        </div>
      )}
    </header>
  );
}
