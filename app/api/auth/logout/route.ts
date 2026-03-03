// Logout endpoint clears the active auth cookie.
import { NextRequest, NextResponse } from "next/server";

import { assertSameOrigin, clearSessionCookie } from "@/lib/auth/server";

export async function POST(request: NextRequest) {
  const originError = assertSameOrigin(request);
  if (originError) {
    return originError;
  }

  const response = NextResponse.json({ success: true });
  clearSessionCookie(response);
  return response;
}
