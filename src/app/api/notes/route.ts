import { NextResponse } from "next/server";
import { db } from "@/drizzle/db";
import { notes } from "@/drizzle/schema";

// ✅ GET — DO NOT TOUCH LOGIC, JUST ENSURE JSON IS RETURNED
export async function GET() {
  try {
    const allNotes = await db.select().from(notes);
    return NextResponse.json(allNotes); // ✅ ALWAYS JSON
  } catch (error) {
    console.error("GET /api/notes error:", error);
    return NextResponse.json([], { status: 500 }); // ✅ still JSON
  }
}

// ✅ POST — already correct
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, content } = body;

    const summary = "AI-generated summary";
    const keyPoints = "• Point 1\n• Point 2";
    const actionItems = "• Action 1\n• Action 2";

    const result = await db
      .insert(notes)
      .values({
        title,
        content,
        summary,
        keyPoints,
        actionItems,
      })
      .returning();

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("POST /api/notes error:", error);
    return NextResponse.json(
      { error: "Failed to save note" },
      { status: 500 }
    );
  }
}
