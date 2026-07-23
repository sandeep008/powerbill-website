import { useEffect, useState } from "react";
import { getFromSheet, isBackendConfigured } from "../lib/backend";

/** Counts once per page load via the same Apps Script backend as Register/Feedback. */
export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    if (!isBackendConfigured()) return;
    getFromSheet("visit")
      .then((data) => setCount((data as { count: number }).count))
      .catch(() => {});
  }, []);

  if (count === null) return null;

  return <span>{count.toLocaleString()} visitors so far</span>;
}
