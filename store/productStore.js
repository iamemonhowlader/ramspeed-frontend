import { create } from "zustand";
import { apiFetch } from "@/lib/api";

const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: null,
  
  fetchProducts: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const queryString = new URLSearchParams(params).toString();
      const endpoint = `/api/frontend/products${queryString ? `?${queryString}` : ""}`;
      const data = await apiFetch(endpoint);
      
      if (data.success) {
        // Handle both paginated and non-paginated responses
        const productsList = Array.isArray(data.data) ? data.data : data.data.data;
        set({ products: productsList || [], loading: false });
      } else {
        set({ error: data.message, loading: false });
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  }
}));

export default useProductStore;
