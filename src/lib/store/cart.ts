import { create } from "zustand";
import { persist } from "zustand/middleware";
import { cartItem } from "@/lib/interfaces/CartItem.interface";
import { CartStore } from "../interfaces/CartStore.interce";


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
        const existingProductIndex = cart.findIndex(
          (item) =>
            item.id === product.id &&
            item.size === product.size &&
            item.color === product.color
        );

        if (existingProductIndex >= 0) {
          // Si el producto ya existe, incrementa la cantidad
          cart[existingProductIndex].amount += product.amount;
          cart[existingProductIndex].price =
            cart[existingProductIndex].amount *
            cart[existingProductIndex].item_price;
        } else {
          // Si el producto no existe, añádelo al carrito
          cart.push({ ...product, price: product.amount * product.item_price });
        }
        set({ cart: [...cart] });
      },
      addAll: (products: cartItem[]) => {
        const { cart } = get() as CartStore;
        const updatedCart = [...products];
        set({ cart: updatedCart });
      },
      remove: (idProduct: number) => {
        const { cart } = get() as CartStore;
        const updatedCart = removeCart(idProduct, cart);
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

function updateCart(product: cartItem, cart: cartItem[]): cartItem[] {
  const productOnCart = cart.find((item) => item.id === product.id);

  if (!productOnCart) {
    cart.push({ ...product, amount: 1, price: product.price * product.amount }); // Agrega el producto al carrito con cantidad 1
  } else {
    productOnCart.amount += 1; // Incrementa la cantidad del producto existente
  }

  return cart;
}

function removeCart(idProduct: number, cart: cartItem[]): cartItem[] {
  return cart
    .map((item) => {
      if (item.id === idProduct) return { ...item, amount: item.amount - 1 };
      return item;
    })
    .filter((item) => {
      return item.amount;
    });
}
