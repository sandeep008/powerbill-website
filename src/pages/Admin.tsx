import { Fragment, useEffect, useState } from "react";
import { Ban, CheckCircle2, LogOut, MessageCircle, Pencil, Trash2 } from "lucide-react";
import { getFromSheet, postToSheet } from "../lib/backend";

const SECRET_KEY = "powerbill_admin_secret";

interface AdminUser {
  id: number;
  name: string;
  mobile: string;
  businessName: string;
  address: string;
  businessType: string;
  licenseStart: string;
  licenseReminder: string;
  licenseExpiry: string;
  amountPaid: number | null;
  status: string;
}

interface AdminStats {
  totalUsers: number;
  activeCount: number;
  blockedCount: number;
  expiringSoonCount: number;
  totalRevenue: number;
}

function isErrorResponse(data: unknown): data is { error: string } {
  return !!data && typeof data === "object" && "error" in data;
}

const EMPTY_FORM = {
  name: "",
  mobile: "",
  businessName: "",
  address: "",
  businessType: "",
  licenseStart: "",
  licenseReminder: "",
  licenseExpiry: "",
  amountPaid: "",
  status: "Active",
};

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-black/10 bg-white p-4">
      <div className="text-xs font-semibold uppercase tracking-wide text-ink/40">{label}</div>
      <div className="mt-1 text-2xl font-bold text-ink">{value}</div>
    </div>
  );
}

