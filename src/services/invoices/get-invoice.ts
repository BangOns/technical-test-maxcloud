import api from "@/lib/axios";
import { Invoice, apiResponse } from "../../../types/api-types";

export const getInvoices = async (
  page: number = 1,
  limit: number = 10,
  search?: string,
  status?: string,
): Promise<apiResponse<Invoice[]>> => {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (status === "all") params.delete("status");
  else if (status) params.set("status", status);
  const { data } = await api.get(
    `/api/invoices?page=${page}&limit=${limit}${params.toString() ? `&${params.toString()}` : ""}`,
  );

  return data;
};
