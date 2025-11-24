/**
 * Standard API response format
 */
export type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string; message?: string };

/**
 * Paginated API response
 */
export type PaginatedResponse<T> = ApiResponse<{
  items: T[];
  total: number;
  page?: number;
  pageSize?: number;
}>;
