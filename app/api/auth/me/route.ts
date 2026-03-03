// Session inspection endpoint returns the currently authenticated user profile.
import { NextRequest, NextResponse } from "next/server";

import { getCurrentUserFromRequest } from "@/lib/auth/server";

export async function GET(request: NextRequest) {
  const user = await getCurrentUserFromRequest(request);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ user });
}
