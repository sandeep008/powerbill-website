import { useEffect, useState } from "react";
import { Building2, MapPin, Phone, Store, User } from "lucide-react";
import { postToSheet, getFromSheet, isBackendConfigured } from "../lib/backend";
import { Reveal } from "../components/Reveal";
import { CtaBand } from "../components/CtaBand";

const BUSINESS_TYPES = [
  "Kirana / General Store",
  "Restaurant / Cafe",
  "Boutique / Apparel",
  "Supermarket",
  "Pharmacy",
  "Other",
];

interface Business {
  businessName: string;
  businessType: string;
}

function BusinessDirectory() {
  const [businesses, setBusinesses] = useState<Business[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!isBackendConfigured()) return;
    getFromSheet("businesses")
      .then((data) => setBusinesses(data as Business[]))
      .catch(() => setError(true));
  }, []);

  if (!isBackendConfigured()) {
    return (
      <p className="text-center text-sm text-ink/40">
        The business directory isn't connected yet — check back soon.
      </p>
    );
  }

  if (error) {
    return <p className="text-center text-sm text-ink/40">Couldn't load the directory right now.</p>;
  }

  if (!businesses) {
    return <p className="text-center text-sm text-ink/40">Loading businesses…</p>;
  }

  if (businesses.length === 0) {
    return (
      <p className="text-center text-sm text-ink/40">
        No businesses listed yet — be the first to register above!
      </p>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {businesses.map((b, i) => (
        <div key={i} className="flex items-center gap-3 rounded-xl border border-black/10 bg-white p-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
            <Store className="size-5" />
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-ink">{b.businessName}</div>
            <div className="truncate text-xs text-ink/50">{b.businessType}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function Register() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [address, setAddress] = useState("");
  const [businessType, setBusinessType] = useState(BUSINESS_TYPES[0]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !mobile.trim() || !businessName.trim()) return;

    setSubmitting(true);
    setError(false);
    try {
      await postToSheet("register", {
        name: name.trim(),
        mobile: mobile.trim(),
        businessName: businessName.trim(),
        address: address.trim(),
        businessType,
      });
      setName("");
      setMobile("");
      setBusinessName("");
      setAddress("");
      setBusinessType(BUSINESS_TYPES[0]);
      setSubmitted(true);
      window.setTimeout(() => setSubmitted(false), 4000);
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <section className="bg-white py-24">
        <Reveal className="mx-auto max-w-2xl px-6 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">Register your business</h1>
          <p className="mt-4 text-lg text-ink/60">
            Using PowerBill in your shop or restaurant? Get listed in our directory below.
          </p>
        </Reveal>

        <Reveal delay={120} className="mx-auto mt-10 max-w-xl px-6">
          <form onSubmit={handleSubmit} className="rounded-2xl border border-black/10 bg-canvas p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-ink/60">
                  <User className="size-3.5" /> Your name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-brand-600"
                  placeholder="Ramesh Patil"
                />
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-ink/60">
                  <Phone className="size-3.5" /> Mobile number
                </label>
                <input
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                  type="tel"
                  inputMode="tel"
                  pattern="[0-9+ ]{7,15}"
                  className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-brand-600"
                  placeholder="98765 43210"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-ink/60">
                <Building2 className="size-3.5" /> Business name
              </label>
              <input
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                required
                className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-brand-600"
                placeholder="Shree Krishna General Store"
              />
            </div>

            <div className="mt-4">
              <label className="flex items-center gap-1.5 text-xs font-semibold text-ink/60">
                <MapPin className="size-3.5" /> Address
              </label>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-brand-600"
                placeholder="Area, City"
              />
            </div>

            <div className="mt-4">
              <label className="text-xs font-semibold text-ink/60">Business type</label>
              <select
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                className="mt-1 w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-brand-600"
              >
                {BUSINESS_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={submitting || !isBackendConfigured()}
              className="mt-6 w-full rounded-lg bg-brand-600 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitted ? "Registered — thank you!" : submitting ? "Submitting…" : "Register"}
            </button>

            {!isBackendConfigured() && (
              <p className="mt-3 text-center text-xs text-ink/40">Registration isn't connected yet — check back soon.</p>
            )}
            {error && (
              <p className="mt-3 text-center text-xs text-red-600">Something went wrong — please try again.</p>
            )}
          </form>
        </Reveal>
      </section>

      <section className="bg-canvas py-20">
        <Reveal className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">Businesses using PowerBill</h2>
        </Reveal>
        <Reveal delay={120} className="mx-auto mt-10 max-w-5xl px-6">
          <BusinessDirectory />
        </Reveal>
      </section>

      <CtaBand />
    </>
  );
}
