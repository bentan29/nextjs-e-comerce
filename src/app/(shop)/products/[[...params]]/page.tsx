export const revalidate = 5;
export const dynamic = 'force-dynamic';


import { PaginationShop, ProductGrid, ProductNotFound, SortProducts } from "@/components";
import { Gender } from "@/interfaces";
import { getPaginatedProducts } from "@/services";
import { redirect } from "next/navigation";
import { Suspense } from "react";

interface Props {
  params: Promise<{ gender?: string; category?: string }>;
  searchParams: Promise<{ page?: string; sort?: string; search?: string }>;
}

export default async function Home({searchParams, params}: Props) {

  const { gender, category } = await params;
  const {page, sort, search} = await searchParams;

  const pageParam = Number((await searchParams)?.page);
  const currentPage = !isNaN(pageParam) && pageParam > 0 ? pageParam : 1;

  //-Validación de género si viene
  const allowedGenders = ["men" , "women" , "kid" , "unisex"];
  if (gender && !allowedGenders.includes(gender)) {
    redirect("/"); // o not-found()
  }
  const { products, totalPages } = await getPaginatedProducts({
    page: currentPage,
    gender: gender as Gender,
    category: category as string || undefined,
    sort: sort as string || undefined,
    search: search as string || undefined
  });

  //- Si no hay productos redirigimos a la pagina de inicio.
      if (products.length === 0) {
          return (
            <ProductNotFound/>
          );
      }


  return (
    <div className="container mx-auto flex flex-col gap-4 py-4 px-2">

      {/* Sort options */}
      <Suspense fallback={<p>Loading...</p>}>
        <SortProducts currentSort={typeof sort === 'string' ? sort : ''}/>
      </Suspense>

      {/* Grid de productos */}
      <ProductGrid 
        products={products}
      />

      {/* 👇 Suspense para PaginationShop */}
      <Suspense fallback={<div>Cargando paginación...</div>}>
        <PaginationShop totalPages={totalPages} currentPage={currentPage} />
      </Suspense>

    </div>
  );
}
