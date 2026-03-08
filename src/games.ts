import { z } from "zod";

// ---------------------------------------------------------------------------
// Game status enums
// ---------------------------------------------------------------------------

export const gameStatusSchema = z.enum(["active", "archived", "paused"]);
export type GameStatus = z.infer<typeof gameStatusSchema>;

export const storageStatusSchema = z.enum(["hot", "cold"]);
export type StorageStatus = z.infer<typeof storageStatusSchema>;

// ---------------------------------------------------------------------------
// Create game
// ---------------------------------------------------------------------------

export const createGameSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().max(1000).optional(),
  system: z.string().min(1).max(100),
  maxPlayers: z.number().int().min(1).max(8).default(8),
});

export type CreateGame = z.infer<typeof createGameSchema>;

// ---------------------------------------------------------------------------
// Game (full resource shape)
// ---------------------------------------------------------------------------

export const gameSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string().nullable(),
  system: z.string(),
  maxPlayers: z.number().int(),
  status: gameStatusSchema,
  storageStatus: storageStatusSchema,
  dmUserId: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type Game = z.infer<typeof gameSchema>;

// ---------------------------------------------------------------------------
// Route params
// ---------------------------------------------------------------------------

export const gameParamsSchema = z.object({
  gameId: z.string().uuid(),
});

export type GameParams = z.infer<typeof gameParamsSchema>;
