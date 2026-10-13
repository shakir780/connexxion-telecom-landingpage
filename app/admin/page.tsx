import Link from "next/link";
import { db, type Consultation, type Subscriber } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-auth";
import { logout } from "@/app/admin/actions";
import { DeleteButton, StatusSelect } from "@/components/admin/RowControls";

const PAGE_SIZE = 50;

type Tab = "bookings" | "subscribers";

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Africa/Lagos",
});

function one(value: string | string[] | undefined): string {
  return (Array.isArray(value) ? value[0] : value)?.trim() ?? "";
}

/* `%` and `_` are wildcards in ILIKE; a search for "50%" should mean it literally. */
function likePattern(q: string): string {
  return `%${q.replace(/[\\%_]/g, (c) => `\\${c}`)}%`;
}

function href(tab: Tab, q: string, page = 1): string {
  const params = new URLSearchParams({ tab });
  if (q) params.set("q", q);
  if (page > 1) params.set("page", String(page));
  return `/admin?${params}`;
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  await requireAdmin();

  const params = await searchParams;
  const tab: Tab = one(params.tab) === "subscribers" ? "subscribers" : "bookings";
  const q = one(params.q).slice(0, 100);
  const page = Math.max(1, Number.parseInt(one(params.page), 10) || 1);
  const offset = (page - 1) * PAGE_SIZE;

  const sql = db();
  const like = likePattern(q);

  const [[totals], rows] = await Promise.all([
    sql<{ bookings: number; fresh: number; subscribers: number }[]>`
      select
        (select count(*)::int from consultations) as bookings,
        (select count(*)::int from consultations where status = 'new') as fresh,
        (select count(*)::int from subscribers) as subscribers
    `,
    tab === "bookings"
      ? sql<(Consultation & { total: number })[]>`
          select *, count(*) over ()::int as total from consultations
          ${q
            ? sql`where name ilike ${like} or email ilike ${like}
                  or company ilike ${like} or phone ilike ${like}`
            : sql``}
          order by created_at desc
          limit ${PAGE_SIZE} offset ${offset}
        `
      : sql<(Subscriber & { total: number })[]>`
          select *, count(*) over ()::int as total from subscribers
          ${q ? sql`where email ilike ${like}` : sql``}
          order by created_at desc
          limit ${PAGE_SIZE} offset ${offset}
        `,
  ]);

  const matching = rows[0]?.total ?? 0;
  const pages = Math.max(1, Math.ceil(matching / PAGE_SIZE));

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span
            className="text-[10px] font-bold uppercase tracking-[0.24em]"
            style={{ color: "var(--green-text)" }}
          >
            Connexxion Telecom
          </span>
          <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight">Admin</h1>
        </div>
        <form action={logout}>
          <button
            type="submit"
            className="px-4 min-h-10 rounded-lg text-sm font-semibold"
            style={{ border: "1px solid var(--border-3)", color: "var(--text-2)" }}
          >
            Sign out
          </button>
        </form>
      </div>

      {/* Totals */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { label: "Bookings", value: totals.bookings },
          { label: "New, not yet contacted", value: totals.fresh, accent: true },
          { label: "Newsletter subscribers", value: totals.subscribers },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl px-5 py-4"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border-1)" }}
          >
            <div className="text-xs font-semibold" style={{ color: "var(--text-3)" }}>
              {stat.label}
            </div>
            <div
              className="mt-1 text-2xl font-extrabold tabular-nums"
              style={{ color: stat.accent && stat.value > 0 ? "var(--green-text)" : "var(--text-1)" }}
            >
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Tabs, search, export */}
      <div className="mt-8 flex flex-col lg:flex-row lg:items-center gap-3 lg:justify-between">
        <nav className="flex gap-1 p-1 rounded-lg self-start" style={{ background: "var(--bg-input)" }}>
          {(["bookings", "subscribers"] as Tab[]).map((t) => (
            <Link
              key={t}
              href={href(t, "")}
              aria-current={tab === t ? "page" : undefined}
              className="px-4 min-h-9 inline-flex items-center rounded-md text-sm font-semibold capitalize"
              style={
                tab === t
                  ? { background: "var(--green-fill)", color: "var(--on-green)" }
                  : { color: "var(--text-2)" }
              }
            >
              {t}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col sm:flex-row gap-2">
          <form action="/admin" className="flex gap-2">
            <input type="hidden" name="tab" value={tab} />
            <input
              type="search"
              name="q"
              defaultValue={q}
              aria-label={tab === "bookings" ? "Search bookings" : "Search subscribers"}
              placeholder={tab === "bookings" ? "Name, email, company, phone" : "Email"}
              className="flex-1 sm:w-64 px-3.5 min-h-10 rounded-lg text-sm outline-none"
              style={{
                background: "var(--bg-input)",
                border: "1px solid var(--border-3)",
                color: "var(--text-1)",
              }}
            />
            <button
              type="submit"
              className="px-4 min-h-10 rounded-lg text-sm font-semibold"
              style={{ border: "1px solid var(--border-3)", color: "var(--text-1)" }}
            >
              Search
            </button>
          </form>
          <a
            href={`/admin/export?type=${tab}`}
            className="px-4 min-h-10 inline-flex items-center justify-center rounded-lg text-sm font-semibold"
            style={{ border: "1px solid var(--border-3)", color: "var(--green-text)" }}
          >
            Export CSV
          </a>
        </div>
      </div>

      {q && (
        <p className="mt-4 text-sm" style={{ color: "var(--text-2)" }}>
          {matching} result{matching === 1 ? "" : "s"} for “{q}” ·{" "}
          <Link href={href(tab, "")} className="underline" style={{ color: "var(--green-text)" }}>
            Clear
          </Link>
        </p>
      )}

      {/* Table */}
      <div
        className="mt-4 rounded-xl overflow-x-auto"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border-1)" }}
      >
        {rows.length === 0 ? (
          <p className="px-5 py-12 text-center text-sm" style={{ color: "var(--text-3)" }}>
            {q ? "Nothing matches that search." : `No ${tab} yet.`}
          </p>
        ) : tab === "bookings" ? (
          <BookingsTable rows={rows as Consultation[]} />
        ) : (
          <SubscribersTable rows={rows as Subscriber[]} />
        )}
      </div>

      {/* Pagination */}
      {pages > 1 && (
        <div className="mt-4 flex items-center justify-between text-sm" style={{ color: "var(--text-2)" }}>
          <span>
            Page {page} of {pages}
          </span>
          <div className="flex gap-2">
            {page > 1 && (
              <Link href={href(tab, q, page - 1)} className="px-3 min-h-9 inline-flex items-center rounded-md" style={{ border: "1px solid var(--border-3)" }}>
                Previous
              </Link>
            )}
            {page < pages && (
              <Link href={href(tab, q, page + 1)} className="px-3 min-h-9 inline-flex items-center rounded-md" style={{ border: "1px solid var(--border-3)" }}>
                Next
              </Link>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

const th = "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider whitespace-nowrap";
const td = "px-4 py-3 align-top";

function BookingsTable({ rows }: { rows: Consultation[] }) {
  return (
    <table className="w-full min-w-[900px] text-sm">
      <thead style={{ color: "var(--text-3)", borderBottom: "1px solid var(--border-1)" }}>
        <tr>
          <th className={th}>Received</th>
          <th className={th}>Name</th>
          <th className={th}>Contact</th>
          <th className={th}>Category</th>
          <th className={th}>Details</th>
          <th className={th}>Status</th>
          <th className={th}><span className="sr-only">Actions</span></th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id} style={{ borderTop: "1px solid var(--border-2)" }}>
            <td className={`${td} whitespace-nowrap`} style={{ color: "var(--text-2)" }}>
              {dateFormat.format(row.created_at)}
            </td>
            <td className={td}>
              <div className="font-semibold">{row.name}</div>
              {row.company && <div style={{ color: "var(--text-3)" }}>{row.company}</div>}
            </td>
            <td className={td}>
              <a href={`mailto:${row.email}`} className="block hover:underline" style={{ color: "var(--green-text)" }}>
                {row.email}
              </a>
              <a href={`tel:${row.phone.replace(/[^\d+]/g, "")}`} className="block whitespace-nowrap hover:underline" style={{ color: "var(--text-2)" }}>
                {row.phone}
              </a>
            </td>
            <td className={td} style={{ color: "var(--text-2)" }}>{row.category}</td>
            <td className={`${td} max-w-xs`} style={{ color: "var(--text-2)" }}>
              {!row.message ? (
                <span style={{ color: "var(--text-4)" }}>—</span>
              ) : row.message.length <= 120 ? (
                <span className="whitespace-pre-wrap break-words">{row.message}</span>
              ) : (
                <details>
                  <summary className="cursor-pointer">{row.message.slice(0, 120)}…</summary>
                  <p className="mt-2 whitespace-pre-wrap break-words">{row.message}</p>
                </details>
              )}
            </td>
            <td className={td}>
              <StatusSelect key={`${row.id}-${row.status}`} id={row.id} status={row.status} />
            </td>
            <td className={`${td} text-right`}>
              <DeleteButton id={row.id} kind="consultation" label={`the booking from ${row.name}`} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function SubscribersTable({ rows }: { rows: Subscriber[] }) {
  return (
    <table className="w-full min-w-[480px] text-sm">
      <thead style={{ color: "var(--text-3)", borderBottom: "1px solid var(--border-1)" }}>
        <tr>
          <th className={th}>Email</th>
          <th className={th}>Subscribed</th>
          <th className={th}><span className="sr-only">Actions</span></th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id} style={{ borderTop: "1px solid var(--border-2)" }}>
            <td className={td}>
              <a href={`mailto:${row.email}`} className="hover:underline" style={{ color: "var(--green-text)" }}>
                {row.email}
              </a>
            </td>
            <td className={`${td} whitespace-nowrap`} style={{ color: "var(--text-2)" }}>
              {dateFormat.format(row.created_at)}
            </td>
            <td className={`${td} text-right`}>
              <DeleteButton id={row.id} kind="subscriber" label={row.email} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
