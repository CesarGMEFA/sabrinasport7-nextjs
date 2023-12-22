import { create } from "zustand";
import { persist } from "zustand/middleware";
import { cartItem } from "@/lib/interfaces/CartItem.interface";
import { CartStore } from "../interfaces/CartStore.interface";

export const useCartStore = create(
  persist(
    (set, get): CartStore => ({
      cart: [] as cartItem[],
      amount: () => {
        const { cart } = get() as CartStore;
        if (cart.length)
          return cart
            .map((item) => item.amount)
            .reduce((prev, curr) => prev + curr);
        return 0;
      },
      totalPrice: () => {
        const { cart } = get() as CartStore;
        if (cart.length)
          return cart
            .map((item) => item.price)
            .reduce((prev, curr) => prev + curr);
        return 0;
      },
      add: (product: cartItem) => {
        const { cart } = get() as CartStore;

        // Busca si el producto ya existe en el carrito
        const existingProduct = cart.find(
          (item) =>
            item.id === product.id &&
            item.size === product.size &&
            item.color === product.color
        );

        if (existingProduct) {
          // Si el producto ya existe, incrementa la cantidad
          existingProduct.amount += 1;
          existingProduct.price =
            existingProduct.amount * existingProduct.item_price;
        } else {
          // Si el producto no existe, añádelo al carrito
          cart.push({ ...product, price: product.amount * product.item_price });
        }
        set({ cart: [...cart] });
      },
      addAll: (products: cartItem[]) => {
        const updatedCart = [...products];
        set({ cart: updatedCart });
      },
      remove: (item: cartItem) => {
        const { cart } = get() as CartStore;
        const updatedCart = removeCart(item, cart);
        console.log("remove => ", cart);
        set({ cart: updatedCart });
      },
      removeAll: () => set({ cart: [] }),
    }),
    {
      name: "cart",
      // suscri
    }
  )
);

function removeCart(p: cartItem, cart: cartItem[]): cartItem[] {
  return cart
    .map((item) => {
      if (item.id === p.id && item.color === p.color && item.size === p.size)
        return { ...item, amount: item.amount - 1, price: item.price - item.item_price };
      return item;
    })
    .filter((item) => {
      return item.amount;
    });
}
