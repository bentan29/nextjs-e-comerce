'use client'

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form'
import { User } from '@/interfaces';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import z from 'zod';


export const registerSchema = z.object({
    id: z.string().uuid().optional().nullable(),
    name: z.string().min(3,{message: 'Name must be at least 3 characters long'}),
    email: z.string().email({message: 'Invalid email address'}),
    password: z.string().min(6,{message: 'Password must be at least 6 characters long'}),
    newPassword: z.string()
        .min(6,{message: 'New Password must be at least 6 characters long'})
        .optional()
        .or(z.literal('')), // permite que sea vacío
    confirmPassword: z.string()
        .min(6,{message: 'Confirm Password must be at least 6 characters long'})
        .optional()
        .or(z.literal('')), // permite que sea vacío
}).refine(data => !data.newPassword || data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});


export type RegisterFormValues = z.infer<typeof registerSchema>;
    

interface Props {
    user?: User
}

export const RegisterUserForm = ({user}: Props) => {

    const onSubmit = async () => {
        console.log('hola');
    }

       const form = useForm<RegisterFormValues>({
            resolver: zodResolver(registerSchema),
            defaultValues: {
                id: user?.id ?? null,
                name: user?.name || '',
                email: user?.email || '',
                password: '',
                newPassword: '',
                confirmPassword: '',
            }
        })


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                <Button type="submit">Register</Button>
                <pre>{JSON.stringify(form.formState.errors, null, 2)}</pre>
            </form>
        </Form>
    )
}
