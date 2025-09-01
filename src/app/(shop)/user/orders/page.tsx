import { getOrdersPaginationByUser } from "@/actions";
import { ListOrders } from "./components/ListOrders";
import { PaginationShop } from "@/components";
import { auth } from "@/auth";
import { Suspense } from "react";

type OrdersPageProps = {
    searchParams: Promise<{page: string}>
}

export default async function OrdersPage({searchParams}: OrdersPageProps) {

    const pageParam = Number((await searchParams)?.page);
    const currentPage = !isNaN(pageParam) && pageParam > 0 ? pageParam : 1;
    
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
        return (
            <div className="container mx-auto py-8">
                <p className="text-center text-red-500 font-medium">
                    Must be authenticated
                </p>
            </div>
        );
    }

    const { orders = [], totalPages = 0 } = await getOrdersPaginationByUser({page: currentPage, userId});


    return (
        <div className="container mx-auto py-8">
            {orders.length === 0 && <p className="text-center">No hay ordenes</p>}

            <div className="container mt-4 mx-auto flex flex-col gap-4 pt-2 pb-8">

                <ListOrders orders={orders}/>
                
                {/* 👇 Suspense para PaginationShop */}
                <Suspense fallback={<div>Cargando paginación...</div>}>
                    <PaginationShop totalPages={totalPages} currentPage={currentPage} />
                </Suspense>
                
            </div>

        </div>
    );
}