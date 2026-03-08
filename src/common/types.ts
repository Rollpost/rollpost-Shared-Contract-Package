export type UUID = string;
export type ApiVersion = "v1";
export type ApiError = {
  error: string;
  code?: string;
  details?: unknown;
};

// ---------------------------------------------------------------------------
// Error codes
// ---------------------------------------------------------------------------

export type ErrorCode = "UNAUTHORIZED" | "FORBIDDEN" | "NOT_FOUND" | "VALIDATION_ERROR" | "CONFLICT" | "INTERNAL_ERROR";

export type ErrorResponse = {
  error: string;
  code: ErrorCode;
  field?: string;
};

// ---------------------------------------------------------------------------
// Cursor pagination
// ---------------------------------------------------------------------------

export type CursorQuery = {
  cursor?: string;
  limit?: number;
};

export type PaginatedResponse<T> = {
  items: T[];
  nextCursor: string | null;
  hasMore: boolean;
};
