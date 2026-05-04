import { create } from "zustand";
import { persist } from "zustand/middleware";
import { apiFetch } from "@/lib/api";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      redirectPath: null,
      
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      
      login: async (credentials) => {
        try {
          const data = await apiFetch("/api/login/member", {
            method: "POST",
            body: JSON.stringify(credentials),
          });
          
          if (data.success) {
            set({ user: data.user, token: data.token });
            return { success: true };
          }
          return { success: false, message: data.message };
        } catch (error) {
          return { success: false, message: error.message };
        }
      },
      
      logout: async () => {
        try {
          await apiFetch("/api/logout", { method: "POST" });
        } catch (error) {
          console.error("Logout error:", error);
        }
        set({ user: null, token: null });
      },

      setRedirectPath: (path) => set({ redirectPath: path }),
      clearRedirectPath: () => set({ redirectPath: null }),
    }),
    {
      name: "auth-store",
    }
  )
);

export default useAuthStore;
