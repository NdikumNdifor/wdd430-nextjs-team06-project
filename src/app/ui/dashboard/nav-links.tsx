'use client';

import {
  HomeIcon,
  ShoppingBagIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from './dashboard.module.css';

const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  { name: 'Profile', href: '/dashboard/profile', icon: UserCircleIcon },
  { name: 'Products', href: '/dashboard/products', icon: ShoppingBagIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className={styles.navLinks} aria-label="Seller dashboard navigation">
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive =
          pathname === link.href ||
          (link.href !== '/dashboard' && pathname.startsWith(link.href));

        return (
          <Link
            className={`${styles.navLink} ${isActive ? styles.activeNavLink : ''}`}
            href={link.href}
            key={link.name}
          >
            <LinkIcon width={20} />
            <span>{link.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
