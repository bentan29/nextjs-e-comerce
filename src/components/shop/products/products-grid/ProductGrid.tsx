
import { Product } from "@/interfaces";
import { ProductCard } from "../product-card/ProductCard";

interface Props {
    products: Product[];
}

export const ProductGrid = ({products}: Props) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mb-10">
            {
                products.map(product => (
                    <ProductCard 
                        key={product.id} 
                        product={product}
                    />
                ))
            }
        </div>
    )
}
