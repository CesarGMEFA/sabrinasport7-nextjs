"use client";
import { useEffect, useState } from "react";
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
import { CartStore } from "@/lib/interfaces/CartStore.interface";
import { useStore } from "@/lib/store/useStore";
import CartProductCard from "@/components/Product/CartProductCard";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
type Props = {};

export default function HeaderCart({}: Props) {
  const [whatsappUrl, setWhatsappUrl] = useState<string>("");
  const cartStore = useStore<CartStore, CartStore>(
    useCartStore,
    (state: any) => state
  );
  const { amount, totalPrice, cart } = cartStore || {
    amount: () => 0,
    totalPrice: () => 0,
    cart: [],
  };

  useEffect(() => {
    let message = `Hola sabrinasport7, me interesa comprar esta lista de productos:\n`;

    cart.forEach((product, index) => {
      message += `\nProducto ${index + 1}:\n`;
      message += `- Nombre: ${product.name}\n`;
      message += `- Color: ${product.color}\n`;
      message += `- Tamaño: ${product.size}\n`;
      message += `- Precio por unidad: ${product.item_price}\n`;
      message += `- Cantidad: ${product.amount}\n`;
      message += `- Precio total: ${product.price}\n`;
      message += `- URL: ${product.link}\n`;
    });

    message += `\nTotal: ${totalPrice()}`;

    const url_encoded_message = encodeURIComponent(message);
    const whatsapp_url = `https://wa.me/573053503583?text=${url_encoded_message}`;
    setWhatsappUrl(whatsapp_url);
  }, [cart, totalPrice]);

  if (!cartStore) return <div></div>;

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
          <ScrollArea className="h-[400px] w-60% md:w-[350px] border rounded-md shadow-md">
            {cart.map((item, index) => (
              <CartProductCard item={item} key={index} />
            ))}
          </ScrollArea>
        </section>
        <SheetFooter>
          <SheetClose asChild className="relative">
            <section className="w-full py-2 px-4 shadow-md bottom-0 flex justify-between items-center">
              <p className="">
                Total: <span className="font-bold">${totalPrice()}</span>
              </p>
              <WhatsAppButton url={whatsappUrl} text="Haz Tu Consulta" />
            </section>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
