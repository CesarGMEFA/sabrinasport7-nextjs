"use client"
import { useState, useEffect, SetStateAction, Dispatch } from 'react'
import ProductCard from '../ProductCard'

import { getProductVariation } from '@/lib/api/products'
import { Product } from '@/lib/interfaces/Product.interface'

type Props = {
    id: number
    variationId: number
}

export default function ProductCardVariation({id, variationId}: Props) {
    const [data, setData] = useState<SetStateAction<Product|null> | ((prevState: Product | null) => Product | null)>(null)
    let d: Product | undefined = undefined;
    useEffect(() => {
        (async () => {
            const res = await getProductVariation(id, variationId)
            setData(res)
            console.log("res =>", res)
            d = res
        })()
    }, [id, variationId])

    return (
        <>
            {data && <ProductCard data={d} />}
        </>
    )
}