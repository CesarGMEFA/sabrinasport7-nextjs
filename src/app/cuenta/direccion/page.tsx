"use client";
import { useState, useEffect } from "react";

import ShippingAddress from "@/components/Account/Address/ShippingAddress";
import { SkeletonForm } from "@/components/ui/SkekeletonForm";

import { getCustomer } from "@/lib/api/customer/getCustomer";
import { Customer } from "@/lib/interfaces/Customer.interface";
import { UserStore } from "@/lib/interfaces/UserStore.interface";
import { useUserStore } from "@/lib/store/useUserStore";
import { useUser } from "@/lib/store/user";

type Props = {};

function Address({}: Props) {
  const [data, setData] = useState<Customer | null>(null);
  const userStore = useUserStore<UserStore, UserStore>(
    useUser,
    (state: any) => state
  );

  const { user } = userStore || {};
  useEffect(() => {
    if (user?.id) {
      getCustomer(user?.id).then((data) => setData(data));
    }
  }, [user?.id]);

  if (data === null) {
    return <SkeletonForm />;
  }

  return (
    <section className="lg:w-2/4 mx-auto shadow-md">
      <ShippingAddress c={data} />
    </section>
  );
}

export default Address;
