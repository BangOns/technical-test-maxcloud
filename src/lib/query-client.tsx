import { QueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

// Fungsi global untuk handle error
const globalErrorHandler = () => {
  toast.error("Something went wrong");
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // data dianggap fresh selama 5 menit
      staleTime: 5 * 60 * 1000,
      // retry otomatis 2x kalau gagal
      retry: 2,
      // tidak refetch otomatis saat window fokus
      refetchOnWindowFocus: false,
    },
    mutations: {
      onError: globalErrorHandler,
    },
  },
});
