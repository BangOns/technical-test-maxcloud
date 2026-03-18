import { customers } from "../../../../data";
import { apiError, apiResponse } from "@/lib/api-response";

export async function GET() {
  try {
    return apiResponse(customers, "Customers fetched successfully", 200, {
      page: 1,
      limit: 10,
      total: customers.length,
      totalPages: Math.ceil(customers.length / 10),
      hasNextPage: customers.length > 10,
      hasPrevPage: false,
    });
  } catch {
    return apiError("Internal server error", 500);
  }
}
