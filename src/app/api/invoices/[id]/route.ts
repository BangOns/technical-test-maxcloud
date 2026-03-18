import { NextRequest } from "next/server";
import { customers, invoices } from "../../../../../data";
import { apiError, apiResponse } from "@/lib/api-response";
import { Invoice } from "../../../../../types/data-types";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const inv = invoices.find((i) => i.id === id);
    if (!inv) {
      return apiError("Invoice not found", 404);
    }

    const customer = customers.find((c) => c.id === inv.customer_id);

    return apiResponse({ ...inv, customer }, "Invoice found", 200);
  } catch {
    return apiError("Internal server error", 500);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body: Invoice = await request.json();
    const index = invoices.findIndex((i) => i.id === id);
    if (index === -1) {
      return apiError("Invoice not found", 404);
    }
    invoices[index] = {
      ...invoices[index],
      ...body,
    };
    return apiResponse(invoices[index], "Invoice updated successfully", 200);
  } catch {
    return apiError("Internal server error", 500);
  }
}
