import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    // Google OAuth Provider
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // Guest Login Provider (Credentials)
    Credentials({
      name: "Guest",
      credentials: {
        name: { label: "Name", type: "text", placeholder: "Enter your name" },
      },
      async authorize(credentials) {
        // Simple guest login - any name is accepted
        if (credentials?.name) {
          return {
            id: `guest-${Date.now()}`,
            name: credentials.name as string,
            email: `guest-${Date.now()}@portfolio.local`,
            image: null,
          }
        }
        return null
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub || token.id as string
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
})
