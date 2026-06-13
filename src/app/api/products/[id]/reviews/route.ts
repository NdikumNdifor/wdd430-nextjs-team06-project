import { db } from "@vercel/postgres";
import { NextRequest } from "next/server";

// GET reviews de un producto
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

// POST create review
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: productId } = await params;

    const body = await req.json();

    const { user_id, rating, comment } = body;

    if (!user_id || !rating) {
      return Response.json(
        { error: "user_id and rating are required" },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return Response.json(
        { error: "rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    const { rows } = await db.sql`
      INSERT INTO reviews (
        product_id,
        user_id,
        rating,
        comment
      )
      VALUES (
        ${productId},
        ${user_id},
        ${rating},
        ${comment}
      )
      RETURNING *
    `;

    return Response.json({ review: rows[0] });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Failed to create review" },
      { status: 500 }
    );
  }
}
