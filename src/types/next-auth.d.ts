import { User } from 'next-auth';
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: UserResponse & {
      token?: string; 
    };
  }

  interface User extends DefaultUser {
    token?: string;
    user?: UserResponse;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    token?: string;
    user?: UserResponse;
  }
}
