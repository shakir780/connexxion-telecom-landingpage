import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { validateEmail } from "@/lib/form-validation";

/* ─── Newsletter sign-ups ───
   Saved to the subscribers table and listed in /admin. Signing up twice is
   not an error — the address is already on the list, which is what the
   visitor wanted — so a repeat gets the same success response. */

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  const read = (value: unknown) => (typeof value === "string" ? value.trim() : "");

  // Honeypot — see the consultation route.
  if (read(body.website)) {
    return NextResponse.json({ ok: true });
  }

  const email = read(body.email).slice(0, 200).toLowerCase();
  const error = validateEmail(email);
  if (error) {
    return NextResponse.json({ error }, { status: 422 });
  }

  try {
    await db()`
      insert into subscribers (email) values (${email})
      on conflict (email) do nothing
    `;
  } catch (err) {
    console.error("[newsletter] could not save subscriber:", err);
    return NextResponse.json(
      { error: "We couldn't sign you up just now. Please try again in a moment." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
