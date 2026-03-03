// Phone helpers normalize user input into E.164 and keep OTP output UI-safe.
import { CountryCode, parsePhoneNumberFromString } from "libphonenumber-js";

export const DEFAULT_PHONE_COUNTRY: CountryCode = "IN";

export function normalizePhoneToE164(phoneInput: string, country: string = DEFAULT_PHONE_COUNTRY): string {
  const countryCode = (country || DEFAULT_PHONE_COUNTRY).toUpperCase() as CountryCode;
  const parsed = parsePhoneNumberFromString(phoneInput, countryCode);

  if (!parsed || !parsed.isValid()) {
    throw new Error("Enter a valid phone number.");
  }

  return parsed.number;
}

export function maskPhone(phoneE164: string): string {
  if (phoneE164.length < 6) {
    return phoneE164;
  }
  return `${phoneE164.slice(0, 4)}******${phoneE164.slice(-2)}`;
}
