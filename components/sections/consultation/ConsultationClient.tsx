"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Eyebrow, ArrowRight, Breadcrumb } from "@/components/ui/section-parts";
import { SOLUTION_CATEGORIES } from "@/lib/nav-data";

const EASE_OUT = "easeOut" as const;

/* Contact details are the same ones the footer publishes. They sit on this
   page too because a booking form that cannot reach anybody is a dead end —
   if delivery fails, the visitor still has a phone number in front of them. */
const PHONE_DISPLAY = "+234 0 901 640 0000";
const PHONE_HREF = "tel:+2349016400000";
const EMAIL = "info@connexxiontelecom.com";

const STEPS = [
  {
    title: "You send the brief",
    body: "The form below, or a call if you would rather talk. Nothing is required beyond a name, a way to reach you and a rough idea of the area.",
  },
  {
    title: "We come back within one business day",
    body: "With either a time for the call, or a question if we need to know more before putting the right person on it.",
  },
  {
    title: "You get an engineer, not a script",
    body: "The first conversation is about the problem, not a product. If you do not need what you came asking for, we will say so.",
  },
];

interface FormState {
  name: string;
  email: string;
  phone: string;
  company: string;
  category: string;
  message: string;
}

const INITIAL_STATE: FormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  category: "",
  message: "",
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+()\d][\d\s()-]{6,}$/;

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = "Please enter your full name.";
  if (!values.email.trim()) errors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(values.email)) errors.email = "Enter a valid email address.";
  if (!values.phone.trim()) errors.phone = "Please enter a phone number.";
  else if (!PHONE_RE.test(values.phone)) errors.phone = "Enter a valid phone number.";
  if (!values.category) errors.category = "Please select a category.";
  return errors;
}

/* ─── Field wrapper ─── */
function Field({
  label,
  htmlFor,
  error,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={htmlFor}
        className="text-xs font-semibold tracking-wide"
        style={{ color: "var(--text-2)" }}
      >
        {label}{" "}
        {optional && <span style={{ color: "var(--text-4)" }}>(optional)</span>}
      </label>
      {children}
      {error && (
        <span id={`${htmlFor}-error`} className="text-xs" style={{ color: "var(--danger)" }}>
          {error}
        </span>
      )}
    </div>
  );
}

const inputStyle = (hasError: boolean) => ({
  background: "var(--bg-input)",
  border: `1px solid ${hasError ? "var(--danger)" : "var(--border-3)"}`,
  color: "var(--text-1)",
});

const inputClass = "px-4 min-h-11 py-2.5 rounded-lg text-sm outline-none w-full";

