import { NextResponse } from "next/server";

type ApiMeta = {
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
};

export function apiResponse<T>(
  data: T,
  message = "Success",
  status = 200,
  meta?: ApiMeta,
) {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
      meta: meta ?? null,
    },
    { status },
  );
}

export function apiError(message = "Internal server error", status = 500) {
  return NextResponse.json(
    {
      success: false,
      message,
      data: null,
      meta: null,
    },
    { status },
  );
}
