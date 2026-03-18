import { useQuery } from "@tanstack/react-query";
import { getCustomers } from "@/services/customers/get-customers";

export const useCustomers = () => {
  return useQuery({
    queryKey: ["customers"],
    queryFn: getCustomers,
  });
};
