import { db } from "@vercel/postgres";
import Link from "next/link";

export default async function ProductsPage() {
  const { rows: products } = await db.sql`
    SELECT * FROM products
    ORDER BY id DESC
  `;

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4">

      {/* HEADER */}
      <h1 className="text-2xl font-bold mb-6">
        Products
      </h1>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <Link href="/dashboard/create">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            + Upload Product
          </button>
        </Link>

        {products.map((product) => (
          <Link
            key={product.id}
            href={`products/${product.id}`}
          >

            <div className="border rounded-xl p-4 shadow transition cursor-pointer hover:shadow-lg hover:scale-[1.02] hover:border-blue-400">

              {/* IMAGE */}
              {product.image_url && (
                <img
                  src={product.image_url}
                  className="w-full h-40 object-cover rounded-lg"
                  alt={product.name}
                />
              )}

              {/* NAME */}
              <h2 className="text-lg font-semibold mt-2">
                {product.name}
              </h2>

              {/* DESCRIPTION */}
              <p className="text-gray-600 text-sm line-clamp-2">
                {product.description}
              </p>

              {/* PRICE */}
              <p className="font-bold text-blue-600 mt-2">
                €{product.price}
              </p>

              {/* SIMPLE RATING PLACEHOLDER */}
              <p className="text-sm text-gray-500 mt-1">
                ⭐ View rating & reviews
              </p>

              {/* CLICK INDICATOR */}
              <p className="text-sm text-blue-500 mt-2 font-medium">
                Click to view details →
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

          </Link>

        ))}

      </div>

    </div>
  );
}
