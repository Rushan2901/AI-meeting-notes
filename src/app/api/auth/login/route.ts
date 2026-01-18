import { NextRequest, NextResponse } from "next/server";

// Demo hardcoded user
export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (email === "test@example.com" && password === "123456") {
      return NextResponse.json({ message: "Login successful!" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });
    }
  } catch {
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
}
