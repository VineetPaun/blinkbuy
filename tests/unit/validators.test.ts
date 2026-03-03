// Validation tests lock request schema constraints for auth endpoints.
import { describe, expect, it } from "vitest";

import {
  otpRequestInputSchema,
  otpVerifyInputSchema,
  passwordLoginInputSchema,
  signupInputSchema,
} from "@/lib/auth/validators";

describe("auth validators", () => {
  it("accepts valid signup payload", () => {
    const parsed = signupInputSchema.parse({
      name: "Vineet Paun",
      email: "USER@EXAMPLE.COM",
      password: "strong-pass-123",
      phone: "+919876543210",
    });

    expect(parsed.email).toBe("user@example.com");
  });

  it("rejects short signup password", () => {
    expect(() =>
      signupInputSchema.parse({
        name: "Vineet",
        email: "user@example.com",
        password: "123",
      })
    ).toThrow();
  });

  it("accepts valid password login payload", () => {
    expect(
      passwordLoginInputSchema.parse({
        email: "user@example.com",
        password: "password",
      })
    ).toBeTruthy();
  });

  it("accepts valid OTP request and verify payloads", () => {
    expect(otpRequestInputSchema.parse({ phone: "+919876543210", country: "IN" })).toBeTruthy();
    expect(otpVerifyInputSchema.parse({ phone: "+919876543210", country: "IN", code: "123456" })).toBeTruthy();
  });
});
