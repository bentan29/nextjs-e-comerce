import { getAllOrders } from "@/actions";
import { ordersColumns, OrdersTable } from "../components";

export default async function OrdersPage() {

    const allOrders: any = await getAllOrders();
    const {orders} = allOrders;

    if(!orders) {
        return (
            <div className="container mx-auto py-8">
                <h1 className="text-2xl font-bold">Order not found</h1>
            </div>
        )
    }
    

    const orderTableData = orders.map((order: any) => {
        return {
            id: order.id,
            user: order.user.name,
            createdAt: order.createdAt,
            isPaid: order.isPaid,
            total: order.total,
            itemsInOrder: order.itemsInOrder,
        }
    })

    return (
        <div className="mb-8">
    
            <div className="mb-5 py-2 rounded-md">
                <h1 className="text-3xl font-bold">All Orders</h1>
            </div>
    
            <OrdersTable 
                columns={ordersColumns} 
                data={orderTableData}
            />
            
    
        </div>
    )
}