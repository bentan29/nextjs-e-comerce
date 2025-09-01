'use server'
import prisma from "@/lib/prisma";
import { slugify } from "@/lib/slugify";
import { revalidatePath } from "next/cache";
import z from "zod";

const fullSchema = z.object({
    id: z.string().uuid().optional().nullable(),
    name: z.string().min(3).max(50),
    email: z.string().email(),
    role: z.enum(['user', 'admin']),
    address: z.object({
        id: z.string().optional().nullable(),
        address: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        address2: z.string().optional(),
        postalCode: z.string(),
        phone: z.string(),
        province_id: z.string(),
        city_id: z.string(),
    }),
});

type EditUserFormValues = z.infer<typeof fullSchema>;

export const createUpdateUser = async (data: EditUserFormValues) => {
    
    const parsed = fullSchema.safeParse(data)

    if(!parsed.success) {
        console.log('Validation error', parsed.error.format());
        return {
            ok: false,
            message: 'Error de validación',
            user: null
        };
    }

    const {id, address, ...rest} = parsed.data;

    try {
        
        let user = null;

        if (id) {
            user = await prisma.user.update({
              where: { id },
              data: {
                ...rest,
                address: {
                  upsert: {
                    update: {
                      ...address,
                      id: undefined, // Prisma ignora el ID al actualizar por unique userId
                    },
                    create: {
                      ...address,
                      id: undefined,
                    },
                  },
                },
              },
              include: { address: true },
            })
          }
          

        revalidatePath(`/admin/users/${user?.id}_${slugify(user?.name!)}`);

    
        return {
            ok: true,
            message: 'Usuario actualizado exitosamente',
            user
        }

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'Error al actualizar usuario'
        }
    }


    // const {address, ...rest} = Object.fromEntries(formData);
    // const addressParsed = addressSchema.safeParse(address);
    // const userParsed = userSchema.safeParse(rest);


    // if (!addressParsed.success) {
    //     console.log('Validation error', addressParsed.error.format());
    //     return {
    //         ok: false,
    //         message: 'Error de validación',
    //         user: null
    //     };
    // }

    // if (!userParsed.success) {
    //     console.log('Validation error', userParsed.error.format());
    //     return {
    //         ok: false,
    //         message: 'Error de validación',
    //         user: null
    //     };
    // }

    // const userData = userParsed.data;
    // const addressData = addressParsed.data;

    // try {
        
    //     const { id, ...restUser } = userData;
    //     let user: User | null = null;
        
    //     //?--- Actualizar
    //     if(id) {
    //         //*Actualizar usuario
    //         user = await prisma.user.update({
    //             where: {id},
    //             data: {
    //                 ...restUser,
    //                 address: {
    //                     delete: true,
    //                     create: {
    //                         ...addressData,
    //                         id: undefined,
    //                     }
    //                 }
    //             }
    //         });   
    //     }

    //     //revalidatePath(`/users/${user?.id}`);

    //     return {
    //         ok: true,
    //         message: 'Usuario actualizado exitosamente',
    //         user
    //     }
     

    // } catch(error) {
    //     console.log(error);
    //     return {
    //         ok: false,
    //         message: 'Error al crear el usuario'
    //     }
    // }


}