import { NextResponse } from "next/server";
import { db } from "@vercel/postgres";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const { title, description, price } = await req.json();

    await db.sql`
      UPDATE products
      SET
        name = ${title},
        description = ${description},
        price = ${price}
      WHERE id = ${id}
    `;

    return NextResponse.json({
      success: true,
      message: "Product updated successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Error updating product",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    await db.sql`
      DELETE FROM products
      WHERE id = ${id}
    `;

    return NextResponse.json({
      success: true,
      message: "Product deleted",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Error deleting product",
      },
      { status: 500 }
    );
  }
}


