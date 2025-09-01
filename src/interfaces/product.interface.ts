
export interface Product{
  id: string;
  title: string;
  description: string;
  price: number;
  slug: string;
  tags: string[];
  gender: "men" | "women" | "kid" | "unisex";
  // categoryId: string;
  images?: string[]
  category: Category;
  sizesStock: SizeStock[];
}

export interface Category {
  id: string;
  name: string;
}

export interface SizeStock {
  id?: string ;
  stock: number;
  size: Size;
  // productId?: string | null;
}

export interface ProductImage {
  id: number;
  url: string;
  productId: string;
}


export type Gender = 'men'|'women'|'kid'|'unisex'
export type Size = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL'|'XXXXL';
export type Type = 'shirts'|'pants'|'hoodies'|'hats';