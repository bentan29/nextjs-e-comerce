'use server'

import prisma from "../../lib/prisma"

export const findProvinceById = async (id: string) => {
    try {
        const province = await prisma.province.findUnique({
            where: {id},
            select: {name: true}
        })
        return province
    }catch(error){
        throw new Error('No se cargo la provincia')
    }
}