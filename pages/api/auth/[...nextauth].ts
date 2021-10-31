import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { compare } from "bcryptjs";

import dbConnect from "../../../lib/db-connect";
import User from "../../../models/user";

async function verifyPassword(password, hashedPassword) {
  const isValid = await compare(password, hashedPassword);

  return isValid;
}

export default NextAuth({
  providers: [
    Providers.Credentials({
      async authorize(credentials: any) {
        await dbConnect();

        const user = await User.findOne({ username: credentials.username });

        if (!user) {
          throw new Error("Username or password incorrect!");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error("Username or password incorrect!");
        }

        return { username: user.username };
      },
    }),
  ],
  session: {
    jwt: true,
  },
  callbacks: {
    async jwt(token, user) {
      // add user information
      user && (token.user = user.username);

      return token;
    },
    async session(session, user) {
      session.user = user.user;

      return session;
    },
  },
});
