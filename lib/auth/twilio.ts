// Twilio Verify wrappers isolate provider details from route handlers.
import twilio from "twilio";

function getTwilioConfig() {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

  if (!accountSid || !authToken || !verifyServiceSid) {
    throw new Error("Twilio Verify env vars are missing.");
  }

  return { accountSid, authToken, verifyServiceSid };
}

export async function sendOtpCode(phoneE164: string): Promise<void> {
  const { accountSid, authToken, verifyServiceSid } = getTwilioConfig();
  const client = twilio(accountSid, authToken);

  await client.verify.v2.services(verifyServiceSid).verifications.create({
    to: phoneE164,
    channel: "sms",
  });
}

export async function verifyOtpCode(phoneE164: string, code: string): Promise<boolean> {
  const { accountSid, authToken, verifyServiceSid } = getTwilioConfig();
  const client = twilio(accountSid, authToken);

  const result = await client.verify.v2.services(verifyServiceSid).verificationChecks.create({
    to: phoneE164,
    code,
  });

  return result.status === "approved";
}
