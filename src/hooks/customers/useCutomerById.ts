import { useQuery } from "@tanstack/react-query";
import { getCustomerById } from "@/services/customers/get-customer-id";

export const useCustomerById = (id: string) => {
  return useQuery({
    queryKey: ["customers", id],
    queryFn: () => getCustomerById(id),
    enabled: !!id,
  });
};
