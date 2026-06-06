"use server"

import {z} from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import postgres from 'postgres';
import {signIn} from '../auth';
import {AuthError} from 'next-auth';
import bycrypt from 'bcryptjs';

// Initializing Neon database
const sql = postgres(process.env.POSTGRES_URL!, {ssl: 'require'});

// Defining zod validatation schema for the sign up form
const signUpSchema = z.object({
    name: z.string().min(2, {message: 'Name must contain atleast 2 characters.'}),
    email: z.string().email({message: 'Enter a valid email address please.'}),
    password: z.string().min(6, {message: 'A password is needed to continue and must be 6 characters long.'})
})

const signInSchema = z.object({
    email: z.string().email({message: 'Please enter your email address.'}),
    password: z.string().min(6, {message: 'Please enter a password which is 6 characters long.'})
})

export type State = {
    errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
    }
    message?: string | null;
};


/**********************************
ACTION 1: SIGN UP (CREATE USER)
**********************************/
export async function signUpUser(prevState: State, formData: FormData) {

      // 1. Let's Extract the destination route along with user info for 
      // for automatic login after successful sign up.
      // const redirectTo = (formData.get('redirectTo') as string) || '/dashboard';

    // Fields validation using zod
    const validatedFields = signUpSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password')
    })
    // If the valation process is a failure, return errors early. Otherwise, continue.
    if(!validatedFields.success){
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing fields. Failed to create account.',
        };
    }

    const {name, email, password} = validatedFields.data;
    const hashedPassword = await bycrypt.hash(password, 10);

    try {
        // Insert data into our database using postgres client
        await sql`
            INSERT INTO Users(name, email, password)
            VALUES(${name}, ${email}, ${hashedPassword})
        `
    }catch(error: any){
        // Handle unique constraint violations (e.g., duplicate email)
        if (error.code === '23505') {
            return {
              errors: {}, // Explicitly provide an empty errors object to match type 
              message: 'An account with this email already exists.' 
            };
        }
        // If database errors occurs, return a more specific error.
        return {
          errors: {}, // Explicitly provide an empty errors object to match type
          message: 'Database Eerror: Failed to create user.'
        }
    }

    // 2. Clear caches so their brand new dashboard reads fresh user contexts
    // revalidatePath('/dashboard/customers');

    // 3. AUTOMATIC LOGIN FLOW
    // try {
    //   await signIn('credentials', {
    //     email,
    //     password,
    //     redirectTo, // Binds them straight to their originally intended path!
    //   });
    // } catch (error) {
    // if (error instanceof AuthError) {
    //     return { errors: {}, message: 'Account created, but automatic login failed.' };
    //   }
    //   throw error;
    // }

    // Clear data cache for your customer lists to reflect new data
    revalidatePath('/dashboard');
  
    // Send them directly to login page or handle login automatically
    redirect('/login');
}


/*************************************
ACTION 2: SIGN IN (AUTHENTICATE USER)
*************************************/
export async function authenticate(prevState: any, formData: FormData) {
  const validatedFields = signInSchema.safeParse({
    // Object.fromEntries(formData.entries())
    email: formData.get('email'),
    password: formData.get('password')
});

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid entries. Failed to log in.',
    };
  }

  const { email, password } = validatedFields.data;
  // We if the user exists right here in the Action!
  const userResult = await sql`SELECT * FROM users WHERE email=${email}`;
  if (userResult.length === 0) {
    // We safely redirect from the Server Action context!
    redirect('/signup');
  }

  try {
    // Call Auth.js signIn method with credentials provider configuration
    await signIn('credentials', {
      email,
      password,
      redirectTo: '/dashboard',
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { message: 'Invalid credentials. Please try again.' };
        default:
          return { message: 'Something went wrong with authentication.' };
      }
    }
    // CRITICAL: Next.js redirect uses internal errors to function. 
    // You MUST rethrow the error if it's not an AuthError, or redirect will crash!
    throw error;
  }
}


// For auth
// export async function authenticate(
//   prevState: string | undefined,
//   formData: FormData,
// ) {
//   try {
//     await signIn('credentials', formData);
//   } catch (error) {
//     if (error instanceof AuthError) {
//       switch (error.type) {
//         case 'CredentialsSignin':
//           return 'Invalid credentials.';
//         default:
//           return 'Something went wrong.';
//       }
//     }
//     throw error;
//   }
// }


// 'use server';

// import { z } from 'zod';
// import { revalidatePath } from 'next/cache';
// import { redirect } from 'next/navigation';
// import postgres from 'postgres';

// import { signIn } from '@/auth';
// import { AuthError } from 'next-auth';
 
// const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
 
// const FormSchema = z.object({
//   id: z.string(),
//   customerId: z.string({
//     invalid_type_error: 'Please select a customer.',
//   }),
//   amount: z.coerce
//     .number()
//     .gt(0, { message: 'Please enter an amount greater than $0.' }),
//   status: z.enum(['pending', 'paid'], {
//     invalid_type_error: 'Please select an invoice status.',
//   }),
//   date: z.string(),
// });

