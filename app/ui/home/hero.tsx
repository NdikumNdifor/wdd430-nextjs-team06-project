import Image from 'next/image';
import Link from 'next/link';

import { impactStats } from '@/app/ui/home/home-data';
import styles from '@/app/ui/home/home.module.css';

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.heroContent}>
        <p className={styles.eyebrow}>Handmade marketplace</p>
        <h1 id="hero-title">Handcrafted Haven</h1>
        <p className={styles.heroText}>
          Discover thoughtful goods from independent artisans, learn the story
          behind each piece, and bring home work made with care.
        </p>

        <div className={styles.heroActions}>
          <Link className={styles.primaryButton} href="#categories">
            Browse handmade goods
          </Link>
          <Link className={styles.secondaryButton} href="/dashboard">
            Create seller profile
          </Link>
        </div>

        <dl className={styles.statsGrid} aria-label="Marketplace highlights">
          {impactStats.map((stat) => (
            <div key={stat.label}>
              <dt>{stat.value}</dt>
              <dd>{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className={styles.heroImageWrap}>
        <Image
          src="/annie-spratt-TywjkDHf0Ps-unsplash.jpg"
          alt="Artisan arranging handmade floral craft materials on a studio table"
          width={1000}
          height={760}
          priority
          sizes="(max-width: 768px) 100vw, 48vw"
          className={styles.heroImage}
        />
      </div>
    </section>
  );
}
