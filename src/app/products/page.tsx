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

        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
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

            </div>

          </Link>
        ))}

      </div>

    </div>
  );
}
