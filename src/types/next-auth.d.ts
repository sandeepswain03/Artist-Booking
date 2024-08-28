import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      _id: string;
      username: string;
      role: string;
      avatar: Array<{
        public_id: string;
        url: string;
      }>;
      videoLink1: string;
      videoLink2?: string;
      videoLink3?: string;
      bio: string;
      socialLink1?: string;
      socialLink2?: string;
      socialLink3?: string;
      socialLink4?: string;
      socialLink5?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    _id: string;
    username: string;
    role: string;
    avatar: Array<{
      public_id: string;
      url: string;
    }>;
    videoLink1: string;
    videoLink2?: string;
    videoLink3?: string;
    bio: string;
    socialLink1?: string;
    socialLink2?: string;
    socialLink3?: string;
    socialLink4?: string;
    socialLink5?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id: string;
    username: string;
    role: string;
    avatar: Array<{
      public_id: string;
      url: string;
    }>;
    videoLink1: string;
    videoLink2?: string;
    videoLink3?: string;
    bio: string;
    socialLink1?: string;
    socialLink2?: string;
    socialLink3?: string;
    socialLink4?: string;
    socialLink5?: string;
  }
}
