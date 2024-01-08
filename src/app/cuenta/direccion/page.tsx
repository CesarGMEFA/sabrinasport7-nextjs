import ShippingAddress from '@/components/Address/ShippingAddress/index'
import { getCustomer } from '@/lib/api/customer/getCustomer'

type Props = {}

async function Address({}: Props) {

  const c = await getCustomer(8)

  return (
    <section className="lg:w-2/4 mx-auto">
      <ShippingAddress c={c} />
    </section>
  )
}

export default Address