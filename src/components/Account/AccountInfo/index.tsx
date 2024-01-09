"use client";
import React from "react";
import FormPersonInfo from "@/components/Forms/FormPersonInfo";

import { Customer } from "@/lib/interfaces/Customer.interface";
import { useAuth } from "@/lib/hook/useAuth";

type Props = {
  c: Customer;
};

export default function Cuenta({ c }: Props) {
  useAuth();
  {
    /* Personal Info */
  }
  return (
    <section className="p-5 bg-white">
      {/* Personal Profile */}
      <h4 className="mb-2 text-lg font-bold">Perfil Personal</h4>
      <FormPersonInfo c={c} id={c.id} />
    </section>
  );
}
