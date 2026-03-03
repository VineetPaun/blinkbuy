"use client";

// Phone OTP form handles request + verification in two controlled steps.
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ApiErrorResponse {
  error?: string;
}

export function PhoneOtpForm() {
  const router = useRouter();
  const [phone, setPhone] = useState("+91");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"request" | "verify">("request");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRequestOtp = async () => {
    setIsSubmitting(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch("/api/auth/login/otp/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, country: "IN" }),
      });

      const data = (await response.json()) as ApiErrorResponse & { message?: string };
      if (!response.ok) {
        setError(data.error ?? "Unable to send OTP.");
        return;
      }

      setMessage(data.message ?? "OTP sent successfully.");
      setStep("verify");
    } catch {
      setError("Unable to send OTP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/login/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, country: "IN", code }),
      });

      const data = (await response.json()) as ApiErrorResponse;
      if (!response.ok) {
        setError(data.error ?? "OTP verification failed.");
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("Unable to verify OTP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="otp-phone">Phone Number</Label>
        <Input
          id="otp-phone"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="+91 98765 43210"
          autoComplete="tel"
          disabled={step === "verify"}
        />
      </div>

      {step === "verify" && (
        <div className="space-y-2">
          <Label htmlFor="otp-code">OTP Code</Label>
          <Input
            id="otp-code"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            placeholder="Enter 6-digit OTP"
            autoComplete="one-time-code"
            inputMode="numeric"
          />
        </div>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}
      {message && <p className="text-sm text-primary">{message}</p>}

      <div className="flex gap-2">
        {step === "request" ? (
          <Button onClick={handleRequestOtp} disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Sending OTP..." : "Send OTP"}
          </Button>
        ) : (
          <>
            <Button onClick={handleVerifyOtp} disabled={isSubmitting || code.length < 4} className="flex-1">
              {isSubmitting ? "Verifying..." : "Verify OTP"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleRequestOtp}
              disabled={isSubmitting}
              className="flex-1"
            >
              Resend OTP
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
