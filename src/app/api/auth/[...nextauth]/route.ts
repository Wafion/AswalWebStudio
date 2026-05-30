import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { db } from '@/lib/db';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Admin Login',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'admin@aswalwebstudio.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please provide email and password');
        }

        const user = await db.getAdminByEmail(credentials.email);

        if (!user) {
          throw new Error('Invalid email or password');
        }

        // For local development fallback, we match 'admin123' or the hash
        const isDefaultAdmin = credentials.email === 'admin@aswalwebstudio.com' && credentials.password === 'admin123';
        
        if (isDefaultAdmin || credentials.password === user.passwordHash) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        }

        throw new Error('Invalid email or password');
      },
    }),
  ],
  pages: {
    signIn: '/admin', // Redirect back to admin route for custom login layout
    error: '/admin',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || 'aswal-studio-secret-key-12345',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
