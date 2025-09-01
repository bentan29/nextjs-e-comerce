'use client'

import { useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { useFormState } from "react-dom";
// import { authenticate } from "@/actions";
import {  useState } from "react";
import { cn } from "@/lib/utils";
import { Loader2Icon, ShieldAlert } from "lucide-react";
import { LoginFormValues, loginSchema } from "@/schema";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

export const LoginForm = () => {

    // const [state, dispatch] = useFormState(authenticate, undefined)
    // const [state, formAction, isPending] = useActionState(authenticate, undefined)
    // useEffect(() => {
    //     if(state === 'Success') {
    //         signIn('credentials', { redirect: false }); // Actualiza la sesión del cliente
    //         router.push('/'); // Redirige a la página principal
    //         router.refresh(); // Forza una recarga del estado del cliente
    //     }
    // }, [state])

    const router = useRouter()
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);


    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    })

    const onSubmit = async (data: LoginFormValues) => {
        // const parsed = loginSchema.safeParse(data);
        // if (!parsed.success) {
        //     toast("Invalid form data values");
        //     return;
        // }

        setIsLoading(true);
        setError(null);

        const result = await signIn("credentials", {
            redirect: false,
            email: data.email,
            password: data.password,
        });

        setIsLoading(false);

        if (result?.error) {
            toast.error("Email o contraseña incorrectos");
            return;
        }

        router.push('/');
        router.refresh();
    
        // const formData = new FormData();
        // formData.append("email", data.email);
        // formData.append("password", data.password);

        // startTransition(() => {
        //     formAction(formData);
        // });
    }
    

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
            >
                
                <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>@Email</FormLabel>
                            <FormControl>
                                <Input {...field} name="email" type="email"/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                
                <FormField
                    control={form.control}
                    name="password"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input {...field} name="password" type="password"/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {error && (
                    <div className="flex items-center gap-2 bg-red-500/10 p-2 rounded border border-red-600 text-red-600">
                        <ShieldAlert className="w-5 h-5" />
                        <span>{error}</span>
                    </div>
                )}
                
                <Button 
                    type="submit" 
                    disabled={isLoading}
                    className={cn({
                        'btn-primary cursor-pointer': !isLoading,
                        'bg-gray-600 text-white py-2 cursor-not-allowed px-4 transition-all': isLoading,
                    })}
                >
                    {isLoading 
                        ? <><Loader2Icon className="animate-spin" /> Loading...</>
                        : 'Login'}
                </Button>
            </form>
        </Form>
        
    )
}
