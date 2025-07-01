import { NextRequest, NextResponse } from "next/server";

const PRIVATE_ROUTES = ["/dashboard", "/courses", "/settings"];
const PUBLIC_ROUTES = ["/login", "/signup", "/about", "/contact"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  const isPrivateRoute = PRIVATE_ROUTES.some((route) =>
    pathname.startsWith(route)
  );
  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  if (isPrivateRoute) {
    if (accessToken) {
      return NextResponse.next();
    }

    if (refreshToken) {
      const url = req.nextUrl.clone();
      url.pathname = "/api/refresh";
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }

    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if ((isPublicRoute && accessToken) || pathname === "/") {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
