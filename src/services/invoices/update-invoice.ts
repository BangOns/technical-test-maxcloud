import api from "@/lib/axios";
import { Invoice } from "../../../types/data-types";

export const updateInvoice = async (
  id: string,
  invoice: Partial<Invoice>,
): Promise<Invoice> => {
  const { data } = await api.patch(`/api/invoices/${id}`, invoice);
  return data.data;
};
