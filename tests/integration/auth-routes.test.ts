// Route-handler integration tests mock external services while validating auth API behavior.
import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

function jsonRequest(url: string, body: unknown): NextRequest {
  return new NextRequest(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      origin: "http://localhost",
      host: "localhost",
    },
    body: JSON.stringify(body),
  });
}

describe("auth routes", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });

  it("creates a user on signup", async () => {
    const setSessionCookie = vi.fn();

    vi.doMock("@/lib/auth/server", () => ({
      assertSameOrigin: vi.fn(() => null),
      setSessionCookie,
    }));
    vi.doMock("@/lib/auth/password", () => ({ hashPassword: vi.fn(async () => "hashed") }));
    vi.doMock("@/lib/auth/repository", () => ({
      createEmailUser: vi.fn(async () => ({
        id: "u1",
        name: "User",
        email: "user@example.com",
        phoneE164: null,
        phoneVerifiedAt: null,
      })),
    }));

    const { POST } = await import("@/app/api/auth/signup/route");
    const response = await POST(
      jsonRequest("http://localhost/api/auth/signup", {
        name: "User",
        email: "user@example.com",
        password: "password123",
      })
    );

    const body = await response.json();
    expect(response.status).toBe(201);
    expect(body.user.email).toBe("user@example.com");
    expect(setSessionCookie).toHaveBeenCalledTimes(1);
  });

  it("rejects invalid password credentials", async () => {
    vi.doMock("@/lib/auth/server", () => ({
      assertSameOrigin: vi.fn(() => null),
      setSessionCookie: vi.fn(),
    }));
    vi.doMock("@/lib/auth/repository", () => ({
      findUserByEmail: vi.fn(async () => ({
        id: "u1",
        email: "user@example.com",
        passwordHash: "hash",
      })),
      touchUserLogin: vi.fn(async () => undefined),
      toAuthUser: vi.fn(async () => ({
        id: "u1",
        name: "User",
        email: "user@example.com",
        phoneE164: null,
        phoneVerifiedAt: null,
      })),
    }));
    vi.doMock("@/lib/auth/password", () => ({
      verifyPassword: vi.fn(async () => false),
    }));

    const { POST } = await import("@/app/api/auth/login/password/route");
    const response = await POST(
      jsonRequest("http://localhost/api/auth/login/password", {
        email: "user@example.com",
        password: "bad-password",
      })
    );

    expect(response.status).toBe(401);
  });

  it("throttles OTP request when cooldown is active", async () => {
    vi.doMock("@/lib/auth/server", () => ({
      assertSameOrigin: vi.fn(() => null),
      getRequestIpHash: vi.fn(() => "ip-hash"),
    }));
    vi.doMock("@/lib/auth/repository", () => ({
      getLastOtpRequest: vi.fn(async () => new Date()),
      countOtpRequestsByPhoneSince: vi.fn(async () => 0),
      countOtpRequestsByIpSince: vi.fn(async () => 0),
      addOtpRequestLog: vi.fn(async () => undefined),
    }));
    vi.doMock("@/lib/auth/twilio", () => ({ sendOtpCode: vi.fn(async () => undefined) }));

    const { POST } = await import("@/app/api/auth/login/otp/request/route");
    const response = await POST(
      jsonRequest("http://localhost/api/auth/login/otp/request", {
        phone: "+919876543210",
        country: "IN",
      })
    );

    expect(response.status).toBe(429);
  });

  it("creates a phone user when OTP verification succeeds for new number", async () => {
    const setSessionCookie = vi.fn();

    vi.doMock("@/lib/auth/server", () => ({
      assertSameOrigin: vi.fn(() => null),
      setSessionCookie,
    }));
    vi.doMock("@/lib/auth/twilio", () => ({ verifyOtpCode: vi.fn(async () => true) }));
    vi.doMock("@/lib/auth/repository", () => ({
      findUserByPhone: vi.fn(async () => null),
      createPhoneUser: vi.fn(async () => ({
        id: "u2",
        name: "BlinkBuy User",
        email: null,
        phoneE164: "+919876543210",
        phoneVerifiedAt: new Date().toISOString(),
      })),
      markPhoneVerified: vi.fn(async () => undefined),
      toAuthUser: vi.fn(),
      touchUserLogin: vi.fn(async () => undefined),
    }));

    const { POST } = await import("@/app/api/auth/login/otp/verify/route");
    const response = await POST(
      jsonRequest("http://localhost/api/auth/login/otp/verify", {
        phone: "+919876543210",
        country: "IN",
        code: "123456",
      })
    );

    expect(response.status).toBe(200);
    expect(setSessionCookie).toHaveBeenCalledTimes(1);
  });

  it("returns 401 from /me when no user is in session", async () => {
    vi.doMock("@/lib/auth/server", () => ({
      getCurrentUserFromRequest: vi.fn(async () => null),
    }));

    const { GET } = await import("@/app/api/auth/me/route");
    const request = new NextRequest("http://localhost/api/auth/me");
    const response = await GET(request);

    expect(response.status).toBe(401);
  });

  it("clears cookie on logout", async () => {
    const clearSessionCookie = vi.fn();

    vi.doMock("@/lib/auth/server", () => ({
      assertSameOrigin: vi.fn(() => null),
      clearSessionCookie,
    }));

    const { POST } = await import("@/app/api/auth/logout/route");
    const response = await POST(jsonRequest("http://localhost/api/auth/logout", {}));

    expect(response.status).toBe(200);
    expect(clearSessionCookie).toHaveBeenCalledTimes(1);
  });
});
