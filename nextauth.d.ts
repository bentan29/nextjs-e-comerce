import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            name: string;
            email: string;
            emailVerified?: boolean;
            role: string;
            image?: string;
        } & DefaultSession['user'];
    }

    interface User extends DefaultUser {
        id: string;
        role: string; // 👈 extendemos también User
    }
}


declare module "next-auth/jwt" {
    interface JWT {
      id: string;
      role: string; // 👈 extendemos también el token
      data?: any;
    }
}
    