// Password tests ensure bcrypt helpers produce secure hashes and correct verification results.
import { describe, expect, it } from "vitest";

import { hashPassword, verifyPassword } from "@/lib/auth/password";

describe("password helpers", () => {
  it("hashes and verifies a valid password", async () => {
    const password = "CorrectHorseBatteryStaple";
    const hash = await hashPassword(password);

    expect(hash).not.toBe(password);
    await expect(verifyPassword(password, hash)).resolves.toBe(true);
  });

  it("rejects an incorrect password", async () => {
    const hash = await hashPassword("one-password");
    await expect(verifyPassword("different-password", hash)).resolves.toBe(false);
  });
});
