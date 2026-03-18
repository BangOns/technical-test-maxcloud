import { NextRequest } from "next/server";
import { customers, invoices } from "../../../../data";
import { Invoice } from "../../../../types/api-types";
import { apiError, apiResponse } from "@/lib/api-response";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page") ?? 1);
    const limit = Number(searchParams.get("limit") ?? 10);
    const search = searchParams.get("search") ?? "";
    const status = searchParams.get("status") ?? "";

    const dataCompareCustomer = invoices.map((inv) => ({
      ...inv,
      customer: customers.find((c) => c.id === inv.customer_id) ?? null,
    }));

    const filtered = dataCompareCustomer.filter((inv) => {
      const matchSearch = search
        ? inv.id.toLowerCase().includes(search.toLowerCase()) ||
          inv.customer?.id.toLowerCase().includes(search.toLowerCase())
        : true;

      const matchStatus = status ? inv.status === status : true;

      return matchSearch && matchStatus;
    });
    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const end = start + limit;
    const data = filtered.slice(start, end);

    return apiResponse(data, "Invoices fetched successfully", 200, {
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    });
  } catch {
    return apiError("Internal server error", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: Invoice = await req.json();
    invoices.push(body);
    return apiResponse(body, "Invoice created successfully", 201);
  } catch {
    return apiError("Internal server error", 500);
  }
}
