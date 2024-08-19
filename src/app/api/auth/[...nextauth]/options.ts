import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import UserModel from "@/models/User.model";
import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        identifier: { label: "Username or Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        await dbConnect();
        try {
          // Find user by either email or username
          const user = await UserModel.findOne({
            $or: [
              { email: credentials.identifier },
              { username: credentials.identifier },
            ],
          });

          // Handle user not found
          if (!user) {
            throw new Error("User with this email or username does not exist.");
          }

          // Check password
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isPasswordCorrect) {
            throw new Error("Incorrect password.");
          }
          console.log(user);
          return user;
        } catch (err: any) {
          throw new Error(
            err.message || "Something went wrong during sign-in."
          );
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.username = user.username;
        token.role = user.role;
        token.avatar = {
          url: user.avatar?.url || "/default-avatar.png",
          public_id: user.avatar?.public_id || "",
        };
        token.videoLink1 = user.videoLink1;
        token.videoLink2 = user.videoLink2;
        token.videoLink3 = user.videoLink3;
        token.bio = user.bio;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.role = token.role;
        session.user.username = token.username;
        session.user.avatar = {
          url: token.avatar?.url || "/default-avatar.png",
          public_id: token.avatar?.public_id || "",
        };
        session.user.videoLink1 = token.videoLink1;  
        session.user.videoLink2 = token.videoLink2;
        session.user.videoLink3 = token.videoLink3;
        session.user.bio = token.bio;
      }
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
