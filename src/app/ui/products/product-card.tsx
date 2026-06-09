import Image from 'next/image';

import type { Product } from '../../lib/definitions';
import styles from './products.module.css';

type ProductCardProps = {
  product: Product;
};

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className={styles.productCard}>
      <div className={styles.productImageWrap}>
        <Image
          src={product.image_url}
          alt={product.name}
          width={640}
          height={480}
          sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw"
          className={styles.productImage}
        />
      </div>
      <div className={styles.productContent}>
        <p>{currencyFormatter.format(Number(product.price))}</p>
        <h2>{product.name}</h2>
        <span>{product.description}</span>
      </div>
    </article>
  );
}
