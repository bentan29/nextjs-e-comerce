'use client'

import React, { useEffect, useState } from 'react'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form"
import { Input } from "../../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select"
import { Button } from "../../ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { City, Province, User } from '@/interfaces'
import { createUpdateUser } from '@/actions'
import { toast } from 'sonner'
import { useProductDialogStore } from '@/store'
import { useRouter } from 'next/navigation'
import { slugify } from '@/lib/slugify'

const formSchema = z.object({
    id: z.string().uuid().optional(),
    name: z
        .string()
        .min(3, {message: 'Username must be at least 3 characters long'})
        .max(50, {message: 'Username must be at most 50 characters long'}),
    email: z
        .string()
        .email({message: 'Invalid email address'}),
    role: z.enum(['user', 'admin']),
    address: z.object({
        id: z.string().optional().nullable(),
        address: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        address2: z.string().optional(),
        postalCode: z.string(),
        phone: z.string(),
        province_id: z.string(),
        city_id: z.string(),
    }),
});

type EditUserFormValues = z.infer<typeof formSchema>;

interface Props {
    user: User;
    provinces: Province[];
    cities: City[];
}   

export const UserForm = ({user, provinces, cities}: Props) => {

    const { closeDialog } = useProductDialogStore()
    const router = useRouter();

    const [idProvince, setIdProvince] = useState(user.address?.province_id);
    const [citiesProvince, setCitiesProvince] = useState<City[]>([]);
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        const filteredCities = cities.filter((city) => city.id_state === idProvince);
        setCitiesProvince(filteredCities);
    }, [idProvince]);
      

    const form = useForm<EditUserFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: user.id ?? undefined,
            name: user.name,
            email: user.email,
            role: user.role,
            address: {
                id: user.address?.id ?? null,
                address: user.address?.address || '',
                firstName: user.address?.firstName || '',
                lastName: user.address?.lastName || '',
                address2: user.address?.address2 || '',
                postalCode: user.address?.postalCode || '',
                phone: user.address?.phone || '',
                province_id: user.address?.province_id || '',
                city_id: user.address?.city_id || '',
            },
        }
    })


    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsUploading(true);
        const {ok, message} = await createUpdateUser(data);

        if (ok) {
            toast.success(message);
            closeDialog();
            const slug = slugify(data.name); // ✅ nombre actualizado
            router.push(`/admin/users/${data.id}_${slug}`); // ✅ id actualizado
        } else {
            toast.error(message);
        }
          
        setIsUploading(false);
    }

    return (
        <Form {...form}>
            <form className="space-y-6 " onSubmit={form.handleSubmit(onSubmit)}>
                <FormField control={form.control} name="name" render={({field}) => (
                    <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                            <Input {...field}/>
                        </FormControl>
                        <FormDescription className="text-xs">
                            username
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}/>
                
                <FormField control={form.control} name="address.firstName" render={({field}) => (
                    <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                            <Input {...field}/>
                        </FormControl>
                        <FormDescription className="text-xs">
                            first name.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}/>
                
                <FormField control={form.control} name="address.lastName" render={({field}) => (
                    <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                            <Input {...field}/>
                        </FormControl>
                        <FormDescription className="text-xs">
                            last name.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}/>

                <FormField control={form.control} name="email" render={({field}) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input {...field}/>
                        </FormControl>
                        <FormDescription className="text-xs">
                            email.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}/>

                <FormField control={form.control} name="address.phone" render={({field}) => (
                    <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                            <Input {...field}/>
                        </FormControl>
                        <FormDescription className="text-xs">
                            phone number.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}/>

                <FormField control={form.control} name="address.address" render={({field}) => (
                    <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                            <Input {...field}/>
                        </FormControl>
                        <FormDescription className="text-xs">
                            address location
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}/>

                <FormField control={form.control} name="address.address2" render={({field}) => (
                    <FormItem>
                        <FormLabel>Address 2 <span className="text-xs text-muted-foreground">(optional)</span></FormLabel>
                        <FormControl>
                            <Input {...field}/>
                        </FormControl>
                        <FormDescription className="text-xs">
                            address location2
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}/>

                <div className="flex gap-4">
                    {/* PROVINCE */}
                    <FormField control={form.control} name="address.province_id" render={({field}) => (
                        <FormItem>
                            <FormLabel>Province</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={(value) => {
                                        field.onChange(value)
                                        setIdProvince(value) // ✅ actualiza la provincia seleccionada
                                        form.setValue("address.city_id", "") // ✅ limpia ciudad si se cambia provincia
                                    }}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Province" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {provinces.map((province) => (
                                            <SelectItem key={province.id} value={province.id}>
                                                {province.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormDescription className="text-xs">
                                province
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}/>

                    {/* CITY */}
                    <FormField control={form.control} name="address.city_id" render={({field}) => (
                        <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                                <Select 
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="City" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {citiesProvince.map((city) => (
                                            <SelectItem key={city.id} value={city.id}>
                                                {city.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormDescription className="text-xs">
                                city
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}/>

                </div>

                <FormField control={form.control} name="role" render={({field}) => (
                    <FormItem>
                        <FormLabel>Role</FormLabel>
                        <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="user">User</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormDescription className="text-xs">
                            Only verified user can  be admin.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}/>

                <Button type="submit">Save Changes</Button>
            </form>
        </Form>
    )
}
