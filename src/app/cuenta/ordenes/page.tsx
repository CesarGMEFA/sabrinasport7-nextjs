import React from "react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { OrderCard } from "@/components/Orders/OrderCard";

type Props = {};

function Orders({}: Props) {
  return (
    <section className="lg:px-6 w-full">
      <h1 className="text-2xl font-bold">Ordenes</h1>
      <Separator className="bg-gray-600" />
      <section className="flex flex-col justify-center py-4">
        <OrderCard />
      </section>
    </section>
  );
}

export default Orders;
