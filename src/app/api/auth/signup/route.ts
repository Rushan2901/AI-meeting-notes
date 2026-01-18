import { NextRequest, NextResponse } from "next/server";

const users: { email: string; password: string }[] = [];

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (users.find(u => u.email === email)) {
      return NextResponse.json({ message: "User already exists." }, { status: 400 });
    }

    users.push({ email, password });
    return NextResponse.json({ message: "Signup successful!" }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
}
