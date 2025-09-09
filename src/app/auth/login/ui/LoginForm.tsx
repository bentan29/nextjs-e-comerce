'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Loader2Icon, ShieldAlert } from "lucide-react";
import { LoginFormValues, loginSchema } from "@/schema";
import { signIn, SignInResponse } from "next-auth/react";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

export const LoginForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get('redirectTo') || '/';
    
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    });

    const onSubmit = async (data: LoginFormValues) => {
        setIsLoading(true);
        setError(null);

        const result: SignInResponse | undefined = await signIn("credentials", {
            redirect: false, // importante para capturar errores
            email: data.email,
            password: data.password,
        });

        console.log(result);
        
        setIsLoading(false);

        if (result?.error) {
            setError(result.error);
            toast.error(result.error);
            form.reset({ password: '' });
            return;
        } 
            
        router.push(redirectTo);
        
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>@Email</FormLabel>
                            <FormControl>
                                <Input {...field} type="email" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input {...field} type="password" />
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
                    className={cn(
                        'py-2 px-4 transition-all',
                        isLoading ? 'bg-gray-600 text-white cursor-not-allowed' : 'btn-primary'
                    )}
                >
                    {isLoading 
                        ? <><Loader2Icon className="animate-spin" /> Loading...</>
                        : 'Login'}
                </Button>
            </form>
        </Form>
    );
}
