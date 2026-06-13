import { db } from "@vercel/postgres";
import ReviewForm from "@/src/app/ui/reviews/review-form";

type Props = {
  params: {
    id: string;
  };
};

type Review = {
  id: string;
  rating: number;
  comment: string;
  created_at: string;
};

export default async function ProductPage({ params }: Props) {
  const { id } = params;

  // Obtener producto
  const { rows: productRows } = await db.sql`
    SELECT *
    FROM products
    WHERE id = ${id}
    LIMIT 1
  `;

  const product = productRows[0];

  if (!product) {
    return (
      <div className="p-10 text-center">
        Product not found
      </div>
    );
  }

  // Obtener reviews
  const { rows } = await db.sql`
    SELECT *
    FROM reviews
    WHERE product_id = ${id}
    ORDER BY created_at DESC
  `;

  const reviews = rows as Review[];

  // Rating promedio
  const avgRating =
    reviews.length > 0
      ? reviews.reduce(
          (acc, review) => acc + Number(review.rating),
          0
        ) / reviews.length
      : 0;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">

      {/* PRODUCT */}
      <div className="border rounded-xl p-6 shadow">

        {product.image_url && (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-64 object-cover rounded-lg"
          />
        )}

        <h1 className="text-2xl font-bold mt-4">
          {product.name}
        </h1>

        <p className="text-gray-600 mt-2">
          {product.description}
        </p>

        <p className="text-blue-600 font-bold text-xl mt-2">
          €{product.price}
        </p>

        <div className="mt-3 text-gray-600">
          {reviews.length > 0 ? (
            <>
              ⭐ {avgRating.toFixed(1)} ({reviews.length} reviews)
            </>
          ) : (
            "No reviews yet"
          )}
        </div>

      </div>

      {/* REVIEWS */}
      <div className="mt-8">

        <h2 className="text-xl font-bold mb-4">
          Reviews
        </h2>

        {reviews.length === 0 && (
          <p className="text-gray-500">
            No reviews yet
          </p>
        )}

        <div className="space-y-4">

          {reviews.map((review) => (
            <div
              key={review.id}
              className="border p-4 rounded-lg"
            >
              <div className="text-yellow-500 text-lg">
                {"⭐".repeat(Number(review.rating))}
              </div>

              <p className="mt-2 text-gray-700">
                {review.comment}
              </p>

              <p className="text-xs text-gray-400 mt-2">
                {new Date(review.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}

        </div>

      </div>

      {/* REVIEW FORM */}
      <div className="mt-10 border-t pt-6">

        <h2 className="text-lg font-bold mb-4">
          Leave a review
        </h2>

        <ReviewForm productId={product.id} />

      </div>

    </div>
  );
}