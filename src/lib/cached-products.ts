import { getProductBySlug } from "@/actions";
import { cache } from "react";

export const getCachedProductsBySlug = cache(async(slug: string) => {
    const product = await getProductBySlug(slug);
    return product;
})
    
