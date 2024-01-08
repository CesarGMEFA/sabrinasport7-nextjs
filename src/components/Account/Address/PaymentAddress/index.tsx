"use client";

import FormBilling from "@/components/Forms/FormShippingBilling/FormBilling";

import { Shipping, Customer } from "@/lib/interfaces/Customer.interface";
import { useAuth } from "@/lib/hook/useAuth";

type Props = {
  c: Customer;
};

export default function AddressShipping({ c }: Props) {
  useAuth();
  {
    /* Personal Billing Address Info */
  }
  return (
    <section className="p-5 bg-white">
      <h4 className="mb-2 text-lg font-bold">
        Informaci&oacute;n De Direcci&oacute;n De Facturaci&oacute;n
      </h4>
      <FormBilling billingShipping={c.billing} id={c.id} />
    </section>
  );
}