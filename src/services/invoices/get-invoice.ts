import api from "@/lib/axios";
import { Invoice } from "../../../types/api-types";

export const getInvoices = async (): Promise<Invoice[]> => {
  const { data } = await api.get(`/invoices`);
  return Array.isArray(data) ? data : [];
};
