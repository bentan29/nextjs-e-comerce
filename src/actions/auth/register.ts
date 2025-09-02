'use server'
import prisma from "../../lib/prisma";
import { registerSchema } from "@/schema"
import bcrypt from "bcryptjs";
import z from "zod"


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