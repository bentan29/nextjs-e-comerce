'use client'

import { AddFavourite, SizeSelect } from "@/components"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CartProduct, Product, Size } from "@/interfaces"
import { useCartStore } from "@/store"
import { Loader2Icon, Ruler, ShoppingCart } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

interface Props {
    product: Product
}

type SelectedSize = {
    idSizeStock: string;
    size: Size;
    quantity: number;
}

export const AddToCart2 = ({ product }: Props) => {


    const { sizesStock } = product; // Talles disponibles del producto
    const [selectedSize, setSelectedSize] = useState<SelectedSize[]>([]);
    const [posted, setPosted] = useState(false);

    const {addProductToCart, getQuantityByProductAndSize, cart} = useCartStore();

    console.log({cart});

    const addToCart = () => {
        setPosted(true);
        //--- Si no hay talles seleccionados mostamos error.
        if(selectedSize.length === 0) {
            toast.error(
                "Please!! SELECT A SIZE ", 
                {duration: 2000, className: "bg-yellow-100 border border-yellow-400 text-yellow-900",}, 
            )
            setPosted(false);
            return;
        }

        //-- Validamos talla por talla antes de agregar
        for (const selected of selectedSize) {
            const inCart = getQuantityByProductAndSize(product.id, selected.size);
            const stock = product.sizesStock.find(s => s.size === selected.size)?.stock ?? 0;
            const available = stock - inCart;
            if (selected.quantity > available) {
                toast.error(
                    `Only ${available} items left in size ${selected.size}. You already have ${inCart} in cart.`,
                    { duration: 3000 }
                );
                setPosted(false);
                return;
            }
        }

        //--- Carrito. -- Agregamos todo lo seleccionado en selectedSize.
        for (const selected of selectedSize) {
            const cartProduct: CartProduct = {
                idProduct: product.id,
                idSizeStock: selected.idSizeStock,
                slug: product.slug,
                title: product.title,
                price: product.price,
                size: selected.size,
                quantity: selected.quantity,
                image: product.images[0].url
            }
            addProductToCart(cartProduct);
        }

        toast.success("Product added to cart", {duration: 2000,});
        setSelectedSize([]); //--- Dejamos las seleccionadas en blanco
        setPosted(false);
    }


    //- Calculamos el stock que ya vamos agregando al carrito
    const getAvailableStock = (idSizeStock: string) => {   
        const stockEntry = product.sizesStock.find((s) => s.id === idSizeStock);
        const stock = stockEntry?.stock ?? 0;
        const size = stockEntry?.size;
        const inCart = size ? getQuantityByProductAndSize(product.id, size) : 0;
    
        return Math.max(stock - inCart, 0);
    }
    

    return (
        <div className="flex flex-col gap-4 py-4 px-2 lg:px-0">

            <div className="border p-2 w-fit mx-auto lg:mx-0">
                <h3 className="flex gap-2 items-center mb-2 text-lg  font-bold text-muted-foreground">
                    <Ruler size={18}/>Select size
                </h3>
                <SizeSelect 
                    sizesStock={sizesStock!} 
                    selectedSize={selectedSize} 
                    setSelectedSize={setSelectedSize}
                    getAvailableStock={getAvailableStock}
                />
            </div>


            <Separator/>
            
            <div className="flex justify-between gap-2">
                <Button
                    // disabled={posted}
                    onClick={addToCart}
                    className="rounded-xs bg-amber-600 hover:bg-amber-600 hover:shadow-sm hover:shadow-amber-500 cursor-pointer font-bold text-md"
                    size="sm"
                >
                    {posted 
                        ? <Loader2Icon className="animate-spin"/> 
                        : <ShoppingCart/>
                    }
                    Add to cart
                </Button>
            
                <AddFavourite product={product}/>
            </div>


        </div>

    )
}
