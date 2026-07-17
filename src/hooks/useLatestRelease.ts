import { useEffect, useState } from "react";

export interface LatestRelease {
  version: string;
  downloadUrl: string;
  releaseUrl: string;
  publishedAt: string;
}

const RELEASES_API = "https://api.github.com/repos/sandeep008/powerbill-releases/releases/latest";
const INSTALLER_ASSET_NAME = "PowerBillSetup.exe";
const FALLBACK_RELEASES_URL = "https://github.com/sandeep008/powerbill-releases/releases/latest";

/**
 * Reads the latest PowerBill release the exact same way the app's own in-app
 * "Check for Updates" feature does (see UpdateCheckService.cs in the main repo) --
 * straight from the public powerbill-releases repo, no backend of our own needed.
 * Falls back to a generic "go to the releases page" link if the API call fails
 * (rate-limited, offline visitor, etc.) so the Download button never dead-ends.
 */
export function useLatestRelease() {
  const [release, setRelease] = useState<LatestRelease | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    fetch(RELEASES_API, { headers: { Accept: "application/vnd.github+json" } })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))))
      .then((data) => {
        if (cancelled) return;
        const asset = (data.assets ?? []).find((a: { name: string }) => a.name === INSTALLER_ASSET_NAME);
        setRelease({
          version: (data.tag_name ?? "").replace(/^v/, ""),
          downloadUrl: asset?.browser_download_url ?? data.html_url,
          releaseUrl: data.html_url,
          publishedAt: data.published_at,
        });
      })
      .catch(() => {
        if (!cancelled) setRelease(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    release,
    loading,
    fallbackUrl: FALLBACK_RELEASES_URL,
  };
}
