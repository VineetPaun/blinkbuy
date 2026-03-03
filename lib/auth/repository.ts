// Repository helpers encapsulate auth-related SQL so routes stay simple and testable.
import "server-only";

import { and, desc, eq, gte, sql } from "drizzle-orm";

import { db } from "@/lib/db/client";
import { otpRequestLog, users } from "@/lib/db/schema";
import type { AuthUser } from "@/lib/types";

function mapUserToAuthUser(row: typeof users.$inferSelect): AuthUser {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phoneE164: row.phoneE164,
    phoneVerifiedAt: row.phoneVerifiedAt ? row.phoneVerifiedAt.toISOString() : null,
  };
}

export async function findUserById(id: string): Promise<AuthUser | null> {
  const row = await db.query.users.findFirst({ where: eq(users.id, id) });
  return row ? mapUserToAuthUser(row) : null;
}

export async function findUserByEmail(email: string): Promise<(typeof users.$inferSelect) | null> {
  return (await db.query.users.findFirst({ where: eq(users.email, email) })) ?? null;
}

export async function findUserByPhone(phoneE164: string): Promise<(typeof users.$inferSelect) | null> {
  return (await db.query.users.findFirst({ where: eq(users.phoneE164, phoneE164) })) ?? null;
}

export async function createEmailUser(input: {
  name: string;
  email: string;
  passwordHash: string;
  phoneE164?: string;
}): Promise<AuthUser> {
  const [inserted] = await db
    .insert(users)
    .values({
      name: input.name,
      email: input.email,
      passwordHash: input.passwordHash,
      phoneE164: input.phoneE164,
      phoneVerifiedAt: input.phoneE164 ? new Date() : null,
      lastLoginAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();

  return mapUserToAuthUser(inserted);
}

export async function createPhoneUser(phoneE164: string): Promise<AuthUser> {
  const [inserted] = await db
    .insert(users)
    .values({
      name: "BlinkBuy User",
      phoneE164,
      phoneVerifiedAt: new Date(),
      lastLoginAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();

  return mapUserToAuthUser(inserted);
}

export async function toAuthUser(row: typeof users.$inferSelect): Promise<AuthUser> {
  return mapUserToAuthUser(row);
}

export async function touchUserLogin(userId: string): Promise<void> {
  await db
    .update(users)
    .set({
      lastLoginAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(users.id, userId));
}

export async function markPhoneVerified(userId: string, phoneE164: string): Promise<void> {
  await db
    .update(users)
    .set({
      phoneE164,
      phoneVerifiedAt: new Date(),
      lastLoginAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(users.id, userId));
}

export async function addOtpRequestLog(phoneE164: string, ipHash: string | null): Promise<void> {
  await db.insert(otpRequestLog).values({ phoneE164, ipHash });
}

export async function getLastOtpRequest(phoneE164: string): Promise<Date | null> {
  const row = await db.query.otpRequestLog.findFirst({
    where: eq(otpRequestLog.phoneE164, phoneE164),
    orderBy: [desc(otpRequestLog.createdAt)],
  });
  return row?.createdAt ?? null;
}

export async function countOtpRequestsByPhoneSince(phoneE164: string, since: Date): Promise<number> {
  const [result] = await db
    .select({ total: sql<string>`count(*)` })
    .from(otpRequestLog)
    .where(and(eq(otpRequestLog.phoneE164, phoneE164), gte(otpRequestLog.createdAt, since)));

  return Number(result?.total ?? 0);
}

export async function countOtpRequestsByIpSince(ipHash: string, since: Date): Promise<number> {
  const [result] = await db
    .select({ total: sql<string>`count(*)` })
    .from(otpRequestLog)
    .where(and(eq(otpRequestLog.ipHash, ipHash), gte(otpRequestLog.createdAt, since)));

  return Number(result?.total ?? 0);
}
