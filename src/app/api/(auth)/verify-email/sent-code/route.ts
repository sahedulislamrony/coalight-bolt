import { getTokens } from "@/lib/getTokens";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email } = await request.json();
  const { token, refreshToken } = await getTokens();

  // initial validation
  if (!email) {
    return NextResponse.json(
      {
        success: false,
        message: "Email is required.",
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

  // send verification code logic
  try {
    const response = await fetch(
      `${process.env.SPRING_API_SERVER_URL}/auth/email-verification/code`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email }),
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to send verification code.",
        },
        { status: response.status }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Verification code sent successfully!",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while sending the verification code.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
