import { db } from "@/lib/db";
import { isAdmin } from "@/lib/admin-auth";

/* CSV download of either list: /admin/export?type=bookings|subscribers */

function cell(value: unknown): string {
  let text = value instanceof Date ? value.toISOString() : String(value ?? "");
  /* Stops spreadsheet apps treating a submitted value as a formula. A leading
     + or - is left alone when the rest is plain digits, so phone numbers such
     as "+234 801 234 5678" export untouched. */
  if (/^[=@\t\r]|^[+-](?![\d\s()-]+$)/.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
}

function toCsv(columns: string[], rows: Record<string, unknown>[]): string {
  const lines = [columns.map(cell).join(",")];
  for (const row of rows) lines.push(columns.map((c) => cell(row[c])).join(","));
  return lines.join("\r\n");
}

export async function GET(request: Request) {
  if (!(await isAdmin())) return new Response("Unauthorized", { status: 401 });

  const type = new URL(request.url).searchParams.get("type");
  const sql = db();
  let csv: string;

  if (type === "subscribers") {
    const rows = await sql`select email, created_at from subscribers order by created_at desc`;
    csv = toCsv(["email", "created_at"], rows);
  } else {
    const rows = await sql`
      select created_at, status, name, company, email, phone, category, message
      from consultations order by created_at desc
    `;
    csv = toCsv(
      ["created_at", "status", "name", "company", "email", "phone", "category", "message"],
      rows
    );
  }

  const name = `${type === "subscribers" ? "subscribers" : "bookings"}-${new Date().toISOString().slice(0, 10)}.csv`;
  return new Response("﻿" + csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${name}"`,
      "Cache-Control": "no-store",
    },
  });
}
