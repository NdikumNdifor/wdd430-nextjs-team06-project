import { db } from "@vercel/postgres";
import EditProductForm from "@/src/app/ui/products/edit-product-form";

type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
};

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const result = await db.sql`
    SELECT id, name, description, price
    FROM products
    WHERE id = ${id}
  `;

  const row = result.rows[0] as Product | undefined;

  if (!row) {
    return <div>Product not found</div>;
  }

  const product: Product = {
    id: row.id,
    name: row.name,
    description: row.description,
    price: row.price,
  };

  return <EditProductForm product={product} />;
}
