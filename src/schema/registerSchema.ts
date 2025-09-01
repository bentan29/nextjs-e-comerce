import z from "zod";

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
    