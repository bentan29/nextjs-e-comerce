'use server'

import prisma from "@/lib/prisma";

export const getUserById = async (id: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id
            },
            include: {
                address: true,
            }
        })
        return user
    } catch (error) {
        throw new Error('No se cargo el usuario')
    }
}
