import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

const WHATSAPP_NUMBER = "919096322912";
const WHATSAPP_DEMO_TEXT = encodeURIComponent(
  "Hi PowerBill team, I'd like to request a demo of PowerBill for my shop."
);
const WHATSAPP_SUPPORT_TEXT = encodeURIComponent("Hi PowerBill team, I need some support with PowerBill.");
const SUPPORT_EMAIL = "support@powerbilltech.in";

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Talk to us — get a demo or support
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink/60">
            Want to see PowerBill running for your specific kind of shop before you install it?
            Or already a customer and need a hand? We respond fastest on WhatsApp.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_DEMO_TEXT}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white hover:bg-brand-700"
            >
              <MessageCircle className="size-5" />
              Request a Demo on WhatsApp
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_SUPPORT_TEXT}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-ink/15 px-6 py-3.5 text-sm font-semibold text-ink hover:bg-ink/5"
            >
              <MessageCircle className="size-5" />
              Get Support on WhatsApp
            </a>
          </div>

          <dl className="mt-10 space-y-4">
            <div className="flex items-center gap-3">
              <Phone className="size-5 text-brand-600" />
              <dd className="text-sm text-ink/70">+91 90963 22912</dd>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="size-5 text-brand-600" />
              <dd className="text-sm text-ink/70">
                <a href={`mailto:${SUPPORT_EMAIL}`} className="hover:text-ink">
                  {SUPPORT_EMAIL}
                </a>
              </dd>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0 text-brand-600" />
              <dd className="text-sm text-ink/70">
                Pune, Maharashtra, India
              </dd>
            </div>
          </dl>
        </div>

        <div className="rounded-2xl border border-black/5 bg-white p-8">
          <h3 className="text-lg font-semibold text-ink">Before you reach out</h3>
          <ul className="mt-4 space-y-3 text-sm text-ink/60">
            <li>
              For a demo, tell us a bit about your shop (retail, restaurant, or something else)
              and we'll walk you through the right POS style for you.
            </li>
            <li>
              For support, your Machine ID (shown on the Activation screen) helps us look up your
              license quickly.
            </li>
            <li>
              Prefer email? Write to us any time — we typically reply within one business day.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
