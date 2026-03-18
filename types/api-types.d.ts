export interface apiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  meta: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
    hasNextPage?: boolean;
    hasPrevPage?: boolean;
  };
}