export function Admin() {
  const [secret, setSecret] = useState<string | null>(null);
  const [secretInput, setSecretInput] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const [stats, setStats] = useState<AdminStats | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loadError, setLoadError] = useState(false);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  async function loadAll(key: string) {
    const [statsData, usersData] = await Promise.all([
      getFromSheet("adminStats", { adminSecret: key }),
      getFromSheet("adminUsers", { adminSecret: key }),
    ]);
    if (isErrorResponse(statsData) || isErrorResponse(usersData)) {
      throw new Error("Unauthorized");
    }
    setStats(statsData as AdminStats);
    setUsers(usersData as AdminUser[]);
  }

  useEffect(() => {
    const stored = sessionStorage.getItem(SECRET_KEY);
    if (!stored) return;
    loadAll(stored)
      .then(() => setSecret(stored))
      .catch(() => sessionStorage.removeItem(SECRET_KEY));
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError(false);
    try {
      await loadAll(secretInput);
      sessionStorage.setItem(SECRET_KEY, secretInput);
      setSecret(secretInput);
    } catch {
      setLoginError(true);
    } finally {
      setLoggingIn(false);
    }
  }

  function handleLogout() {
    sessionStorage.removeItem(SECRET_KEY);
    setSecret(null);
    setSecretInput("");
    setUsers([]);
    setStats(null);
  }

  async function refresh() {
    if (!secret) return;
    try {
      await loadAll(secret);
      setLoadError(false);
    } catch {
      setLoadError(true);
    }
  }

  function startEdit(u: AdminUser) {
    setEditingId(u.id);
    setForm({
      name: u.name,
      mobile: u.mobile,
      businessName: u.businessName,
      address: u.address,
      businessType: u.businessType,
      licenseStart: u.licenseStart,
      licenseReminder: u.licenseReminder,
      licenseExpiry: u.licenseExpiry,
      amountPaid: u.amountPaid === null ? "" : String(u.amountPaid),
      status: u.status,
    });
  }

  async function saveEdit(id: number) {
    if (!secret) return;
    setSaving(true);
    try {
      await postToSheet("adminUpdateUser", {
        adminSecret: secret,
        id,
        ...form,
        amountPaid: form.amountPaid === "" ? "" : Number(form.amountPaid),
      });
      setEditingId(null);
      await refresh();
    } catch {
      setLoadError(true);
    } finally {
      setSaving(false);
    }
  }

  async function toggleStatus(u: AdminUser) {
    if (!secret) return;
    const nextStatus = u.status === "Blocked" ? "Active" : "Blocked";
    await postToSheet("adminUpdateUser", { adminSecret: secret, id: u.id, status: nextStatus });
    await refresh();
  }

  async function deleteUser(u: AdminUser) {
    if (!secret) return;
    if (!window.confirm(`Delete "${u.businessName}"? This cannot be undone.`)) return;
    await postToSheet("adminDeleteUser", { adminSecret: secret, id: u.id });
    await refresh();
  }

  function sendWhatsAppReminder(u: AdminUser) {
    const message = u.licenseExpiry
      ? `Hi ${u.name}, this is a reminder that your PowerBill license for ${u.businessName} expires on ${u.licenseExpiry}. Please renew to avoid any interruption to your billing.`
      : `Hi ${u.name}, this is a reminder about your PowerBill license for ${u.businessName}. Please get in touch to renew.`;
    const digits = u.mobile.replace(/\D/g, "");
    const withCountryCode = digits.length === 10 ? `91${digits}` : digits;
    window.open(`https://wa.me/${withCountryCode}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  if (!secret) {
    return (
      <section className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-24">
        <h1 className="text-center text-2xl font-bold text-ink">Admin login</h1>
        <form onSubmit={handleLogin} className="mt-8 rounded-2xl border border-black/10 bg-white p-6">
          <label className="text-xs font-semibold text-ink/60">Admin key</label>
          <input
            type="password"
            value={secretInput}
            onChange={(e) => setSecretInput(e.target.value)}
            required
            className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-brand-600"
            placeholder="••••••••"
          />
          <button
            type="submit"
            disabled={loggingIn}
            className="mt-4 w-full rounded-lg bg-brand-600 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loggingIn ? "Checking…" : "Log in"}
          </button>
          {loginError && <p className="mt-3 text-center text-xs text-red-600">Invalid admin key.</p>}
        </form>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-ink">Admin dashboard</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 rounded-lg border border-black/10 px-3 py-1.5 text-sm font-medium text-ink/70 hover:bg-black/5"
        >
          <LogOut className="size-4" /> Log out
        </button>
      </div>

      {loadError && (
        <p className="mt-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">
          Something went wrong loading data. Try refreshing.
        </p>
      )}

      {stats && (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-5">
          <StatCard label="Total Users" value={stats.totalUsers} />
          <StatCard label="Active" value={stats.activeCount} />
          <StatCard label="Blocked" value={stats.blockedCount} />
          <StatCard label="Expiring ≤7d" value={stats.expiringSoonCount} />
          <StatCard label="Revenue" value={`₹${stats.totalRevenue.toLocaleString()}`} />
        </div>
      )}

      <div className="mt-8 overflow-x-auto rounded-2xl border border-black/10 bg-white">
        <table className="w-full min-w-[1100px] text-sm">
          <thead>
            <tr className="border-b border-black/10 bg-canvas text-left text-xs font-semibold uppercase tracking-wide text-ink/50">
              <th className="px-4 py-3">Business</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Start</th>
              <th className="px-4 py-3">Reminder</th>
              <th className="px-4 py-3">Expiry</th>
              <th className="px-4 py-3">Paid</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <Fragment key={u.id}>
                <tr className="border-b border-black/5 align-top">
                  <td className="px-4 py-3 font-medium text-ink">{u.businessName}</td>
                  <td className="px-4 py-3 text-ink/70">
                    {u.name}
                    <br />
                    <span className="text-xs text-ink/50">{u.mobile}</span>
                  </td>
                  <td className="px-4 py-3 text-ink/70">{u.businessType}</td>
                  <td className="px-4 py-3 text-ink/70">{u.licenseStart || "—"}</td>
                  <td className="px-4 py-3 text-ink/70">{u.licenseReminder || "—"}</td>
                  <td className="px-4 py-3 text-ink/70">{u.licenseExpiry || "—"}</td>
                  <td className="px-4 py-3 text-ink/70">{u.amountPaid ? `₹${u.amountPaid.toLocaleString()}` : "—"}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        u.status === "Blocked" ? "bg-red-50 text-red-700" : "bg-brand-50 text-brand-700"
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button title="Edit" onClick={() => startEdit(u)} className="text-ink/50 hover:text-brand-600">
                        <Pencil className="size-4" />
                      </button>
                      <button
                        title={u.status === "Blocked" ? "Unblock" : "Block"}
                        onClick={() => toggleStatus(u)}
                        className="text-ink/50 hover:text-brand-600"
                      >
                        {u.status === "Blocked" ? <CheckCircle2 className="size-4" /> : <Ban className="size-4" />}
                      </button>
                      <button
                        title="Send WhatsApp reminder"
                        onClick={() => sendWhatsAppReminder(u)}
                        className="text-ink/50 hover:text-brand-600"
                      >
                        <MessageCircle className="size-4" />
                      </button>
                      <button title="Delete" onClick={() => deleteUser(u)} className="text-ink/50 hover:text-red-600">
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
                {editingId === u.id && (
                  <tr className="border-b border-black/5 bg-canvas">
                    <td colSpan={9} className="px-4 py-4">
                      <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
                        <div>
                          <label className="text-xs font-semibold text-ink/60">Name</label>
                          <input
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="mt-1 w-full rounded-lg border border-black/10 px-2 py-1.5 text-sm outline-none focus:border-brand-600"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-ink/60">Mobile</label>
                          <input
                            value={form.mobile}
                            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                            className="mt-1 w-full rounded-lg border border-black/10 px-2 py-1.5 text-sm outline-none focus:border-brand-600"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-ink/60">Business name</label>
                          <input
                            value={form.businessName}
                            onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                            className="mt-1 w-full rounded-lg border border-black/10 px-2 py-1.5 text-sm outline-none focus:border-brand-600"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-ink/60">Address</label>
                          <input
                            value={form.address}
                            onChange={(e) => setForm({ ...form, address: e.target.value })}
                            className="mt-1 w-full rounded-lg border border-black/10 px-2 py-1.5 text-sm outline-none focus:border-brand-600"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-ink/60">Business type</label>
                          <input
                            value={form.businessType}
                            onChange={(e) => setForm({ ...form, businessType: e.target.value })}
                            className="mt-1 w-full rounded-lg border border-black/10 px-2 py-1.5 text-sm outline-none focus:border-brand-600"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-ink/60">License start</label>
                          <input
                            type="date"
                            value={form.licenseStart}
                            onChange={(e) => setForm({ ...form, licenseStart: e.target.value })}
                            className="mt-1 w-full rounded-lg border border-black/10 px-2 py-1.5 text-sm outline-none focus:border-brand-600"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-ink/60">Reminder date</label>
                          <input
                            type="date"
                            value={form.licenseReminder}
                            onChange={(e) => setForm({ ...form, licenseReminder: e.target.value })}
                            className="mt-1 w-full rounded-lg border border-black/10 px-2 py-1.5 text-sm outline-none focus:border-brand-600"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-ink/60">Expiry date</label>
                          <input
                            type="date"
                            value={form.licenseExpiry}
                            onChange={(e) => setForm({ ...form, licenseExpiry: e.target.value })}
                            className="mt-1 w-full rounded-lg border border-black/10 px-2 py-1.5 text-sm outline-none focus:border-brand-600"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-ink/60">Amount paid (₹)</label>
                          <input
                            type="number"
                            value={form.amountPaid}
                            onChange={(e) => setForm({ ...form, amountPaid: e.target.value })}
                            className="mt-1 w-full rounded-lg border border-black/10 px-2 py-1.5 text-sm outline-none focus:border-brand-600"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-ink/60">Status</label>
                          <select
                            value={form.status}
                            onChange={(e) => setForm({ ...form, status: e.target.value })}
                            className="mt-1 w-full rounded-lg border border-black/10 bg-white px-2 py-1.5 text-sm outline-none focus:border-brand-600"
                          >
                            <option value="Active">Active</option>
                            <option value="Blocked">Blocked</option>
                          </select>
                        </div>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <button
                          onClick={() => saveEdit(u.id)}
                          disabled={saving}
                          className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
                        >
                          {saving ? "Saving…" : "Save"}
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="rounded-lg border border-black/10 px-4 py-2 text-sm font-semibold text-ink/70 hover:bg-black/5"
                        >
                          Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={9} className="px-4 py-10 text-center text-sm text-ink/40">
                  No registered users yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
