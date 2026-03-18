import api from "@/lib/axios";
import { Customer } from "../../../types/api-types";

export const getCustomerById = async (id: string): Promise<Customer> => {
  const { data } = await api.get(`/customers/${id}`);
  return data;
};
