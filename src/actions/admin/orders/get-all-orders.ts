'use server'

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const getAllOrders = async (isConfirmed?: boolean) => {

    try {
        
        const session = await auth();
        if (session!.user.role !== "admin") throw new Error("Unauthorized");

        const orders = await prisma.order.findMany({
            where: {
                isPaid: true,
                ...(isConfirmed !== undefined && {isConfirmed}) 
            },
            include: {
                user: true,
                orderItems: {
                    include: {
                        product: true
                    }
                }
            },
        });

        // if(!orders) return [];

        const totalOrders = await prisma.order.count({
            where: {
                isPaid: true,
                ...(isConfirmed !== undefined && {isConfirmed}) 
            }
        });

        return {
            orders,
            totalOrders
        };

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'Error to get orders'
        };
    }
}

