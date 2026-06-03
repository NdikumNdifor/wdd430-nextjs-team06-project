// src/app/lib/definitions.ts
// Core TypeScript interfaces for Handcrafted Haven
// Maps 1:1 to the Vercel Postgres (Neon) database schema.

export interface User {
  id: string;           // UUID — uuid_generate_v4()
  name: string;         // VARCHAR(255) NOT NULL
  email: string;        // VARCHAR(255) UNIQUE NOT NULL
  password: string;     // TEXT NOT NULL — bcrypt-hashed at rest
}

export interface Product {
  id: string;           // UUID — uuid_generate_v4()
  seller_id: string;    // UUID FK → users.id ON DELETE CASCADE
  name: string;         // VARCHAR(255) NOT NULL
  description: string;  // TEXT NOT NULL
  price: number;        // NUMERIC(10, 2) NOT NULL
  image_url: string;    // TEXT NOT NULL
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
