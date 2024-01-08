import React from 'react'
import PaymentAddress from '@/components/Account/Address/PaymentAddress'
import { getCustomer } from '@/lib/api/customer/getCustomer'

type Props = {}

async function Payment({}: Props) {

  const c = await getCustomer(8)

  return (
    <section className="lg:w-2/4 mx-auto">
      <PaymentAddress c={c} />
    </section>
  )
}

export default Payment