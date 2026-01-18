import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const notes = pgTable("notes", {
  id: serial("id").primaryKey(),

  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),

  title: text("title").notNull(),
  content: text("content").notNull(),

  summary: text("summary"),
  actionItems: text("action_items"),
  keyPoints: text("key_points"),

  createdAt: timestamp("created_at").defaultNow(),
});
