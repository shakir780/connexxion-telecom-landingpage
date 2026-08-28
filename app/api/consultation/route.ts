import { NextResponse } from "next/server";

/* ─── Consultation enquiries ───
   The form previously validated in the browser and then threw the data away —
   it showed "Request received" without anything leaving the page. This route
   is the delivery path.

   Set CONSULTATION_WEBHOOK_URL to anything that accepts a JSON POST (Formspree,
   a Zapier/Make hook, an internal endpoint). Until it is set, the route
   answers 503 and the form tells the visitor to phone or email instead. It
   never reports success for an enquiry that went nowhere. */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+()\d][\d\s()-]{6,}$/;

type Payload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  company?: unknown;
  category?: unknown;
  message?: unknown;
};

function str(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  const enquiry = {
    name: str(body.name, 120),
    email: str(body.email, 200),
    phone: str(body.phone, 40),
    company: str(body.company, 160),
    category: str(body.category, 120),
    message: str(body.message, 4000),
  };

  /* Re-validated here rather than trusting the client: the browser checks are
     for the person filling the form, not for the server receiving it. */
  const errors: Record<string, string> = {};
  if (!enquiry.name) errors.name = "Please enter your full name.";
  if (!enquiry.email) errors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(enquiry.email)) errors.email = "Enter a valid email address.";
  if (!enquiry.phone) errors.phone = "Please enter a phone number.";
  else if (!PHONE_RE.test(enquiry.phone)) errors.phone = "Enter a valid phone number.";
  if (!enquiry.category) errors.category = "Please select a category.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  const webhook = process.env.CONSULTATION_WEBHOOK_URL;

  if (!webhook) {
    console.warn(
      "[consultation] CONSULTATION_WEBHOOK_URL is not set — enquiry not delivered:",
      { ...enquiry, message: enquiry.message ? "(omitted)" : "" }
    );
    return NextResponse.json(
      {
        error: "not_configured",
        message:
          "Online booking is not connected yet. Please call or email us and we will pick it up straight away.",
      },
      { status: 503 }
    );
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...enquiry,
        source: "connexxiontelecom.com/consultation",
        receivedAt: new Date().toISOString(),
      }),
    });

    if (!res.ok) {
      console.error("[consultation] webhook rejected the enquiry:", res.status);
      return NextResponse.json(
        {
          error: "delivery_failed",
          message:
            "We could not submit your request just now. Please call or email us instead.",
        },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("[consultation] webhook request failed:", err);
    return NextResponse.json(
      {
        error: "delivery_failed",
        message:
          "We could not submit your request just now. Please call or email us instead.",
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
