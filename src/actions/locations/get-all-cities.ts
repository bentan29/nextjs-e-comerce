'use server'

import prisma from "@/lib/prisma"

export const getAllCities = async () => {
    try {
        const cities = await prisma.city.findMany()
        return cities
    } catch (error) {
        throw new Error('No se cargaron las ciudades')
    }
}
