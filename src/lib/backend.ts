/**
 * Talks to the free Google Apps Script Web App that stands in for a
 * database (this site is static -- GitHub Pages, no server of its own).
 * See google-apps-script/Code.gs and SETUP.md.
 *
 * TODO: replace with the real deployed Web App URL (ends in /exec) once
 * the one-time Google Sheet setup in SETUP.md is done. Left blank until
 * then -- isBackendConfigured() lets callers show a graceful "not set up
 * yet" state instead of firing requests at an empty URL.
 */
export const APPS_SCRIPT_URL = "";

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

export async function getFromSheet(action: string): Promise<unknown> {
  if (!isBackendConfigured()) throw new Error("Backend not configured yet");
  const res = await fetch(`${APPS_SCRIPT_URL}?action=${encodeURIComponent(action)}`);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}
