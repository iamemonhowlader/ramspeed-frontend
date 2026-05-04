import { create } from "zustand";
import { apiFetch } from "@/lib/api";

const useCategoryStore = create((set) => ({
  categories: [],
  loading: false,
  error: null,
  
  fetchCategories: async () => {
    set({ loading: true, error: null });
    try {
      const data = await apiFetch("/api/frontend/categories");
      if (data.success) {
        set({ categories: data.data, loading: false });
      } else {
        set({ error: data.message, loading: false });
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  }
}));

export default useCategoryStore;
