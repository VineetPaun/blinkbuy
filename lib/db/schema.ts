// Drizzle schema for BlinkBuy authentication and OTP rate-limiting metadata.
import { sql } from "drizzle-orm";
import { check, index, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    email: text("email").unique(),
    phoneE164: text("phone_e164").unique(),
    passwordHash: text("password_hash"),
    phoneVerifiedAt: timestamp("phone_verified_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
    lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
  },
  (table) => [
    check("users_email_or_phone_required", sql`${table.email} is not null or ${table.phoneE164} is not null`),
  ]
);

export const otpRequestLog = pgTable(
  "otp_request_log",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    phoneE164: text("phone_e164").notNull(),
    ipHash: text("ip_hash"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [index("otp_request_log_phone_created_idx").on(table.phoneE164, table.createdAt)]
);

export type DbUser = typeof users.$inferSelect;
export type NewDbUser = typeof users.$inferInsert;
