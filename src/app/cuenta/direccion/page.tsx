"use client"
import React from 'react'
import { useAuth } from '@/lib/hook/useAuth'

type Props = {}

function Address({}: Props) {

  useAuth()

  return (
    <div>address</div>
  )
}

export default Address