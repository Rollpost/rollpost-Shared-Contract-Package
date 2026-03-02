var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/common/index.ts
var common_exports = {};
__export(common_exports, {
  ApiErrorSchema: () => ApiErrorSchema,
  ApiVersionSchema: () => ApiVersionSchema,
  UUIDSchema: () => UUIDSchema
});

// src/common/schemas.ts
import { z } from "zod";
var UUIDSchema = z.string().uuid();
var ApiVersionSchema = z.literal("v1");
var ApiErrorSchema = z.object({
  error: z.string().min(1),
  code: z.string().min(1).optional(),
  details: z.unknown().optional()
});

// src/health/index.ts
var health_exports = {};
__export(health_exports, {
  HealthResponseSchema: () => HealthResponseSchema
});

// src/health/schemas.ts
import { z as z2 } from "zod";
var HealthResponseSchema = z2.object({
  status: z2.literal("ok"),
  version: ApiVersionSchema
});
export {
  common_exports as common,
  health_exports as health
};
//# sourceMappingURL=index.js.map