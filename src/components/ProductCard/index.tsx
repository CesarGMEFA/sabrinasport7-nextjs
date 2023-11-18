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

type Props = {};

export default function ProductCard({}: Props) {
  return (
    <Card className="w-64 p-3 mb-8 mx-auto">
      <CardHeader className="p-0">
        <Image
          src="/products/top_naranja_1.jpg"
          alt="producto"
          width={256}
          height={300}
        />
        <CardTitle className="text-lg">
          <Link
            href="/producto/id"
            className="block text-ellipsis overflow-hidden whitespace-nowrap hover:text-purple-700 hover:underline focus:text-purple-700 focus:underline active:text-purple-800 active:underline"
          >
            Top Naranja - para damas tall S, M y L
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 pb-2">
        <p>$25.00</p>
      </CardContent>
      <CardFooter className="p-0">
        <Button className="w-full">
          Agregar <ShoppingCart />{" "}
        </Button>
      </CardFooter>
    </Card>
  );
}
