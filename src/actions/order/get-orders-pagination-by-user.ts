'use server'

// import { auth } from "@/auth";
import prisma from "../../lib/prisma";


interface PaginationOptions {
    page?: number;
    take?: number;
    userId: string;
}

export const getOrdersPaginationByUser = async({page = 1, take = 5, userId}: PaginationOptions) => {
    
    if(isNaN(Number(page))) page = 1 //-si page no es un numero
    if(page < 1) page = 1 //-si page es menor a 1

    //- Tomamos el usuario de la session
    // const session = await auth();
    // const userId = session?.user?.id;

    if(!userId) {
        return {
            ok: false,
            message: 'Debe autenticarse'
        }
    }

    try {

        const orders = await prisma.order.findMany({
            where: {userId},
            take: take,
            skip: (page -1) * take,
            orderBy: {
                createdAt: 'desc'
            },
            select: {
                id: true,
                createdAt: true,
                isPaid: true,
                orderAddress: {
                    select: {
                        firstName: true,
                        lastName: true,
                    }
                }
            },
        })

        //-- Total de ordenes de este usuario
        const totalCount = await prisma.order.count({
            where: { userId: userId }
        })

        //- Total de paginas
        const totalPages = Math.ceil(totalCount / take)

        return {
            totalPages: totalPages,
            ok: true,
            orders
        }  
            
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'Error to get orders'
        }
    }
}