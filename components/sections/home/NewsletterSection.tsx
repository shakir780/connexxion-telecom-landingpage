"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE_OUT = "easeOut" as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ─── Checkmark icon ─── */
function CheckIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12l5 5L20 6" />
    </svg>
  );
}

/* ─── Main Export ───
   A contained panel on the page's own dark ground rather than a full-bleed
   green band: the green is a tint and a border, and the CTA button carries the
   only solid fill. Submit behaviour is unchanged. */
export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (!EMAIL_RE.test(email)) {
      setError("Enter a valid email address.");
      return;
    }

    setError("");
    setLoading(true);

    // TODO: replace with a real call to your CRM / email marketing platform
    // (e.g. Mailchimp, HubSpot, ConvertKit, Brevo) once a provider + API
    // credentials are available — e.g.:
    // await fetch("/api/newsletter", {
    //   method: "POST",
    //   body: JSON.stringify({ email }),
    // });
    await new Promise((resolve) => setTimeout(resolve, 600));

    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section className="relative overflow-hidden" style={{ background: "var(--bg)" }}>
      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12 sm:py-14 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="rounded-xl px-6 py-8 sm:px-10 sm:py-9 lg:px-12"
          style={{
            background: "rgba(34,197,94,0.05)",
            border: "1px solid rgba(34,197,94,0.18)",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 lg:items-center">
            {/* Left: the pitch */}
            <div className="lg:col-span-6">
              <span
                className="text-[10px] font-bold uppercase tracking-[0.24em]"
                style={{ color: "var(--green-text)" }}
              >
                Stay Informed
              </span>
              <h2
                className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight"
                style={{ color: "var(--text-1)" }}
              >
                Stay in the loop.
              </h2>
              <p
                className="mt-2.5 text-sm sm:text-base leading-relaxed max-w-md"
                style={{ color: "var(--text-2)" }}
              >
                Practical insights on technology, business and digital
                transformation, delivered occasionally.
              </p>
            </div>

            {/* Right: the form */}
            <div className="lg:col-span-6">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: EASE_OUT }}
                    className="flex items-center gap-3 px-4 min-h-12 rounded-lg"
                    style={{
                      background: "rgba(34,197,94,0.1)",
                      border: "1px solid rgba(34,197,94,0.3)",
                      color: "var(--green-text)",
                    }}
                  >
                    <CheckIcon />
                    <p className="text-sm font-semibold">
                      You&apos;re subscribed! Check your inbox to confirm.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    onSubmit={handleSubmit}
                    noValidate
                  >
                    <div className="flex flex-col sm:flex-row gap-2.5">
                      <div className="flex-1">
                        <label htmlFor="newsletter-email" className="sr-only">
                          Email address
                        </label>
                        <input
                          id="newsletter-email"
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (error) setError("");
                          }}
                          placeholder="Your email address"
                          className="w-full px-4 min-h-12 rounded-lg text-sm outline-none"
                          style={{
                            background: "var(--bg-input)",
                            border: error
                              ? "1px solid var(--danger)"
                              : "1px solid var(--border-3)",
                            color: "var(--text-1)",
                          }}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="btn-pill group inline-flex shrink-0 items-center justify-center gap-2 px-6 min-h-12 rounded-lg font-bold text-sm transition-all duration-300 disabled:opacity-70"
                        style={{ background: "var(--green-fill)", color: "var(--on-green)" }}
                      >
                        {loading ? "Subscribing…" : "Subscribe"}
                        {!loading && (
                          <svg
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1"
                          >
                            <path
                              fillRule="evenodd"
                              d="M2 8a.75.75 0 01.75-.75h8.69L8.22 4.03a.75.75 0 011.06-1.06l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 01-1.06-1.06l3.22-3.22H2.75A.75.75 0 012 8z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </button>
                    </div>

                    {error && (
                      <span
                        className="block mt-2 text-xs font-medium"
                        style={{ color: "var(--danger)" }}
                      >
                        {error}
                      </span>
                    )}

                    <p className="mt-3 text-xs" style={{ color: "var(--text-4)" }}>
                      No spam. Unsubscribe anytime.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
