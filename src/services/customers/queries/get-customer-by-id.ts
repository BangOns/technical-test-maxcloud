import api from "@/lib/axios";
import { Customer } from "../../../../types/data-types";

export const getCustomerById = async (id: string): Promise<Customer> => {
  const { data } = await api.get(`/api/customers/${id}`);
  return data.data;
};
