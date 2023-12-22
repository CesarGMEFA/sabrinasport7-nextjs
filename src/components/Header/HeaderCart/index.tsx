"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/lib/store/cart";
import { CartStore } from "@/lib/interfaces/CartStore.interce";
import { useStore } from "@/lib/store/useStore";
import CartProductCard from "@/components/Product/CartProductCard";
type Props = {};

export default function HeaderCart({}: Props) {
  const cartStore = useStore<CartStore, CartStore>(
    useCartStore,
    (state: any) => state
  );

  if (!cartStore) return <div></div>;
  const { amount, totalPrice, cart } = cartStore;
  console.log("Cart => ", cart);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <section className="mr-4 flex items-center cursor-pointer">
          <div className="mr-3 relative">
            <ShoppingCart size={28} />
            <div className="w-5 py-0.5 absolute bottom-3 left-4 font-bold flex justify-center items-center rounded-full bg-red-600 text-white text-xs">
              {amount()}
            </div>
          </div>
          <section className="text-gray-500 text-xs">${totalPrice()}</section>
        </section>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Tu Carro</SheetTitle>
          <SheetDescription>
            Realiza cambios en tu carro de compras aquí. Haz clic en guardar
            cuando hayas terminado.
          </SheetDescription>
        </SheetHeader>
        <section className="w-full flex-grow">
          <ScrollArea className="h-[400px] w-60% md:w-[350px] border rounded-md">
            {cart.map((item, index) => (
              <CartProductCard item={item} key={index} />
            ))}
          </ScrollArea>
        </section>
        <SheetFooter>
          <SheetClose asChild className="relative">
            {/* <Button type="submit">Save changes</Button> */}
            <section className="w-full py-2 px-4 shadow-md bottom-0">
              BLA BLA BLA
            </section>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
