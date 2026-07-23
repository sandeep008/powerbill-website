/**
 * Talks to the free Google Apps Script Web App that stands in for a
 * database (this site is static -- GitHub Pages, no server of its own).
 * See google-apps-script/Code.gs and SETUP.md.
 */
export const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycby5LT-qre6oqtyawozQDONA8t1PAWuGFfR5xf62Gh7kQD930j6aTKJdOMcL-si2Xf3B-A/exec";

export function isBackendConfigured() {
  return APPS_SCRIPT_URL.length > 0;
}

/**
 * POSTs as text/plain (not application/json) on purpose: Apps Script Web
 * Apps don't implement the OPTIONS preflight response, so any request
 * shape that triggers a CORS preflight fails from a browser. text/plain
 * keeps this a CORS "simple request" and skips preflight entirely -- the
 * body is still a JSON string, parsed server-side with JSON.parse.
 */
export async function postToSheet(action: string, payload: Record<string, unknown>): Promise<unknown> {
  if (!isBackendConfigured()) throw new Error("Backend not configured yet");
  const res = await fetch(APPS_SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ action, ...payload }),
  });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

export async function getFromSheet(action: string, params: Record<string, string> = {}): Promise<unknown> {
  if (!isBackendConfigured()) throw new Error("Backend not configured yet");
  const query = new URLSearchParams({ action, ...params }).toString();
  const res = await fetch(`${APPS_SCRIPT_URL}?${query}`);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}
