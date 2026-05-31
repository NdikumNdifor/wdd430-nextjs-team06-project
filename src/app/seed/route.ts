// src/app/seed/route.ts
// Next.js App Router Route Handler — GET /seed
//
// Idempotently bootstraps the Vercel Postgres (Neon) database:
//   1. Enables uuid-ossp extension
//   2. Creates `users` and `products` tables (IF NOT EXISTS)
//   3. Upserts all placeholder records
//
// IMPORTANT: Protect this endpoint in production.
// Recommended: add an ADMIN_SECRET check (see guard below) and
// remove or restrict the route once the database is seeded.

import { db } from '@vercel/postgres';
import { placeholderUsers, placeholderProducts } from '../lib/placeholder-data';
import type { NextRequest } from 'next/server';

// ---------------------------------------------------------------------------
// Optional hard guard — set SEED_SECRET in your Vercel environment variables.
// Call the endpoint as: GET /seed?secret=<your-value>
// Remove this block if you prefer to rely solely on deployment access controls.
// ---------------------------------------------------------------------------
function isAuthorised(request: NextRequest): boolean {
  const secret = process.env.SEED_SECRET;
  if (!secret) return true; // No secret configured — open (dev only)
  return request.nextUrl.searchParams.get('secret') === secret;
}

export async function GET(request: NextRequest): Promise<Response> {
  if (!isAuthorised(request)) {
    return Response.json({ error: 'Unauthorised' }, { status: 401 });
  }

  const client = await db.connect();

  try {
    await client.sql`BEGIN`;

    // ------------------------------------------------------------------
    // 1. Enable uuid-ossp so uuid_generate_v4() is available
    // ------------------------------------------------------------------
    await client.sql`
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    `;

    // ------------------------------------------------------------------
    // 2. Create tables
    // ------------------------------------------------------------------
    await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id       UUID         PRIMARY KEY DEFAULT uuid_generate_v4(),
        name     VARCHAR(255) NOT NULL,
        email    VARCHAR(255) UNIQUE NOT NULL,
        password TEXT         NOT NULL
      );
    `;

    await client.sql`
      CREATE TABLE IF NOT EXISTS products (
        id          UUID           PRIMARY KEY DEFAULT uuid_generate_v4(),
        seller_id   UUID           NOT NULL
                      REFERENCES users(id) ON DELETE CASCADE,
        name        VARCHAR(255)   NOT NULL,
        description TEXT           NOT NULL,
        price       NUMERIC(10, 2) NOT NULL,
        image_url   TEXT           NOT NULL
      );
    `;

    // ------------------------------------------------------------------
    // 3. Seed users (upsert — safe to run multiple times)
    // ------------------------------------------------------------------
    const insertedUsers: string[] = [];

    for (const user of placeholderUsers) {
      await client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (
          ${user.id},
          ${user.name},
          ${user.email},
          ${user.password}
        )
        ON CONFLICT (id) DO NOTHING;
      `;
      insertedUsers.push(user.email);
    }

    // ------------------------------------------------------------------
    // 4. Seed products (upsert — safe to run multiple times)
    // ------------------------------------------------------------------
    const insertedProducts: string[] = [];

    for (const product of placeholderProducts) {
      await client.sql`
        INSERT INTO products (id, seller_id, name, description, price, image_url)
        VALUES (
          ${product.id},
          ${product.seller_id},
          ${product.name},
          ${product.description},
          ${product.price},
          ${product.image_url}
        )
        ON CONFLICT (id) DO NOTHING;
      `;
      insertedProducts.push(product.name);
    }

    await client.sql`COMMIT`;

    return Response.json(
      {
        success: true,
        message: 'Database seeded successfully.',
        seeded: {
          users: insertedUsers,
          products: insertedProducts,
        },
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    await client.sql`ROLLBACK`;

    const message =
      error instanceof Error ? error.message : 'Unknown database error.';

    console.error('[/seed] Database seeding failed:', error);

    return Response.json(
      {
        success: false,
        error: 'Database seeding failed.',
        detail: message,
      },
      { status: 500 },
    );
  } finally {
    client.release();
  }
}
