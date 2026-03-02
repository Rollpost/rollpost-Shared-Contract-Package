import { z } from 'zod';

type UUID = string;
type ApiVersion = "v1";
type ApiError = {
    error: string;
    code?: string;
    details?: unknown;
};

declare const UUIDSchema: z.ZodString;
declare const ApiVersionSchema: z.ZodLiteral<"v1">;
declare const ApiErrorSchema: z.ZodObject<{
    error: z.ZodString;
    code: z.ZodOptional<z.ZodString>;
    details: z.ZodOptional<z.ZodUnknown>;
}, "strip", z.ZodTypeAny, {
    error: string;
    code?: string | undefined;
    details?: unknown;
}, {
    error: string;
    code?: string | undefined;
    details?: unknown;
}>;

type index$1_ApiError = ApiError;
declare const index$1_ApiErrorSchema: typeof ApiErrorSchema;
type index$1_ApiVersion = ApiVersion;
declare const index$1_ApiVersionSchema: typeof ApiVersionSchema;
type index$1_UUID = UUID;
declare const index$1_UUIDSchema: typeof UUIDSchema;
declare namespace index$1 {
  export { type index$1_ApiError as ApiError, index$1_ApiErrorSchema as ApiErrorSchema, type index$1_ApiVersion as ApiVersion, index$1_ApiVersionSchema as ApiVersionSchema, type index$1_UUID as UUID, index$1_UUIDSchema as UUIDSchema };
}

type HealthResponse = {
    status: "ok";
    version: "v1";
};

declare const HealthResponseSchema: z.ZodObject<{
    status: z.ZodLiteral<"ok">;
    version: z.ZodLiteral<"v1">;
}, "strip", z.ZodTypeAny, {
    status: "ok";
    version: "v1";
}, {
    status: "ok";
    version: "v1";
}>;

type index_HealthResponse = HealthResponse;
declare const index_HealthResponseSchema: typeof HealthResponseSchema;
declare namespace index {
  export { type index_HealthResponse as HealthResponse, index_HealthResponseSchema as HealthResponseSchema };
}

export { index$1 as common, index as health };
