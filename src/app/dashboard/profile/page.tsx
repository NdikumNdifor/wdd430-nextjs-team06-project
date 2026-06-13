import { redirect } from 'next/navigation';

import { auth } from '../../auth';
import { fetchUserProfileByEmail } from '../../lib/data';
import dashboardStyles from '../../ui/dashboard/dashboard.module.css';
import { ProfileForm } from '../../ui/profile/profile-form';

export default async function Page() {
  const session = await auth();
  const email = session?.user?.email;

  if (!email) {
    redirect('/login');
  }

  const user = await fetchUserProfileByEmail(email);

  if (!user) {
    return (
      <section className={dashboardStyles.pageHeader}>
        <p className={dashboardStyles.eyebrow}>Profile</p>
        <h1 className={dashboardStyles.pageTitle}>Profile not found</h1>
        <p className={dashboardStyles.pageDescription}>
          We could not find a seller profile for the signed-in account.
        </p>
      </section>
    );
  }

  return (
    <section>
      <div className={dashboardStyles.pageHeader}>
        <p className={dashboardStyles.eyebrow}>Profile</p>
        <h1 className={dashboardStyles.pageTitle}>Artisan profile</h1>
        <p className={dashboardStyles.pageDescription}>
          Add a bio and profile picture so customers can learn the story behind
          your handcrafted work.
        </p>
      </div>

      <ProfileForm user={user} />
    </section>
  );
}
