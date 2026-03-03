// OTP request endpoint enforces cooldown/rate limits before sending Twilio Verify codes.
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

import { DEFAULT_PHONE_COUNTRY, maskPhone, normalizePhoneToE164 } from "@/lib/auth/phone";
import {
  addOtpRequestLog,
  countOtpRequestsByIpSince,
  countOtpRequestsByPhoneSince,
  getLastOtpRequest,
} from "@/lib/auth/repository";
import { assertSameOrigin, getRequestIpHash } from "@/lib/auth/server";
import { sendOtpCode } from "@/lib/auth/twilio";
import { otpRequestInputSchema } from "@/lib/auth/validators";

const OTP_COOLDOWN_SECONDS = 30;
const OTP_WINDOW_MINUTES = 15;
const MAX_OTP_BY_PHONE_WINDOW = 5;
const MAX_OTP_BY_IP_WINDOW = 20;

export async function POST(request: NextRequest) {
  const originError = assertSameOrigin(request);
  if (originError) {
    return originError;
  }

  try {
    const parsed = otpRequestInputSchema.parse(await request.json());
    const phoneE164 = normalizePhoneToE164(parsed.phone, parsed.country ?? DEFAULT_PHONE_COUNTRY);
    const ipHash = getRequestIpHash(request);

    const lastRequestAt = await getLastOtpRequest(phoneE164);
    if (lastRequestAt) {
      const elapsedSeconds = Math.floor((Date.now() - lastRequestAt.getTime()) / 1000);
      if (elapsedSeconds < OTP_COOLDOWN_SECONDS) {
        return NextResponse.json(
          { error: `Please wait ${OTP_COOLDOWN_SECONDS - elapsedSeconds}s before requesting another OTP.` },
          { status: 429 }
        );
      }
    }

    const windowStart = new Date(Date.now() - OTP_WINDOW_MINUTES * 60 * 1000);
    const requestsByPhone = await countOtpRequestsByPhoneSince(phoneE164, windowStart);
    if (requestsByPhone >= MAX_OTP_BY_PHONE_WINDOW) {
      return NextResponse.json({ error: "Too many OTP attempts for this number. Try again later." }, { status: 429 });
    }

    if (ipHash) {
      const requestsByIp = await countOtpRequestsByIpSince(ipHash, windowStart);
      if (requestsByIp >= MAX_OTP_BY_IP_WINDOW) {
        return NextResponse.json({ error: "Too many OTP attempts from this network. Try again later." }, { status: 429 });
      }
    }

    await sendOtpCode(phoneE164);
    await addOtpRequestLog(phoneE164, ipHash);

    return NextResponse.json({
      message: `OTP sent to ${maskPhone(phoneE164)}.`,
    });
  } catch (error) {
    if (error instanceof ZodError || error instanceof Error) {
      const message = error instanceof ZodError ? error.issues[0]?.message : error.message;
      if (message?.toLowerCase().includes("valid phone")) {
        return NextResponse.json({ error: "Enter a valid phone number." }, { status: 400 });
      }
      if (message?.toLowerCase().includes("twilio")) {
        return NextResponse.json({ error: "OTP service is currently unavailable." }, { status: 503 });
      }
      if (error instanceof ZodError) {
        return NextResponse.json({ error: message ?? "Invalid input." }, { status: 400 });
      }
    }

    console.error("OTP request route error:", error);
    return NextResponse.json({ error: "Unable to send OTP right now." }, { status: 500 });
  }
}
