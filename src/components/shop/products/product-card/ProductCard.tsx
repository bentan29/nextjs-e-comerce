'use client'

import { AddFavourite, ProductImage } from "@/components";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/interfaces";
import Link from "next/link";
import { useState } from "react";


interface Props {
    product: Product;
}

export const ProductCard = ({product}: Props) => {

    const [displayImage, setDisplayImage] = useState(product.images?.[0].url)
    
    return (
        <Card className="p-0 relative gap-0 rounded-sm shadow-sm shadow-black border-none overflow-hidden fade-in bg-primary flex flex-col justify-between">

            <ProductImage 
                src={displayImage}
                alt={product.title}
                className="w-full object-cover aspect-square max-h-[450px]"
                width={500} 
                height={500}
                onMouseEnter={() => setDisplayImage(product.images?.[1].url)} //- Cambiamos la imagen al pasar el mouse.
                onMouseLeave={() => setDisplayImage(product.images?.[0].url)}
            />

            <AddFavourite 
                product={product}
                className="absolute top-1 right-1"
            />
            
            <Link href={`/product/${product.slug}`} className="cursor-pointer p-2 text-secondary">
                <CardHeader className="p-2">
                    <CardTitle>
                        {product.title}
                    </CardTitle>
                </CardHeader>

                <CardContent className="px-2 mb-2">
                    <CardDescription className="flex items-center justify-between text-blue-700">
                        <span className="font-extrabold text-3xl">${product.price}</span>
                        <span className="font-bold text-lg bg-blue-500/20 px-1.5 rounded-md">{product.category?.name} / {product.gender}</span>
                    </CardDescription>
                </CardContent>
            </Link>

        </Card>
    )
}
