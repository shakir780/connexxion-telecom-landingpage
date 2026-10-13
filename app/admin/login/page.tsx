import LoginForm from "@/components/admin/LoginForm";

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div
        className="w-full max-w-sm rounded-xl p-6 sm:p-8"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border-1)" }}
      >
        <span
          className="text-[10px] font-bold uppercase tracking-[0.24em]"
          style={{ color: "var(--green-text)" }}
        >
          Connexxion Telecom
        </span>
        <h1 className="mt-2 text-2xl font-extrabold tracking-tight">Admin sign in</h1>
        <p className="mt-1.5 text-sm" style={{ color: "var(--text-2)" }}>
          Consultation bookings and newsletter subscribers.
        </p>
        <LoginForm />
      </div>
    </main>
  );
}
