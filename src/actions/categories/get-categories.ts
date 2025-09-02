'use server'

import prisma from "../../lib/prisma";

export const getCategories = async () => {
    try {
        const categories = await prisma.category.findMany({});
        return categories
    } catch (error) {
        throw new Error('No se cargaron las categorias')
    }
}