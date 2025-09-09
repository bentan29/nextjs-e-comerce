'use client'

import { useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RegisterFormValues, registerSchema } from "@/schema";
import { Button } from "@/components/ui/button";
import { createOrUpdateUser, login } from "@/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { User } from "@/interfaces";
import { Loader2Icon, LockKeyholeOpen } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";


interface Props {
    user?: User;
}

export const RegisterForm = ({user}: Props) => {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    
    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            id: user?.id ?? null,
            name: user?.name || '',
            email: user?.email || '',
            password: '',
            confirmPassword: '',
            newPassword: '',
        }
    })
    
    const handleOnSubmit = async (data: RegisterFormValues) => {
        setIsLoading(true);

        const response = await createOrUpdateUser(data);
        const {ok, message} = response;

        console.log(response);

        if (!ok) {
            toast.error(message || "Ocurrió un error");
            return;
        } 
        
        toast.success(message || (user?.id ? "Usuario actualizado" : "Registro exitoso"));

        if (ok) {
            router.replace('/auth/login');
            setIsLoading(false);
            return;
        }

        setIsLoading(false);
  
        //- Determinamos que contraseña usar para iniciar sesion
        // Si el usuario cambió su contraseña, usamos la nueva; si no, la actual
        //const passwordToLogin = user?.id ? (data.newPassword || data.password) : data.password;

        // if (!data.email || !passwordToLogin) {
        //     toast.error("Email y contraseña son requeridos para iniciar sesión");
        //     return;
        // }

    //     //- Iniciar sesion con NextAuth
    //     const loginResult = await login({
    //         email: data.email.toLowerCase(), 
    //         password: passwordToLogin
    //     });

    //     if (!loginResult) {
    //         toast.error("No se pudo iniciar sesión automáticamente");
    //         return;
    //     }

    //     // Si es un registro nuevo, redirigimos a la página principal
    //     if (!user?.id) {
    //         window.location.replace('/');
    //         return;
    //     }
  
    //   // Si es edición, refrescamos los Server Components
    //   router.refresh();

    //     // if(user?.id) {
    //     //     window.location.reload();
    //     // } else {
    //     //     window.location.replace('/');
    //     // }

    //  signIn('credentials', { redirect: false }); // Actualiza la sesión del cliente
    //  router.push('/'); // Redirige a la página principal
    //  router.refresh(); // Forza una recarga del estado del cliente

    }

    const onSubmit = async () => {
        console.log('hola');
    }


    return (
        
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleOnSubmit)} className="space-y-6">

            <pre>{JSON.stringify(form.formState.errors, null, 2)}</pre>
                
                {/* name */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                
                {/* email */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>@Email</FormLabel>
                            <FormControl>
                                <Input {...field} type="email"/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />    

                {/* password */}
                <FormField
                    control={form.control}
                    name="password"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>{user?.id ? 'New Password' : 'Password'}</FormLabel>
                            <FormControl>
                                <Input {...field} type="password"/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* confirmPassword */}
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>{user?.id ? 'Confirm New Password' : 'Confirm Password'}</FormLabel>
                            <FormControl>
                                <Input {...field} type="password"/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button 
                    type="submit" 
                    // disabled={isLoading}
                    className={cn(
                        'py-2 px-4 transition-all',
                        isLoading ? 'bg-gray-600 text-white cursor-not-allowed' : 'btn-primary'
                    )}
                >
                    {isLoading 
                        ? <><Loader2Icon className="animate-spin" /> Loading...</>
                        : user?.id ? 'Update' : 'Register'
                    }
                </Button>
            </form>
        </Form>
    )
}
