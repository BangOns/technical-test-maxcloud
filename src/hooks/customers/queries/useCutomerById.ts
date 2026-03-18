import { useQuery } from "@tanstack/react-query";
import { getCustomerById } from "@/services/customers/queries/get-customer-by-id";

export const useCustomerById = (id: string) => {
  return useQuery({
    queryKey: ["customers", id],
    queryFn: () => getCustomerById(id),
    enabled: !!id,
  });
};
