"use client";

import { useTransition } from "react";
import {
  deleteConsultation,
  deleteSubscriber,
  setConsultationStatus,
} from "@/app/admin/actions";
import { CONSULTATION_STATUSES, type ConsultationStatus } from "@/lib/db-types";

const STATUS_LABEL: Record<ConsultationStatus, string> = {
  new: "New",
  contacted: "Contacted",
  closed: "Closed",
};

export function StatusSelect({ id, status }: { id: string; status: ConsultationStatus }) {
  const [pending, startTransition] = useTransition();
  return (
    <select
      aria-label="Booking status"
      defaultValue={status}
      disabled={pending}
      onChange={(e) =>
        startTransition(() =>
          setConsultationStatus(id, e.target.value as ConsultationStatus)
        )
      }
      className="px-2.5 min-h-9 rounded-md text-xs font-semibold outline-none disabled:opacity-60"
      style={{
        background: "var(--bg-input)",
        border: "1px solid var(--border-3)",
        color: status === "new" ? "var(--green-text)" : "var(--text-1)",
      }}
    >
      {CONSULTATION_STATUSES.map((s) => (
        <option key={s} value={s}>
          {STATUS_LABEL[s]}
        </option>
      ))}
    </select>
  );
}

export function DeleteButton({
  id,
  kind,
  label,
}: {
  id: string;
  kind: "consultation" | "subscriber";
  label: string;
}) {
  const [pending, startTransition] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (!confirm(`Delete ${label}? This cannot be undone.`)) return;
        startTransition(() =>
          kind === "consultation" ? deleteConsultation(id) : deleteSubscriber(id)
        );
      }}
      className="px-2.5 min-h-9 rounded-md text-xs font-semibold disabled:opacity-60"
      style={{ color: "var(--danger)", border: "1px solid var(--border-3)" }}
    >
      {pending ? "Deleting…" : "Delete"}
    </button>
  );
}
