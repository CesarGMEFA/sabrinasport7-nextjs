"use client";
import { ShoppingCart } from "lucide-react";
import { CartStore, useCartStore } from "@/lib/store/cart";
import { useStore } from "@/lib/store/useStore";
type Props = {};

export default function HeaderCart({}: Props) {
  const cartStore = useStore<CartStore, CartStore>(
    useCartStore,
    (state: any) => state
  );

  if (!cartStore) return <div></div>;
  const { amount, totalPrice } = cartStore;

  return (
    <section className="mr-4 flex items-center">
      <div className="mr-3 relative">
        <ShoppingCart size={28} />
        <div className="w-5 py-0.5 absolute bottom-3 left-4 font-bold flex justify-center items-center rounded-full bg-red-600 text-white text-xs">
          {amount()}
        </div>
      </div>
      <section className="text-gray-500 text-xs">${totalPrice()}</section>
    </section>
  );
}
