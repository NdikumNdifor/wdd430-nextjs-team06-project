import Link from 'next/link';

import { navigationLinks } from '@/app/ui/home/home-data';
import styles from '@/app/ui/home/home.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Handcrafted Haven</p>
      <nav aria-label="Footer navigation">
        {navigationLinks.map((link) => (
          <Link href={link.href} key={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>
    </footer>
  );
}
