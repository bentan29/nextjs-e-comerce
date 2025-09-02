'use server'

import { auth } from "@/auth";
// import prisma from "@/lib/prisma"

export const getOrderById = async (id: string) => {

    //*- Tomamos la session desde el servidor
    const session = await auth();
    const userId = session?.user?.id;

    if(!userId) {
        return {
            ok: false,
            message: 'Unauthorized'
        }
    }

    try {
        // Import dinámico de Prisma
        const { default: prisma } = await import('@/lib/prisma');
        
        const order = await prisma.order.findUnique({
            where: {
                id, 
                userId
            },
            include: {
                orderAddress: true,
                orderItems: {
                    select: {
                        quantity: true,
                        price: true,
                        size: true,
                        product: {
                            select: {
                                slug: true,
                                title: true,
                                images: {
                                    select: {
                                        url: true
                                    },
                                    take: 1
                                },
                            }
                        }
                    }
                    // include: {
                    //     product: {
                    //         select: {
                    //             id: true,
                    //             slug: true,
                    //             title: true,
                    //             images: true,
                    //             price: true,
                    //             sizesStock: true
                    //         }
                    //     }
                    // }
                },
            }
        })

        if(!order) {
            return {
                ok: false,
                message: 'This order does not exist'
            }
        }

        //- Validamos que sea un user, y que sea el mismo usuario que hizo la orden
        // if(session?.user?.role === 'user') {
        //     if(userId !== order.userId) {
        //         return {
        //             ok: false,
        //             message: 'Unauthorized'
        //         }
        //     }
        // }

        return {
            ok: true, 
            order
        };
        
    } catch (error) {
        return {
            ok: false,
            message: 'An error occurred while getting the order'
        }
    }
}