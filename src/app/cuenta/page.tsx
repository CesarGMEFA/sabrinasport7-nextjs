import React from "react";

import AccountInfo from "@/components/Account/AccountInfo";

import { getCustomer } from "@/lib/api/customer/getCustomer";

type Props = {};

export default async function Cuenta({}: Props) {

  const c = await getCustomer(8)

  return (
    <section className="lg:w-2/4 mx-auto">
      {/* Personal Profile */}
      <AccountInfo c={c} />
    </section>
  );
}
