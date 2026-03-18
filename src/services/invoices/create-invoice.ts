import api from "@/lib/axios";
import { Invoice } from "../../../types/api-types";

export const createInvoice = async (
  invoice: Partial<Invoice>,
): Promise<Invoice> => {
  const { data } = await api.post("/invoices", invoice);
  return data;
};
