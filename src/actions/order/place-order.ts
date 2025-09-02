'use server'

import { auth } from "@/auth";
import type { Address, Size } from "@/interfaces";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

//- Interfaz de los productos que vienen del carrito
interface ProductToOrder {
    idSizeStock: string;
    productId: string;
    quantity: number;
    size: Size;
}


export const placeOrder = async ( productsInOrder: ProductToOrder[], address: Address ) => {
    
    //*- Tomamos la session desde el servidor
    const session = await auth();
    const userId = session?.user?.id;

    if(!userId) {
        return {
            ok: false,
            message: 'Unauthorized'
        }
    }

    //*- Obtenemos la info de solo los productos que vamos a comprar
    const products = await prisma.productSize.findMany({
        where: {
            id: { in: productsInOrder.map(p => p.idSizeStock) }
        },
        include: {
            product: {
                select: {
                    price: true,
                    title: true
                }
            }
        }
    })

    console.log({products});


    //*--- Calculamos cantidad de productos en total que tenemos en la orden.
    const totalProducts = productsInOrder.reduce((count, prod) => count + prod.quantity, 0);


    //*--- Totales de Tax, Subtotal y Total que vamos a pagar.
    const {subTotal, tax, total} = productsInOrder.reduce((totals, item) => {
        //- Buscamos el producto en la base de datos
        const pro = products.find((prod: any) => prod.productId === item.productId);
        if(!pro) throw new Error(`Product not found ${item.productId}`);

        //- Calculamos el subtotal pero con el precio de la base de datos
        const subtotal = pro.product.price * item.quantity;
  
        totals.subTotal += subtotal;
        totals.tax += subtotal * 0.15; //- impuestos %15
        totals.total += subtotal + (subtotal * 0.15); //- total

        return totals;
    }, {subTotal: 0, tax: 0, total: 0})


    //?-----------------------------------------------------------------
    //?--- Creamos la transaccion en la BD -----------------------------
    //- Creamos la transaccion
    try {
        const prismaTx = await prisma.$transaction(async(tx: Prisma.TransactionClient) => {

            //* 1. Actualizamos el stock del producto
            const updatedProductsPromise = products.map(async(product: any) => {
                //- Buscamos el producto en el carrito
                const productInOrder = productsInOrder.find((p: any) => p.idSizeStock === product.id);

                console.log({productInOrder});
                
                if(!productInOrder) throw new Error(`Product not found ${product.id}`);
                if(productInOrder.quantity === 0) throw new Error(`Product ${product.product.title} is out of stock`);
                
                //- Actualizamos el stock del producto que estamos iterando
                return tx.productSize.update({
                    where: { id: product.id },
                    data: {
                        stock: {
                            //?- decrement hace que reste directamente a la base de datos el valor que le pasamos
                            decrement: productInOrder.quantity
                        }
                    },
                    include: {
                        product: {
                            select: {
                                title: true
                            }
                        }
                    }
                })
            });

            //* Tomamos todos los productos actualizados
            const updatedProducts = await Promise.all(updatedProductsPromise);
            //- Verificamos que no hallan valores negativos ej:-1 = no hay stock
             updatedProducts.forEach(product => {
                if(product.stock < 0) throw new Error(`Product ${product.product.title}, (size:${product.size}) is out of stock`);
            })

            
            //? 2. Creamos la Orden - OrderItems - Encabezado - Detalles
            const order = await tx.order.create({
                data: {
                    userId,
                    subTotal,
                    tax, //- impuestos
                    total,
                    itemsInOrder: totalProducts, //- cantidad de productos
                    //? 2.1 OrderItems
                    orderItems: {
                        createMany: {
                            data: productsInOrder.map( p =>({
                                quantity: p.quantity,
                                size: p.size,
                                productId: p.productId,
                                // price: products.find(prod => prod.id === p.productId)?.product.price ?? 0
                                price: products.find((prod: any) => prod.productId === p.productId)?.product.price ?? 0

                            })) 
                        }
                    },
                }
            })

            //? 3. Crear la direccion de la orden
            const orderAddress = await tx.orderAddress.create({
                data: {
                  orderId: order.id,
                  firstName: address.firstName || "", // <-- no puede ser undefined/null
                  lastName: address.lastName || "",
                  address: address.address || "",
                  address2: address.address2 || "", // si en Prisma es obligatorio
                  postalCode: address.postalCode || "",
                  phone: address.phone || "",
                  province_id: address.province_id || "",
                  city_id: address.city_id || "",
                },
              });

            return {
                updatedProducts, //- Valor nuevo de los Productos ya actualizados
                order, //- Orden creada
                orderAddress //- Direccion de la orden
            }
        });

        return {
            ok: true,
            order: prismaTx.order,
            updatedProducts: prismaTx.updatedProducts,
            prismaTx,
            // orderAddress: prismaTx.orderAddress,
            message: 'Order created successfully',
        }

    } catch (error: any) {
        return {
            ok: false,
            message: error?.message
        }
    }
}