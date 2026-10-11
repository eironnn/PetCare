/**
 * CarePaws domain types.
 * Mirrors the database ERD (carepaws-erd-draft.md): 16 tables, Supabase-flavored PostgreSQL.
 * These are the shapes the NestJS backend should return at /api/v1.
 */

export type StaffRole = "admin" | "vet" | "receptionist";
export type UserRole = StaffRole | "pet_owner";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  roleLabel: string;
  status: "active" | "inactive";
  lastActive?: string;
}

export interface Pet {
  id: string;
  name: string;
  species: "dog" | "cat" | string;
  breed: string;
  age?: string;
  sex?: "male" | "female";
  weightKg?: number;
  ownerId: string;
  ownerName: string;
  photoUrl?: string;
}

export type AppointmentStatus = "pending" | "confirmed" | "completed" | "cancelled";

export interface Appointment {
  id: number | string;
  petId?: string;
  pet: string;
  breed?: string;
  owner: string;
  ownerId?: string;
  type: string;
  date: number | string;
  time: string;
  vet?: string;
  status: AppointmentStatus;
  notes?: string;
}

export interface MedicalRecord {
  id: string;
  petId: string;
  date: string;
  vet: string;
  diagnosis: string;
  treatment: string;
  notes?: string;
  followUp?: string;
}

export interface Vaccination {
  id: string;
  petId: string;
  vaccine: string;
  dateGiven: string;
  nextDue?: string;
  vet: string;
}

export type TriageStatus = "pending" | "reviewed";
export type VetVerdict = "agreed" | "adjusted" | "disagreed";

export interface TriageSubmission {
  id: number | string;
  pet: string;
  owner: string;
  symptoms: string;
  photoUrl?: string;
  /** AI-generated preliminary suggestion — suggestion only, never a diagnosis. */
  aiSuggestion: string;
  severity: "low" | "medium" | "high" | "urgent";
  status: TriageStatus;
  /** Vet's verdict on the AI suggestion — feeds the thesis accuracy metric. */
  vetVerdict?: VetVerdict;
  submittedAt: string;
}

export interface HealthFlag {
  id: string;
  petId: string;
  flag: string;
  detail?: string;
  createdAt: string;
}

export interface InventoryItem {
  id: number | string;
  name: string;
  category: "medicine" | "vaccine" | "preventive" | "supply";
  stock: number;
  unit: string;
  reorderLevel: number;
  expiryDate?: string;
  price?: number;
}

export interface StockTransaction {
  id: string;
  itemId: number | string;
  type: "in" | "out";
  quantity: number;
  reason?: string;
  by?: string;
  at: string;
}

export type InvoiceStatus = "paid" | "pending" | "overdue";

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface Invoice {
  id: string;
  appointmentId?: number | string;
  pet: string;
  owner: string;
  items: InvoiceItem[];
  total: number;
  status: InvoiceStatus;
  issuedAt: string;
  dueAt?: string;
}

export interface Payment {
  id: string;
  invoiceId: string;
  amount: number;
  method: "cash" | "card" | "paymongo" | string;
  paidAt: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  photoUrl?: string;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  ownerId: string;
  items: OrderItem[];
  total: number;
  status: "pending" | "paid" | "fulfilled" | "cancelled";
  createdAt: string;
}

export interface Notification {
  id: number | string;
  kind: "appointment" | "stock" | "triage" | "invoice";
  title: string;
  body?: string;
  read: boolean;
  createdAt: string;
  link?: { page: string; refId?: number | string };
}

export interface ClinicProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface AuthSession {
  user: User;
  accessToken: string;
  refreshToken?: string;
}
