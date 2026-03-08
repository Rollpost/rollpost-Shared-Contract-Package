import { z } from "zod";

// ---------------------------------------------------------------------------
// Note: SubscriptionStatus is defined in auth.ts and re-exported from there.
// Billing re-uses the same enum value set.
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Create checkout session (POST /billing/create-checkout)
// Initiated server-side only — never called from the browser directly.
// ---------------------------------------------------------------------------

export const createCheckoutSchema = z.object({
  userId: z.string().uuid(),
  successUrl: z.string().url(),
  cancelUrl: z.string().url(),
});

export type CreateCheckout = z.infer<typeof createCheckoutSchema>;

// ---------------------------------------------------------------------------
// Checkout session response
// ---------------------------------------------------------------------------

export const checkoutSessionSchema = z.object({
  sessionId: z.string(),
  url: z.string().url(),
});

export type CheckoutSession = z.infer<typeof checkoutSessionSchema>;

// ---------------------------------------------------------------------------
// Stripe webhook event (POST /billing/stripe-webhook)
// Body is raw — validated by Stripe signature, not Zod.
// This schema represents the shape we extract after verification.
// ---------------------------------------------------------------------------

export const stripeWebhookMetaSchema = z.object({
  type: z.string(),
  userId: z.string().uuid().optional(),
});

export type StripeWebhookMeta = z.infer<typeof stripeWebhookMetaSchema>;
