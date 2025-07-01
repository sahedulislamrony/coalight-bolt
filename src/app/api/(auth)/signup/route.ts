/* eslint-disable @typescript-eslint/no-unused-vars */
import { SignUpCredentials } from "@/types";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const expressUrl = `${process.env.EXPRESS_API_BASE_URL}/auth/register`;

  const body: SignUpCredentials = await request.json();

  const { name, email, password, confirmPassword } = body;

  // Validate request body
  if (!email || !password || !confirmPassword || !name) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { message: "Invalid email format" },
      { status: 400 }
    );
  }

  if (password !== confirmPassword) {
    return NextResponse.json(
      { message: "Passwords do not match" },
      { status: 400 }
    );
  }

  if (password.length < 6) {
    return NextResponse.json(
      { message: "Password must be at least 6 characters long" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(expressUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: request.headers.get("Cookie") || "",
      },
      body: JSON.stringify(body),
      credentials: "include",
    });

    const data = await response.json();
    const responseHeaders = new Headers();

    // Forward set-cookie headers
    const setCookie = response.headers.get("set-cookie");
    if (setCookie) {
      responseHeaders.set("set-cookie", setCookie);
    }

    return NextResponse.json(data, {
      headers: responseHeaders,
      status: response.status,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
