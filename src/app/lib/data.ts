// src/app/lib/data.ts
// Server-side data access layer for Handcrafted Haven.
// All functions use raw SQL via the @vercel/postgres `sql` tagged-template helper.
// These are async Server Component / Server Action compatible — never import into
// client components directly.

import { sql } from '@vercel/postgres';
import type { Product, User } from './definitions';

// ---------------------------------------------------------------------------
// fetchProducts
// ---------------------------------------------------------------------------
/**
 * Returns every product in the catalogue, ordered newest-first.
 * Use in listing pages / the marketplace home page.
 */
export async function fetchProducts(): Promise<Product[]> {
  try {
    const { rows } = await sql<Product>`
      SELECT
        id,
        seller_id,
        name,
        description,
        price,
        image_url
      FROM products
      ORDER BY name ASC;
    `;

    return rows;
  } catch (error) {
    console.error('[data] fetchProducts error:', error);
    throw new Error('Failed to fetch products from the database.');
  }
}

// ---------------------------------------------------------------------------
// fetchProductById
// ---------------------------------------------------------------------------
/**
 * Returns a single product matching the provided UUID, or null if not found.
 * Use in product detail pages (e.g. /products/[id]).
 *
 * @param id - The UUID of the product to fetch.
 */
export async function fetchProductById(id: string): Promise<Product | null> {
  try {
    const { rows } = await sql<Product>`
      SELECT
        id,
        seller_id,
        name,
        description,
        price,
        image_url
      FROM products
      WHERE id = ${id}
      LIMIT 1;
    `;

    if (rows.length === 0) return null;

    return rows[0];
  } catch (error) {
    console.error(`[data] fetchProductById error (id=${id}):`, error);
    throw new Error('Failed to fetch the product from the database.');
  }
}

// ---------------------------------------------------------------------------
// fetchProductsBySeller
// ---------------------------------------------------------------------------
/**
 * Returns all products listed by a specific artisan/seller, ordered
 * alphabetically by product name.
 * Use in artisan profile / storefront pages.
 *
 * @param sellerId - The UUID of the seller whose products to retrieve.
 */
export async function fetchProductsBySeller(
  sellerId: string,
): Promise<Product[]> {
  try {
    const { rows } = await sql<Product>`
      SELECT
        id,
        seller_id,
        name,
        description,
        price,
        image_url
      FROM products
      WHERE seller_id = ${sellerId}
      ORDER BY name ASC;
    `;

    return rows;
  } catch (error) {
    console.error(
      `[data] fetchProductsBySeller error (sellerId=${sellerId}):`,
      error,
    );
    throw new Error("Failed to fetch this seller's products from the database.");
  }
}

// ---------------------------------------------------------------------------
// fetchUserProfileByEmail
// ---------------------------------------------------------------------------
/**
 * Returns the editable seller profile for the authenticated user's email.
 */
export async function fetchUserProfileByEmail(
  email: string,
): Promise<User | null> {
  try {
    const { rows } = await sql<User>`
      SELECT
        id,
        name,
        email,
        password,
        bio,
        profile_image_url
      FROM users
      WHERE email = ${email}
      LIMIT 1;
    `;

    return rows[0] ?? null;
  } catch (error) {
    console.error(`[data] fetchUserProfileByEmail error (email=${email}):`, error);
    throw new Error('Failed to fetch the seller profile from the database.');
  }
}
