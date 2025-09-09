import { auth } from "@/auth"

export default auth((req) => {
  const session = req.auth;

  // Si no hay sesión → redirigimos al login
  if (!session) {
    return Response.redirect(new URL("/auth/login", req.nextUrl))
  }

  // Si la ruta es /admin y el usuario no es admin → redirigimos al home
  if (req.nextUrl.pathname.startsWith("/admin") && session.user?.role !== "admin") {
    return Response.redirect(new URL("/", req.nextUrl))
  }

  // Si todo bien, seguimos con la request
  return undefined
})

export const config = {
  matcher: [
    "/checkout/:path*", 
    "/user/:path*", 
    "/admin/:path*"
  ],
}
