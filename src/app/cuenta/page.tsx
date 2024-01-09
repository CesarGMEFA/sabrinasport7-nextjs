"use client";
import { useState, useEffect } from "react";
import AccountInfo from "@/components/Account/AccountInfo";
import { SkeletonForm } from "@/components/ui/SkekeletonForm";

import { getCustomer } from "@/lib/api/customer/getCustomer";
import { Customer } from "@/lib/interfaces/Customer.interface";

import { useUser } from "@/lib/store/user";
import { useUserStore } from "@/lib/store/useUserStore";
import { UserStore } from "@/lib/interfaces/UserStore.interface";

type Props = {};

export default function Cuenta({}: Props) {
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
      {/* Personal Profile */}
      <AccountInfo c={data} />
    </section>
  );
}
