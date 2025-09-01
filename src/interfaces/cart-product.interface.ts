import { Size } from "./product.interface";

export interface SizeQuantity {
    size:     string;
    quantity: number;
}

export interface CartProduct {
    idProduct:      string;
    idSizeStock:    string;
    slug:           string;
    title:          string;
    price:          number;
    size:           Size;
    quantity:       number;
    image:          string;
}