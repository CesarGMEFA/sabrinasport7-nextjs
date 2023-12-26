import React from "react";
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

import { ShoppingCart } from "lucide-react";

import { Product } from "@/lib/interfaces/Product.interface";

type Props = {
  data: Product
};

export default function ProductCard({ data }: Props) {

  return (
    <Card className=" w-[92%] sm:w-64 md:w-60 lg:w-56 p-3 mb-8 mx-auto 2xl:h-[340px]">
      <CardHeader className="p-0">
        <div className="w-full h-60 md:h-56 lg:h-52 flex justify-center items-center">
          <Image
            src={data.images[0]?.src}
            alt={data.name}
            width={256}
            height={300}
            className="w-full h-full object-contain"
          />
        </div>
        <CardTitle className="text-base sm:text-lg">
          <Link
            href={`/productos/${data.id}`}
            className="block text-ellipsis overflow-hidden whitespace-nowrap hover:text-purple-700 hover:underline focus:text-purple-700 focus:underline active:text-purple-800 active:underline"
          >
            {data.name}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 pb-2">
        <p>${data.price}</p>
      </CardContent>
      {/* <CardFooter className="p-0">
        <Button className="w-full">
          Agregar <ShoppingCart />{" "}
        </Button>
      </CardFooter> */}
    </Card>
  );
}
