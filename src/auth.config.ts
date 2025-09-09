import { loginSchema } from './schema/loginSchema';
import Credentials from 'next-auth/providers/credentials';
import { NextAuthConfig } from "next-auth";
import prisma from './lib/prisma';
import bcrypt from 'bcryptjs';

export const authConfig: NextAuthConfig = {

    pages: {
        signIn: '/auth/login',
        newUser: '/auth/new-account',
        error: '/auth/error'
    },

    cookies: {
        sessionToken: {
          name: `__Secure-next-auth.session-token`,
          options: {
            httpOnly: true,
            sameSite: "lax",
            path: "/",
            secure: process.env.NODE_ENV === "production",
          },
        },
      },

    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            console.log({auth});
            const isLoggedIn = !!auth?.user;
            const isOnCheckout = nextUrl.pathname.startsWith("/checkout");
            if (isOnCheckout && !isLoggedIn) {
                return Response.redirect(new URL("/auth/login?redirectTo=/checkout/address", nextUrl));
                // Redirigir al login si el usuario no está autenticado y quiere acceder a /checkout
            }
          return true;
        },

        async jwt({token, user}) {
            if(user) {
                token.data = user; //- Agregamos el usuario al token
                token.role = user.role; // Guardás el rol en el token
            }
            return token;
        },

        session({session, token, user}) {
            session.user = token.data as any; //- Agregamos el usuario que guardamos en el token.data al session.user
            session.user.role = token.role as string;
            return session;
        }
    },

    providers: [
        Credentials({
            async authorize(credentials) {
                
                const parsedCredentials = loginSchema.safeParse(credentials)
                if (!parsedCredentials.success) {
                    console.error("CredentialsSignin", parsedCredentials.error.format());
                    return null;
                }
                const { email, password } = parsedCredentials.data;

                //- Buscamos en DB por correo, el usuario junto a al address
                const user = await prisma.user.findUnique({
                    where: {email: email.toLowerCase()},
                })
                if(!user) return null;

                //- Comparar contraseñas
                if(!bcrypt.compareSync(password, user.password)) return null;

                //- Retornar el usuario, Excepto el password, lo quitamos
                const {password:_ , ...rest} = user;

                return rest;
            }
        })

    ]
}
