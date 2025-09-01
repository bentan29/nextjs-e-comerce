'use client'

import { useForm } from "react-hook-form"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Category, Product } from "@/interfaces"
import { Input } from "@/components/ui/input"
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { createUpdateProduct, deleteProductImage } from "@/actions"
import { useProductDialogStore } from "@/store"
import { toast } from "sonner"
import { ProductImage } from "@/components"
import { Trash } from "lucide-react"

const formSchema = z.object({
    title: z.string().min(3).max(100),
    price: z.number().min(1),
    slug: z.string(),
    description: z.string().min(3).max(1000),
    sizesStock: z.array(
        z.object({
            size: z.enum(['XS','S','M','L','XL','XXL','XXXL','XXXXL']),
            stock: z.number().min(0),
        })
    ).refine((sizes) => sizes.some((s) => s.stock > 0), {
        message: 'Debe haber al menos un talle con stock mayor a 0',
    }),
    tags: z.string().optional(),
    gender: z
        .string()
        .refine((val) => ['men', 'women', 'kid', 'unisex'].includes(val), {
            message: 'Gender is required',
        }),
    categoryId: z.string().min(1, { message: 'Category is required' }),
    // images: z.array(z.string()).optional(),
    images: z.array(
        z.object({
            id: z.string().optional(), // puede no tener ID si es una imagen nueva
            url: z.string(),
        })
    ).optional(),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface Props {
    product: Product | null;
    mode: 'edit' | 'new';
    categories: Category[];
}

export const ProductFormShadcn = ({product, mode, categories}: Props) => {

    const { closeDialog } = useProductDialogStore()
    const [isUploading, setIsUploading] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    const allSizes = ['XS','S','M','L','XL','XXL','XXXL','XXXXL'] as const;

    const mergedSizesStock = allSizes.map((size) => {
        const existing = product?.sizesStock?.find((s) => s.size === size);
        return {
            size,
            stock: existing ? existing.stock : 0
        }
    })

    const defaultValues: ProductFormValues = {
        title: product?.title ?? '',
        slug: product?.slug ?? '',
        price: product?.price ?? 0,
        description: product?.description ?? '',
        tags: Array.isArray(product?.tags) ? product?.tags.join(', ') : product?.tags ?? '',
        gender: product?.gender ?? '',
        categoryId: product?.category?.id ?? '',
        sizesStock: mergedSizesStock,

        images: product?.images?.map((image) => ({
            // id: image.id.toString(),
            url: image,
        })) ?? [],  
    }

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });
      
    //- Subida del formulario incluso las imagenes
    const onSubmit = async (data: ProductFormValues) => {
        setIsUploading(true);
        //-Creamos un objeto FormData para pasarle al servidor
        const formData= new FormData();
        const {...productToSave} = data;

        if(product?.id) {
            formData.append('id', product.id);
        }
        formData.append('title', productToSave.title);
        formData.append('price', productToSave.price.toString());
        formData.append('description', productToSave.description);
        formData.append('tags', productToSave.tags ?? '');
        formData.append('gender', productToSave.gender);
        formData.append('categoryId', productToSave.categoryId);
        formData.append('slug', productToSave.title.toLowerCase().replace(/ /g, '_').trim()); //- remplazamos los espacios por guiones y quitamos los espacios al inicio y al final con trim
        formData.append('sizesStock', JSON.stringify(productToSave.sizesStock));
       
        if (selectedFiles.length > 0) {
            for (const file of selectedFiles) {
              formData.append('images', file);
            }
        } 
   

        console.log('Contenido de FormData:');
        formData.forEach((value, key) => {
            console.log(`${key}:`, value);
        });

    
        const {ok, message, product:createdProduct} = await createUpdateProduct(formData);

        if(ok) {
            closeDialog();
            toast.success(message);
            return;
        } else {
            toast.error(message);
        }

        setIsUploading(false);
    }

    //- Eliminacion de imagenes
    const handleRemoveImage = (index: number, previewUrl?: {id?: string, url?: string}) => {
        const newFiles = [...selectedFiles];
        const newPreviews = [...(form.getValues("images") ?? [])];
      
        newFiles.splice(index, 1);
        newPreviews.splice(index, 1);
      
        setSelectedFiles(newFiles);
        form.setValue("images", newPreviews);
        
        if(previewUrl?.id && previewUrl?.url) {
            deleteProductImage(Number(previewUrl?.id), previewUrl?.url!)
        }
    };

    //- Carga imagenes al input
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>, field: any) => {
        const files = Array.from(e.target.files ?? []);
                                
            // Si no hay archivos nuevos, no hacer nada
            if (files.length === 0) return;
        
            // Limitar a máximo 5 imágenes entre las ya cargadas y nuevas
            const maxImages = 5; //- maximo 5 imagenes
            const currentPreviews = field.value ?? []; //- imagenes actuales
            const currentFiles = selectedFiles ?? []; //- archivos actuales
        
            // Restante de slots disponibles
            const remainingSlots = maxImages - currentPreviews.length;
        
            if (remainingSlots <= 0) {
                toast.error("Máximo 5 imágenes");
                return;
            }
        
            const newFiles = files.slice(0, remainingSlots);
            const newPreviews = newFiles.map((file) => ({ url: URL.createObjectURL(file) }));

            // ✅ sumamos los archivos
            setSelectedFiles([...currentFiles, ...newFiles]);
            field.onChange([...currentPreviews, ...newPreviews]);
    }
      

    return (
        <Form {...form}>
            <form className="space-y-6 overflow-y-auto max-h-[calc(100vh-5rem)] pr-2 mt-2 pb-4" onSubmit={form.handleSubmit(onSubmit)}>
                
                {/* titulo */}
                <FormField control={form.control} name="title" render={({field}) => (
                    <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                            <Input  {...field}/>
                        </FormControl>
                        <FormDescription className="text-xs">
                            This is your public display name.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}/>

                {/* categoria y genero  */}
                <div className="flex items-center justify-start gap-2">
                    <FormField control={form.control} name="categoryId" render={({field}) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem key={category.id} value={category.id}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>

                    <FormField control={form.control} name="gender" render={({field}) => (
                        <FormItem>
                            <FormLabel>Gender</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="men">Men</SelectItem>
                                        <SelectItem value="women">Women</SelectItem>
                                        <SelectItem value="kid">Kid</SelectItem>
                                        <SelectItem value="unisex">Unisex</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                </div>

                {/* precio */}
                <div className="flex items-center gap-2">
                    <FormField control={form.control} name="price" render={({field}) => (
                        <FormItem>
                            <FormLabel>$ Price</FormLabel>
                            <FormControl>
                                <Input {...field} type="number" onChange={(e) => field.onChange(Number(e.target.valueAsNumber))}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/> 
                </div>
                

                {/* stock por talla */}
                <div className="flex items-center justify-between gap-2 border-y py-4">
                    <FormField
                        control={form.control}
                        name="sizesStock"
                        render={() => (
                            <FormItem>
                                <FormLabel>Stock por Talla</FormLabel>
                                <div className="grid grid-cols-2 gap-y-2 gap-x-6">
                                    {form.watch("sizesStock").map((item, index) => (
                                        <div key={item.size} className="flex items-center gap-1">
                                            <span className="w-14 bg-sidebar p-1 rounded-sm font-light text-center">{item.size}</span>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    value={item.stock}
                                                    onChange={(e) =>
                                                    form.setValue(`sizesStock.${index}.stock`, Number(e.target.value))
                                                    }
                                                    className="flex-1"
                                                />
                                            </FormControl>
                                        </div>
                                    ))}
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>


                {/* tags */}
                <FormField control={form.control} name="tags" render={({field}) => (
                    <FormItem>
                        <FormLabel>Tags</FormLabel>
                        <FormControl>
                        <Input
                            value={field.value}
                            onChange={(e) => {
                                field.onChange(e.target.value); // ✅ simplemente lo guardás como string
                            }}
                        />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}/>

                {/* description */}
                <FormField control={form.control} name="description" render={({field}) => (
                    <FormItem>
                        <FormLabel>Description</FormLabel>
                            <FormControl>
                                <textarea
                                    {...field}
                                    rows={5}
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                />
                            </FormControl>
                        <FormMessage />
                    </FormItem>
                )}/>

                {/* images */}
                <FormField control={form.control} name="images" render={({field}) => (
                    <FormItem>

                        <FormLabel>Images</FormLabel>

                        {/* Previews de las imagenes  */}
                        <div className="flex items-center flex-wrap gap-3">
                            {field.value?.map((previewUrl, index) => (
                                <div key={`preview-${index}`} className="relative w-fit">
                                <ProductImage
                                    src={previewUrl.url}
                                    alt={`Preview ${index}`}
                                    width={80}
                                    height={80}
                                    className="rounded-md"
                                />
                                <Button
                                    type="button"
                                    onClick={() => handleRemoveImage(index, previewUrl)}
                                    className="bg-red-500 hover:bg-red-600 rounded-full absolute -top-2 -right-2"
                                    size="icon"
                                >
                                    <Trash size={16} className="text-white" />
                                </Button>
                                </div>
                            ))}
                        </div>
                        
                        {/* Input de las imagenes */}
                        <FormControl>
                             <Input
                                type="file"
                                multiple
                                accept="image/png, image/jpeg, image/avif"
                                onChange={(e) => {handleOnChange(e, field)}}
                            />
                        </FormControl> 
                        <FormMessage />
                    </FormItem>
                )}/>

                <Button type="submit">
                    {mode === 'edit' ? 'Save Changes' : 'Create Product'}
                </Button>
            </form>
        </Form>
    )
}
