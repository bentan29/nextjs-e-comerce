import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const secret = process.env.AUTH_SECRET;

export async function middleware(req: NextRequest) {

  const token = await getToken({ req, secret }); //-getToken() función de next-auth que lee y valida el JWT de la cookie de sesión.
  const isLoggedIn = !!token; //- isLoggedIn: será true si hay un token válido (usuario autenticado), o false si no.

  const pathname = req.nextUrl.pathname;

  // Si no está logueado, lo mandamos al login
  if (!isLoggedIn) {
    const loginUrl = new URL('/auth/login', req.url);
    loginUrl.searchParams.set("redirectTo", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  if(pathname.startsWith('/admin') && token?.role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url)); // lo mandamos al home
  }

  // Si está logueado, dejo pasar
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/checkout/:path*', 
    '/user/profile',
    '/user/orders',
    "/admin/:path*"   // ahora protegemos todo /admin/*
  ],
};
