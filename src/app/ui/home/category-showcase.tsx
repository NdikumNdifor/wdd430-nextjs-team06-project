import { categories } from './home-data';
import { SectionHeading } from './section-heading';
import styles from './home.module.css';

export function CategoryShowcase() {
  return (
    <section
      className={styles.section}
      id="categories"
      aria-labelledby="categories-title"
    >
      <SectionHeading
        eyebrow="Shop by craft"
        title="Find pieces with a human touch"
        description="Browse marketplace categories designed for filtering by craft, price, style, and maker."
        titleId="categories-title"
      />

      <div className={styles.categoryGrid}>
        {categories.map((category) => (
          <article className={styles.categoryCard} key={category.name}>
            <span>{category.itemCount}</span>
            <h3>{category.name}</h3>
            <p>{category.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
