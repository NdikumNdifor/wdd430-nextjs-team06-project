"use client";

import { useState } from "react";

type Props = {
  productId: string;
};

export default function ReviewForm({ productId }: Props) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    try {
      setLoading(true);

      const response = await fetch(
        `/api/products/${productId}/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // Changes this for an ID real
            user_id: "PEGA_AQUI_UN_UUID_REAL",
            rating,
            comment,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create review");
      }

      setComment("");
      setRating(5);

      // Refresh the page to see the review
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Error sending review");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      {/* Stars */}
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className="text-2xl"
          >
            {star <= rating ? "⭐" : "☆"}
          </button>
        ))}
      </div>

      {/* Comment */}
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your review..."
        rows={4}
        className="w-full border rounded p-2"
      />

      {/* Submit */}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Sending..." : "Submit Review"}
      </button>
    </div>
  );
}