// Signup endpoint creates an email/password account and immediately starts a session.
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

import { hashPassword } from "@/lib/auth/password";
import { createEmailUser } from "@/lib/auth/repository";
import { normalizePhoneToE164 } from "@/lib/auth/phone";
import { assertSameOrigin, setSessionCookie } from "@/lib/auth/server";
import { signupInputSchema } from "@/lib/auth/validators";

export async function POST(request: NextRequest) {
  const originError = assertSameOrigin(request);
  if (originError) {
    return originError;
  }

  try {
    const parsed = signupInputSchema.parse(await request.json());
    const normalizedPhone = parsed.phone ? normalizePhoneToE164(parsed.phone) : undefined;
    const passwordHash = await hashPassword(parsed.password);

    const user = await createEmailUser({
      name: parsed.name,
      email: parsed.email,
      passwordHash,
      phoneE164: normalizedPhone,
    });

    const response = NextResponse.json({ user }, { status: 201 });
    await setSessionCookie(response, {
      sub: user.id,
      email: user.email,
      phone: user.phoneE164,
    });

    return response;
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues[0]?.message ?? "Invalid input." }, { status: 400 });
    }

    if (error instanceof Error && error.message.toLowerCase().includes("valid phone")) {
      return NextResponse.json({ error: "Enter a valid phone number." }, { status: 400 });
    }

    if (error && typeof error === "object" && "code" in error && error.code === "23505") {
      return NextResponse.json({ error: "An account with this email or phone already exists." }, { status: 409 });
    }

    console.error("Signup route error:", error);
    return NextResponse.json({ error: "Unable to create account right now." }, { status: 500 });
  }
}
