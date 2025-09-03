'use server'

import { ProductImage } from "@/interfaces";
import prisma from "@/lib/prisma"

export const getProductBySlug = async (slug: string) => {
    
    try {
        const product = await prisma.product.findFirst({
            include: {
                images: true,
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

        return product
              
    } catch (error) {
        console.log(error);
        throw new Error('Error al obtener el producto por slug');
    }

}
    
