import { NextResponse } from "next/server";
import { db } from "@vercel/postgres";

export async function POST(req: Request) {
  try {
    // receive form data
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = formData.get("price") as string;
    const image = formData.get("image") as File | null;

    // for now we we don't have an url
    let image_url = null;

    if (image) {
      // temporary only to see how it worked the code
      image_url = `https://via.placeholder.com/300`;
    }

    // id temporary only to see how the code work
    const seller_id = "a1b2c3d4-0001-4e5f-8a9b-000000000001";

    // Save the data in the DB.
    await db.sql`
      INSERT INTO products (name, description, price, image_url, seller_id)
      VALUES (${title}, ${description}, ${price}, ${image_url}, ${seller_id})
    `;

    return NextResponse.json({
      success: true,
      message: "The product was created.",
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Error to create the product.",
      },
      { status: 500 }
    );
  }
}
