import { cartItem } from "./CartItem.interface";

export interface CartStore {
    cart: cartItem[];
    amount: () => number;
    add: (product: cartItem) => void;
    addAll: (products: cartItem[]) => void;
    remove: (item: cartItem) => void;
    removeAll: () => void;
    totalPrice: () => number;
  };