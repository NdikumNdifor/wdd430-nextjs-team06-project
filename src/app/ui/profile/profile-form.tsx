'use client';

import { useActionState, useMemo, useState } from 'react';

import { ProfileState, updateSellerProfile } from '../../lib/actions';
import type { User } from '../../lib/definitions';
import styles from './profile-form.module.css';

type ProfileFormProps = {
  user: User;
};

const initialState: ProfileState = {
  errors: {},
  message: null,
  success: false,
};

export function ProfileForm({ user }: ProfileFormProps) {
  const [state, formAction, pending] = useActionState(
    updateSellerProfile,
    initialState,
  );
  const [imageUrl, setImageUrl] = useState(user.profile_image_url ?? '');

  const previewStyle = useMemo(
    () => ({
      backgroundImage: imageUrl ? `url("${imageUrl}")` : undefined,
    }),
    [imageUrl],
  );

  return (
    <div className={styles.profileGrid}>
      <section className={styles.previewPanel} aria-label="Profile preview">
        <div
          className={styles.avatarPreview}
          style={previewStyle}
          aria-label={
            imageUrl
              ? `${user.name}'s profile picture preview`
              : 'Profile picture preview'
          }
        >
          {!imageUrl && <span>{user.name.slice(0, 1).toUpperCase()}</span>}
        </div>

        <div>
          <p>Seller profile</p>
          <h2>{user.name}</h2>
          <span>{user.email}</span>
        </div>

        <p className={styles.bioPreview}>
          {user.bio ||
            'Add a short story about your craft, process, and inspiration.'}
        </p>
      </section>

      <form action={formAction} className={styles.form}>
        <div className={styles.fieldGroup}>
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            name="bio"
            rows={8}
            maxLength={600}
            defaultValue={user.bio ?? ''}
            placeholder="Tell customers about your craft, materials, process, and what makes your work personal."
          />
          {state.errors?.bio && (
            <p className={styles.errorText}>{state.errors.bio[0]}</p>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="profileImageUrl">Profile picture URL</label>
          <input
            id="profileImageUrl"
            name="profileImageUrl"
            type="url"
            defaultValue={user.profile_image_url ?? ''}
            placeholder="https://example.com/profile.jpg"
            onChange={(event) => setImageUrl(event.target.value)}
          />
          {state.errors?.profileImageUrl && (
            <p className={styles.errorText}>
              {state.errors.profileImageUrl[0]}
            </p>
          )}
        </div>

        {state.message && (
          <p
            className={state.success ? styles.successText : styles.errorText}
            aria-live="polite"
          >
            {state.message}
          </p>
        )}

        <button type="submit" disabled={pending} aria-disabled={pending}>
          {pending ? 'Saving profile...' : 'Save profile'}
        </button>
      </form>
    </div>
  );
}
