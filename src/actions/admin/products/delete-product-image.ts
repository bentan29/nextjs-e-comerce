'use server'

import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import {v2 as cloudinary} from 'cloudinary';
import { revalidatePath } from 'next/cache';
cloudinary.config(process.env.CLOUDINARY_URL ?? '')

export const deleteProductImage = async (imageId: number, imageUrl: string) => {

    const session = await auth();
    if (session?.user.role !== "admin") throw new Error("Unauthorized");
    
    if (!imageUrl.startsWith('http')) {
        return {
            ok: false,
            message: 'No se pueden borrar imagenes de FileSystem'
        }
    }

      //- tomamos el nombre de la imagen
      const imageName = imageUrl
      .split('/') //- cortamos en los /
      .pop() //- tomamos el ultimo segmento
      ?.split('.')[0] ?? '' //- nameImage.jpg , cortamos en el punto y tomamos el nombre


    try {

        //- Borrar la imagen de Cloudinary
        await cloudinary.uploader.destroy(imageName);

        //- Borrar la imagen de la base de datos
        const deleteImage = await prisma.productImage.delete({
            where: {
                id: imageId
            },
            select: {
                product: {
                    select: {
                        slug: true
                    }
                }
            }
        })

        //- Revalidar los paths
        revalidatePath('/products');

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'Error al borrar la imagen'
        }
        
    }
}