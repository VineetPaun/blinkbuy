"use client";

// Signup form creates a new email/password account and starts an authenticated session.
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ApiErrorResponse {
  error?: string;
}

export function SignupForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("+91");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const normalizedPhone = phone.trim();
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          phone: normalizedPhone && normalizedPhone !== "+91" ? normalizedPhone : undefined,
        }),
      });

      const data = (await response.json()) as ApiErrorResponse;
      if (!response.ok) {
        setError(data.error ?? "Unable to create account.");
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("Unable to create account right now.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="signup-name">Full Name</Label>
        <Input
          id="signup-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Aarav Sharma"
          autoComplete="name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="signup-email">Email</Label>
        <Input
          id="signup-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="signup-password">Password</Label>
        <Input
          id="signup-password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Create a strong password"
          autoComplete="new-password"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="signup-phone">Phone (optional)</Label>
        <Input
          id="signup-phone"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="+91 98765 43210"
          autoComplete="tel"
        />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Button onClick={handleSignup} disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Creating Account..." : "Create Account"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link className="font-medium text-primary hover:underline" href="/auth/login">
          Sign in
        </Link>
      </p>
    </div>
  );
}
