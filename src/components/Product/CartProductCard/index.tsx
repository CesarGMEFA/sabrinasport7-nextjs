import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { Separator } from "@/components/ui/separator";
import { cartItem } from "@/lib/interfaces/CartItem.interface";
import { CartStore } from "@/lib/interfaces/CartStore.interface";
import { useCartStore } from "@/lib/store/cart";
import { useStore } from "@/lib/store/useStore";

type Props = {
  item: cartItem;
};

export default function CartProductCard({ item }: Props) {
  const cartStore = useStore<CartStore, CartStore>(
    useCartStore,
    (state: any) => state
  );

  if (!cartStore) return <div></div>;
  const { amount, add, remove } = cartStore;

  return (
    <section className="">
      <div className="py-3 flex">
        <Image
          src={item.imgSrc}
          alt={item.name}
          width={55}
          height={55}
          className="object-contain"
        />
        <div className="ml-2 pr-5 w-[43%] min-[341px]:w-[54%] min-[380px]:w-[60%]">
          <Link
            href={item.link}
            target="_blank"
            className="block text-sm text-ellipsis overflow-hidden whitespace-nowrap hover:text-purple-700 hover:underline focus:text-purple-700 focus:underline active:text-purple-800 active:underline"
          >
            {item.name}
          </Link>
          <div className="flex justify-between">
            <ul>
              {item.size && (
                <li className="text-xs">
                  <span className="font-bold">Talla:</span> {item.size}
                </li>
              )}
              {item.color && (
                <li className="text-xs">
                  <span className="font-bold">Color:</span> {item.color}
                </li>
              )}
              <li className="text-xs">
                <span className="font-bold">Cantidad:</span> {item.amount}
              </li>
              <li className="text-xs">
                <span className="font-bold">Precio:</span> $ {item.price}
              </li>
            </ul>
            <div className="flex flex-row items-center">
              <button
                type="button"
                disabled={item.amount === 0}
                className="bg-gray-200 py-1 px-2 rounded-lg text-red-800 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => remove(item)}
              >
                -
              </button>
              <span
                className={clsx("py-1 px-2 rounded-lg text-xs", {
                  "text-gray-500": amount() === 0,
                })}
              >
                {item.amount}
              </span>
              <button
                type="button"
                className="bg-gray-200 py-1 px-2 rounded-lg text-red-800 text-xs"
                onClick={() => add(item)}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
      <Separator />
    </section>
  );
}
