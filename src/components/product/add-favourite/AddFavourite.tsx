import { Button } from "@/components/ui/button"
import { FavoriteProduct, Product } from "@/interfaces";
import { cn } from "@/lib/utils";
import { useWishlistStore } from "@/store";
import { Heart } from "lucide-react"

interface Props {
    product: Product;
    className?: string; // 👈 clase opcional externa
}


export const AddFavourite = ({product, className}: Props) => {

    const {addDeleteFavourite, wishlist} = useWishlistStore();

    const handleFavourite = () => {
        const favouriteProduct: FavoriteProduct = {
            id: product.id,
            slug: product.slug,
            title: product.title,
            price: product.price,
            image: product.images![0]
        }
        addDeleteFavourite(favouriteProduct);
    }

    return (
        <Button
            onClick={handleFavourite}
            className={cn(
                `${className} text-white cursor-pointer rounded-md bg-black/80 size-8 hover:bg-red-600`,
                wishlist.some((item) => item.id === product.id) && "bg-red-700",

            )}
            size="sm"
        >
            <Heart strokeWidth={3}/>
        </Button>

    )
}
