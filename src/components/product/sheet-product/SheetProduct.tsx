'use client'

import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Category } from "@/interfaces"
import { useProductDialogStore } from "@/store"
import { ProductFormShadcn } from "../product-form/ProductFormShadcn"

interface Props {
    categories: Category[]
}

export const SheetProduct = ({categories}: Props) => {

    const { product, mode } = useProductDialogStore()

    return (
        <SheetContent>
            <SheetHeader>
                <SheetTitle className="text-lg font-semibold">
                    {mode === 'edit' ? 'Edit Product' : 'New Product'}
                </SheetTitle>

                <div className="">
                    <SheetDescription asChild>
                        <ProductFormShadcn 
                            product={product} 
                            mode={mode} 
                            categories={categories}
                        />
                    </SheetDescription>
                </div>
            </SheetHeader>

        </SheetContent>
    )
}
