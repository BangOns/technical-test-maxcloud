import api from "@/lib/axios";
import { Customer } from "../../../types/api-types";

export const getCustomers = async (): Promise<Customer[]> => {
  const { data } = await api.get("/api/customers");
  return Array.isArray(data.data) ? data.data : [];
};
