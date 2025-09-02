'use server'

import prisma from "@/lib/prisma";

export const getUsers = async () => {
    try {

        const users = await prisma.user.findMany({});
        return users
        
    } catch (error) {
        throw new Error('No se cargaron los usuarios')
    }
}
