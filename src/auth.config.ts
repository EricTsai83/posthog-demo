import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnLoginPage = nextUrl.pathname.startsWith("/login");

      if (!isLoggedIn && !isOnLoginPage) {
        return Response.redirect(new URL("/login", nextUrl));
      }

      if (isLoggedIn && isOnLoginPage) {
        return Response.redirect(new URL("/", nextUrl));
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token = { ...token, ...user };
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        // console.log("token", token);
        // const { id } = token as { id: string };
        // console.log("id", id);
        // const { user } = session;
        // console.log("user", user);
        // session = { ...session, user: { ...user, id } };
        // console.log("session", session);

        session.user = token as any;
        // console.log("session", session);

        return session;
      }

      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
