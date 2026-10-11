/**
 * CarePaws API client — typed wrapper around the NestJS backend.
 *
 * Base URL comes from NEXT_PUBLIC_API_URL (see .env.example).
 * Every function below maps 1:1 to a backend endpoint the team must implement.
 * Until the backend is live, these throw ApiNotImplementedError — the UI
 * currently runs on local mock data instead.
 *
 * Backend handover: implement the endpoints listed in README.md "API contract".
 */
import type {
  Appointment,
  AppointmentStatus,
  AuthSession,
  ClinicProfile,
  HealthFlag,
  InventoryItem,
  Invoice,
  InvoiceStatus,
  MedicalRecord,
  Notification,
  Order,
  Payment,
  Pet,
  Product,
  StaffRole,
  StockTransaction,
  TriageSubmission,
  User,
  Vaccination,
  VetVerdict,
} from "@/types";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api/v1";

export class ApiNotImplementedError extends Error {
  constructor(endpoint: string) {
    super(`Backend endpoint not implemented yet: ${endpoint}`);
    this.name = "ApiNotImplementedError";
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const token =
    typeof window !== "undefined"
      ? sessionStorage.getItem("carepaws_access_token")
      : null;
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers ?? {}),
    },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message ?? `API ${res.status} on ${path}`);
  }
  return res.json() as Promise<T>;
}

/* ---------------- Auth ---------------- */
export const authApi = {
  login: (email: string, password: string) =>
    request<AuthSession>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  refresh: (refreshToken: string) =>
    request<AuthSession>("/auth/refresh", {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
    }),
  logout: () => request<void>("/auth/logout", { method: "POST" }),
  me: () => request<User>("/auth/me"),
};

/* ---------------- Users / Staff (admin) ---------------- */
export const usersApi = {
  list: () => request<User[]>("/users"),
  create: (data: Pick<User, "name" | "email" | "phone"> & { role: StaffRole; password: string }) =>
    request<User>("/users", { method: "POST", body: JSON.stringify(data) }),
  update: (id: string, data: Partial<User>) =>
    request<User>(`/users/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
  setStatus: (id: string, status: "active" | "inactive") =>
    request<User>(`/users/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),
};

/* ---------------- Appointments ---------------- */
export const appointmentsApi = {
  list: (params?: { date?: string; status?: AppointmentStatus; q?: string }) =>
    request<Appointment[]>(
      "/appointments" + (params ? `?${new URLSearchParams(params as Record<string, string>)}` : "")
    ),
  get: (id: string) => request<Appointment>(`/appointments/${id}`),
  create: (data: Partial<Appointment>) =>
    request<Appointment>("/appointments", { method: "POST", body: JSON.stringify(data) }),
  update: (id: string, data: Partial<Appointment>) =>
    request<Appointment>(`/appointments/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  setStatus: (id: string, status: AppointmentStatus) =>
    request<Appointment>(`/appointments/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),
};

/* ---------------- Pets & medical records ---------------- */
export const petsApi = {
  list: (q?: string) => request<Pet[]>(`/pets${q ? `?q=${encodeURIComponent(q)}` : ""}`),
  get: (id: string) => request<Pet>(`/pets/${id}`),
  create: (data: Partial<Pet>) =>
    request<Pet>("/pets", { method: "POST", body: JSON.stringify(data) }),
  update: (id: string, data: Partial<Pet>) =>
    request<Pet>(`/pets/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
};

export const recordsApi = {
  forPet: (petId: string) => request<MedicalRecord[]>(`/pets/${petId}/medical-records`),
  create: (petId: string, data: Partial<MedicalRecord>) =>
    request<MedicalRecord>(`/pets/${petId}/medical-records`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  vaccinationsForPet: (petId: string) =>
    request<Vaccination[]>(`/pets/${petId}/vaccinations`),
  addVaccination: (petId: string, data: Partial<Vaccination>) =>
    request<Vaccination>(`/pets/${petId}/vaccinations`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  healthFlagsForPet: (petId: string) =>
    request<HealthFlag[]>(`/pets/${petId}/health-flags`),
};

/* ---------------- AI triage ---------------- */
export const triageApi = {
  list: (params?: { status?: string; q?: string }) =>
    request<TriageSubmission[]>(
      "/triage-submissions" + (params ? `?${new URLSearchParams(params as Record<string, string>)}` : "")
    ),
  get: (id: string) => request<TriageSubmission>(`/triage-submissions/${id}`),
  /** Vet reviews the AI suggestion — verdict feeds the thesis accuracy metric. */
  review: (id: string, verdict: VetVerdict, note?: string) =>
    request<TriageSubmission>(`/triage-submissions/${id}/review`, {
      method: "PATCH",
      body: JSON.stringify({ verdict, note }),
    }),
};

/* ---------------- Inventory ---------------- */
export const inventoryApi = {
  list: (params?: { category?: string; q?: string; lowStock?: boolean }) =>
    request<InventoryItem[]>(
      "/inventory-items" + (params ? `?${new URLSearchParams(params as Record<string, string>)}` : "")
    ),
  get: (id: string) => request<InventoryItem>(`/inventory-items/${id}`),
  create: (data: Partial<InventoryItem>) =>
    request<InventoryItem>("/inventory-items", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: Partial<InventoryItem>) =>
    request<InventoryItem>(`/inventory-items/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  adjustStock: (id: string, data: Pick<StockTransaction, "type" | "quantity" | "reason">) =>
    request<StockTransaction>(`/inventory-items/${id}/stock`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  transactions: (itemId: string) =>
    request<StockTransaction[]>(`/inventory-items/${itemId}/transactions`),
};

/* ---------------- Billing ---------------- */
export const billingApi = {
  list: (params?: { status?: InvoiceStatus; q?: string }) =>
    request<Invoice[]>(
      "/invoices" + (params ? `?${new URLSearchParams(params as Record<string, string>)}` : "")
    ),
  get: (id: string) => request<Invoice>(`/invoices/${id}`),
  create: (data: Partial<Invoice>) =>
    request<Invoice>("/invoices", { method: "POST", body: JSON.stringify(data) }),
  setStatus: (id: string, status: InvoiceStatus) =>
    request<Invoice>(`/invoices/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),
  recordPayment: (invoiceId: string, data: Pick<Payment, "amount" | "method">) =>
    request<Payment>(`/invoices/${invoiceId}/payments`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
};

/* ---------------- Shop (mobile) ---------------- */
export const shopApi = {
  products: () => request<Product[]>("/products"),
  createOrder: (data: { items: { productId: string; quantity: number }[] }) =>
    request<Order>("/orders", { method: "POST", body: JSON.stringify(data) }),
  myOrders: () => request<Order[]>("/orders/mine"),
};

/* ---------------- Notifications ---------------- */
export const notificationsApi = {
  list: () => request<Notification[]>("/notifications"),
  markRead: (id: string) =>
    request<Notification>(`/notifications/${id}/read`, { method: "PATCH" }),
  markAllRead: () => request<void>("/notifications/read-all", { method: "PATCH" }),
};

/* ---------------- Clinic profile & reports ---------------- */
export const clinicApi = {
  getProfile: () => request<ClinicProfile>("/clinic/profile"),
  updateProfile: (data: Partial<ClinicProfile>) =>
    request<ClinicProfile>("/clinic/profile", {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
};

export const reportsApi = {
  summary: (period: string) =>
    request<Record<string, unknown>>(`/reports/summary?period=${period}`),
  triageAccuracy: (period: string) =>
    request<{ agreed: number; adjusted: number; disagreed: number }>(
      `/reports/triage-accuracy?period=${period}`
    ),
};
