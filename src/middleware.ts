/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
  "/counter",
];

export function middleware(req: NextRequest) {
  // const { pathname } = req.nextUrl;
  // const accessToken = req.cookies.get("token")?.value;
  // const refreshToken = req.cookies.get("refreshToken")?.value;
  // Allow static assets in public folder (images, video, audio, fonts, etc.)
  // if (
  //   /\.(png|jpe?g|jpg|svg|gif|ico|webp|bmp|tiff|mp4|webm|ogg|mp3|wav|m4a|aac|flac|mov|avi|wmv|mkv|txt|xml|json|woff2?|ttf|eot)$/i.test(
  //     pathname
  //   )
  // ) {
  //   return NextResponse.next();
  // }
  // const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
  // Logged-in users accessing public pages → redirect to dashboard
  // if (isPublicRoute && (accessToken || refreshToken)) {
  //   const url = req.nextUrl.clone();
  //   url.pathname = "/dashboard";
  //   return NextResponse.redirect(url);
  // }
  // Public route → allow access
  // if (isPublicRoute) {
  //   return NextResponse.next();
  // }
  // // Private route with access token → allow
  // if (accessToken) {
  //   return NextResponse.next();
  // }
  // const url = req.nextUrl.clone();
  // // Private route with refresh token only → redirect to refresh API
  // if (refreshToken) {
  //   url.pathname = "/api/refresh";
  //   return NextResponse.redirect(url);
  // }
  // // No tokens and trying to access private route → redirect to login
  // url.pathname = "/login";
  // return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
