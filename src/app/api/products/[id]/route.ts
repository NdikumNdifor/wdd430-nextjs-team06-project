import { db } from "@vercel/postgres";
import { auth } from "@/src/app/auth";
import { NextRequest } from "next/server";

// GET reviews
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  void req;

  const { id: productId } = await params;

  const { rows: reviews } = await db.sql`
    SELECT *
    FROM reviews
    WHERE product_id = ${productId}
    ORDER BY created_at DESC
  `;

  return Response.json({ reviews });
}

// POST review (CON AUTH REAL)
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: productId } = await params;
  const { rating, comment } = await req.json();

  if (!rating) {
    return Response.json({ error: "Rating required" }, { status: 400 });
  }

  const userId = session.user.id;

  const { rows } = await db.sql`
    INSERT INTO reviews (product_id, user_id, rating, comment)
    VALUES (${productId}, ${userId}, ${rating}, ${comment})
    RETURNING *
  `;

  return Response.json({ review: rows[0] });
}
