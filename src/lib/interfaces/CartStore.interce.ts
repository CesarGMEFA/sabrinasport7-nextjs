import { cartItem } from "./CartItem.interface";

export interface CartStore {
    cart: cartItem[];
    amount: () => number;
    add: (product: cartItem) => void;
    addAll: (products: cartItem[]) => void;
    remove: (idProduct: number) => void;
    removeAll: () => void;
    totalPrice: () => number;
  };