import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import mark from "../assets/brand/mark.png";
import { DownloadButton } from "./DownloadButton";

const primaryLinks = [
  { href: "#features", label: "Features" },
  { href: "#pos-styles", label: "POS Styles" },
  { href: "#pricing", label: "Pricing" },
];

const demoLinks = [
  { href: "#demo", label: "Watch Demo" },
  { href: "#full-demo", label: "Full Walkthrough" },
];

const helpLinks = [
  { href: "#faq", label: "FAQ" },
  { href: "#feedback", label: "Feedback" },
  { href: "#contact", label: "Contact Support" },
];

function NavDropdown({ label, items }: { label: string; items: { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex items-center gap-1 text-sm font-medium text-ink/70 hover:text-ink"
      >
        {label}
        <ChevronDown className={`size-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute left-1/2 top-full mt-3 w-52 -translate-x-1/2 rounded-xl border border-black/10 bg-white py-2 shadow-lg">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-2 text-sm text-ink/70 hover:bg-brand-50 hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function MobileGroup({ title, items, onNavigate }: { title: string; items: { href: string; label: string }[]; onNavigate: () => void }) {
  return (
    <div className="border-t border-black/5 pt-3">
      <div className="text-xs font-semibold uppercase tracking-wide text-ink/40">{title}</div>
      <div className="mt-2 flex flex-col gap-3">
        {items.map((l) => (
          <a key={l.href} href={l.href} className="text-sm font-medium" onClick={onNavigate}>
            {l.label}
          </a>
        ))}
      </div>
    </div>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-canvas/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-3">
        <a href="#top" className="flex shrink-0 items-center gap-2.5">
          <img src={mark} alt="" className="size-9" />
          <span className="text-lg font-bold tracking-tight">PowerBill</span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {primaryLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-ink/70 hover:text-ink">
              {l.label}
            </a>
          ))}
          <NavDropdown label="Demos" items={demoLinks} />
          <NavDropdown label="Help" items={helpLinks} />
        </nav>

        <div className="hidden shrink-0 items-center gap-3 md:flex">
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
            {primaryLinks.map((l) => (
              <a key={l.href} href={l.href} className="text-sm font-medium" onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ))}
            <MobileGroup title="Demos" items={demoLinks} onNavigate={() => setOpen(false)} />
            <MobileGroup title="Help" items={helpLinks} onNavigate={() => setOpen(false)} />
            <a href="#contact" className="mt-1 text-sm font-semibold" onClick={() => setOpen(false)}>
              Request a Demo
            </a>
            <DownloadButton />
          </nav>
        </div>
      )}
    </header>
  );
}
