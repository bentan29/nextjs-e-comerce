'use server'

import prisma from "../../lib/prisma";
import { registerSchema } from "@/schema"
import z from "zod"
import bcrypt from "bcryptjs";

export const updateUser = async (formData: z.infer<typeof registerSchema>) => {

    const parsed = registerSchema.safeParse(formData);

    if (!parsed.success) {
        return {
          ok: false,
          message: "Invalid form data",
        };
    }

    const { id, name, email, password, newPassword } = parsed.data;

    if (!id) {
        return {
            ok: false,
            message: 'User ID is required',
        };
    }

    try {

        // Obtener el usuario actual
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) {
            return { 
                ok: false, 
                message: 'User not found'
            };
        }

        // Si el usuario quiere cambiar la contraseña, verificar la actual
        let hashedPassword = user.password; // por defecto mantener la actual
        if (newPassword) {
            if (!password) {
                return { ok: false, message: 'Current password is required to change password' };
            }
            const isMatch = bcrypt.compareSync(password, user.password);
            if (!isMatch) {
                return { ok: false, message: 'Current password is incorrect' };
            }
            hashedPassword = bcrypt.hashSync(newPassword, 10);
        }


        //- Actualizamos el usuario
        const updatedUser = await prisma.user.update({
            where: {id},
            data: {
                name,
                email: email.toLowerCase(),
                password: hashedPassword,
            },
            select: {
                id: true,
                name: true,
                email: true,
            }
        })


        return {
            ok: true,
            message: 'User updated successfully',
            user: updatedUser
        }

    } catch (error) {
        console.log(error);
        throw new Error('Error occurred while updating user');
    }

}