"use client";

import FormShipping from "@/components/Forms/FormShippingBilling/FormShipping";

import { Customer } from "@/lib/interfaces/Customer.interface";
import { useAuth } from "@/lib/hook/useAuth";

type Props = {
  c: Customer;
};

export default function AddressShipping({ c }: Props) {
  useAuth();
  {
    /* Personal Shipping Address Info */
  }
  return (
    <section className="p-5 bg-white">
      <h4 className="mb-2 text-lg font-bold">
        Informaci&oacute;n De Direcci&oacute;n De Env&iacute;o
      </h4>
      <FormShipping billingShipping={c.shipping} id={c.id} />
    </section>
  );
}
