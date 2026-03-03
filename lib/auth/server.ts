// Server-side auth helpers manage cookies, origin checks, and session-to-user resolution.
import "server-only";

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { createHash } from "node:crypto";

import { findUserById } from "@/lib/auth/repository";
import { getAuthCookieName, SESSION_MAX_AGE_SECONDS, signSessionToken, verifySessionToken } from "@/lib/auth/session";
import type { AuthUser } from "@/lib/types";

export function buildSessionCookieOptions() {
  return {
    name: getAuthCookieName(),
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  };
}

export async function setSessionCookie(response: NextResponse, input: {
  sub: string;
  email?: string | null;
  phone?: string | null;
}): Promise<void> {
  const token = await signSessionToken({
    sub: input.sub,
    email: input.email ?? null,
    phone: input.phone ?? null,
  });

  const options = buildSessionCookieOptions();
  response.cookies.set(options.name, token, options);
}

export function clearSessionCookie(response: NextResponse): void {
  const options = buildSessionCookieOptions();
  response.cookies.set(options.name, "", {
    ...options,
    maxAge: 0,
  });
}

export async function getCurrentUserFromServerCookies(): Promise<AuthUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(getAuthCookieName())?.value;
  if (!token) {
    return null;
  }

  const payload = await verifySessionToken(token);
  if (!payload) {
    return null;
  }

  return findUserById(payload.sub);
}

export async function getCurrentUserFromRequest(request: NextRequest): Promise<AuthUser | null> {
  const token = request.cookies.get(getAuthCookieName())?.value;
  if (!token) {
    return null;
  }

  const payload = await verifySessionToken(token);
  if (!payload) {
    return null;
  }

  return findUserById(payload.sub);
}

export function assertSameOrigin(request: NextRequest): NextResponse | null {
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  const proto = request.headers.get("x-forwarded-proto") ?? request.nextUrl.protocol.replace(":", "");

  if (!host) {
    return NextResponse.json({ error: "Host header is missing." }, { status: 400 });
  }

  const expectedOrigin = `${proto}://${host}`;
  const isValid = !origin || origin === expectedOrigin || origin === request.nextUrl.origin;

  if (!isValid) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  return null;
}

export function getRequestIpHash(request: NextRequest): string | null {
  const rawIp =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip")?.trim() ??
    null;

  if (!rawIp) {
    return null;
  }

  return createHash("sha256").update(rawIp).digest("hex");
}
