import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// Create postgres client using DATABASE_URL
const client = postgres(process.env.DATABASE_URL!, {
  ssl: "require",
});

// Export drizzle database instance
export const db = drizzle(client);
