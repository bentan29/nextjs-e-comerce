'use server'
import prisma from "@/lib/prisma";
import { registerSchema } from "@/schema"
import bcrypt from "bcryptjs";
import z from "zod"
import { RegisterFormValues } from "@/schema";

export const createOrUpdateUser = async(formData: RegisterFormValues) => {

    const parsed = registerSchema.safeParse(formData);

    if (!parsed.success) {
        return {
          ok: false,
          message: "Invalid form data",
        };
    }

    const { id, name, email, password, newPassword } = parsed.data;

    if(id) {
        //Editamos
        return update({id, name, email, password, newPassword})
    } else {
        //Creamos
        return register({name, email, password})
    }
    
}

const register = async({name, email, password}: {name: string, email: string, password: string}) => {
    try {
        const user = await prisma.user.findUnique({where: {email: email.toLowerCase()}});

        if(user) {
            return {
                ok: false,
                message: 'User already exists'
            }
        }

        const newUser = await prisma.user.create({
            data: {
                name,
                email: email.toLowerCase(),
                password: bcrypt.hashSync(password, 10),
            },
            select: {
                id: true,
                name: true,
                email: true,
            }
        })

        return {
            ok: true,
            message: 'User created successfully',
            user: newUser
        }

    } catch (error) {
        console.log(error);
        throw new Error('Error occurred while creating user');
    }
}

const update = async({id, name, email, password, newPassword}: {id: string, name: string, email: string, password: string, newPassword?: string}) => {

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


export const registerUser = async (formData: z.infer<typeof registerSchema>) => {

    const parsed = registerSchema.safeParse(formData);

    if (!parsed.success) {
        return {
          ok: false,
          message: "Invalid form data",
        };
    }

    const { name, email, password } = parsed.data;

    try {

        const user = await prisma.user.findUnique({where: {email: email.toLowerCase()}});

        if(user) {
            return {
                ok: false,
                message: 'User already exists'
            }
        }

        const newUser = await prisma.user.create({
            data: {
                name,
                email: email.toLowerCase(),
                password: bcrypt.hashSync(password, 10),
            },
            select: {
                id: true,
                name: true,
                email: true,
            }
        })

        return {
            ok: true,
            message: 'User created successfully',
            user: newUser
        }

    } catch (error) {
        console.log(error);
        throw new Error('Error occurred while creating user');
    }


}


