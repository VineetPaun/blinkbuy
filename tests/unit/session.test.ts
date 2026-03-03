// Session tests validate JWT signing/verifying and cookie name defaults.
import { beforeEach, describe, expect, it } from "vitest";

import { getAuthCookieName, signSessionToken, verifySessionToken } from "@/lib/auth/session";

describe("session helpers", () => {
  beforeEach(() => {
    process.env.AUTH_JWT_SECRET = "test-auth-secret-1234567890";
    delete process.env.AUTH_COOKIE_NAME;
  });

  it("signs and verifies a session payload", async () => {
    const token = await signSessionToken({
      sub: "user_1",
      email: "user@example.com",
      phone: "+919876543210",
    });

    const payload = await verifySessionToken(token);
    expect(payload?.sub).toBe("user_1");
    expect(payload?.email).toBe("user@example.com");
    expect(payload?.phone).toBe("+919876543210");
  });

  it("returns null for malformed tokens", async () => {
    await expect(verifySessionToken("bad-token")).resolves.toBeNull();
  });

  it("uses default cookie name and supports override", () => {
    expect(getAuthCookieName()).toBe("bb_session");
    process.env.AUTH_COOKIE_NAME = "custom_cookie";
    expect(getAuthCookieName()).toBe("custom_cookie");
  });
});
