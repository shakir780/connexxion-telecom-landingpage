"use client";

import { useActionState } from "react";
import { login } from "@/app/admin/actions";

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <form action={action} className="mt-6 flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="text-xs font-semibold tracking-wide" style={{ color: "var(--text-2)" }}>
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          autoFocus
          aria-invalid={!!state?.error}
          aria-describedby={state?.error ? "password-error" : undefined}
          className="px-4 min-h-11 py-2.5 rounded-lg text-sm outline-none w-full"
          style={{
            background: "var(--bg-input)",
            border: `1px solid ${state?.error ? "var(--danger)" : "var(--border-3)"}`,
            color: "var(--text-1)",
          }}
        />
        {state?.error && (
          <span id="password-error" role="alert" className="text-xs" style={{ color: "var(--danger)" }}>
            {state.error}
          </span>
        )}
      </div>
      <button
        type="submit"
        disabled={pending}
        className="min-h-11 rounded-lg font-bold text-sm disabled:opacity-60"
        style={{ background: "var(--green-fill)", color: "var(--on-green)" }}
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
