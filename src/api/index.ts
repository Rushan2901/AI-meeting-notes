import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { db } from "@/db";
import { meetingNotes } from "@/db/schema";
import { eq } from "drizzle-orm";

const app = new Hono();

/* -----------------------------
   Validation schemas
----------------------------- */
const createNoteSchema = z.object({
  title: z.string().min(1),
  content: z.any(),
});

/* -----------------------------
   Routes
----------------------------- */

// GET all notes (TEMP: no auth yet)
app.get("/notes", async (c) => {
  const notes = await db.select().from(meetingNotes);
  return c.json({ notes });
});

// POST create note
app.post(
  "/notes",
  zValidator("json", createNoteSchema),
  async (c) => {
    const { title, content } = c.req.valid("json");

    const [note] = await db
      .insert(meetingNotes)
      .values({
        title,
        content,
        userId: "TEMP_USER",
      })
      .returning();

    return c.json({ note }, 201);
  }
);

export default app;
