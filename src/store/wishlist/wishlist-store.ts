import { persist } from 'zustand/middleware';
import { create } from "zustand";
import { FavoriteProduct } from '@/interfaces';

interface State {
    wishlist: FavoriteProduct[];
    addDeleteFavourite: (product: FavoriteProduct) => void;
    removeFavoriteProduct: (product: FavoriteProduct) => void;
    addFavoriteProduct: (product: FavoriteProduct) => void;
    wishlistCount: () => number;
}

export const useWishlistStore = create<State>()(

    persist(
        (set, get) => ({
            wishlist: [],

            addDeleteFavourite(product: FavoriteProduct) {
                const {wishlist} = get(); //- Obtenemos toda la lista
                //- Revisamos si el producto ya esta en la lista
                const productInWishlist = wishlist.some(
                    (item) => (item.id === product.id)
                );
                //- Si el producto No esta en la lista
                if(!productInWishlist) {
                    set({wishlist: [...wishlist, product]});
                    return;
                }
                //- Si el producto esta en la lista lo eliminamos
                const updatedWishlist = wishlist.filter(
                    (item) => item.id !== product.id
                )
                set({wishlist: updatedWishlist});
            },
            
            removeFavoriteProduct(product: FavoriteProduct) {
                const {wishlist} = get();
                const updatedWishlist = wishlist.filter(
                    (item) => item.id !== product.id
                )
                set({wishlist: updatedWishlist});
            },
            
            addFavoriteProduct(product: FavoriteProduct) {
                const {wishlist} = get(); //- Obtenemos toda la lista
                const productInWishlist = wishlist.some(//- Revisamos si el producto ya esta en la lista
                    (item) => (item.id === product.id)
                );
                if(!productInWishlist) { //- Si el producto No esta en la lista
                    set({wishlist: [...wishlist, product]});
                    return;
                }
            },
            
            wishlistCount() {
                const {wishlist} = get();
                return wishlist.length;
            }
        }),
        {
            name: "wishlist",
        }
    )

)