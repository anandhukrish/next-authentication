import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicPath = [
  "/signup",
  "/login",
  "/verifyemail",
  "/forgotpassword",
  "/resetpassword",
];

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isPublicPath = publicPath.includes(pathname);

  const token = request.cookies.get("token")?.value || "";
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
