import SideNav from '../ui/dashboard/sidenav';
import styles from '../ui/dashboard/dashboard.module.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.dashboardShell}>
      <SideNav />
      <div className={styles.dashboardMain}>{children}</div>
    </div>
  );
}
