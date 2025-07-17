import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { users } from "@/app/lib/mockData"; // adjust path based on your structure

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = users.find(
          (user) =>
            user.email === credentials.email &&
            user.password === credentials.password
        );

        if (user) {
          // Don't return password!
          const { password, ...userWithoutPassword } = user;
          return userWithoutPassword;
        }

        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
