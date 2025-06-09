import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const refreshToken = (await cookies()).get("refreshToken")?.value;

  function getAbsoluteUrl(path: string) {
    const host = req.headers.get("host");
    const protocol = req.headers.get("x-forwarded-proto") || "http";
    return `${protocol}://${host}${path}`;
  }

  if (!refreshToken) {
    return NextResponse.redirect(getAbsoluteUrl("/login"));
  }

  try {
    const response = await fetch(
      `${process.env.SPRING_API_SERVER_URL}/auth/refresh`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      }
    );

    if (!response.ok) throw new Error("Failed to refresh");

    const { jwt } = await response.json();

    const res = NextResponse.redirect(getAbsoluteUrl("/dashboard"));
    res.cookies.set("token", jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600,
      path: "/",
    });

    return res;
  } catch {
    return NextResponse.redirect(getAbsoluteUrl("/login"));
  }
}
