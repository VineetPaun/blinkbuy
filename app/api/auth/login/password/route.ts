// Password login endpoint validates credentials and refreshes the user session.
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

import { verifyPassword } from "@/lib/auth/password";
import { findUserByEmail, toAuthUser, touchUserLogin } from "@/lib/auth/repository";
import { assertSameOrigin, setSessionCookie } from "@/lib/auth/server";
import { passwordLoginInputSchema } from "@/lib/auth/validators";

export async function POST(request: NextRequest) {
  const originError = assertSameOrigin(request);
  if (originError) {
    return originError;
  }

  try {
    const parsed = passwordLoginInputSchema.parse(await request.json());
    const dbUser = await findUserByEmail(parsed.email);

    if (!dbUser || !dbUser.passwordHash) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const isValidPassword = await verifyPassword(parsed.password, dbUser.passwordHash);
    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    await touchUserLogin(dbUser.id);
    const user = await toAuthUser(dbUser);

    const response = NextResponse.json({ user });
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

    console.error("Password login route error:", error);
    return NextResponse.json({ error: "Unable to login right now." }, { status: 500 });
  }
}
