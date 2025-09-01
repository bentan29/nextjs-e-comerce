'use client'

import { deleteProduct } from "@/actions"
import { AlertConfirmDialog } from "@/components"
import { AlertDialog } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Product } from "@/interfaces"
import { useProductDialogStore } from "@/store"
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export const ProductsAction = ({product}: {product: Product}) => {
    
    //- Usamos el store directamente
    const openDialog = useProductDialogStore.getState().openDialog 

    const [open, setOpen] = useState(false);
    const router = useRouter();
    
    const handleConfirm = async (productId: string) => {
        try {
            const { ok, message } = await deleteProduct(productId);
            if(ok){
                router.refresh();
            }
        } catch (error) {
            console.error(error);
        }
    };
    
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                    <DropdownMenuLabel className="text-muted-foreground">Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem onClick={() => openDialog(product)}>
                        <Pencil />
                        Edit
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        <Trash2 />
                        Delete
                    </DropdownMenuItem>

                </DropdownMenuContent>
            </DropdownMenu>

            {/* ---- Dialogo de confirmación ---- */}
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertConfirmDialog
                    title={"Are you sure to delete this Product?"}
                    message={`${product.title}`}
                    action={ "destroy"}
                    onConfirm={() => handleConfirm(product.id)}
                />
            </AlertDialog>
        </>
    )
}
