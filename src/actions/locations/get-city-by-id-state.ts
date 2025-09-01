'use server'

import prisma from "@/lib/prisma"

//- Bsucamos todas las ciudades de tal departamento, 
// pasandole el id del departamento que queremos
export const getCityByIdState = async (id_state: string) => {
    try {
        const cities = await prisma.city.findMany({
            where: {
                id_state: id_state
            }
        })
        return cities
    } catch (error) {
        throw new Error('No se cargaron las ciudades')
    }
}
