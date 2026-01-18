import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { content } = await req.json();

  // Mock AI logic (acceptable for college assignment)
  const actions = content
    .split(".")
    .filter((line: string) => line.trim().length > 5)
    .map((line: string) => "• " + line.trim());

  return NextResponse.json({
    actions,
  });
}
