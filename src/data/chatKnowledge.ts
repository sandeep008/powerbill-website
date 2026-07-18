export interface KnowledgeEntry {
  id: string;
  /** Shown as a quick-reply chip when the bot doesn't yet know the visitor's intent. */
  quickReply?: string;
  /** Words/phrases that trigger this answer when found in the visitor's message. */
  keywords: string[];
  answer: string;
}

/**
 * A small, hand-written knowledge base powering the site's chat widget. Deliberately not
 * an LLM-backed bot: this is a static site with no backend, and a real AI API needs a paid
 * key + billing someone has to own. Keyword matching against this list costs nothing to run
 * and never goes down, and every answer hands off to a real human (WhatsApp/email) for
 * anything it doesn't cover -- see ChatWidget.tsx.
 */
export const knowledgeBase: KnowledgeEntry[] = [
  {
    id: "offline",
    quickReply: "Does it work offline?",
    keywords: ["offline", "internet", "network", "wifi", "connection"],
    answer:
      "Yes — PowerBill runs fully offline. Billing, inventory, customers, and reports all work with no internet connection. The only things that ever use the internet are optional: Google Drive backup, sending a WhatsApp message, and checking for updates.",
  },
  {
    id: "data",
    quickReply: "Where is my data stored?",
    keywords: ["data", "privacy", "stored", "storage", "cloud", "secure", "security"],
    answer:
      "All your business data lives in a single file on your own computer. It's never uploaded to our servers as part of normal use. The only two things that ever leave your PC are opt-in: your own Google Drive backup, and WhatsApp messages you choose to send.",
  },
  {
    id: "price",
    quickReply: "How much does it cost?",
    keywords: ["price", "pricing", "cost", "plan", "subscription", "fee", "money", "pay"],
    answer:
      "Monthly is ₹999, Quarterly ₹2,699 (save 10%), and Yearly ₹8,999 (save 25%) — no per-transaction fees. There's also a launch offer: a one-time purchase with 3 years of support & updates for ₹9,999 (regular price ₹24,999, save 60%). Start with a free 14-day trial, no card needed.",
  },
  {
    id: "pos-styles",
    quickReply: "What POS styles are available?",
    keywords: ["pos", "checkout", "billing style", "restaurant", "table", "grid", "tiles", "kitchen"],
    answer:
      "Three: Standard (search-box + barcode, great for a general store), Image Grid (tap-to-add product tiles, great for boutiques/bakeries), and Restaurant (table/floor view with kitchen ticket printing). You can switch anytime from Settings.",
  },
  {
    id: "gst",
    quickReply: "Does it support GST?",
    keywords: ["gst", "tax", "cgst", "sgst", "igst"],
    answer:
      "Yes — CGST/SGST vs. IGST is calculated automatically based on your shop's and your customer's state, shown live while billing, with dedicated GST/tax reports.",
  },
  {
    id: "whatsapp",
    quickReply: "Can I send bills on WhatsApp?",
    keywords: ["whatsapp", "message", "reminder", "sms"],
    answer:
      "Yes — send an invoice or a payment reminder straight to a customer's WhatsApp in one click, right from checkout or the customer ledger.",
  },
  {
    id: "language",
    quickReply: "What languages does it support?",
    keywords: ["language", "hindi", "marathi", "english"],
    answer: "PowerBill's UI is available in English, Hindi, and Marathi today.",
  },
  {
    id: "download",
    quickReply: "How do I download it?",
    keywords: ["download", "install", "windows", "setup", "trial"],
    answer:
      "Click the green \"Download for Windows\" button at the top of this page — it always grabs the latest version. It installs on Windows 10/11 and runs as a free trial, no credit card needed.",
  },
  {
    id: "update",
    quickReply: "How do updates work?",
    keywords: ["update", "upgrade", "version", "new release"],
    answer:
      "PowerBill has a built-in \"Check for Updates\" button (About screen) that downloads and installs new versions in place — your data and license are always untouched by an update.",
  },
  {
    id: "expiry",
    keywords: ["expire", "expiry", "renew", "renewal", "lapse", "lock"],
    answer:
      "If a subscription lapses, you get a warning banner, then a 10-day grace period where everything keeps working normally. Only after that does the app lock until a new license is applied — your data is never touched.",
  },
  {
    id: "restaurant",
    keywords: ["restaurant", "cafe", "hotel", "table service", "menu"],
    answer:
      "Yes — the Restaurant POS style gives you table/floor management, per-table running orders that can be held and resumed, and kitchen ticket printing.",
  },
  {
    id: "roles",
    quickReply: "Can multiple staff use it?",
    keywords: ["staff", "user", "role", "permission", "cashier", "manager", "employee"],
    answer:
      "Yes — Admin, Manager, and Cashier roles come built in, and you can build custom roles with per-screen View/Create/Edit/Delete permissions for each staff member.",
  },
  {
    id: "backup",
    keywords: ["backup", "restore", "recover", "lost data"],
    answer:
      "One-click local backup, optional backup to your own Google Drive account, and in-app restore — recovering from a mistake or a new PC never needs outside help.",
  },
  {
    id: "demo",
    quickReply: "Can I get a demo?",
    keywords: ["demo", "trial run", "show me", "walkthrough"],
    answer:
      "Absolutely — tap \"Chat on WhatsApp\" below and tell us a bit about your shop. We'll walk you through the right setup for you.",
  },
];

export const FALLBACK_ANSWER =
  "I don't have a canned answer for that one — but a real person will! Tap \"Chat on WhatsApp\" below and we'll get back to you quickly.";

export function findAnswer(message: string): string {
  const normalized = message.toLowerCase();
  let bestMatch: KnowledgeEntry | null = null;
  let bestScore = 0;

  for (const entry of knowledgeBase) {
    const score = entry.keywords.reduce((count, kw) => (normalized.includes(kw) ? count + 1 : count), 0);
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  return bestMatch ? bestMatch.answer : FALLBACK_ANSWER;
}
