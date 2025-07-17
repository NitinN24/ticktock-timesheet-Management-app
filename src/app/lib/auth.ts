import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { users } from "./mockData";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "name@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Dummy authentication
        const user = users.find(
          (u) =>
            u.email === credentials?.email &&
            u.password === credentials?.password
        );
        if (user) {
          return { id: user.id, name: user.name, email: user.email };
        }
        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/", // our login page
  },
};
