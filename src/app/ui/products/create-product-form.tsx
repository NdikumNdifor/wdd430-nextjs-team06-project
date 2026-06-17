"use client";

import { useState } from "react";
import Link from "next/link";

import styles from "../dashboard/dashboard.module.css";

export default function ProductUpload() {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const formData = new FormData();

  formData.append("title", product.title);
  formData.append("description", product.description);
  formData.append("price", product.price);
  formData.append("image", product.image);

  const res = await fetch("/api/products", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  console.log(data);
};

  return (
    <section className={styles.formPage}>
      <div className={styles.formIntro}>
        <p className={styles.eyebrow}>New listing</p>
        <h1 className={styles.pageTitle}>Upload product</h1>
        <p className={styles.pageDescription}>
          Add a handcrafted item with clear details, pricing, and an image URL
          customers can preview in the marketplace.
        </p>
      </div>

      <form onSubmit={handleSubmit} className={styles.productForm}>
        <div className={styles.formGrid}>
          <div className={styles.fieldGroup}>
            <label htmlFor="title">Product title</label>
            <input
              id="title"
              type="text"
              name="title"
              placeholder="Ceramic berry bowl"
              value={product.title}
              onChange={handleChange}
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
              name="price"
              placeholder="42.00"
              value={product.price}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Describe materials, process, dimensions, and what makes this piece special."
            value={product.description}
            onChange={handleChange}
            rows={6}
            required
          />
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="image">Image URL</label>
          <input
            id="image"
            type="url"
            name="image"
            placeholder="https://example.com/product-image.jpg"
            value={product.image}
            onChange={handleChange}
            required
          />
          <span className={styles.fieldHint}>
            Use a public image URL so the product can appear in the catalog.
          </span>
        </div>

        <div className={styles.formActions}>
          <button type="submit" className={styles.primaryAction}>
            Submit product
          </button>
          <Link href="/dashboard/products" className={styles.secondaryAction}>
            Cancel
          </Link>
        </div>
      </form>
    </section>
  );
}
