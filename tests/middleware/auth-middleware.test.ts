// Middleware tests verify protected route gating for authenticated and anonymous traffic.
import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it } from "vitest";

import { middleware } from "@/middleware";
import { getAuthCookieName, signSessionToken } from "@/lib/auth/session";

function makeRequest(path: string, cookie?: string): NextRequest {
  const headers = new Headers();
  if (cookie) {
    headers.set("cookie", `${getAuthCookieName()}=${cookie}`);
  }
  return new NextRequest(`http://localhost${path}`, { headers });
}

describe("auth middleware", () => {
  beforeEach(() => {
    process.env.AUTH_JWT_SECRET = "test-auth-secret-1234567890";
  });

  it("redirects anonymous users from protected pages", async () => {
    const response = await middleware(makeRequest("/"));
    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toContain("/auth/login");
  });

  it("returns 401 for anonymous protected API calls", async () => {
    const response = await middleware(makeRequest("/api/ai/chat"));
    expect(response.status).toBe(401);
  });

  it("allows authenticated users on protected pages", async () => {
    const token = await signSessionToken({ sub: "user_1", email: "user@example.com", phone: "+919876543210" });
    const response = await middleware(makeRequest("/", token));
    expect(response.status).toBe(200);
  });

  it("redirects authenticated users away from auth pages", async () => {
    const token = await signSessionToken({ sub: "user_1", email: "user@example.com", phone: "+919876543210" });
    const response = await middleware(makeRequest("/auth/login", token));
    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("http://localhost/");
  });

  it("keeps auth routes public for anonymous users", async () => {
    const response = await middleware(makeRequest("/auth/login"));
    expect(response.status).toBe(200);
  });
});
