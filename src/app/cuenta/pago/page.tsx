"use client"
import React from 'react'
import FormBilling from '@/components/Forms/FormBilling'
import { useAuth } from '@/lib/hook/useAuth'

type Props = {}

function Payment({}: Props) {

  useAuth()

  return (
    <section className="lg:w-2/4 mx-auto">
      {/* Personal Profile */}
      <section className="p-5 bg-white">
        <h4 className="mb-2 text-lg font-bold">Informaci&oacute;n de pago</h4>
        <FormBilling />
      </section>
    </section>
  )
}

export default Payment