import { getAllOrders } from "@/actions";
import { AppAreaChart, CardList } from "@/components";
import { ScrollArea } from "@/components/ui/scroll-area";



export default async function Home() {

  const payedOrders: any = await getAllOrders();
  const { orders, totalOrders } = payedOrders;

  //- Tomamos las ordenes pagadas
  // const payedOrders = orders.filter((order: any) => order.isPaid);

  // console.log({orders});
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4 mb-4">
      
      {/* --- Chart lineal --- */}
      <div className='bg-primary-foreground h-fit p-4 rounded-lg shadow-md shadow-black/60 lg:col-span-2 xl:col-span-1 2xl:col-span-2'>
        <AppAreaChart 
          orders={orders} 
          totalOrders={totalOrders}
        />
      </div> 


      {/* --- Ultimas ventas Transacciones --- */}
      {/* <div className='bg-primary-foreground p-4 rounded-lg 2xl:col-span-2'> */}
        <ScrollArea className="h-130 rounded-md bg-primary-foreground p-4 shadow-md shadow-black/60 2xl:col-span-2">
          <CardList 
            title="Today’s Total Sales"
            orders={orders}
          />
        </ScrollArea>
      {/* </div> */}
   


      

      
      

    </div>
  );
}
