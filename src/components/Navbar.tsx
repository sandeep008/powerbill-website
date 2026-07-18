import { useState } from "react";
import { Menu, X } from "lucide-react";
import mark from "../assets/brand/mark.png";
import { DownloadButton } from "./DownloadButton";

const links = [
  { href: "#demo", label: "Watch Demo" },
  { href: "#full-demo", label: "Full Walkthrough" },
  { href: "#features", label: "Features" },
  { href: "#pos-styles", label: "POS Styles" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
  { href: "#feedback", label: "Feedback" },
  { href: "#contact", label: "Support" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-canvas/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <a href="#top" className="flex items-center gap-2.5">
          <img src={mark} alt="" className="size-9" />
          <span className="text-lg font-bold tracking-tight">PowerBill</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-ink/70 hover:text-ink">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a href="#contact" className="text-sm font-semibold text-ink/80 hover:text-ink">
            Request a Demo
          </a>
          <DownloadButton />
        </div>

        <button
          className="md:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-black/5 bg-canvas px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-sm font-medium" onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ))}
            <a href="#contact" className="text-sm font-semibold" onClick={() => setOpen(false)}>
              Request a Demo
            </a>
            <DownloadButton />
          </nav>
        </div>
      )}
    </header>
  );
}
