import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { type NextAuthConfig, type DefaultSession } from "next-auth";
import Discord from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials";

import { db } from "~/server/db";

declare module "@auth/core" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    Discord,
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = await db.user.findUnique({
          where: {
            email: credentials.username,
          },
        });

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  adapter: PrismaAdapter(db),
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
  callbacks: {
    authorized(params) {
      return !!params.auth?.user;
    },
    jwt: async (data) => {
      return data.token;
    },
    session: async ({ session, user, token }) => {
      // @ts-expect-error
      session.user.id = token.sub;
      return session;
    },
  },
  cookies: {
    pkceCodeVerifier: {
      name: "next-auth.pkce.code_verifier",
      options: {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: true,
      },
    },
  },
  // @ts-expect-error
}) satisfies NextAuthConfig;
