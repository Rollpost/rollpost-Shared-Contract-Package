import { z } from "zod";
import { ApiVersionSchema } from "../common/schemas";

export const HealthResponseSchema = z.object({
  status: z.literal("ok"),
  version: ApiVersionSchema
});
