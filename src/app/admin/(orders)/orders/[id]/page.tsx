import { getOrderById } from "@/actions";
import { ItemsOrderData, OrderStatus, PaymentData, PayPalButton } from "@/components";
import { CartProduct } from "@/interfaces";
import { ConfirmOrder } from "../../components/confirm-order/ConfirmOrder";
import { cn } from "@/lib/utils";

// interface Props {
//     params: {
//         id: string,
//     }
// }

interface Props {
    params: Promise<{ id: string }>;
}


export default async function OrderIdPage({params}: Props) {

    const {id} = await params;

    const {order, ok} = await getOrderById(id);
    
    if(!ok) {
        return (
            <div className="container mx-auto py-8">
                <h1 className="text-2xl font-bold">Order not found</h1>
            </div>
        )
    }

    // const {orderItems, isConfirmed} = order;

    const productInCart: CartProduct[] = order?.orderItems?.map((orderItem: any) => {
        return {
            idProduct: orderItem.product.id,
            idSizeStock: orderItem.idSizeStock,
            slug: orderItem.product.slug,
            title: orderItem.product.title,
            price: orderItem.price,
            size: orderItem.size,
            quantity: orderItem.quantity,
            image: orderItem.product.images[0].url,
        }
      }) || [];


    return (
        <div className="flex flex-col space-y-8 max-w-7xl mx-auto">

            <div className="mt-4 flex flex-col lg:flex-row gap-8 mx-auto">

                {/* ----- ID y fecha del pedido -------- */}
                <div className="bg-primary-foreground space-y-2 py-4 px-5 rounded-lg w-fit">
                    <h1 className="text-2xl font-bold ">
                        Order ID : <span className="text-yellow-500 bg-yellow-500/5 px-3 rounded-sm w-full">{id}</span>
                    </h1>
                    <p className="text-muted-foreground"><span className="font-semibold">
                        Date of purchase :  </span> {order?.createdAt.toLocaleString()}
                    </p>
                </div>

                {/* ----- Estado del pedido -------- */}
                <div className="bg-primary-foreground space-y-2 py-4 px-5 rounded-lg w-full lg:w-fit">
                    <div className="flex items-center gap-5">

                        <h1 className="text-2xl font-bold">Order Confirmed :</h1>

                        <div className={cn(
                            "flex items-center gap-2 border px-2 py-1 rounded-sm", 
                            order?.isConfirmed 
                                ? "text-green-500 border-green-500/30 bg-green-500/5" 
                                : "text-red-500 border-red-500/30 bg-red-500/5"
                            )}
                        >
                            {/* Switch con opcion para confirmar o cancelar el pedido */}
                            <ConfirmOrder 
                                orderConfirm={order?.isConfirmed ?? false} 
                                orderId={order?.id ?? ""}
                            />

                            <p className="text-xs">{order?.isConfirmed ? "Confirmed" : "Not Confirmed"}</p>
                        </div>
                    </div>

                    <OrderStatus isPaid={order?.isPaid ?? false}/>
                </div>

            </div>

            <div className="flex flex-col md:flex-row gap-8">
          
                {/* ------ Items del pedido -------- */}
                <div className="w-full min-w-[350px]">
                    <ItemsOrderData productInCart={productInCart}/>
                </div>
                
                {/* --------- Resumen del pedido --------- */}
                <div className="text-black w-full h-fit bg-primary-foreground p-2 rounded-sm">
                    <PaymentData
                        firstName={order?.orderAddress?.firstName || ""}
                        lastName={order?.orderAddress?.lastName || ""}
                        address={order?.orderAddress?.address || ""}
                        address2={order?.orderAddress?.address2 || ""}
                        postalCode={order?.orderAddress?.postalCode || ""}
                        phone={order?.orderAddress?.phone || ""}
                        itemsInCart={order!.itemsInOrder}
                        subTotal={order!.subTotal}
                        tax={order!.tax}
                        total={order!.total}
                        city_id={order!.orderAddress!.city_id}
                        province_id={order!.orderAddress!.province_id}
                    />
                </div>

            </div>
           
        </div>
    );
}