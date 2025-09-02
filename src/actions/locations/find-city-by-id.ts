'use server'

import prisma from "../../lib/prisma"

export const findCityById = async (id: string) => {
    try {
        const city = await prisma.city.findUnique({
            where: {id},
            select: {name: true}
        })
        return city
    }catch(error){
        throw new Error('No se cargo la ciudad')
    }
}