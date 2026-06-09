'use client'

import { useActionState } from "react"
import {signUpUser, State} from "../../app/lib/actions"
import { Button } from './button';

import styles from "../registration/signup.module.css"

// import { useSearchParams } from 'next/navigation';

// Define a concrete initial state that satisfies your custom type
const initialState: State = { errors: {}, message: null };

export function SignupForm() {

  // 2. Detect the tracking parameter if they were kicked out of a protected route
  // const searchParams = useSearchParams();
  // const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  const [state, formAction, pending ] = useActionState(signUpUser, initialState)
    return(
      <div className={styles.container}>
        <form action={formAction} className={styles.form}>
          <h1>Create an Account</h1>
          <div className={styles.fieldGroup}>
            <div className={styles.inputWrapper}>
              <label htmlFor="name">User Name</label>
              <input id="name" name="name" placeholder="Name" />
            </div>
            {/* 3. Display Zod validation errors for name */}
              {state?.errors?.name && (
              <p className={styles.errorText}>{state.errors.name[0]}</p>
            )}

            <div className={styles.inputWrapper}>
              <label htmlFor="email">Email</label>
              <input name="email" type="email" placeholder="Email" />
            </div>
            {/* Display Zod validation errors for email */}
              {state?.errors?.email && (
              <p className={styles.errorText}>{state.errors.email[0]}</p>
            )}

            <div className={styles.inputWrapper}>
              <label htmlFor="password">Password</label>
              <input id="password" type="password" name="password" />
            </div>
            {/* Display Zod validation errors for password */}
            {state?.errors?.password && (
              <p className={styles.errorText}>{state.errors.password[0]}</p>
            )}
          </div>
          {/* 4. Display general database or duplicate account messages */}
            {state?.message && (
            <p className={styles.errorText}>{state.message}</p>
          )}

          {/* 3. Pass the destination securely down to the server side action */}
          {/* <input type="hidden" name="redirectTo" value={callbackUrl} />   */}

          <Button 
            className={styles.submitButton} 
            disabled={pending}
            aria-disabled={pending}
            >
            Register your account 
          </Button>

          {/* <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`} className="text-blue-500 hover:underline">
              Log in
            </Link>
          </p> */}

        </form>
      </div>
    )
}