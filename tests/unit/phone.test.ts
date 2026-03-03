// Phone tests verify E.164 normalization and invalid-input handling.
import { describe, expect, it } from "vitest";

import { maskPhone, normalizePhoneToE164 } from "@/lib/auth/phone";

describe("phone helpers", () => {
  it("normalizes Indian numbers to E.164", () => {
    expect(normalizePhoneToE164("9876543210", "IN")).toBe("+919876543210");
  });

  it("throws for invalid numbers", () => {
    expect(() => normalizePhoneToE164("12", "IN")).toThrow("Enter a valid phone number.");
  });

  it("masks most digits for OTP UI messages", () => {
    expect(maskPhone("+919876543210")).toBe("+919******10");
  });
});
