'use server'

import { Product } from "@/interfaces";
import prisma from "@/lib/prisma";

export const getProducts = async () => {
    try {

        const products = await prisma.product.findMany({
            include: {
                sizesStock: true,
                images: true,
                category: true
            }
        });

        return products.map(product => ({
            ...product,
            images: product.images.map((img) => img.url),
        })) as Product[]
        
    } catch (error) {
        throw new Error('No se cargaron los productos')
    }
}
