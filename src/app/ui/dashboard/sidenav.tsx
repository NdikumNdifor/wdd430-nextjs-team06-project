import { PowerIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

import { signOut } from '../../auth';
import styles from './dashboard.module.css';
import NavLinks from './nav-links';

export default function SideNav() {
  return (
    <aside className={styles.sideNav}>
      <Link className={styles.brand} href="/">
        <span className={styles.brandMark}>HH</span>
        <strong>Handcrafted Haven</strong>
        <span>Seller workspace</span>
      </Link>

      <div className={styles.navPanel}>
        <NavLinks />

        <form
          className={styles.signOutForm}
          action={async () => {
            'use server';
            await signOut({ redirectTo: '/' });
          }}
        >
          <button className={styles.signOutButton}>
            <PowerIcon width={20} />
            <span>Sign Out</span>
          </button>
        </form>
      </div>
    </aside>
  );
}
