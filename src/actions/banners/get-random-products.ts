'use server'

import prisma from "@/lib/prisma"

interface FinalProduct {
    id: string;
    title: string;
    price: number;
    image: string;
    slug: string;
}

interface Props {
    limit?: number;
}

export const getRandomProducts = async ({ limit = 5 }: Props) => {
    try {
        // Paso 1: obtener ids aleatorios de productos
        const randomIds: { id: string }[] = await prisma.$queryRawUnsafe(`
            SELECT id
            FROM "Product"
            ORDER BY RANDOM()
            LIMIT ${limit};
        `);

        const ids = randomIds.map(p => p.id);

        // Paso 2: obtener info de los productos
        const products = await prisma.product.findMany({
            where: { id: { in: ids } },
            select: {
                id: true,
                title: true,
                price: true,
                slug: true,
                images: {
                    take: 1, // Tomamos solo una imagen
                    orderBy: {
                        // Si querés aleatoria: usa RANDOM aquí también pero Prisma no lo soporta directamente
                        id: 'asc' // O elige la primera fija
                    }
                }
            }
        });

        const final: FinalProduct[] = products.map((prod) => ({
            id: prod.id,
            title: prod.title,
            price: prod.price,
            image: prod.images[0].url,
            slug: prod.slug
        }));

        return {
            ok: true,
            products: final
        };

    } catch (error) {
        console.error(error);
        return {
            ok: false,
            message: 'Error to get random products'
        };
    }
};
