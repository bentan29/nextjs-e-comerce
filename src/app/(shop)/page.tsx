import { getPaginatedProducts } from "@/services";
import { PaginationShop, ProductGrid, ProductNotFound, SliderApp, SortProducts } from "@/components";
import { Suspense } from "react";

    // interface Props {
    //     searchParams: {
    //         page?: string
    //         sort?: string
    //         search?: string
    //     }
    // }

    
    export default async function ShopPage({searchParams} : {searchParams: Promise<Record<string, string | string[] | undefined>>}) {

    const { page, sort, search } = await searchParams;
   
    // ✅ convertimos "page" a número seguro
    const pageParam = Number((await searchParams)?.page);
    const currentPage = !isNaN(pageParam) && pageParam > 0 ? pageParam : 1;

    const { products, totalPages } = await getPaginatedProducts({
        page: currentPage,
        sort: typeof sort === "string" ? sort : undefined,
        search: typeof search === "string" ? search : undefined,
    });

    //- Si no hay productos redirigimos a la pagina de inicio.
    if (products.length === 0) {
        return (
          <ProductNotFound/>
        );
    }

    return (

        <div>

            {/* Slider publicitario con imagenes random de la base de datos */}
            <SliderApp/>
            
            <div className="container mt-4 mx-auto flex flex-col gap-4 pt-2 pb-8 px-2 lg:px-auto">
                {/* Sort options */}
                <Suspense fallback={<p>Loading...</p>}>
                    <SortProducts currentSort={typeof sort === 'string' ? sort : ''}/>
                </Suspense>
                
                {/* Grid de productos */}
                <ProductGrid products={products}/>
                    
                {/* 👇 Suspense para PaginationShop */}
                <Suspense fallback={<div>Cargando paginación...</div>}>
                    <PaginationShop totalPages={totalPages} currentPage={currentPage} />
                </Suspense>
            </div>
        </div>
    );
}