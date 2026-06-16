import { db } from "@vercel/postgres";
import { auth } from "@/src/app/auth";
import { NextRequest } from "next/server";
import { redirect } from "next/dist/client/components/navigation";

// Delete product (CON AUTH REAL)
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();


  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: productId } = await params;

  // Check if the product belongs to the authenticated user
  // const { rows: productRows } = await db.sql`
  //   SELECT * FROM products WHERE id = ${productId} AND seller_id = ${session.user.id}
  // `;

  // if (productRows.length === 0) {
  //   return Response.json({ error: "Product not found" }, { status: 404 });
  // }

  // Delete the product
  await db.sql`
    DELETE FROM products WHERE id = ${productId}
  `;

  return redirect("/dashboard/products");
}
