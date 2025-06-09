import { NextResponse } from "next/server";
import { validateSignupData } from "@/lib/validateFormData";

const API_SERVER = process.env.SPRING_API_SERVER_URL;

export async function POST(request: Request) {
  const formData = await request.json();
  const { name, email, password, confirmPassword } = formData;

  // initial validation
  const { isValid, message } = validateSignupData(
    name,
    email,
    password,
    confirmPassword
  );

  if (!isValid) {
    return NextResponse.json(
      {
        success: false,
        message,
      },
      { status: 400 }
    );
  }

  // authentication logic

  try {
    // names
    const firstName = name.split(" ")[0];
    const lastName = name.substring(name.indexOf(" ") + 1) || "";
    const apiData = {
      firstName,
      lastName,
      email,
      password,
    };
    const response = await fetch(`${API_SERVER}/auth/signup`, {
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
          message: "Failed to signup",
        },
        { status: response.status }
      );
    }

    // successful signup
    const { jwt: token, refreshToken, userInfo } = await response.json();

    const nextResponse = NextResponse.json(
      {
        success: true,
        message: "Account created successfully!",
        userInfo,
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
        message: "Failed to signup",
        errorDetails: e instanceof Error ? e.message : e,
      },
      {
        status: 400,
      }
    );
  }
}
