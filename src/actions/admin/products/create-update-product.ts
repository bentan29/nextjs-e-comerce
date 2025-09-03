'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import z from "zod"
import { Gender, Prisma, Product } from "@prisma/client";

//- Cloudinary
import { v2 as cloudinary } from 'cloudinary';
import { auth } from "@/auth"
cloudinary.config(process.env.CLOUDINARY_URL ?? '')

const productSchema = z.object({
    id: z.string().uuid().optional().nullable(),
    title: z.string().min(3).max(255),
    slug: z.string().min(3).max(255),
    description: z.string(),
    price: z.coerce.number() //Convierte automáticamente el valor de entrada a un número
        .min(0)
        .transform(val => Number(val.toFixed(2))), 
    categoryId: z.string().uuid(),
    tags: z.string(),
    gender: z.nativeEnum(Gender)
})

const sizesSchema = z.array(
    z.object({
        size: z.enum(['XS','S','M','L','XL','XXL','XXXL','XXXXL']),
        stock: z.number().min(0),
    })
)


export const createUpdateProduct = async (formData: FormData) => {

    const session = await auth();
    if (session?.user.role !== "admin") throw new Error("Unauthorized");
    
    // Object.fromEntries(formData) convierte un FormData en un objeto plano de JavaScript.
    const {sizesStock, ...restFormData} = Object.fromEntries(formData);

    const parsedSizes = JSON.parse(sizesStock as string);
    const sizesParsed = sizesSchema.safeParse(parsedSizes);
    const productParsed = productSchema.safeParse(restFormData);

    if(!sizesParsed.success) {
        console.log(sizesParsed.error);
        return {
            ok: false,
            message: 'Formato de sizesStock inválido',
        };
    }

    if(!productParsed.success) {
        console.log(productParsed.error);
        return {
            ok: false,
            message: 'Formato de producto inválido',
        };
    }

    const product = productParsed.data;
    const sizes = sizesParsed.data;

    try {
        
        const {id, ...restProduct} = product; //- Verificamos si tenemos un id para editar o crear
        
        const prismaTx = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {

            let product: Product;
            //- Convertimos el string de tags a un array de strings
            const tagsArray = restProduct.tags.split(',').map(tag => tag.trim().toLocaleLowerCase());

            if(id) {
                //* Actualizar
                product = await prisma.product.update({
                    where: {id},
                    data: {
                        ...restProduct,
                        tags: {
                            set: tagsArray
                        },
                        sizesStock: {
                            deleteMany: {},
                            createMany: {
                                data: sizes.map((size) => ({
                                    size: size.size,
                                    stock: size.stock,
                                }))
                            }
                        },
                    }
                });
            } else {
                //* Crear
                product = await prisma.product.create({
                    data: {
                        ...restProduct,
                        tags: {
                            set: tagsArray
                        },
                        sizesStock: {
                            createMany: {
                                data: sizes.map((size) => ({
                                    size: size.size,
                                    stock: size.stock,
                                }))
                            }
                        },
                    }
                });
            }

            //* Guardamos las imagenes
            if(formData.getAll('images')) {

                //* -- Subimos las imagenes a Cloudinary y obtenemos las urls
                const images = await uploadImages(formData.getAll('images') as File[]);
     
                if(!images) {
                    throw new Error('No se pudo cargar las imagenes, rollingback')
                }

                //* -- Guardamos las imagenes
                await prisma.productImage.createMany({
                    data: images.map(image => ({
                        url: image!,
                        productId: product.id
                    }))
                })
            }

            return {
                product,
            } 
        });

        //?- Revalidamos los path
        revalidatePath('/admin/products');
        revalidatePath('/products');

        return {
            ok: true,
            message: id?'Producto actualizado exitosamente':'Producto creado exitosamente',
            product: prismaTx.product
        }
        
    } catch (err) {
        return {
            ok: false,
            message: 'Error al crear o actualizar producto',
        };
    }
}


//- Subimos las imagenes a Cloudinary y obtenemos las urls
const uploadImages = async(images: File[]) => {
    try {
        const uploadPromises = images.map( async(image) => {
            try {
                //- Convertimos cada archivo a un buffer
                const buffer = await image.arrayBuffer();
                const base64Image = Buffer.from(buffer).toString('base64');

                //- Subimos la imagen a Cloudinary, 
                //  y devolvemos la url
                return cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`)
                    .then(r => r.secure_url);

            } catch (error) {
                console.log(error);
                return null;
            }
        })

        //- Esperamos a que todas las imagenes se suban en paralelo 
        //  y obtenemos un array de urls
        const uploadedImages = await Promise.all(uploadPromises);
        return uploadedImages;

    }catch (error) {
        console.log(error);
        return null;
    }
}
