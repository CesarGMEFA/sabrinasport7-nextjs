import type { Metadata } from 'next'
import { Lato } from 'next/font/google'
import './globals.css'

import Header from '@/components/Header'
import { Toaster } from "@/components/ui/toaster"

const lato  = Lato({subsets: ['latin'], weight: ['400', '700'] })

export const metadata: Metadata = {
  title: 'Sabrinasport7',
  description: 'Descubre la última moda deportiva en Sabrinasport7. Encuentra una amplia selección de ropa y accesorios diseñados para mujeres que buscan comodidad y estilo mientras se mantienen activas. Explora nuestras colecciones exclusivas que van desde conjuntos de entrenamiento vibrantes hasta prendas versátiles para el día a día. ¡También ofrecemos opciones de moda deportiva para hombres, aunque nuestra especialidad está en la moda femenina! Prepárate para destacar en tus actividades deportivas con Sabrinasport7.'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`bg-gray-100 max-w-[1950px] mx-auto ${lato.className}`}>
        <Header/>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
