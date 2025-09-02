'use server'


import { auth } from "@/auth"
import prisma from "../../lib/prisma"
import { v2 as cloudinary } from "cloudinary"
import { revalidatePath } from "next/cache"

cloudinary.config(process.env.CLOUDINARY_URL ?? '')

export const deleteProduct = async (productId: string) => {

    const session = await auth();
    if (session?.user.role !== "admin") throw new Error("Unauthorized");

    try {
        // 1. Traer todas las imágenes del producto
        const productImages = await prisma.productImage.findMany({
            where: {
                productId
            }
        })

        // 2. Borrar todas las imágenes de Cloudinary
        for (const image of productImages) {
            if (image.url.startsWith("http")) {
                const imageName = image.url.split("/").pop()?.split(".")[0] ?? ""
                await cloudinary.uploader.destroy(imageName)
            }
        }

        // 3. Borrar las imágenes en la base de datos
        await prisma.productImage.deleteMany({
            where: { productId },
        })

        // 4. Borrar talles/stock en DB
        await prisma.productSize.deleteMany({
            where: { productId },
        })

        // 5. Borrar el producto en sí
        const deletedProduct = await prisma.product.delete({
            where: { id: productId },
        })

        if(!deletedProduct) return {
            ok: false,
            message: 'Product not found'
        }

        // 6. Revalidar paths
        revalidatePath("/products")
        revalidatePath(`/product/${deletedProduct.slug}`)

        return {
            ok: true,
            message: 'Product deleted successfully'
        }

        
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: "Error to delete product"
        }
    }
}




export const deleteManyProducts = async (productIds: string[]) => {
    try {

        for (const productId of productIds) {
            // 1. Traer imágenes del producto
            const productImages = await prisma.productImage.findMany({
                where: { productId }
            })

            // 2. Borrar imágenes de Cloudinary
            for (const image of productImages) {
                if (image.url.startsWith("http")) {
                    const imageName = image.url.split("/").pop()?.split(".")[0] ?? ""
                    await cloudinary.uploader.destroy(imageName)
                }
            }

            // 3. Borrar imágenes en DB
            await prisma.productImage.deleteMany({
                where: { productId }
            })

            // 4. Borrar talles/stock en DB
            await prisma.productSize.deleteMany({
                where: { productId },
            })

            // 5. Borrar el producto
            await prisma.product.delete({
                where: { id: productId }
            })
        }

        // 5. Revalidar paths una sola vez al final
        revalidatePath("/products")

        return {
            ok: true,
            message: "Products deleted successfully"
        }

    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: "Error deleting products"
        }
    }
}