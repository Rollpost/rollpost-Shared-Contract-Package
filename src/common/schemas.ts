import { z } from "zod";

// ---------------------------------------------------------------------------
// Existing
// ---------------------------------------------------------------------------

export const UUIDSchema = z.string().uuid();
export const ApiVersionSchema = z.literal("v1");
export const ApiErrorSchema = z.object({
  error: z.string().min(1),
  code: z.string().min(1).optional(),
  details: z.unknown().optional(),
});

// ---------------------------------------------------------------------------
// Error codes
// ---------------------------------------------------------------------------

export const ERROR_CODES = {
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  NOT_FOUND: "NOT_FOUND",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  CONFLICT: "CONFLICT",
  INTERNAL_ERROR: "INTERNAL_ERROR",
} as const;

export const errorResponseSchema = z.object({
  error: z.string().min(1),
  code: z.nativeEnum(ERROR_CODES),
  field: z.string().optional(),
});

// ---------------------------------------------------------------------------
// Cursor pagination
// ---------------------------------------------------------------------------

export const cursorQuerySchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).default(50),
});

export const paginatedResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    items: z.array(itemSchema),
    nextCursor: z.string().nullable(),
    hasMore: z.boolean(),
  });
