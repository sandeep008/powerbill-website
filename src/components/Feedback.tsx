import { useEffect, useState } from "react";
import { MessageSquareText, Star } from "lucide-react";

interface FeedbackEntry {
  id: string;
  name: string;
  shop: string;
  rating: number;
  comment: string;
  createdAt: number;
}

const STORAGE_KEY = "powerbill_feedback";

function loadFeedback(): FeedbackEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as FeedbackEntry[]) : [];
  } catch {
    return [];
  }
}

function saveFeedback(entries: FeedbackEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

function timeAgo(ts: number): string {
  const seconds = Math.floor((Date.now() - ts) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

/**
 * A real submit-and-display feedback wall. This is a static site with no backend, so
 * entries are stored in the visitor's own browser (localStorage) rather than a shared
 * server -- see the caption under the form. Deliberately not pre-seeded with invented
 * testimonials, since that would be presenting fabricated quotes as genuine reviews.
 */
export function Feedback() {
  const [entries, setEntries] = useState<FeedbackEntry[]>([]);
  const [name, setName] = useState("");
  const [shop, setShop] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setEntries(loadFeedback());
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    const entry: FeedbackEntry = {
      id: crypto.randomUUID(),
      name: name.trim(),
      shop: shop.trim(),
      rating,
      comment: comment.trim(),
      createdAt: Date.now(),
    };

    const updated = [entry, ...entries];
    setEntries(updated);
    saveFeedback(updated);
    setName("");
    setShop("");
    setRating(5);
    setComment("");
    setSubmitted(true);
    window.setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <section id="feedback" className="mx-auto max-w-5xl px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          What shopkeepers are saying
        </h2>
        <p className="mt-4 text-lg text-ink/60">
          Used PowerBill in your shop? Tell other shop owners what you think.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-10 max-w-xl rounded-2xl border border-black/10 bg-white p-6"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-semibold text-ink/60">Your name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-brand-600"
              placeholder="Ramesh Patil"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-ink/60">Shop name (optional)</label>
            <input
              value={shop}
              onChange={(e) => setShop(e.target.value)}
              className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-brand-600"
              placeholder="Shree Krishna General Store"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="text-xs font-semibold text-ink/60">Rating</label>
          <div className="mt-1 flex gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                aria-label={`${n} star`}
                onMouseEnter={() => setHoverRating(n)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(n)}
              >
                <Star
                  className={`size-6 ${
                    n <= (hoverRating || rating) ? "text-gold-400" : "text-black/15"
                  }`}
                  fill={n <= (hoverRating || rating) ? "currentColor" : "none"}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <label className="text-xs font-semibold text-ink/60">Your feedback</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            rows={3}
            className="mt-1 w-full resize-none rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-brand-600"
            placeholder="What's working well, and what would you improve?"
          />
        </div>

        <button
          type="submit"
          className="mt-4 w-full rounded-lg bg-brand-600 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
        >
          {submitted ? "Thanks for the feedback!" : "Submit feedback"}
        </button>
        <p className="mt-3 text-center text-xs text-ink/40">
          This is a static site with no server, so feedback is saved in your own browser and
          shown below — it isn't shared across visitors yet.
        </p>
      </form>

      <div className="mx-auto mt-10 max-w-2xl space-y-4">
        {entries.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-black/15 py-12 text-center text-ink/40">
            <MessageSquareText className="size-8" />
            <p className="text-sm">No feedback yet — be the first to share your experience!</p>
          </div>
        ) : (
          entries.map((entry) => (
            <div key={entry.id} className="rounded-2xl border border-black/10 bg-white p-5">
              <div className="flex items-center justify-between">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star
                      key={n}
                      className={`size-4 ${n <= entry.rating ? "text-gold-400" : "text-black/15"}`}
                      fill={n <= entry.rating ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                <span className="text-xs text-ink/40">{timeAgo(entry.createdAt)}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink/80">{entry.comment}</p>
              <div className="mt-3 text-xs font-semibold text-ink">
                {entry.name}
                {entry.shop && <span className="font-normal text-ink/50"> · {entry.shop}</span>}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
