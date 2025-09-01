'use server'

import { auth } from "@/auth";
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache";


export const changeConfirmationOrder = async (orderId: string, isConfirmed: boolean) => {

    const session = await auth();
    if (session?.user.role !== "admin") throw new Error("Unauthorized");
    
    try {

        const order = await prisma.order.update({
            where: { id: orderId },
            data: { isConfirmed }
        });

        //-Notificacion en tiempo real
        // await pusherServer.trigger('orders', 'order-updated', {
        //     orderId,
        //     isConfirmed
        // })

        revalidatePath('/admin/confirmed-orders');
        revalidatePath('/admin/orders');
        revalidatePath('/admin/pending-orders');

        if(!order) {
            return {
                ok: false,
                message: 'Order not found'
            }
        }
        
    } catch (error) {
        console.log(error)
    }
}