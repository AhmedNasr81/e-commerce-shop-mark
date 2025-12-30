
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const protectedPages = [
  "/cart",
  "/profile",
  "/addresses",
  "/allorders",
  "/wishlist",
];

const authPages = ["/login", "/register"];


export async function proxy(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;


  if (protectedPages.includes(pathname)) {
    if (token) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  if (authPages.includes(pathname)) {
    if (!token) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}


export const config = {
  matcher: [
    "/cart",
    "/profile",
    "/addresses",
    "/allorders",
    "/wishlist",
    "/login",
    "/register",
  ],
};
