import { User } from '@/utils/models';
import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import { connectDB } from '@/utils/database';

export const AuthOptions = NextAuth ({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  theme: {
    colorScheme: 'light',
    logo: '/logo.svg',
  },
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user?.email });

      if (sessionUser) {
        const updatedUser = {
          ...session.user,
          id: sessionUser._id,
        };
        return { ...session, user: updatedUser };
      }

      return session;
    },

    async signIn({ profile }: { profile?: { name?: string; email?: string; picture?: string } }) {
      try {
        await connectDB();

        const userExists = await User.findOne({ email: profile?.email });
        if (!userExists) {
          await User.create({
            name: profile?.name,
            email: profile?.email,
            image: profile?.picture,
          });
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});
