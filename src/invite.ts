import { z } from "zod";

// ---------------------------------------------------------------------------
// Generate invite (POST /games/:gameId/invites)
// DM only. Optionally scoped to a specific character slot or expiry.
// ---------------------------------------------------------------------------

export const generateInviteSchema = z.object({
  expiresInHours: z.number().int().min(1).max(168).optional(), // up to 7 days; omit = no expiry
  note: z.string().max(500).optional(),
});

export type GenerateInvite = z.infer<typeof generateInviteSchema>;

// ---------------------------------------------------------------------------
// Invite resource shape
// ---------------------------------------------------------------------------

export const inviteSchema = z.object({
  id: z.string().uuid(),
  token: z.string(),
  gameId: z.string().uuid(),
  createdByUserId: z.string().uuid(),
  used: z.boolean(),
  expiresAt: z.string().datetime().nullable(),
  createdAt: z.string().datetime(),
});

export type Invite = z.infer<typeof inviteSchema>;

// ---------------------------------------------------------------------------
// Token route param (GET /invites/:token, POST /invites/:token/accept)
// ---------------------------------------------------------------------------

export const inviteTokenParamsSchema = z.object({
  token: z.string().min(1),
});

export type InviteTokenParams = z.infer<typeof inviteTokenParamsSchema>;

// ---------------------------------------------------------------------------
// Invite preview (GET /invites/:token — public, no auth required)
// When isValid=false the response is HTTP 410 Gone.
// ---------------------------------------------------------------------------

export const invitePreviewSchema = z.discriminatedUnion("isValid", [
  z.object({
    isValid: z.literal(true),
    gameId: z.string().uuid(),
    gameTitle: z.string(),
    gameSystem: z.string(),
    dmDisplayName: z.string(),
    currentPlayerCount: z.number().int(),
    maxPlayers: z.number().int(),
    expiresAt: z.string().datetime().nullable(),
  }),
  z.object({
    isValid: z.literal(false),
    reason: z.enum(["expired", "already_used", "not_found"]),
  }),
]);

export type InvitePreview = z.infer<typeof invitePreviewSchema>;

// ---------------------------------------------------------------------------
// Accept invite (POST /invites/:token/accept)
//
// Two scenarios:
//   1. User already has an active session  → send character fields only
//   2. No active session (new account)     → send email + password + character fields
//
// The discriminated union handles both without making the frontend guess.
// ---------------------------------------------------------------------------

const characterFieldsSchema = z.object({
  characterName: z.string().min(1).max(100),
  characterDescription: z.string().max(2000).optional(),
});

export const acceptInviteSchema = z.discriminatedUnion("hasSession", [
  // Existing / already-logged-in user
  z.object({
    hasSession: z.literal(true),
  }).merge(characterFieldsSchema),

  // New account — create user + character atomically
  z.object({
    hasSession: z.literal(false),
    email: z.string().email(),
    password: z.string().min(8),
  }).merge(characterFieldsSchema),
]);

export type AcceptInvite = z.infer<typeof acceptInviteSchema>;

// ---------------------------------------------------------------------------
// Accept invite response
// isNewAccount=true means the server also created a user account.
// sessionToken is only present when isNewAccount=true.
// ---------------------------------------------------------------------------

export const acceptInviteResponseSchema = z.object({
  memberId: z.string().uuid(),
  characterId: z.string().uuid(),
  gameId: z.string().uuid(),
  isNewAccount: z.boolean(),
  sessionToken: z.string().optional(), // only present when isNewAccount=true
});

export type AcceptInviteResponse = z.infer<typeof acceptInviteResponseSchema>;
