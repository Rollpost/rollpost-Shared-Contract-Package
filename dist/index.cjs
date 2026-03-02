"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  common: () => common_exports,
  health: () => health_exports
});
module.exports = __toCommonJS(index_exports);

// src/common/index.ts
var common_exports = {};
__export(common_exports, {
  ApiErrorSchema: () => ApiErrorSchema,
  ApiVersionSchema: () => ApiVersionSchema,
  UUIDSchema: () => UUIDSchema
});

// src/common/schemas.ts
var import_zod = require("zod");
var UUIDSchema = import_zod.z.string().uuid();
var ApiVersionSchema = import_zod.z.literal("v1");
var ApiErrorSchema = import_zod.z.object({
  error: import_zod.z.string().min(1),
  code: import_zod.z.string().min(1).optional(),
  details: import_zod.z.unknown().optional()
});

// src/health/index.ts
var health_exports = {};
__export(health_exports, {
  HealthResponseSchema: () => HealthResponseSchema
});

// src/health/schemas.ts
var import_zod2 = require("zod");
var HealthResponseSchema = import_zod2.z.object({
  status: import_zod2.z.literal("ok"),
  version: ApiVersionSchema
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  common,
  health
});
//# sourceMappingURL=index.cjs.map