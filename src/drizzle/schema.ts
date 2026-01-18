import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

/* ---------------- NOTES TABLE ---------------- */
export const notes = pgTable("notes", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),

  summary: text("summary"),
  actionItems: text("action_items"),
  keyPoints: text("key_points"),

  createdAt: timestamp("created_at").defaultNow(),
});

/* ---------------- USERS TABLE ---------------- */
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
