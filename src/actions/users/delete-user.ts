'use server'

import prisma from "../../lib/prisma"

export const deleteUser = async (userId: string) => {
    try {
        const user = await prisma.user.delete({
            where: {id: userId}
        })

        if(!user) return {
            ok: false,
            message: 'User not found'
        }

        return {
            ok: true,
            message: 'User deleted successfully'
        }
    } catch (error) {
        return {
            ok: false,
            message: 'Could not delete user'
        }
    }
}


export const deleteManyUsers = async (userIds: string[]) => {
    try {
        const deleted = await prisma.user.deleteMany({
            where: {
                id: { in: userIds }
            }
        });

        if(deleted.count === 0) return {
            ok: false,
            message: 'Users not found to delete'
        }

        return {
            ok: true,
            message: `${deleted.count} user(s) deleted successfully`
        }

    } catch (error) {
        console.error(error)
        return {
            ok: false,
            message: 'Could not delete users'
        }
    }
}