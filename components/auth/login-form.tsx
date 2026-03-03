"use client";

// Login form offers both password-based auth and phone OTP auth in one UI.
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { PhoneOtpForm } from "@/components/auth/phone-otp-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type LoginMode = "password" | "otp";

interface ApiErrorResponse {
  error?: string;
}

export function LoginForm() {
  const router = useRouter();
  const [mode, setMode] = useState<LoginMode>("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePasswordLogin = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/login/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = (await response.json()) as ApiErrorResponse;
      if (!response.ok) {
        setError(data.error ?? "Login failed.");
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("Unable to login right now.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-2 rounded-xl border border-border p-1">
        <Button
          type="button"
          variant={mode === "password" ? "default" : "ghost"}
          onClick={() => setMode("password")}
        >
          Password Login
        </Button>
        <Button type="button" variant={mode === "otp" ? "default" : "ghost"} onClick={() => setMode("otp")}>
          Phone OTP
        </Button>
      </div>

      {mode === "password" ? (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button onClick={handlePasswordLogin} disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Signing in..." : "Sign In"}
          </Button>
        </div>
      ) : (
        <PhoneOtpForm />
      )}

      <p className="text-center text-sm text-muted-foreground">
        New to BlinkBuy?{" "}
        <Link className="font-medium text-primary hover:underline" href="/auth/signup">
          Create an account
        </Link>
      </p>
    </div>
  );
}
