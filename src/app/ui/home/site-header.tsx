import Link from 'next/link';

import { navigationLinks } from '@/app/ui/home/home-data';
import styles from '@/app/ui/home/home.module.css';

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <Link className={styles.logo} href="/" aria-label="Handcrafted Haven home">
        <span aria-hidden="true">HH</span>
        Handcrafted Haven
      </Link>

      <nav className={styles.navigation} aria-label="Primary navigation">
        {navigationLinks.map((link) => (
          <Link href={link.href} key={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>

      <Link className={styles.headerAction} href="/dashboard">
        Start selling
      </Link>
    </header>
  );
}
