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
import { Button } from "../ui/button";

import { ShoppingCart } from "lucide-react";

import { Product } from "@/lib/interfaces/Product.interface";

type Props = {
  data: Product
};

export default function ProductCard({ data }: Props) {
  console.log('products', data);

  return (
    <Card className="w-64 md:w-60 lg:w-56 p-3 mb-8 mx-auto">
      <CardHeader className="p-0 w-60 md:w-56 lg:w-52" >
        <Image
          src={data.images[0]?.src}
          alt={data.name}
          width={256}
          height={300}
          objectFit="cover" // Agrega esta línea para mantener la imagen fija en los valores de width y height
        />
        <CardTitle className="text-lg">
          <Link
            href="/producto/id"
            className="block text-ellipsis overflow-hidden whitespace-nowrap hover:text-purple-700 hover:underline focus:text-purple-700 focus:underline active:text-purple-800 active:underline"
          >
            {data.name}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 pb-2">
        <p>${data.price}</p>
      </CardContent>
      <CardFooter className="p-0">
        <Button className="w-full">
          Agregar <ShoppingCart />{" "}
        </Button>
      </CardFooter>
    </Card>
  );
}
