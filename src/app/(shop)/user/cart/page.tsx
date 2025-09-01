
import { Suspense } from "react";
import CartClient from "./cart-client/CartClient";

export default function CartPage() {

  return (
    <Suspense fallback={<p className="animate-pulse text-2xl">Loading...</p>}>
      <CartClient />
    </Suspense>
  );

}
