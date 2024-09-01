import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "@/auth.config";
import { getUser } from "@/actions/actions";
import { z } from "zod";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            username: z.string(),
            password: z.string(),
            callbackUrl: z.string().url(),
          })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { username, password, callbackUrl } = parsedCredentials.data;
          const user = await getUser(username, password, callbackUrl);
          return user;
        }

        return null;
      },
    }),
  ],
});
