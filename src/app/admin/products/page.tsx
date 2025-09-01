import { getCategories, getProducts } from "@/actions";

import { productsColumns } from "./table-products/products-columns"
import { ProductsTable } from "./table-products/products-table";


export default async function ProductsPage() {

    const products = await getProducts(); //-todos los productos
    const categories = await getCategories(); //-todas las categorias

    return (
        <div className="mb-8">

            <div className="mb-5 py-2 rounded-md">
                <h1 className="text-3xl font-bold">All Products</h1>
            </div>

            <ProductsTable 
                columns={productsColumns} 
                data={products}
                categories={categories}
            />
            

        </div>
    )
}