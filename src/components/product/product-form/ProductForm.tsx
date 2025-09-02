// 'use client'

// import { useForm } from "react-hook-form"
// import z from "zod"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { Product } from "@/interfaces"
// import { Label } from "@/components/ui/label"
// import { Input } from "@/components/ui/input"

// interface Props {
//     product?: Product | null;
//     mode: 'edit' | 'new';
// }

// const formSchema = z.object({
//     title: z.string().min(3).max(100),
//     slug: z.string().min(3).max(100).optional(),
//     price: z.number().min(1),
//     description: z.string().min(3).max(1000),
//     sizesStock: z.array(
//         z.object({
//             size: z.enum(['XS','S','M','L','XL','XXL','XXXL','XXXXL']),
//             stock: z.number().min(0),
//         })
//     ),
//     tags: z.string(),
//     gender: z.enum(['men', 'women', 'kid', 'unisex'], {required_error: 'Gender is required'}).optional(),
//     categoryId: z.string({required_error: 'Category is required'}),

//     images: z.array(z.string()).optional(),
// });

// export const ProductForm = ({product, mode}: Props) => {

//     const {
//         handleSubmit, //- para postear
//         register, //- para registrar campos 
//         formState: { isValid }, //- estado del formulario
//         getValues, //- para obtener valores
//         setValue, //- para setear valores
//         watch //- para actualizar valores si pasa algo
//     } = useForm<z.infer<typeof formSchema>>({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//             // ...product,
//             sizesStock: product?.sizesStock?.map((size) => ({
//                 size: size.size,
//                 stock: size.stock,
//             })) || [],
//             tags: product?.tags?.join(',') || '',
//             images: product?.images?.map((image) => image.url) || [],
//             title: product?.title || '',
//             // price: 0,
//             // description: '',
//             // images: [],
//             // sizesStock: [
//             //     { size: 'XS', stock: 0 },
//             //     { size: 'S', stock: 0 },
//             //     { size: 'M', stock: 0 },
//             //     { size: 'L', stock: 0 },
//             //     { size: 'XL', stock: 0 },
//             //     { size: 'XXL', stock: 0 },
//             //     { size: 'XXXL', stock: 0 },
//             //     { size: 'XXXXL', stock: 0 },
//             // ],
//             // tags: '',
//             // gender: '' as 'men' | 'women' | 'kid' | 'unisex',
//             // categoryId: '',
//           } 
//     })


//     const onSubmit = (data: z.infer<typeof formSchema>) => {
//         console.log('fomruilario')
//         console.log(data)
//     }

//     return (
//         <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 mt-4">
//             <div className="flex flex-col gap-2">
//                 <Label>Title</Label>
//                 <Input {...register('title', {required: true})}/>
//             </div>
//         </form>
//     )
// }
