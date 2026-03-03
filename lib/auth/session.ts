// Session token helpers sign and verify short JWT payloads stored in httpOnly cookies.
import { jwtVerify, SignJWT } from "jose";

import type { SessionPayload } from "@/lib/types";

export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export function getAuthCookieName(): string {
  return process.env.AUTH_COOKIE_NAME?.trim() || "bb_session";
}

function getJwtSecretKey(): Uint8Array {
  const secret = process.env.AUTH_JWT_SECRET;
  if (!secret) {
    throw new Error("AUTH_JWT_SECRET is required for session signing.");
  }
  return new TextEncoder().encode(secret);
}

export async function signSessionToken(payload: Omit<SessionPayload, "iat" | "exp">): Promise<string> {
  return new SignJWT({
    email: payload.email ?? null,
    phone: payload.phone ?? null,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE_SECONDS}s`)
    .sign(getJwtSecretKey());
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const result = await jwtVerify(token, getJwtSecretKey(), {
      algorithms: ["HS256"],
    });

    const payload = result.payload;
    if (!payload.sub) {
      return null;
    }

    return {
      sub: payload.sub,
      email: typeof payload.email === "string" ? payload.email : null,
      phone: typeof payload.phone === "string" ? payload.phone : null,
      iat: payload.iat ?? 0,
      exp: payload.exp ?? 0,
    };
  } catch {
    return null;
  }
}
