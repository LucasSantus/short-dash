import { z } from "zod";

export const envSchema = z.object({
  // NEXT
  PORT: z.string().default("3000"),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  // PRJECT
  NEXT_PUBLIC_BASE_URL: z.string().url().default("http://localhost:3000"),

  // DATABASE
  DATABASE_URL: z.string(),
  DIRECT_URL: z.string(),

  // NEXT AUTH
  NEXTAUTH_SECRET: z.string(),
  NEXTAUTH_URL: z.string().url().default("http://localhost:3000"),

  // GOOGLE
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),

  // // RESEND
  RESEND_API_KEY: z.string(),
  RESEND_TO_EMAIL: z.string().default("onboarding@resend.dev"),
});

export const env = envSchema.parse(process.env);
