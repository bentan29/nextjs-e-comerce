'use client'

import { Product } from "@/interfaces"
import { useState } from "react"


interface Props {
    product: Product
}

export const SizeSelector = ({ product }: Props) => {

    const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined)
    return (
        <div>SizeSelector</div>
    )
}
