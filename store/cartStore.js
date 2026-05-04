import { create } from "zustand";
import { persist } from "zustand/middleware";
import { apiFetch } from "@/lib/api";
import useAuthStore from "./authStore";

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: async (product, quantity = 1) => {
        const items = get().items;
        const existingItem = items.find((item) => item.id === product.id);
        const price = product.calculated_price_cy || product.calculated_price || (parseFloat(product.price) > 0 ? parseFloat(product.price) : parseFloat(product.price_sup_cy || 0));

        if (existingItem) {
          const newQuantity = existingItem.quantity + quantity;
          set({
            items: items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: newQuantity }
                : item
            ),
          });
          
          if (useAuthStore.getState().user) {
            await apiFetch("/api/frontend/cart/add", {
              method: "POST",
              body: JSON.stringify({ product_id: product.id, quantity: newQuantity, price: price })
            });
          }
        } else {
          const newItem = {
            id: product.id,
            name: product.name,
            sku: product.code || product.sku,
            price: price,
            price_sup_cy: product.price_sup_cy,
            wh_price: product.wh_price,
            quantity: quantity,
            image: (product.product_images && product.product_images.length > 0) 
              ? product.product_images[0].filename 
              : (product.image || null),
            is_custom: product.is_custom || false,
            options: product.options || null,
            options_msg: "",
          };
          set({
            items: [...items, newItem],
          });

          if (useAuthStore.getState().user) {
            await apiFetch("/api/frontend/cart/add", {
              method: "POST",
              body: JSON.stringify({ product_id: product.id, quantity: quantity, price: price })
            });
          }
        }
      },

      removeItem: async (id) => {
        set({
          items: get().items.filter((item) => item.id !== id),
        });

        if (useAuthStore.getState().user) {
          await apiFetch("/api/frontend/cart/remove", {
            method: "POST",
            body: JSON.stringify({ product_id: id })
          });
        }
      },

      updateQuantity: async (productId, quantity) => {
        const newQty = Math.max(1, quantity);
        set((state) => ({
          items: state.items.map((item) =>
            item.id === productId ? { ...item, quantity: newQty } : item
          ),
        }));

        if (useAuthStore.getState().user) {
          const item = get().items.find(i => i.id === productId);
          if (item) {
            await apiFetch("/api/frontend/cart/add", {
              method: "POST",
              body: JSON.stringify({ product_id: productId, quantity: newQty, price: item.price })
            });
          }
        }
      },

      updateItemOption: (productId, optionMsg) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === productId ? { ...item, options_msg: optionMsg } : item
          ),
        }));
      },

      clearCart: async () => {
        set({ items: [] });
        if (useAuthStore.getState().user) {
          await apiFetch("/api/frontend/cart/clear", {
            method: "POST"
          });
        }
      },

      getTotalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },
    }),
    {
      name: "ramspeed-cart",
    }
  )
);

export default useCartStore;
