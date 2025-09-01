'use client'

import { placeOrder } from "@/actions";
import { PaymentData } from "@/components";
import { Button } from "@/components/ui/button";
import { useAddresStore, useCartStore } from "@/store"
import { ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";


export const PlaceOrder = () => {
    
    const router = useRouter();

    const [loaded, setLoaded] = useState(false);
    //- Loading que usamos para la carga de los nombres de ciudad y provincia
    // const [loadingLocationNames, setLoadingLocationNames] = useState(false);
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    
    //- Store
    const address = useAddresStore(state => state.address); //- Address Store
    const { cart, getSummaryInformation, cleanCart } = useCartStore(); //- Cart Store
    const { subTotal, tax, total, itemsInCart } = getSummaryInformation(); //- Valores del resumen de la compra, getSummaryInformation()
  
      
    useEffect(() => {
        setLoaded(true)
    }, [])

    // console.log({cart})

    //?-- Funcion para enviar la orden al Server Action
    const onPlaceOrder = async() => {
        setIsPlacingOrder(true);
        //-- Tomamos del carrito solo el id del producto, cantidad y talle
        const productsToOrder = cart.map(product => ({
            idSizeStock: product.idSizeStock,
            productId: product.idProduct,
            quantity: product.quantity,
            size: product.size,
        }))
  
        //* ----------- Server action ----------------------------
        const resp = await placeOrder(productsToOrder, address);

        //-- si tenemos un error
        if(!resp.ok) {
            setIsPlacingOrder(false);
            setErrorMessage(resp.message);
            return;
        }

        //-- si todo sale bien 
        cleanCart();
        toast.success('Order created successfully');
        router.replace(`/user/orders/${resp.order?.id}`);
   
        // setIsPlacingOrder(false);
    }

    if(!loaded) {
        return (
            <div className="flex justify-center items-center h-52">
                <p className="animate-pulse text-2xl">Loading... </p>
            </div>
        )
    }

    return (
        <div className="bg-white/30 p-2 rounded-md shadow-xl text-black w-full sm:max-w-sm">       

            {/* --------- Resumen de la orden --------- */}
            <PaymentData
                firstName={address.firstName}
                lastName={address.lastName}
                address={address.address}
                address2={address.address2 || ''}
                postalCode={address.postalCode}
                phone={address.phone}
                itemsInCart={itemsInCart}
                subTotal={subTotal}
                tax={tax}
                total={total}
                city_id={address.city_id}
                province_id={address.province_id}
            />

            {/* Boton colocar orden */}
            <div className="mt-3">

                {errorMessage && (
                    <p className="border border-red-300 bg-red-100 rounded-sm p-1 my-2 flex items-center gap-2 py-2 text-red-500 animate-pulse">
                        <ShieldAlert size={25}/>
                        {errorMessage}
                    </p>
                )}

                <Button
                    disabled={isPlacingOrder}
                    onClick={onPlaceOrder}
                    className='w-full rounded-sm text-black text-xl bg-yellow-600 font-bold hover:bg-yellow-500 transition-all cursor-pointer'
                >
                    Checkout
                </Button>

            </div>
        </div>
    )
}
