import { NextRequest } from "next/server";
import { customers } from "../../../../../data";
import { apiError, apiResponse } from "@/lib/api-response";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
) {
  try {
    const { id } = await params;
    const customer = customers.find((c) => c.id === id);

    if (!customer) {
      return apiError("Customer not found", 404);
    }
    return apiResponse(customer, "Customer found", 200);
  } catch {
    return apiError("Internal server error", 500);
  }
}
