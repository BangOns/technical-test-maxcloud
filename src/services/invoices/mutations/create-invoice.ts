import api from "@/lib/axios";
import { Invoice } from "../../../../types/data-types";

export const createInvoice = async (
  invoice: Partial<Invoice>,
): Promise<Invoice> => {
  const { data } = await api.post("/api/invoices", invoice);
  return data.data;
};
