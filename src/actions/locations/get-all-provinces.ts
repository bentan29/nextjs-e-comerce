'use server'

import prisma from "../../lib/prisma"

export const getProvince = async () => {

    try {
        const provinces = await prisma.province.findMany({});
        return provinces
    } catch (error) {
        throw new Error('No se cargaron las provincias')
    }
    
}