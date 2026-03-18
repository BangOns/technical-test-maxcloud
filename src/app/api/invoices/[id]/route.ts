import { NextRequest } from "next/server";
import { customers, invoices } from "../../../../../data";
import { apiError, apiResponse } from "@/lib/api-response";
import { Invoice } from "../../../../../types/api-types";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = await params;

    const inv = invoices.find((i) => i.id === id);
    if (!inv) {
      return Response.json({ message: "Invoice not found" }, { status: 404 });
    }

    const customer = customers.find((c) => c.id === inv.customer_id);

    return apiResponse(
      {
        ...inv,
        customer,
      },
      "Invoice found",
      200,
    );
  } catch {
    return apiError("Internal server error", 500);
  }
}
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body: Invoice = await req.json();
    const index = invoices.findIndex((i) => i.id === id);
    if (index === -1) {
      return apiError("Invoice not found", 404);
    }
    invoices[index] = body;
    return apiResponse(body, "Invoice updated successfully", 200);
  } catch {
    return apiError("Internal server error", 500);
  }
}
