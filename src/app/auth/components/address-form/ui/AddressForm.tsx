'use client'

import { useForm } from "react-hook-form"
import { AddressFormValues, addressSchema } from "@/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Address, City, Province } from "@/interfaces"
import { useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useAddresStore } from "@/store"
import { cn } from "@/lib/utils"
import { Loader2Icon } from "lucide-react"
import { deleteUserAddress, setUserAddress } from "@/actions"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface Props {
    navigateTo?: string;
    provinces: Province[]; 
    cities: City[];
    userAddress?: Address | null; //- el addres que viene de la base de datos, si es que tenemos
}   

export const AddressForm = ({provinces, cities, userAddress, navigateTo }: Props) => {
    
    const router = useRouter();

    const [idProvince, setIdProvince] = useState('');
    const [citiesProvince, setCitiesProvince] = useState<City[]>([]);
    const [isPending, setIsPending] = useState(false)

    //- Estado del addres de Zustand
    const setAddress = useAddresStore(state => state.setAddress)
    const addressStore = useAddresStore(state => state.address)

    const {data: sessionUser} = useSession({
        required: true, //- Si no hay session redirige a login, exigimos que exista
    })

    useEffect(() => {
        const filteredCities = cities.filter((city) => city.id_state === idProvince);
        setCitiesProvince(filteredCities);
    }, [idProvince]);

    const form = useForm<AddressFormValues>({
        resolver: zodResolver(addressSchema),
        defaultValues: {
            firstName: userAddress?.firstName || '',
            lastName: userAddress?.lastName || '',
            address: userAddress?.address || '',
            address2: userAddress?.address2 || '',
            postalCode: userAddress?.postalCode || '',
            phone: userAddress?.phone || '',
            province_id: userAddress?.province_id || '',
            city_id: userAddress?.city_id || '',
            remember_address: false,
        }
    })

    
    //- Si existe un address en el store de Zustand lo cargamos
    useEffect(() => {
        if(addressStore.firstName) {
            form.reset(addressStore as AddressFormValues)
            setIdProvince(addressStore.province_id)
        }
    }, [addressStore, idProvince,])


    const onSubmit = async (data: AddressFormValues) => {
        setIsPending(true)  

        const {remember_address, ...restAddress} = data
    
        const {ok, message} = await setUserAddress(restAddress, sessionUser!.user.id)

        if (!ok) {
            toast.error(message)
            return
        } else {
            toast.success(message)
        }

        setAddress(restAddress) //- Guardamos en Zustand

        // if (data.remember_address) {
        //     //-- Guardamos o Actualizamos en base de datos
        //     // setUserAddress(restAddress, sessionUser!.user.id)
        // } else {
        //     //-- Borramos de la base de datos
        //     // deleteUserAddress(sessionUser!.user.id)
        // }

        if(navigateTo) {
            router.push(navigateTo)
        }

        setIsPending(false)
    }

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                <FormField
                    control={form.control}
                    name="firstName"
                    render={({field}) => (
                        
                        <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                                <Input {...field}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="lastName"
                    render={({field}) => (
                        
                        <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                                <Input {...field}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="address"
                    render={({field}) => (
                        
                        <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                                <Input {...field}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="address2"
                    render={({field}) => (
                        
                        <FormItem>
                            <FormLabel>Address 2 (optional)</FormLabel>
                            <FormControl>
                                <Input {...field}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="phone"
                    render={({field}) => (
                        
                        <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                                <Input {...field}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="postalCode"
                    render={({field}) => (
                        
                        <FormItem>
                            <FormLabel>Postal Code</FormLabel>
                            <FormControl>
                                <Input {...field}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex gap-4">
                    {/* PROVINCE */}
                    <FormField control={form.control} name="province_id" render={({field}) => (
                        <FormItem>
                            <FormLabel>Province</FormLabel>
                            <FormControl>
                                <Select
                                    value={field.value}
                                    onValueChange={(value) => {
                                        field.onChange(value)
                                        setIdProvince(value) // ✅ actualiza la provincia seleccionada
                                        form.setValue("city_id", "") // ✅ limpia ciudad si se cambia provincia
                                    }}
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
                                Province
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}/>

                    {/* CITY */}
                    <FormField control={form.control} name="city_id" render={({field}) => (
                        <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                                <Select 
                                    value={field.value}
                                    onValueChange={field.onChange}
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
                                City
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}/>
                </div>

                <FormField control={form.control} name="remember_address" render={({field}) => (
                    <FormItem className="flex items-center gap-3">
                        <Checkbox 
                            id="save-address" 
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                        <Label htmlFor="save-address">Save this address for future orders</Label>
                    </FormItem>
                )}/> 

                <Button 
                    type="submit" 
                    disabled={isPending}
                    className={cn('w-full md:w-auto',
                        {'btn-primary cursor-pointer': !isPending,
                        'bg-gray-600 text-white py-2 cursor-not-allowed px-4 transition-all': isPending,
                        }
                    )}
                >
                    {isPending && <Loader2Icon className="animate-spin" /> } Continue
                </Button>
            </form>
        </Form>
    )
}
