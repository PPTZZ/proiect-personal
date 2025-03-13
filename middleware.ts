import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { userCredetials } from "./lib/actions";

const protectedRoutes = ["/calculator", "/diary"];
const publicRoutes = ["/", "/login", "/register"];

const middleware = async (req: NextRequest) => {
  const session = await userCredetials();
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  if (isPublicRoute && session?.userId) {
    return NextResponse.redirect(new URL("/calculator", req.nextUrl));
  }

  return NextResponse.next();
};

export default middleware;
