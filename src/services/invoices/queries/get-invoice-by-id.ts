import api from "@/lib/axios";
import { Invoice } from "../../../../types/data-types";

export const getInvoiceById = async (id: string): Promise<Invoice> => {
  const { data } = await api.get(`/api/invoices/${id}`);
  return data.data;
};
