'use server'

import { ProductImage } from "@/interfaces";
import prisma from "@/lib/prisma"

export const getProductBySlug = async (slug: string) => {
    
    try {
        const product = await prisma.product.findFirst({
            include: {
                images: {
                    select: {
                        url: true
                    },
                },
                category: true,
                sizesStock: {
                    select: {
                        id: true,
                        size: true,
                        stock: true,
                    },
                }

            },
            where: {
                slug: slug
            }
        })

        if(!product) return null;

        return {
            ...product,
            images: product.images.map((image: ProductImage) => image.url)
        }        
    } catch (error) {
        console.log(error);
        throw new Error('Error al obtener el producto por slug');
    }

}
    
