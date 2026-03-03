// OTP verification endpoint validates the code and signs in existing or new phone users.
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

import { DEFAULT_PHONE_COUNTRY, normalizePhoneToE164 } from "@/lib/auth/phone";
import {
  createPhoneUser,
  findUserByPhone,
  markPhoneVerified,
  toAuthUser,
  touchUserLogin,
} from "@/lib/auth/repository";
import { assertSameOrigin, setSessionCookie } from "@/lib/auth/server";
import { verifyOtpCode } from "@/lib/auth/twilio";
import { otpVerifyInputSchema } from "@/lib/auth/validators";

export async function POST(request: NextRequest) {
  const originError = assertSameOrigin(request);
  if (originError) {
    return originError;
  }

  try {
    const parsed = otpVerifyInputSchema.parse(await request.json());
    const phoneE164 = normalizePhoneToE164(parsed.phone, parsed.country ?? DEFAULT_PHONE_COUNTRY);

    const isApproved = await verifyOtpCode(phoneE164, parsed.code);
    if (!isApproved) {
      return NextResponse.json({ error: "Invalid OTP code." }, { status: 401 });
    }

    const existingUser = await findUserByPhone(phoneE164);
    const user = existingUser ? await toAuthUser(existingUser) : await createPhoneUser(phoneE164);

    if (existingUser && !existingUser.phoneVerifiedAt) {
      await markPhoneVerified(existingUser.id, phoneE164);
    } else {
      await touchUserLogin(user.id);
    }

    const response = NextResponse.json({ user });
    await setSessionCookie(response, {
      sub: user.id,
      email: user.email,
      phone: user.phoneE164,
    });

    return response;
  } catch (error) {
    if (error instanceof ZodError || error instanceof Error) {
      const message = error instanceof ZodError ? error.issues[0]?.message : error.message;
      if (message?.toLowerCase().includes("valid phone")) {
        return NextResponse.json({ error: "Enter a valid phone number." }, { status: 400 });
      }
      if (error instanceof ZodError) {
        return NextResponse.json({ error: message ?? "Invalid input." }, { status: 400 });
      }
    }

    console.error("OTP verify route error:", error);
    return NextResponse.json({ error: "Unable to verify OTP right now." }, { status: 500 });
  }
}
