
import { Gender, Product, ProductImage } from "@/interfaces";
import prisma from "@/lib/prisma"

interface PaginationOptions {
  page?: number,
  take?: number,
  gender?: Gender,
  category?: string,
  sort?: string,
  search?: string 
}

export const getPaginatedProducts = async ({
  page = 1,
  take = 12,
  gender,
  category,
  sort,
  search
}: PaginationOptions) => {

  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  try {
    // filtros base
    const filters: any = {
      ...(gender && { gender }),
      ...(category && {
        category: {
          name: category,
        },
      }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: "insensitive" } },       // busca en nombre
          { description: { contains: search, mode: "insensitive" } } // busca en descripción
        ]
      })
    };

    let orderBy = {}

    switch (sort) {
      case "price-asc":
        orderBy = { price: "asc" };
        break;
      case "price-desc":
        orderBy = { price: "desc" };
        break;
      case "newest-first":
        orderBy = { createdAt: "desc" };
        break;
      case "oldest-first":
        orderBy = { createdAt: "asc" };
        break;
    }

    const products = await prisma.product.findMany({
      take,
      skip: (page - 1) * take,
      orderBy,
      include: {
        images: {
          take: 2,
          select: { url: true },
        },
        category: true,
        sizesStock: {
          select: {
            size: true,
            stock: true,
          },
        },
      },
      where: filters,
    });

    const totalCountProducts = await prisma.product.count({
      where: filters,
    });

    const totalPages = Math.ceil(totalCountProducts / take);

    return {
      currentPage: page,
      totalPages,
      products: products.map((product : Product) => ({
        ...product,
        images: product.images.map((img : ProductImage) => img.url),
      })),
    };
  } catch (error) {
    console.error(error);
    throw new Error("No se cargaron los productos");
  }
};
