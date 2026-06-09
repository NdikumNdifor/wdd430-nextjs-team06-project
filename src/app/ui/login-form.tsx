import { playfair } from './fonts'; //  Correct named import
// import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';

import { useActionState } from 'react';
import { authenticate } from '../lib/actions';
import { useSearchParams } from 'next/navigation';

import Link from 'next/link';

import styles from "../login/login-form.module.css"

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  // state will hold the return value from the authenticate action (errors, message)
  const [state, formAction, pending] = useActionState(authenticate, undefined)
  return (
    <div className={styles.container}>
      <form action={formAction} className="space-y-3">
        <div className={styles.innerCard}>
          <h1 className={`${playfair.className}`}>
            Please log in to continue.
          </h1>
          <div className={styles.fieldGroup}>
            <div className={styles.inputBlock}>
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="email"
              >
                Email
              </label>
              <div className={styles.inputRelative}>
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  required
                />
                <AtSymbolIcon />
              </div>
            </div>
            {/* In case Zod catches an email problem, it should be displayed here */}
            {state?.errors?.email && (
              <p className={styles.errorText}>{state.errors.email[0]}</p>
            )}

            <div className={styles.inputBlock}>
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="password"
              >
                Password
              </label>
              <div className={styles.inputRelative}>
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  required
                  minLength={6}
                />
                <KeyIcon />
              </div>
            </div>
            {/* In case Zod catches a password problem, it should be displayed here */}
            {state?.errors?.password && (
              <p className={styles.errorText}>{state.errors.password[0]}</p>
            )}
          </div>
          {/* A more general message here   */}
          {state?.message && <p className={styles.errorText}>{state.message}</p>}

          <input type="hidden" name="redirectTo" value={callbackUrl} />

          <Button 
            className={styles.submitButton} 
            disabled={pending}
            aria-disabled={pending}
            >
            Log in <ArrowRightIcon/>
          </Button>

            {/* Adding the sign up link*/}
          <p className={styles.signupPrompt}>
            Don't have an account yet?{' '}
            <Link href="/registration">
              Sign up
            </Link>
          </p>

          <div className={styles.errorFooter}>
            {/* Add form errors here */}
            {state?.message && (
              <>
                <ExclamationCircleIcon />
                <p>{state.message}</p>
              </>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}