import { getOrderById } from "@/actions";
import { ItemsOrderData, OrderStatus, PaymentData, PayPalButton } from "@/components";
import { CartProduct } from "@/interfaces";

interface Props {
    params: Promise<{ id: string }>;
}


export default async function OrderSlugPage({params}: Props) {

    const {id} = await params;
    
    const orderFetch: any = await getOrderById(id);

    
    if(orderFetch.ok === false) {
        return (
            <div className="container mx-auto py-8">
                <h1 className="text-2xl font-bold">Order not found</h1>
            </div>
        )
    }

    const {order} = orderFetch;


    const productInCart: CartProduct[] = order.orderItems.map((orderItem: any) => {
        return {
            idSizeStock: orderItem.idSizeStock,
            slug: orderItem.product.slug,
            title: orderItem.product.title,
            price: orderItem.price,
            size: orderItem.size,
            quantity: orderItem.quantity,
            image: orderItem.product.images[0].url,
        }
    })




    return (
        <div className="container space-y-8 mx-auto py-8 px-2">

            <div className="w-fit mx-auto">
                <h1 className="text-2xl font-bold text-center">
                    Order ID : <span className="text-yellow-500 bg-yellow-500/10 px-2 rounded-sm">{id}</span>
                </h1>
                <hr className="my-2"/>
                <p className="text-end text-muted-foreground"><span className="font-semibold">Date of purchase :  </span> {order.createdAt.toLocaleString()}</p>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

               
                <div className="w-full space-y-4 mx-auto md:mr-0 sm:max-w-sm">
                    {/* Estado del pedido */}
                    <OrderStatus isPaid={order.isPaid ?? false}/>

                    {/* Items del pedido */}
                    <ItemsOrderData productInCart={productInCart}/>
                </div>
                
                {/* Resumen del pedido */}
                <div className="text-black bg-white/80 p-2 rounded-sm mx-auto md:mx-0 w-full sm:max-w-sm">
                        <PaymentData
                            firstName={order.orderAddress.firstName}
                            lastName={order.orderAddress.lastName}
                            address={order.orderAddress.address}
                            address2={order.orderAddress.address2}
                            postalCode={order.orderAddress.postalCode}
                            phone={order.orderAddress.phone}
                            itemsInCart={order.itemsInOrder}
                            subTotal={order.subTotal}
                            tax={order.tax}
                            total={order.total}
                            city_id={order.orderAddress.city_id}
                            province_id={order.orderAddress.province_id}
                        />

                        {/* En el  PayPalButton es donde tenemos el socket*/}
                        <div className="w-full mt-3 p-2 bg-white rounded-sm">
                            {order?.isPaid 
                                ? ( <OrderStatus isPaid={order.isPaid ?? false}/> ) 
                                : ( <PayPalButton
                                        orderId={order.id}
                                        amount={order!.total}
                                    />
                                )
                            }
                          
                        </div>
                </div>
                
            </div>
        </div>
    );
}