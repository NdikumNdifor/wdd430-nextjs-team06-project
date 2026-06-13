import styles from '../ui/dashboard/dashboard.module.css';

export default function Page() {
  return (
    <>
      <section className={styles.pageHeader}>
        <p className={styles.eyebrow}>Seller dashboard</p>
        <h1 className={styles.pageTitle}>Manage your artisan shop</h1>
        <p className={styles.pageDescription}>
          Keep your story, handcrafted product listings, reviews, and shop
          details in one calm workspace.
        </p>
      </section>

      <section className={styles.dashboardGrid} aria-label="Seller overview">
        <article className={styles.metricCard}>
          <span>Profile</span>
          <strong>Story</strong>
          <p>Add your bio and profile photo so customers can know the maker.</p>
        </article>
        <article className={styles.metricCard}>
          <span>Catalog</span>
          <strong>Products</strong>
          <p>Review the items currently connected to your artisan account.</p>
        </article>
        <article className={styles.metricCard}>
          <span>Community</span>
          <strong>Reviews</strong>
          <p>Use customer feedback to build trust around your craft.</p>
        </article>
      </section>
    </>
  );
}
