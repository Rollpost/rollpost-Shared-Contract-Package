import { z } from "zod";

// ---------------------------------------------------------------------------
// Sign up
// ---------------------------------------------------------------------------

export const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type SignUp = z.infer<typeof signUpSchema>;

// ---------------------------------------------------------------------------
// Sign in
// ---------------------------------------------------------------------------

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type SignIn = z.infer<typeof signInSchema>;

// ---------------------------------------------------------------------------
// Auth response (returned by signup / signin)
// ---------------------------------------------------------------------------

export const authResponseSchema = z.object({
  sessionToken: z.string(),
  userId: z.string().uuid(),
});

export type AuthResponse = z.infer<typeof authResponseSchema>;

// ---------------------------------------------------------------------------
// Current user (GET /auth/me)
// ---------------------------------------------------------------------------

export const subscriptionStatusSchema = z.enum([
  "active",
  "inactive",
  "trialing",
]);

export type SubscriptionStatus = z.infer<typeof subscriptionStatusSchema>;

export const currentUserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  avatarUrl: z.string().url().nullable(),
  subscriptionStatus: subscriptionStatusSchema,
  activeGameCount: z.number().int().min(0),
  emailVerified: z.boolean(),
  createdAt: z.string().datetime(),
});

export type CurrentUser = z.infer<typeof currentUserSchema>;
