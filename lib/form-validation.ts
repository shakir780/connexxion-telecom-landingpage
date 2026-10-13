/* Shared by the forms (for the person typing) and the API routes (which
   never trust the browser), so both apply the same rules and messages. */

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE_RE = /^[+()\d][\d\s()-]{6,}$/;

export interface ConsultationInput {
  name: string;
  email: string;
  phone: string;
  company: string;
  category: string;
  message: string;
}

export type ConsultationErrors = Partial<Record<keyof ConsultationInput, string>>;

export function validateConsultation(values: ConsultationInput): ConsultationErrors {
  const errors: ConsultationErrors = {};
  if (!values.name.trim()) errors.name = "Please enter your full name.";
  if (!values.email.trim()) errors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(values.email)) errors.email = "Enter a valid email address.";
  if (!values.phone.trim()) errors.phone = "Please enter a phone number.";
  else if (!PHONE_RE.test(values.phone)) errors.phone = "Enter a valid phone number.";
  if (!values.category) errors.category = "Please select a category.";
  return errors;
}

export function validateEmail(email: string): string | null {
  if (!email.trim()) return "Please enter your email address.";
  if (!EMAIL_RE.test(email)) return "Enter a valid email address.";
  return null;
}
