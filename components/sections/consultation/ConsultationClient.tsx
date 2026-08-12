"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SOLUTION_CATEGORIES } from "@/lib/nav-data";

const EASE_OUT = "easeOut" as const;

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
  if (!values.category) errors.category = "Please select a solutions category.";
  return errors;
}

/* ─── Background decoration ─── */
function PageBackground() {
  return (
    <>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,197,94,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.03) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 20%, transparent 90%)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 700,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(34,197,94,0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
    </>
  );
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
      <label htmlFor={htmlFor} className="text-xs font-semibold tracking-wide" style={{ color: "var(--text-2)" }}>
        {label} {optional && <span style={{ color: "var(--text-4)" }}>(optional)</span>}
      </label>
      {children}
      {error && (
        <span className="text-xs" style={{ color: "var(--danger)" }}>
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

export default function ConsultationClient() {
  const [values, setValues] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const setField = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) setSubmitted(true);
  };

  return (
    <div className="flex flex-col min-h-screen" style={{ background: "var(--bg)" }}>
      <Navbar />

      <main className="flex-1 relative overflow-hidden pt-28 pb-20 lg:pt-32 lg:pb-28">
        <PageBackground />

        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="text-center mb-10"
          >
            <span
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase mb-5"
              style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", color: "var(--green-text)" }}
            >
              Free Consultation
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3" style={{ color: "var(--text-1)" }}>
              Let&apos;s talk about your network
            </h1>
            <p className="text-sm sm:text-base leading-relaxed max-w-md mx-auto" style={{ color: "var(--text-3)" }}>
              Tell us a bit about your organization and what you need. Our team
              will reach out within one business day to schedule your free
              consultation.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.1 }}
            className="rounded-3xl p-6 sm:p-8"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border-1)", boxShadow: "var(--shadow-lg)" }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE_OUT }}
                  className="flex flex-col items-center text-center gap-4 py-8"
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.3)" }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--green-text)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 12l5 5L20 6" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold" style={{ color: "var(--text-1)" }}>
                    Request received
                  </h2>
                  <p className="text-sm max-w-sm" style={{ color: "var(--text-3)" }}>
                    Thanks, {values.name.split(" ")[0]}. A member of our team will
                    contact you shortly to schedule your free consultation.
                  </p>
                  <Link
                    href="/"
                    className="btn-pill mt-2 inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm text-white"
                    style={{ background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)" }}
                  >
                    Back to Home
                  </Link>
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
                        type="text"
                        value={values.name}
                        onChange={setField("name")}
                        placeholder="Jane Doe"
                        className="px-4 py-2.5 rounded-xl text-sm outline-none"
                        style={inputStyle(!!errors.name)}
                      />
                    </Field>

                    <Field label="Company Name" htmlFor="company" optional>
                      <input
                        id="company"
                        type="text"
                        value={values.company}
                        onChange={setField("company")}
                        placeholder="Acme Corporation"
                        className="px-4 py-2.5 rounded-xl text-sm outline-none"
                        style={inputStyle(false)}
                      />
                    </Field>

                    <Field label="Email Address" htmlFor="email" error={errors.email}>
                      <input
                        id="email"
                        type="email"
                        value={values.email}
                        onChange={setField("email")}
                        placeholder="jane@company.com"
                        className="px-4 py-2.5 rounded-xl text-sm outline-none"
                        style={inputStyle(!!errors.email)}
                      />
                    </Field>

                    <Field label="Phone Number" htmlFor="phone" error={errors.phone}>
                      <input
                        id="phone"
                        type="tel"
                        value={values.phone}
                        onChange={setField("phone")}
                        placeholder="+234 901 640 0000"
                        className="px-4 py-2.5 rounded-xl text-sm outline-none"
                        style={inputStyle(!!errors.phone)}
                      />
                    </Field>
                  </div>

                  <Field label="Solutions Category" htmlFor="category" error={errors.category}>
                    <select
                      id="category"
                      value={values.category}
                      onChange={setField("category")}
                      className="px-4 py-2.5 rounded-xl text-sm outline-none"
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
                      value={values.message}
                      onChange={setField("message")}
                      placeholder="Tell us about your project, timeline, or specific requirements..."
                      rows={4}
                      className="px-4 py-2.5 rounded-xl text-sm outline-none resize-none"
                      style={inputStyle(false)}
                    />
                  </Field>

                  <button
                    type="submit"
                    className="btn-pill relative group inline-flex items-center justify-center gap-2 mt-2 px-6 py-3.5 rounded-full font-bold text-sm text-white overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
                    style={{
                      background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                    }}
                  >
                    <span
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)" }}
                    />
                    <span className="relative">Book Free Consultation</span>
                  </button>

                  <p className="text-xs text-center" style={{ color: "var(--text-4)" }}>
                    By submitting, you agree to be contacted by Connexxion Telecom
                    about your request.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
