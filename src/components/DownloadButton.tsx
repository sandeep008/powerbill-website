import { Download, Loader2 } from "lucide-react";
import { useLatestRelease } from "../hooks/useLatestRelease";

export function DownloadButton({ variant = "primary" }: { variant?: "primary" | "hero" | "onDark" }) {
  const { release, loading, fallbackUrl } = useLatestRelease();

  const href = release?.downloadUrl ?? fallbackUrl;
  const label = loading
    ? "Checking latest version..."
    : release
      ? `Download for Windows — v${release.version}`
      : "Download for Windows";

  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600";
  const styles =
    variant === "hero"
      ? "bg-brand-600 text-white hover:bg-brand-700 px-7 py-4 text-base shadow-lg shadow-brand-600/20"
      : variant === "onDark"
        ? "bg-white text-brand-700 hover:bg-brand-50 px-7 py-4 text-base shadow-lg"
        : "bg-brand-600 text-white hover:bg-brand-700 px-5 py-2.5 text-sm";

  return (
    <a href={href} className={`${base} ${styles}`} rel="noopener noreferrer">
      {loading ? <Loader2 className="size-5 animate-spin" /> : <Download className="size-5" />}
      {label}
    </a>
  );
}
