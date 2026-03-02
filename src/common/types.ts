export type UUID = string;
export type ApiVersion = "v1";

export type ApiError = {
  error: string;
  code?: string;
  details?: unknown;
};
