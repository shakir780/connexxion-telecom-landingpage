"use server";

import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db, CONSULTATION_STATUSES, type ConsultationStatus } from "@/lib/db";
import { createSessionToken, SESSION_COOKIE, SESSION_MAX_AGE } from "@/lib/admin-session";
import { requireAdmin } from "@/lib/admin-auth";

export type LoginState = { error?: string } | undefined;

/* Hashing both sides first gives equal-length buffers, so the comparison
   takes the same time whatever was typed. */
function passwordMatches(attempt: string, expected: string): boolean {
  const a = createHash("sha256").update(attempt).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || !process.env.SESSION_SECRET) {
    return { error: "Admin login is not configured on this server yet." };
  }

  const attempt = String(formData.get("password") ?? "");
  if (!passwordMatches(attempt, expected)) {
    // Slows down anyone guessing passwords in a loop.
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { error: "That password is not right." };
  }

  (await cookies()).set(SESSION_COOKIE, await createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  redirect("/admin");
}

export async function logout() {
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/admin/login");
}

export async function setConsultationStatus(id: string, status: ConsultationStatus) {
  await requireAdmin();
  if (!CONSULTATION_STATUSES.includes(status)) return;
  await db()`update consultations set status = ${status} where id = ${id}`;
  revalidatePath("/admin");
}

export async function deleteConsultation(id: string) {
  await requireAdmin();
  await db()`delete from consultations where id = ${id}`;
  revalidatePath("/admin");
}

export async function deleteSubscriber(id: string) {
  await requireAdmin();
  await db()`delete from subscribers where id = ${id}`;
  revalidatePath("/admin");
}
