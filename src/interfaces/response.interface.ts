export interface ErrorResponse {
  error: string;
  stack?: string;
}

export interface SuccessResponse {
  message: string;
}

export interface NetworkResponse {
  error?: string;
  message?: string;
}
