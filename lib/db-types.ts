/* Row shapes, importable from client components (lib/db.ts is server-only). */

export type ConsultationStatus = "new" | "contacted" | "closed";
export const CONSULTATION_STATUSES: ConsultationStatus[] = ["new", "contacted", "closed"];

export interface Consultation {
  id: string;
  name: string;
  company: string | null;
  email: string;
  phone: string;
  category: string;
  message: string | null;
  status: ConsultationStatus;
  created_at: Date;
}

export interface Subscriber {
  id: string;
  email: string;
  created_at: Date;
}
