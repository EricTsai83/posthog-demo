import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { type Session } from "next-auth";
import { auth as getSession } from "@/auth";

// export const config = {
//   matcher: ["/login", "/api", "/members"],
// };

const { auth } = NextAuth(authConfig);

// export const config = {
//   // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
//   matcher: ["/((?!api|_next/static|_next/image|.*\\.png$|$|static|.*\\..*).*)"],
// };

export const config = {
  matcher: ["/private-page"],
};

export default auth(async function middleware(request: NextRequest) {
  const session = (await getSession()) as Session;
  return NextResponse.next();
});
