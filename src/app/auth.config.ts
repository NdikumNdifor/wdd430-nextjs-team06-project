import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      // const isOnProducts = nextUrl.pathname.startsWith('/products');
      // const isOnAdmin = nextUrl.pathname.startsWith('/admin');

      // If the user is trying to access any protected team route
      // if (isOnDashboard || isOnProducts || isOnAdmin)
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Crucial: Halts page load and forces redirect to /login
      }
      // if (isOnDashboard) {           // Initial code
      //   if (isLoggedIn) return true;
      //   return false; // Redirect unauthenticated users to login page
      // } else if (isLoggedIn) {
      //   return Response.redirect(new URL('/dashboard', nextUrl));
      // }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;