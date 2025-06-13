// Mock auth configuration for now
// This will be replaced with actual NextAuth.js configuration

export const authConfig = {
  providers: [],
  pages: {
    signIn: "/auth/login",
    signUp: "/auth/register",
    error: "/auth/error",
  },
  callbacks: {
    authorized({ token, request }: { token: any; request: { nextUrl: any } }) {
      const { nextUrl } = request;
      const isLoggedIn = !!token;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      const isOnAuth = nextUrl.pathname.startsWith("/auth");

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isOnAuth) {
        if (isLoggedIn)
          return Response.redirect(new URL("/dashboard", nextUrl));
        return true;
      }
      return true;
    },
  },
};

// Export as authOptions for compatibility
export const authOptions = authConfig;

// Mock session type
export interface Session {
  user: {
    id: string;
    email: string;
    name: string;
    profileCompleted: boolean;
  };
}

// Mock function to get session
export async function getServerSession(): Promise<Session | null> {
  // TODO: Replace with actual session logic
  return null;
}

// Mock function to redirect
export function redirect(url: string): never {
  // TODO: Replace with actual redirect logic
  throw new Error(`Redirect to ${url}`);
}
