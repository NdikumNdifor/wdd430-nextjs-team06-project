import Image from 'next/image';

import { featuredProducts } from '@/app/ui/home/home-data';
import { SectionHeading } from '@/app/ui/home/section-heading';
import styles from '@/app/ui/home/home.module.css';

export function ArtisanSpotlight() {
  return (
    <section
      className={`${styles.section} ${styles.splitSection}`}
      id="artisans"
      aria-labelledby="artisans-title"
    >
      <div>
        <SectionHeading
          eyebrow="Seller profiles"
          title="Give every artisan a place to be known"
          description="Profiles can highlight a maker's process, story, reviews, and a curated set of product listings."
          titleId="artisans-title"
        />

        <div className={styles.productList} aria-label="Featured products">
          {featuredProducts.map((product) => (
            <article className={styles.productRow} key={product.name}>
              <div>
                <h3>{product.name}</h3>
                <p>{product.artisan}</p>
              </div>
              <span>{product.price}</span>
            </article>
          ))}
        </div>
      </div>

      <div className={styles.spotlightImageWrap}>
        <Image
          src="/annie-spratt-2gakWg4nrtc-unsplash.jpg"
          alt="Handmade craft supplies and finished artisan goods displayed together"
          width={720}
          height={920}
          sizes="(max-width: 768px) 100vw, 38vw"
          className={styles.spotlightImage}
        />
      </div>
    </section>
  );
}
