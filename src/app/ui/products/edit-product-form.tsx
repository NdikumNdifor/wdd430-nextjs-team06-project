"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import styles from "../dashboard/dashboard.module.css";

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
    <section className={styles.formPage}>
      <div className={styles.formIntro}>
        <p className={styles.eyebrow}>Product details</p>
        <h1 className={styles.pageTitle}>Edit product</h1>
        <p className={styles.pageDescription}>
          Keep your listing accurate with updated product information and a
          polished description for customers.
        </p>
      </div>

      <form onSubmit={handleSubmit} className={styles.productForm}>
        <div className={styles.formGrid}>
          <div className={styles.fieldGroup}>
            <label htmlFor="title">Product title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Product title"
              required
            />
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="price">Price</label>
            <input
              id="price"
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              required
            />
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Product description"
            rows={6}
            required
          />
        </div>

        <div className={styles.formActions}>
          <button type="submit" className={styles.primaryAction}>
            Save changes
          </button>
          <Link href="/dashboard/products" className={styles.secondaryAction}>
            Cancel
          </Link>
        </div>
      </form>
    </section>
  );
}
