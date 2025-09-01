import { Separator } from "@/components/ui/separator";
import { ProductsInCart } from "./ui/ProductsInCart";
import Link from "next/link";
import { Settings } from "lucide-react";
import { PlaceOrder } from "./ui/PlaceOrder";

export default function CheckoutPage() {

    
    return (
        <div className="container mx-auto py-10 space-y-8">

            <h1 className="text-4xl font-bold">Checkout</h1>

            <Separator/>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
       
                <div className=" w-fit mx-auto">
                    <h3 className="text-xl font-semibold">Modify purchase</h3>
                    <Link href="/user/cart" className="flex items-center gap-1 underline underline-offset-3 mb-10 hover:text-yellow-500 transition-all duration-200">
                        <Settings size={18}/>
                        Edit cart
                    </Link>
                    
                    {/* ---- Items del Carrito ---- */}
                    <ProductsInCart/> 
                </div>

               
                <div>
                    {/* ---- Resumen de la Orden ---- */}
                    <PlaceOrder/> 
                </div>
            
            </div>

        </div>
    );
}