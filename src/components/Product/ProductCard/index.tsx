import Image from "next/image";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../../ui/button";

import { Percent, ShoppingCart } from "lucide-react";

import { Product } from "@/lib/interfaces/Product.interface";

type Props = {
  data: Product | undefined;
};

export default function ProductCard({ data }: Props) {
  const regex = /\d+,\d{2}/g;
  const price_html = data?.price_html || "";

  const prices = price_html.match(regex);
  const price = prices?.[0] || "";
  const sale_price = prices?.[1] || "";

  let discount: number | string = 0;
  if (sale_price) {
    const p = Number(price.replace(",", "."));
    const s = Number(sale_price.replace(",", "."));
    discount = Math.floor(((p - s) / p) * 100);
    discount.toString()
  }

  return (
    <Card className="w-[92%] h-min sm:w-64 md:w-60 lg:w-56 p-3 mx-auto shadow-md relative">
      {sale_price && (
        <div className="flex items-center bg-red-600 text-white font-bold py-1 px-2 rounded-tl-lg rounded-br-lg absolute top-0 left-0">
          {discount}
          <span className="ml-0.5">%</span>
        </div>
      )}
      <CardHeader className="p-0">
        <Link href={`/productos/${data?.id}`}>
          <div className="w-full h-40 min-[480px]:h-60 md:h-56 lg:h-52 flex justify-center items-center">
            <Image
              src={data?.images[0]?.src || "/images/placeholder.png"}
              alt={data?.name || "Imagen del producto"}
              width={256}
              height={300}
              className="w-full h-full object-contain"
            />
          </div>
        </Link>
        <CardTitle className="text-base sm:text-lg">
          <Link
            href={`/productos/${data?.id}`}
            className="block text-ellipsis overflow-hidden whitespace-nowrap hover:text-purple-700 hover:underline focus:text-purple-700 focus:underline active:text-purple-800 active:underline"
          >
            {data?.name}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 pb-2">
        {sale_price ? (
          <div className="flex items-center">
            <p className="line-through text-gray-600 mr-1">${price}</p>
            <p className="text-red-600 font-bold">${sale_price}</p>
          </div>
        ) : (
          <p>${price}</p>
        )}
      </CardContent>
      {/* <CardFooter className="p-0">
        <Button className="w-full">
          Agregar <ShoppingCart />{" "}
        </Button>
      </CardFooter> */}
    </Card>
  );
}
