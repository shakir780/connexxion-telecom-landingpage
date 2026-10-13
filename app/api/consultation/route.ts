import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { validateConsultation } from "@/lib/form-validation";

/* ─── Consultation enquiries ───
   Each enquiry is saved to the consultations table and shows up in /admin.
   If CONSULTATION_WEBHOOK_URL is set, a copy is also forwarded there (Zapier,
   Slack, email relay…); that copy is best-effort and never fails the request,
   because the enquiry is already safe in the database.

   The route never reports success for an enquiry that was not saved — on a
   failure the form tells the visitor to phone or email instead. */

const FAILED =
  "We could not submit your request just now. Please call or email us instead.";

/* Same address, more than this many times an hour, is a script or a
   double-clicker; either way the enquiry is already with us. */
const HOURLY_LIMIT_PER_EMAIL = 3;

type Payload = Record<string, unknown>;

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

  /* Honeypot: a field people never see. Bots fill it; they get a success
     response so they move on, and nothing is saved. */
  if (str(body.website, 200)) {
    return NextResponse.json({ ok: true });
  }

  const enquiry = {
    name: str(body.name, 120),
    email: str(body.email, 200).toLowerCase(),
    phone: str(body.phone, 40),
    company: str(body.company, 160),
    category: str(body.category, 120),
    message: str(body.message, 4000),
  };

  const errors = validateConsultation(enquiry);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  try {
    const sql = db();
    const [{ count }] = await sql<{ count: number }[]>`
      select count(*)::int as count from consultations
      where email = ${enquiry.email} and created_at > now() - interval '1 hour'
    `;
    if (count >= HOURLY_LIMIT_PER_EMAIL) {
      return NextResponse.json(
        {
          error: "rate_limited",
          message:
            "We already have your recent requests and will be in touch shortly. For anything urgent, please call us.",
        },
        { status: 429 }
      );
    }

    await sql`
      insert into consultations (name, company, email, phone, category, message)
      values (
        ${enquiry.name}, ${enquiry.company || null}, ${enquiry.email},
        ${enquiry.phone}, ${enquiry.category}, ${enquiry.message || null}
      )
    `;
  } catch (err) {
    console.error("[consultation] could not save enquiry:", err);
    return NextResponse.json({ error: "save_failed", message: FAILED }, { status: 500 });
  }

  const webhook = process.env.CONSULTATION_WEBHOOK_URL;
  if (webhook) {
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
      if (!res.ok) console.error("[consultation] webhook rejected the copy:", res.status);
    } catch (err) {
      console.error("[consultation] webhook request failed:", err);
    }
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
