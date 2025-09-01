'use client'

import { useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RegisterFormValues, registerSchema } from "@/schema";
import { Button } from "@/components/ui/button";
import { login, registerUser, updateUser } from "@/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { User } from "@/interfaces";
import { LockKeyholeOpen } from "lucide-react";


interface Props {
    user?: User;
}

export const RegisterForm = ({user}: Props) => {
    const router = useRouter();
    
    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            id: user?.id || '',
            name: user?.name || '',
            email: user?.email || '',
            password: '',
            newPassword: '',
            confirmPassword: '',
        }
    })

    // console.log({user})
    
    const onSubmit = async (data: RegisterFormValues) => {

        let response;

        // Determinamos si es edición o registro
        if (user?.id) {
            response = await updateUser(data);
        } else {
            response = await registerUser(data);
        }

        const {ok, message} = response;


        if (!ok) {
            toast.error(message || "Ocurrió un error");
            return;
        } 
        
        toast.success(message || (user?.id ? "Usuario actualizado" : "Registro exitoso"));
  
        //- Determinamos que contraseña usar para iniciar sesion
        // Si el usuario cambió su contraseña, usamos la nueva; si no, la actual
        const passwordToLogin = user?.id ? (data.newPassword || data.password) : data.password;

        if (!data.email || !passwordToLogin) {
            toast.error("Email y contraseña son requeridos para iniciar sesión");
            return;
        }

        //- Iniciar sesion con NextAuth
        const loginResult = await login({
            email: data.email.toLowerCase(), 
            password: passwordToLogin
        });

        if (!loginResult) {
            toast.error("No se pudo iniciar sesión automáticamente");
            return;
        }

        // Si es un registro nuevo, redirigimos a la página principal
        if (!user?.id) {
            window.location.replace('/');
            return;
        }
  
      // Si es edición, refrescamos los Server Components
      router.refresh();

        // if(user?.id) {
        //     window.location.reload();
        // } else {
        //     window.location.replace('/');
        // }

        //signIn('credentials', { redirect: false }); // Actualiza la sesión del cliente
        //router.push('/'); // Redirige a la página principal
        //router.refresh(); // Forza una recarga del estado del cliente
       
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                
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
                
                {/* password actual - en el caso de que hay que actualizar contraseña*/}
                {user?.id && (
                    <>
                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Your Password</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="password"/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                            />

                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-xl font-bold whitespace-nowrap">
                                <LockKeyholeOpen className="w-5 h-5" />
                                Change Password
                            </div>
                            <div className="flex-grow h-px bg-muted-foreground/20" />
                        </div>

                    </>
                )}

                {/* new password */}
                <FormField
                    control={form.control}
                    name="newPassword"
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

                <Button type="submit" className="cursor-pointer">
                    {user?.id ? 'Update' : 'Register'}
                </Button>
            </form>
        </Form>
    )
}
