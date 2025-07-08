import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  })],
  secret: process.env.NEXTAUTH_SECRET, // Don't forget the secret!
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async session({ session }) {
      if (session?.user?.email) {
        const user = await prisma.user.findUnique({
          where: {
            email: session.user.email,
          },
          select: {
            id: true, // Select the user's ID
          },
        });

        if (user) {
          session.user.id = user.id; // Add the ID to the session
        }
      }
      return session;
    },
  },
});
