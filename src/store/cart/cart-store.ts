import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
    cart: CartProduct[];
    getTotalItems: () => number;
    addProductToCart: (product: CartProduct) => void;
    getSummaryInformation: () => {
        subTotal: number;
        tax: number;
        total: number;
        itemsInCart: number;
    };
    getQuantityByProductAndSize: (productId: string, size: string) => number;
    removeProductFromCart: (productId: string, size: string) => void; //- borramos el producto seleccionado
    cleanCart: () => void; //- borramos todo
}

export const useCartStore = create<State>()(

    persist(
        (set, get) => ({

            cart: [],

            getTotalItems: () => {
                const {cart} = get();
                return cart.reduce((total, item) => total + item.quantity, 0)
            },

            addProductToCart(product: CartProduct) {
                const {cart} = get();
                //1. Revisamos si el producto ya esta en el carrito con el mismo talle, si no es el mismo talle da negativo
                const productInCart = cart.some(
                    (item) => item.idProduct === product.idProduct && item.size === product.size
                );
                //2. Si no existe insertamos el nuevo producto
                if(!productInCart) {
                    set({cart: [...cart, product]}); //- Insertamos el nuevo producto
                    return;
                }
                //3. Si existe le pasamos el nuevo valor, al producto del mismo talle!
                const updatedCartProducts = cart.map(item => {
                    if(item.idProduct === product.idProduct && item.size === product.size) {
                        return {
                            ...item, //- Desglosamos el producto actual del carrito
                            quantity: item.quantity + product.quantity //- Sumamos la cantidad
                            // sizeQuantity: item.sizeQuantity.map(size => { //- Editamos el sizeQuantity del producto actual
                            //     if(size.size === product.sizeQuantity[0].size) {
                            //         return {
                            //             ...size,
                            //             quantity: size.quantity + product.sizeQuantity[0].quantity //- Sumamos la cantidad
                            //         }
                            //     }
                            //     return size;
                            // })
                        }
                    }
                    return item;
                })
                //4. Actualizamos el carrito
                set({cart: updatedCartProducts})
            },

            getSummaryInformation() {
                const {cart} = get();
                const subTotal = cart.reduce(
                    (subtotal, product) => (product.quantity * product.price) + subtotal, 0
                );
                const tax = subTotal * 0.15; //- %15 de impuestos
                const total = subTotal + tax;
                const itemsInCart = cart.reduce((total, item) => total + item.quantity, 0)
                
                return {
                    subTotal, tax, total, itemsInCart
                }
            },

            getQuantityByProductAndSize(productId: string, size: string) {
                const { cart } = get();
                const product = cart.find((item) => item.idProduct === productId);
                if (!product) return 0;
              
                const sizeEntry = product.quantity;
                return sizeEntry ? sizeEntry : 0; //- Retorna la cantidad de productos por talle o cero si no existe
            },
              
            removeProductFromCart(productId: string, size: string) {
                const { cart } = get();
              
                const updatedCart = cart.filter(
                  (item) => !(item.idProduct === productId && item.size === size)
                );
              
                set({ cart: updatedCart });
            },
              

            cleanCart() {
                set({cart: []})
            }

        }),
        {
            name: "shopping-cart",
        }
    )
    
)
