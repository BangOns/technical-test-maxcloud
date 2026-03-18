import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type NotifStore = {
  notif: {
    title: string;
    description: string;
  }[];
  setNotif: (value: { title: string; description: string }) => void;
  clearNotif: () => void;
};

export const useNotifStore = create<NotifStore>()(
  persist(
    (set) => ({
      notif: [],
      setNotif: (value: { title: string; description: string }) =>
        set((state) => ({ notif: [...state.notif, value] })),
      clearNotif: () => set(() => ({ notif: [] })),
    }),
    {
      name: "invoice-filter-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
