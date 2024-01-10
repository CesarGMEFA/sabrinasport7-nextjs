"use client"
import React from "react";
import { Separator } from "@/components/ui/separator";
import { OrderCard } from "@/components/Orders/OrderCard";
import { useAuth } from "@/lib/hook/useAuth";
// import { UserStore } from "@/lib/interfaces/UserStore.interface";
// import { useUserStore } from "@/lib/store/useUserStore";
// import { useUser } from "@/lib/store/user";

type Props = {};

function Orders({}: Props) {
  // const userStore = useUserStore<UserStore, UserStore>(
  //   useUser,
  //   (state: any) => state
  // );

  // const { user } = userStore || {};

  useAuth()

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
