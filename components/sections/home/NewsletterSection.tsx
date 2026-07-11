"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE_OUT = "easeOut" as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ─── Checkmark icon ─── */
function CheckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12l5 5L20 6" />
    </svg>
  );
}

/* ─── Main Export ─── */
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
    <section
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)" }}
    >
      {/* Subtle radial glow for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 80% at 50% 0%, rgba(255,255,255,0.12) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24 flex flex-col items-center text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white"
        >
          Join Our Community
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.1 }}
          className="mt-4 text-base sm:text-lg leading-relaxed max-w-lg"
          style={{ color: "rgba(255,255,255,0.85)" }}
        >
          Get the latest news from our front desk sent to your inbox weekly.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.2 }}
          className="mt-9 w-full max-w-md"
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: EASE_OUT }}
                className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl"
                style={{ background: "rgba(255,255,255,0.96)" }}
              >
                <CheckIcon />
                <p className="text-sm font-semibold" style={{ color: "#14532d" }}>
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
                className="flex flex-col sm:flex-row gap-3"
              >
                <div className="flex-1 text-left">
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
                    placeholder="jane@email.com"
                    className="w-full px-4 py-3.5 rounded-xl text-sm outline-none placeholder:text-[#4b5563]"
                    style={{
                      background: "#ffffff",
                      border: error ? "1px solid #fca5a5" : "1px solid transparent",
                      color: "#0f172a",
                    }}
                  />
                  {error && (
                    <span className="block mt-1.5 text-xs font-medium text-left" style={{ color: "#fecaca" }}>
                      {error}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="shrink-0 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 disabled:opacity-70"
                  style={{
                    background: "#0f172a",
                    color: "#ffffff",
                  }}
                >
                  {loading ? "Subscribing…" : "Subscribe"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.3 }}
          className="mt-6 text-xs"
          style={{ color: "rgba(255,255,255,0.65)" }}
        >
          GDPR Compliant. We&apos;ll never share your email or spam you.
        </motion.p>
      </div>
    </section>
  );
}
