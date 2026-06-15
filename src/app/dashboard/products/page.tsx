import { db } from '@vercel/postgres';
import Link from 'next/link';

import styles from '../../ui/dashboard/dashboard.module.css';

export default async function DashboardProductsPage() {
  // temporary code
  const seller_id = 'a1b2c3d4-0001-4e5f-8a9b-000000000001';

  const { rows: products } = await db.sql`
    SELECT * FROM products
    WHERE seller_id = ${seller_id}
    ORDER BY id DESC
  `;

  return (
    <>
      <section className={styles.pageHeader}>
        <div className={styles.sectionToolbar}>
          <div>
            <p className={styles.eyebrow}>Products</p>
            <h1 className={styles.pageTitle}>My products</h1>
            <p className={styles.pageDescription}>
              Manage the handcrafted items customers can discover in the
              marketplace.
            </p>
          </div>

          <Link className={styles.primaryAction} href="/dashboard/create">
            Upload product
          </Link>
        </div>
      </section>

      <section className={styles.productGrid} aria-label="Seller products">
        {products.map((product) => (
          <article className={styles.productCard} key={product.id}>
            {product.image_url && (
              <img
                alt={product.name}
                className={styles.productImage}
                src={product.image_url}
              />
            )}

            <div className={styles.productBody}>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <span className={styles.price}>${product.price}</span>

              <div className={styles.productActions}>
                <Link
                  className={styles.secondaryAction}
                  href={`/dashboard/products/${product.id}/edit`}
                >
                  Edit
                </Link>

                <form action={`/api/products/${product.id}`} method="POST">
                  <button className={styles.deleteButton}>Delete</button>
                </form>
              </div>
              <div className={styles.secondaryAction}>

                <Link
                  key={product.id}
                  href={`products/${product.id}`}
                >
                  <p className="text-sm text-gray-500 mt-1">
                    ⭐ View rating & reviews
                  </p>

                  {/* CLICK INDICATOR */}
                  <p className="text-sm text-blue-500 mt-2 font-medium">
                    Click to view details →
                  </p>
                </Link>
              </div>
            </div>
          </article>
        ))}

        {products.length === 0 && (
          <div className={styles.emptyState}>
            <h2>No products yet</h2>
            <p>Add your first product to begin building your shop catalog.</p>
          </div>
        )}
      </section>
    </>
  );
}
