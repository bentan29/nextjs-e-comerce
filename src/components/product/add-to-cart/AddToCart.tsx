// 'use client'

// import { AddFavourite, SizeSelector } from "@/components"
// import { Button } from "@/components/ui/button"
// import { CartProduct, Product, Size } from "@/interfaces"
// import { useCartStore } from "@/store"
// import { Loader2Icon, ShoppingCart } from "lucide-react"
// import { useState } from "react"
// import { toast } from "sonner"

// interface Props {
//     product: Product
// }

// type SelectedSize = {
//     idSizeStock: string;
//     size: Size;
//     quantity: number;
// }

// export const AddToCart = ({ product }: Props) => {

//     console.log({product1: product});

//     const [selectedSizeState, setSelectedSizeState] = useState<SelectedSize[]>([]); //- Crea un array tipo [{size: string, quantity: number}, ...]
//     const [posted, setPosted] = useState(false);

//     const {addProductToCart, getQuantityByProductAndSize, cart} = useCartStore();

//     console.log({cart});

//     const addToCart = () => {
//         setPosted(true);
//         //--- Si no hay talles seleccionados mostamos error.
//         if(selectedSizeState.length === 0) {
//             toast.error(
//                 "Please!! SELECT A SIZE ", 
//                 {duration: 2000, className: "bg-yellow-100 border border-yellow-400 text-yellow-900",}, 
//             )
//             setPosted(false);
//             return;
//         }

//         // 🚨 Validamos talla por talla antes de agregar
//         for (const selected of selectedSizeState) {
//             const inCart = getQuantityByProductAndSize(product.id, selected.size);
//             const stock = product.sizesStock.find(s => s.size === selected.size)?.stock ?? 0;
//             const available = stock - inCart;
//             if (selected.quantity > available) {
//                 toast.error(
//                     `Only ${available} items left in size ${selected.size}. You already have ${inCart} in cart.`,
//                     { duration: 3000 }
//                 );
//                 setPosted(false);
//                 return;
//             }
//         }

//         //--- Carrito.
//         const cartProduct: CartProduct = {
//             idProduct: product.id,
//             idSizeStock: product.sizesStock.find(s => s.size === selectedSizeState[0].size)?.id || '',
//             slug: product.slug,
//             title: product.title,
//             price: product.price,
//             size: selectedSizeState[0].size,
//             quantity: selectedSizeState[0].quantity,
//             image: product.images![0]
//         }
//         //--- Agregamos al carrito.
//         addProductToCart(cartProduct);
//         // console.log(cartProduct);
//         toast.success("Product added to cart", {duration: 2000,});
//         //--- Dejamos las seleccionadas en blanco
//         setSelectedSizeState([]);

//         setPosted(false);
//     }

//     // 🔁 Calculamos el stock restante para cada talla
//     const getAvailableStock = (size: string) => {   
//         const stock = product.sizesStock.find((s) => s.size === size)?.stock ?? 0; //- Stock disponible en Base de datos    
//         const inCart = getQuantityByProductAndSize(product.id, size); //- Stock que tenemos pedidos en el carrito   
//         return Math.max(stock - inCart, 0); //- Stock restante
//     }

//     return (
//         <div className="flex flex-col gap-4 py-4">

//             {/* {JSON.stringify(cart)} */}
//             {/* {getTotalItems()} */}

//             <div className="border-y pb-4 pt-2">
//                 <p className="mb-1 text-muted-foreground">Select size</p>

//                 {/* Talles disponibles, selector de talles */}
//                 <SizeSelector 
//                     sizesStock={product.sizesStock} //- cantidad de productos por talles
//                     selectedSize={selectedSizeState} //- talles seleccionados
//                     onSizeChanged={(sizes: SelectedSize[]) => setSelectedSizeState(sizes)} //- actualiza los talles seleccionados
//                     getAvailableStock={getAvailableStock}
//                 />

//             </div>


//             <div className="flex justify-between gap-2">

//                 <Button
//                     disabled={posted}
//                     onClick={addToCart}
//                     className="rounded-sm bg-amber-600 hover:bg-amber-600 hover:shadow-md hover:shadow-amber-500 cursor-pointer font-bold text-md"
//                     size="sm"
//                 >
//                     {posted 
//                         ? <Loader2Icon className="animate-spin"/> 
//                         : <ShoppingCart/>
//                     }
//                     Add to cart
//                 </Button>


//                 <AddFavourite product={product}/>

//             </div>

            
//         </div>

//     )
// }
