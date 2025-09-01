"use client";

import { useCartStore } from "@/store";

import { CreditCard, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { currencyFormat } from "@/utils/currencyFormat";
import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { AlertConfirmDialog } from "@/components";
import EmptyCartPage from "../empty/page";
import { CommonTable } from "../../components";
import { columns } from "../colums-cart/cart-columns";

export default function CartClient() {
  
  const { cart, cleanCart, getSummaryInformation } = useCartStore();
  const { subTotal, tax, total, itemsInCart } = getSummaryInformation();

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return (
      <div className="flex justify-center items-center h-52">
        <p className="animate-pulse text-2xl">Loading...</p>
      </div>
    );
  }

  if (cart.length === 0) {
    return <EmptyCartPage />;
  }

  const cartProducts = cart.map((product) => ({
    id: product.idProduct,
    title: product.title,
    slug: product.slug,
    image: product.image,
    price: product.price,
    size: product.size,
    quantity: product.quantity,
  }));

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-5 mb-8">
        <ShoppingCart size={48} strokeWidth={3} />
        <h1 className="text-4xl font-bold">Cart</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-5">

        {/* ------------ Productos en el carrito ------------ */}
        <div className="col-span-2">
          <CommonTable 
            columns={columns} 
            data={cartProducts} 
          />
        </div>

        {/* ------------ Resumen de la Orden ------------ */}
        <div className="bg-white border border-black p-2 rounded-sm text-black">
          <h2 className="font-bold text-xl">Resume.</h2>

          <div className="border rounded-sm my-2">
            <p className="flex items-center justify-between border-black/20 border-b py-1 px-2">
              <span className="mr-2">Quantity:</span>{" "}
              <span>
                {itemsInCart === 1 ? "1 article" : `${itemsInCart} articles`}
              </span>
            </p>
            <p className="flex items-center justify-between border-black/20 border-b py-1 px-2">
              <span className="mr-2">SubTotal:</span>{" "}
              <span>{currencyFormat(subTotal)}</span>
            </p>
            <p className="flex items-center justify-between border-black/20 border-b py-1 px-2">
              <span className="mr-2">Taxes:</span>{" "}
              <span>{currencyFormat(tax)}</span>
            </p>
            <p className="flex text-xl font-bold items-center justify-between border-b pb-1 pt-3 px-2 rounded-b-sm">
              <span className="mr-2">Total:</span>{" "}
              <span>{currencyFormat(total)}</span>
            </p>
          </div>

          <div className="flex flex-col items-end gap-2">
            {/* Checkout */}
            <Link
              href="/checkout/address"
              className="w-full p-2 bg-orange-600 flex items-center gap-2 text-white cursor-pointer rounded-sm hover:shadow-sidebar transition-all duration-300 shadow-sm"
            >
              <CreditCard size={20} strokeWidth={3} /> Checkout
            </Link>

            {/* Vaciar carrito de compras */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="bg-red-600 text-white cursor-pointer rounded-sm hover:shadow-sidebar hover:bg-red-700 transition-all duration-300 shadow-md">
                  <Trash2 size={20} strokeWidth={3} />
                  Clean Cart
                </Button>
              </AlertDialogTrigger>
              <AlertConfirmDialog
                title="Are you sure you want to clear your shopping cart?"
                onConfirm={cleanCart}
                action="destroy"
              />
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>
  );
}
