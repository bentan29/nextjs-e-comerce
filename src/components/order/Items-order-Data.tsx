import { CartProduct } from "@/interfaces";
import { Card } from "../ui/card"
import Image from "next/image";
import { Badge } from "../ui/badge";
import { currencyFormat } from "@/utils/currencyFormat";
import { ProductImage } from "../product/product-image/ProductImage";

interface Props {
    productInCart: CartProduct[];
}

export const ItemsOrderData = ({ productInCart }: Props) => {
    return (
        <div className="flex flex-col gap-2">
            { productInCart.map( (product) => (
                <Card 
                    key={`${product.slug}-${product.size}`} 
                    className="flex w-full flex-row gap-2 p-1 rounded-lg shadow-sm bg-background"
                >
                    {/* -- Imagen -- */}
                    <ProductImage
                        src={product.image}
                        alt={product.title}
                        width={130}
                        height={100}
                        className="h-35 w-35"
                    />
        
                    {/* -- Contenido -- */}
                    <div className="flex flex-col w-full justify-between bg-blue-200/10">
        
                        <div className="p-2 gap-0.5">
                            {/* -- Titulo -- */}
                            <p>{product.title}</p>
                            
                            {/* -- Talla -- */}
                            <div className="flex items-center gap-1">
                                <p className="text-muted-foreground font-semibold">Size:</p>
                                <Badge variant="secondary">{product.size}</Badge>
                            </div>
            
                            {/* -- Cantidad y Precio -- */}
                            <div className="flex items-center gap-1">
                                <p className="text-muted-foreground font-semibold">Qty:</p>
                                <p>{product.quantity}</p>
                                <p className="text-muted-foreground font-semibold">(x)</p>
                                <p className="text-muted-foreground font-semibold">Price:</p>
                                <p>{currencyFormat(product.price)}</p>
                            </div>
                        </div>
            
            
                        {/* Subtotal */}
                        <p className='bg-yellow-600 flex p-1 gap-1'>
                            <span className="text-background font-semibold">Subtotal:</span> 
                            <span className="text-background/80 font-bold">{currencyFormat(product.price * product.quantity)}</span>
                        </p>
        
                    </div> 
                </Card>
            ))}
        </div>
    )
}
