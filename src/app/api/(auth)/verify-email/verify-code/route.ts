import { getTokens } from "@/lib/getTokens";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, code } = await request.json();
  const { token, refreshToken } = await getTokens();

  // initial validation
  if (!email || !code) {
    return NextResponse.json(
      {
        success: false,
        message: "Email and verification code are required.",
      },
      { status: 400 }
    );
  }

  if (token === "" || refreshToken === "") {
    return NextResponse.json(
      {
        success: false,
        message: "Authentication token is missing or expired.",
      },
      { status: 401 }
    );
  }

  // verification logic
  try {
    const response = await fetch(
      `${process.env.SPRING_API_SERVER_URL}/auth/email-verification/verify`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ verificationCode: code }),
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid verification code.",
        },
        { status: response.status }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Email verified successfully!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error verifying email:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred.",
      },
      { status: 500 }
    );
  }
}
