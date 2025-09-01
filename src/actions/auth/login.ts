'use server'

import { signIn } from "@/auth";
import { loginSchema } from "@/schema";
import z from "zod";

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {

    try {
        // console.log({formData:Object.fromEntries(formData)})

        // 1. Convertimos FormData en objeto
        const raw = Object.fromEntries(formData);
        
        // 2. Validamos con el esquema zod (lanza error si no pasa)
        const data = loginSchema.parse(raw);

        await signIn('credentials', {
            // ...Object.fromEntries(formData),
            ...data,
            redirect: false,
        })

        return 'Success'

    } catch (error) {

        // 4. Si el error viene de zod, devolver mensaje útil
        if (error instanceof z.ZodError) {
            return "InvalidFields";
        }

        // 5. Si el error viene del auth (por ejemplo: credenciales inválidas)
        if((error as any).type === 'CredentialsSignin') {
            return 'CredentialsSignin'
        }
        
        return  'UnknownError'
    } 
}


export const login = async (data: z.infer<typeof loginSchema>) => {
    
    const parsed = loginSchema.safeParse(data);

    if (!parsed.success) {
        return {
            ok: false,
            message: "Invalid form data",
        };
    }

    try {
        await signIn('credentials', {
            ...data,
            redirect: false,
        })
        
        return {
            ok: true,
            message: 'Login exitoso'
        }
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'Error al iniciar sesión'
        }
    }

}