import z from "zod";

export const addressSchema = z.object({
    firstName: z.string().min(3,{message: 'First name must be at least 3 characters long'}),
    lastName: z.string().min(3,{message: 'Last name must be at least 3 characters long'}),
    address: z.string().min(3,{message: 'Address must be at least 3 characters long'}),
    address2: z.string().optional(),
    postalCode: z.string().min(3,{message: 'Postal code must be at least 3 characters long'}),
    phone: z.string().min(3,{message: 'Phone must be at least 3 characters long'}),
    province_id: z.string().min(2,{message: 'Province must be required'}),
    city_id: z.string().min(2,{message: 'City must be required'}),
    remember_address: z.boolean().optional(),
});

export type AddressFormValues = z.infer<typeof addressSchema>;