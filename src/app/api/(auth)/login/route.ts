import { validateLoginData } from "@/lib/validateFormData";
import { NextResponse } from "next/server";

const API_SERVER = process.env.SPRING_API_SERVER_URL;

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // initial validation
  const { isValid, message } = validateLoginData(email, password);

  if (!isValid) {
    return NextResponse.json(
      {
        success: false,
        message: message || "Invalid login data",
      },
      { status: 400 }
    );
  }
  // authentication logic
  try {
    const apiData = {
      email,
      password,
    };
    const response = await fetch(`${API_SERVER}/auth/login`, {
      body: JSON.stringify(apiData),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: "Your email or password is incorrect.",
        },
        { status: response.status }
      );
    }

    // successful signin
    const { jwt: token, refreshToken, userInfo } = await response.json();
    const { firstName, lastName, ...restUserInfo } = userInfo;
    const userInfoWithName = {
      ...restUserInfo,
      name: `${firstName} ${lastName}`,
    };

    const nextResponse = NextResponse.json(
      {
        success: true,
        message: "Login successfully!",
        userInfo: userInfoWithName,
      },
      { status: 200 }
    );

    // set cookies
    nextResponse.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60, // 1 hour
    });
    nextResponse.cookies.set({
      name: "refreshToken",
      value: refreshToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return nextResponse;
  } catch (e) {
    return NextResponse.json(
      {
        success: false,
        message: "Your email or password is incorrect.",
        errorDetails: e instanceof Error ? e.message : e,
      },
      {
        status: 400,
      }
    );
  }
}
