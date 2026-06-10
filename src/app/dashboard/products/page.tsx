import { db } from "@vercel/postgres";
import Link from "next/link";

export default async function DashboardProductsPage() {
  // temporary code
  const seller_id = "a1b2c3d4-0001-4e5f-8a9b-000000000001";

  const { rows: products } = await db.sql`
    SELECT * FROM products
    WHERE seller_id = ${seller_id}
    ORDER BY id DESC
  `;

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          My Products
        </h1>

        <Link href="/dashboard/create">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            + Upload Product
          </button>
        </Link>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-xl p-4 shadow"
          >
            
            {/* IMAGE */}
            {product.image_url && (
              <img
                src={product.image_url}
                className="w-full h-40 object-cover rounded-lg"
              />
            )}

            {/* INFO */}
            <h2 className="text-lg font-semibold mt-2">
              {product.name}
            </h2>

            <p className="text-gray-600 text-sm">
              {product.description}
            </p>

            <p className="font-bold text-blue-600 mt-2">
              €{product.price}
            </p>

            {/* ACTIONS */}
            <div className="flex gap-2 mt-4">

              {/* EDIT */}
              <Link href={`/dashboard/products/${product.id}/edit`}>
                <button className="bg-yellow-500 text-white px-3 py-1 rounded">
                  Edit
                </button>
              </Link>

              {/* DELETE  */}
              <form action={`/api/products/${product.id}`} method="POST">
                <button className="bg-red-600 text-white px-3 py-1 rounded">
                  Delete
                </button>
              </form>

            </div>

          </div>
        ))}
      </div>
    </div>
  );
}