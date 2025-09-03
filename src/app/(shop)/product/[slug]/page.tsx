import { AddToCart2, ProductMobileSlideshow, ProductSlideshow } from "@/components";
import { Separator } from "@/components/ui/separator";
import { getCachedProductsBySlug } from "@/lib/cached-products";
import { currencyFormat } from "@/utils/currencyFormat";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = 3600; // cada 1 hora

// interface Props {
//   params: { slug: string };
// }

interface Props {
    params: Promise<{ slug: string }>; // Cambiar a Promise para compatibilidad con Next.js 15
}


export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const product = await getCachedProductsBySlug(slug);

  return {
    title: product?.title,
    description: product?.description,
    openGraph: {
      title: product?.title,
      description: product?.description,
      images: [`/products/${product?.images[1]}`]
    }
  };
}


export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getCachedProductsBySlug(slug);

  if (!product) notFound();

  return (
    <div className="container md:max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 py-10">
        <div>
          {/* Mobile Slideshow */}
          <ProductMobileSlideshow
            images={product.images.map((image) => image.url)}
            title={product.title}
            className="block md:hidden"
          />

          {/* Desktop Slideshow */}
          <ProductSlideshow
            title={product.title}
            images={product.images.map((image) => image.url)}
            className="hidden md:block"
          />
        </div>

        <div className="px-2">
          <h1 className="font-bold text-4xl">{product.title}</h1>

          {/* Género y categoría */}
          <div className="flex items-center gap-2 text-sm h-4 my-3">
            <p>{product.gender.toUpperCase()}</p>
            <Separator orientation="vertical" />
            <p>{product.category.name.toUpperCase()}</p>
          </div>

          {/* Descripción */}
          <p className="text-sm text-muted-foreground">{product.description}</p>

          {/* Precio */}
          <div className="mt-5">
            <p className="font-bold text-5xl">{currencyFormat(product.price)}</p>
          </div>

          {/* Agregar al carrito */}
          <AddToCart2 product={product} />
        </div>
      </div>
    </div>
  );
}
