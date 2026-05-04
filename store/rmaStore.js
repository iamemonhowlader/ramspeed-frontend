import { createJSONStorage, persist } from "zustand/middleware";
import { create } from "zustand";

const useRmaStore = create(
  persist(
    (set) => ({
      rmaFormData: null,
      setRmaFormData: (data) => set({ rmaFormData: data }),
      clearRmaFormData: () => set({ rmaFormData: null }),
    }),
    {
      name: "rma-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useRmaStore;
