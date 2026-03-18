import api from "@/lib/axios";
import { Invoice } from "../../../types/api-types";

export const updateInvoice = async (
  id: string,
  invoice: Partial<Invoice>,
): Promise<Invoice> => {
  const { data } = await api.patch(`/invoices/${id}`, invoice);
  return data;
};
