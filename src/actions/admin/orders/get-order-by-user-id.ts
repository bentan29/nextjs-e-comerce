'use server'

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

interface Props {
    userId: string;
}

export const getOrdersByUserId = async ({ userId }: Props) => {

    try {
        const session = await auth();
        if (session?.user.role !== "admin") throw new Error("Unauthorized");

        // obtenemos el usuario sin cargar sus órdenes
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                address: true, // opcional, si lo necesitás
            },
        });

        if (!user) {
            return {
                ok: false,
                message: "User not found",
            };
        }

        // obtenemos solo las órdenes
        const orders = await prisma.order.findMany({
            where: {
                userId,
                isPaid: true,
            },
            include: {
                orderItems: {
                    include: {
                        product: true,
                    },
                },
            },
        });

        const totalOrders = await prisma.order.count({
            where: {
                userId,
                isPaid: true,
            },
        });

        return {
            user,
            orders,
            totalOrders,
        };
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: "Error getting orders by user",
        };
    }
};