export default function ConsultationClient() {
  /* A CTA can arrive here carrying the subject the visitor was reading about
     — /consultation?topic=Billing%20%26%20Revenue%20Management — so the
     category is already chosen when the form loads. */
  const searchParams = useSearchParams();
  const topic = searchParams.get("topic") ?? "";
  const presetCategory = SOLUTION_CATEGORIES.find(
    (c) => c.toLowerCase() === topic.toLowerCase()
  );

  const [values, setValues] = useState<FormState>({
    ...INITIAL_STATE,
    category: presetCategory ?? "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [failure, setFailure] = useState<string | null>(null);

  const setField =
    (field: keyof FormState) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setFailure(null);
    if (Object.keys(nextErrors).length > 0) return;

    setSending(true);
    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json().catch(() => ({}));
        if (data.errors) setErrors(data.errors);
        setFailure(
          data.message ??
            "We could not submit your request just now. Please call or email us instead."
        );
      }
    } catch {
      setFailure(
        "We could not reach the server. Please check your connection, or call or email us instead."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen" style={{ background: "var(--bg)" }}>
      {/* No photographic hero here, so the bar keeps its panel from the
          first paint rather than fading in on scroll. */}
      <Navbar solid />

      <main className="flex-1 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(34,197,94,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.025) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage: "linear-gradient(180deg, black 0%, transparent 85%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-32 sm:pt-36 lg:pt-40 pb-16 sm:pb-20 lg:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
          >
            <Breadcrumb
              trail={[{ label: "Home", href: "/" }, { label: "Book a Consultation" }]}
            />
          </motion.div>

          <div className="mt-7 grid lg:grid-cols-12 gap-10 lg:gap-14">
            {/* ── Left: what this is, what happens next, how else to reach us ── */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: EASE_OUT, delay: 0.06 }}
              className="lg:col-span-5 flex flex-col gap-10"
            >
              <div>
                <h1
                  className="text-3xl sm:text-4xl lg:text-[3rem] font-extrabold tracking-[-0.03em] leading-[1.05]"
                  style={{ color: "var(--text-1)" }}
                >
                  Book a consultation.
                </h1>
                <p
                  className="mt-6 max-w-md text-base sm:text-lg leading-relaxed"
                  style={{ color: "var(--text-2)" }}
                >
                  Tell us what you are working on. The first conversation is
                  free, and it is with someone who can actually answer the
                  technical question.
                </p>
              </div>

              <div>
                <Eyebrow>What happens next</Eyebrow>
                <ol className="mt-6 flex flex-col">
                  {STEPS.map((step, i) => (
                    <li
                      key={step.title}
                      className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 py-5 border-t"
                      style={{ borderColor: "var(--border-2)" }}
                    >
                      <span
                        className="text-sm font-mono tabular-nums pt-0.5"
                        style={{ color: "var(--green-text)" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h2
                        className="text-base font-bold leading-snug"
                        style={{ color: "var(--text-1)" }}
                      >
                        {step.title}
                      </h2>
                      <p
                        className="col-start-2 text-sm leading-relaxed"
                        style={{ color: "var(--text-3)" }}
                      >
                        {step.body}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <Eyebrow>Or reach us directly</Eyebrow>
                <div className="mt-6 flex flex-col gap-4">
                  <a
                    href={PHONE_HREF}
                    className="flex flex-col transition-colors duration-200 hover:text-(--text-1)"
                    style={{ color: "var(--text-2)" }}
                  >
                    <span
                      className="text-[10px] font-bold uppercase tracking-[0.18em]"
                      style={{ color: "var(--text-4)" }}
                    >
                      Phone
                    </span>
                    <span className="mt-1 text-base font-semibold whitespace-nowrap">
                      {PHONE_DISPLAY}
                    </span>
                  </a>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="flex flex-col transition-colors duration-200 hover:text-(--text-1)"
                    style={{ color: "var(--text-2)" }}
                  >
                    <span
                      className="text-[10px] font-bold uppercase tracking-[0.18em]"
                      style={{ color: "var(--text-4)" }}
                    >
                      Email
                    </span>
                    <span className="mt-1 text-base font-semibold whitespace-nowrap">
                      {EMAIL}
                    </span>
                  </a>
                  <div className="flex flex-col">
                    <span
                      className="text-[10px] font-bold uppercase tracking-[0.18em]"
                      style={{ color: "var(--text-4)" }}
                    >
                      Office
                    </span>
                    <span
                      className="mt-1 text-base leading-relaxed"
                      style={{ color: "var(--text-2)" }}
                    >
                      2A Iller Crescent, Off Katsina Ala,
                      <br />
                      Maitama, FCT Abuja, Nigeria
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── Right: the form ── */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: EASE_OUT, delay: 0.12 }}
              className="lg:col-span-7"
            >
              <div
                className="rounded-xl p-6 sm:p-8 lg:p-10"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-1)",
                }}
              >
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE_OUT }}
                      className="flex flex-col gap-5 py-6"
                    >
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center"
                        style={{
                          background: "rgba(34,197,94,0.12)",
                          border: "1px solid rgba(34,197,94,0.3)",
                        }}
                      >
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="var(--green-text)"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M4 12l5 5L20 6" />
                        </svg>
                      </div>
                      <h2
                        className="text-2xl font-extrabold tracking-tight"
                        style={{ color: "var(--text-1)" }}
                      >
                        Request received.
                      </h2>
                      <p
                        className="text-base leading-relaxed max-w-md"
                        style={{ color: "var(--text-2)" }}
                      >
                        Thanks{values.name.trim() ? `, ${values.name.trim().split(" ")[0]}` : ""}.
                        We will come back to you within one business day. If it
                        is urgent, call {PHONE_DISPLAY}.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <Link
                          href="/"
                          className="group inline-flex items-center justify-center gap-2.5 min-h-12 px-7 rounded-full text-sm font-bold transition-transform duration-200 hover:-translate-y-0.5"
                          style={{ background: "var(--green-text)", color: "var(--on-green)" }}
                        >
                          Back to Home
                          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                        </Link>
                        <Link
                          href="/about/why-us"
                          className="inline-flex items-center justify-center gap-2.5 min-h-12 px-7 rounded-full text-sm font-semibold transition-colors duration-200"
                          style={{
                            border: "1px solid var(--border-3)",
                            color: "var(--text-1)",
                          }}
                        >
                          Why Us?
                        </Link>
                      </div>
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
                      className="flex flex-col gap-5"
                    >
                      <div className="grid sm:grid-cols-2 gap-5">
                        <Field label="Full Name" htmlFor="name" error={errors.name}>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            value={values.name}
                            onChange={setField("name")}
                            placeholder="Jane Doe"
                            aria-invalid={!!errors.name}
                            aria-describedby={errors.name ? "name-error" : undefined}
                            className={inputClass}
                            style={inputStyle(!!errors.name)}
                          />
                        </Field>

                        <Field label="Company Name" htmlFor="company" optional>
                          <input
                            id="company"
                            name="company"
                            type="text"
                            autoComplete="organization"
                            value={values.company}
                            onChange={setField("company")}
                            placeholder="Acme Corporation"
                            className={inputClass}
                            style={inputStyle(false)}
                          />
                        </Field>

                        <Field label="Email Address" htmlFor="email" error={errors.email}>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            value={values.email}
                            onChange={setField("email")}
                            placeholder="jane@company.com"
                            aria-invalid={!!errors.email}
                            aria-describedby={errors.email ? "email-error" : undefined}
                            className={inputClass}
                            style={inputStyle(!!errors.email)}
                          />
                        </Field>

                        <Field label="Phone Number" htmlFor="phone" error={errors.phone}>
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            autoComplete="tel"
                            value={values.phone}
                            onChange={setField("phone")}
                            placeholder="+234 901 640 0000"
                            aria-invalid={!!errors.phone}
                            aria-describedby={errors.phone ? "phone-error" : undefined}
                            className={inputClass}
                            style={inputStyle(!!errors.phone)}
                          />
                        </Field>
                      </div>

                      <Field label="What is it about?" htmlFor="category" error={errors.category}>
                        <select
                          id="category"
                          name="category"
                          value={values.category}
                          onChange={setField("category")}
                          aria-invalid={!!errors.category}
                          aria-describedby={errors.category ? "category-error" : undefined}
                          className={inputClass}
                          style={inputStyle(!!errors.category)}
                        >
                          <option value="" disabled>
                            Select a category
                          </option>
                          {SOLUTION_CATEGORIES.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </Field>

                      <Field label="Additional Details" htmlFor="message" optional>
                        <textarea
                          id="message"
                          name="message"
                          value={values.message}
                          onChange={setField("message")}
                          placeholder="What is happening today, and what needs to change?"
                          rows={5}
                          className="px-4 py-3 rounded-lg text-sm outline-none resize-none w-full"
                          style={inputStyle(false)}
                        />
                      </Field>

                      {/* Delivery failure is stated plainly with a way through,
                          rather than a success screen over a lost enquiry. */}
                      {failure && (
                        <div
                          role="alert"
                          className="flex flex-col gap-2 p-4 rounded-lg text-sm leading-relaxed"
                          style={{
                            background: "rgba(248,113,113,0.08)",
                            border: "1px solid rgba(248,113,113,0.28)",
                            color: "var(--text-2)",
                          }}
                        >
                          <span>{failure}</span>
                          <span>
                            <a
                              href={PHONE_HREF}
                              className="font-semibold whitespace-nowrap"
                              style={{ color: "var(--green-text)" }}
                            >
                              {PHONE_DISPLAY}
                            </a>
                            <span style={{ color: "var(--text-4)" }}> · </span>
                            <a
                              href={`mailto:${EMAIL}`}
                              className="font-semibold whitespace-nowrap"
                              style={{ color: "var(--green-text)" }}
                            >
                              {EMAIL}
                            </a>
                          </span>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={sending}
                        className="btn-pill inline-flex items-center justify-center gap-2.5 mt-1 min-h-12 px-7 rounded-full font-bold text-sm transition-transform duration-200 hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
                        style={{ background: "var(--green-text)", color: "var(--on-green)" }}
                      >
                        {sending ? "Sending…" : "Book Free Consultation"}
                      </button>

                      {/* The page that collects the data is the right place
                          to link the policy governing it. */}
                      <p className="text-xs leading-relaxed" style={{ color: "var(--text-3)" }}>
                        By submitting, you agree to be contacted by Connexxion
                        Telecom about your request. See our{" "}
                        <Link
                          href="/legal/privacy-policy"
                          className="underline underline-offset-2 transition-opacity duration-200 hover:opacity-80"
                          style={{ color: "var(--green-text)" }}
                        >
                          Privacy Policy
                        </Link>
                        .
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
