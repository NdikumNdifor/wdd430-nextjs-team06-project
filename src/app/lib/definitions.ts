// Core TypeScript interfaces for Handcrafted Haven.
// Maps to the Vercel Postgres database schema.

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  bio?: string | null;
  profile_image_url?: string | null;
}

export interface Product {
  id: string;
  seller_id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

export interface CustomersTableType {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
}

export interface FormattedCustomersTable {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
}
