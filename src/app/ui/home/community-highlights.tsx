import { communityHighlights } from './home-data';
import { SectionHeading } from './section-heading';
import styles from './home.module.css';

export function CommunityHighlights() {
  return (
    <section
      className={`${styles.section} ${styles.communitySection}`}
      id="community"
      aria-labelledby="community-title"
    >
      <SectionHeading
        eyebrow="Community trust"
        title="Built for shoppers and makers"
        description="Handcrafted Haven connects product discovery, ratings, and seller storytelling in one responsive experience."
        titleId="community-title"
      />

      <div className={styles.highlightGrid}>
        {communityHighlights.map((highlight, index) => (
          <article className={styles.highlightCard} key={highlight}>
            <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <p>{highlight}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
