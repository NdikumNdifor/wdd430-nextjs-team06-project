"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Product = {
  id: string;
  name: string;
  description: string;
  price: string; 
};

export default function EditProductForm({
  product,
}: {
  product: Product;
}) {
  const router = useRouter();

  const [title, setTitle] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch(`/api/products/${product.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        price: Number(price), 
      }),
    });

    const data = await res.json();

    if (data.success) {
      router.push("/dashboard/products");
    }
  };

  return (
    
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Edit Product</h1>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded"
        placeholder="Title"
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border p-2 rounded"
        placeholder="Description"
      />

      <input
        type="text"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full border p-2 rounded"
        placeholder="Price"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Save Changes
      </button>
    </form>
    
  );

}
