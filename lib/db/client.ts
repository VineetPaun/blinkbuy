// Server-only Neon + Drizzle database client shared by API routes and server helpers.
import "server-only";

import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "@/lib/db/schema";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required to initialize the Neon client.");
}

const sql = neon(databaseUrl);

export const db = drizzle(sql, { schema });
