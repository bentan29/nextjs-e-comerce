'use client'

import { ItemsOrderData } from "@/components";
import { useCartStore } from "@/store";
import { useEffect, useState } from "react";

export const ProductsInCart = () => {

  const [loaded, setLoaded] = useState(false)             

  //- Productos en el carrito de Zustand
  const productInCart = useCartStore(state => state.cart);

  useEffect(() => {
    setLoaded(true)
  },[])

  if(!loaded) {
    return (
      <div className="flex justify-center items-center h-52">
        <p className="animate-pulse text-2xl">Loading... </p>
      </div>
    )
  }

  return (
    <>
      { 
        loaded && <ItemsOrderData productInCart={productInCart}/> 
      }
    </>
  )
}
