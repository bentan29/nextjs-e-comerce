interface CartProduct {
    id: string;
    title: string;
    slug: string;
    image: string;
    price: number;
    sizeQuantity: SizeQuantity[];
}

interface SizeQuantity {
    size: string;
    quantity: number;
}
  
export interface ProductRowItem {
    id: string;
    title: string;
    slug: string;
    image: string;
    price: number;
    size: string;
    quantity: number;
}
  