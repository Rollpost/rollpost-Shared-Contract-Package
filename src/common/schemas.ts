import { z } from "zod";
export const UUIDSchema = z.string().uuid();
export const ApiVersionSchema = z.literal("v1");
export const ApiErrorSchema = z.object({
  error: z.string().min(1),
  code: z.string().min(1).optional(),
  details: z.unknown().optional()
});
