// stores/useProductDialog.ts
import { Product } from "@/interfaces"
import { create } from "zustand"

interface ProductDialogState {
    open: boolean
    product: Product | null
    mode: 'edit' | 'new'
    openDialog: (product?: Product) => void
    closeDialog: () => void
}

export const useProductDialogStore = create<ProductDialogState>((set) => ({
    open: false,
    product: null,
    mode: 'new',
    openDialog: (product) => set({ 
        open: true, 
        product: product ?? null,
        mode: product ? 'edit' : 'new'
    }),
    closeDialog: () => set({ 
        open: false, 
        product: null,
        mode: 'new'
    }),
}))
