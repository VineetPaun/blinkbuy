// Zod schemas centralize request validation for every auth endpoint.
import { z } from "zod";

const emailSchema = z
  .string()
  .trim()
  .email("Enter a valid email address.")
  .transform((value) => value.toLowerCase());

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters.")
  .max(72, "Password must be 72 characters or fewer.");

const nameSchema = z
  .string()
  .trim()
  .min(2, "Name must be at least 2 characters.")
  .max(80, "Name must be 80 characters or fewer.");

const phoneSchema = z
  .string()
  .trim()
  .min(5, "Phone number is too short.")
  .max(24, "Phone number is too long.");

export const signupInputSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  phone: phoneSchema.optional(),
});

export const passwordLoginInputSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required."),
});

export const otpRequestInputSchema = z.object({
  phone: phoneSchema,
  country: z.string().length(2).optional(),
});

export const otpVerifyInputSchema = z.object({
  phone: phoneSchema,
  country: z.string().length(2).optional(),
  code: z
    .string()
    .trim()
    .regex(/^\d{4,8}$/, "OTP must be a 4 to 8 digit code."),
});