// export type State = {
//   errors?: {
//     customerId?: string[];
//     amount?: string[];
//     status?: string[];
//   };
//   message?: string | null;
// };

// const CreateInvoice = FormSchema.omit({ id: true, date: true });

// export async function createInvoice(prevState: State, formData: FormData) {
//     const validatedFields = CreateInvoice.safeParse({
//     customerId: formData.get('customerId'),
//     amount: formData.get('amount'),
//     status: formData.get('status'),
//   });
//   // If form validation fails, return errors early. Otherwise, continue.
//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//       message: 'Missing Fields. Failed to Create Invoice.',
//     };
//   }
//     // Prepare data for insertion into the database
//     const { customerId, amount, status } = validatedFields.data;
//     const amountInCents = amount * 100;
//     const date = new Date().toISOString().split('T')[0];
//     try {
//         await sql`
//         INSERT INTO invoices (customer_id, amount, status, date)
//         VALUES (${customerId}, ${amountInCents}, ${status}, ${date})`;
//     }catch(error){
//         // We'll also log the error to the console for now
//         console.error(error);
//         // If a database error occurs, return a more specific error.
//         return {
//             message: 'Database Error: Failed to Create Invoice.',
//         };
//     }
    
//     revalidatePath('/dashboard/invoices');
//     redirect('/dashboard/invoices');
//   // Test it out:
// //   console.log(rawFormData);
// }


// // Use Zod to update the expected types
// const UpdateInvoice = FormSchema.omit({ id: true, date: true });
 
// // ...

// export async function updateInvoice(
//   id: string,
//   prevState: State,
//   formData: FormData,
// ) {
//   const validatedFields = UpdateInvoice.safeParse({
//     customerId: formData.get('customerId'),
//     amount: formData.get('amount'),
//     status: formData.get('status'),
//   });
 
//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//       message: 'Missing Fields. Failed to Update Invoice.',
//     };
//   }
 
//   const { customerId, amount, status } = validatedFields.data;
//   const amountInCents = amount * 100;
 
//   try {
//     await sql`
//       UPDATE invoices
//       SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
//       WHERE id = ${id}
//     `;
//   } catch (error) {
//     return { message: 'Database Error: Failed to Update Invoice.' };
//   }
 
//   revalidatePath('/dashboard/invoices');
//   redirect('/dashboard/invoices');
// }
 


// export async function deleteInvoice(id: string) {
//     // throw new Error('Failed to Delete Invoice');
//     await sql`DELETE FROM invoices WHERE id = ${id}`;
//     revalidatePath('/dashboard/invoices');
// }


// // For auth
// export async function authenticate(
//   prevState: string | undefined,
//   formData: FormData,
// ) {
//   try {
//     await signIn('credentials', formData);
//   } catch (error) {
//     if (error instanceof AuthError) {
//       switch (error.type) {
//         case 'CredentialsSignin':
//           return 'Invalid credentials.';
//         default:
//           return 'Something went wrong.';
//       }
//     }
//     throw error;
//   }
// }


// AUTH
// import NextAuth from 'next-auth';
// import { authConfig } from './auth.config';
// import Credentials from 'next-auth/providers/credentials';
// import { z } from 'zod';
// import type { User } from '@/app/lib/definitions';
// import bcrypt from 'bcrypt';
// import postgres from 'postgres';

// const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
 
// async function getUser(email: string): Promise<User | undefined> {
//   try {
//     const user = await sql<User[]>`SELECT * FROM users WHERE email=${email}`;
//     return user[0];
//   } catch (error) {
//     console.error('Failed to fetch user:', error);
//     throw new Error('Failed to fetch user.');
//   }
// }
 
// export const { auth, signIn, signOut } = NextAuth({
//   ...authConfig,
//   providers: [Credentials({
//     async authorize(credentials) {
//         const parsedCredentials = z
//           .object({ email: z.string().email(), password: z.string().min(6) })
//           .safeParse(credentials);
        
//         if (parsedCredentials.success) {
//           const { email, password } = parsedCredentials.data;
//           const user = await getUser(email);
//           if (!user) return null;
//           const passwordsMatch = await bcrypt.compare(password, user.password);

//           if (passwordsMatch) return user;
//         }
        
//         console.log('Invalid credentials');
//         return null;
//       },
//     }),
//   ],
// });


// AUTH.CONFIG
// import type { NextAuthConfig } from 'next-auth';
 
// export const authConfig = {
//   pages: {
//     signIn: '/login',
//   },
//   callbacks: {
//     authorized({ auth, request: { nextUrl } }) {
//       const isLoggedIn = !!auth?.user;
//       const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
//       if (isOnDashboard) {
//         if (isLoggedIn) return true;
//         return false; // Redirect unauthenticated users to login page
//       } else if (isLoggedIn) {
//         return Response.redirect(new URL('/dashboard', nextUrl));
//       }
//       return true;
//     },
//   },
//   providers: [], // Add providers with an empty array for now
// } satisfies NextAuthConfig;