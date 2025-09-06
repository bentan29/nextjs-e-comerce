"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Link from "next/link";
import { ProductImage } from "@/components";
import { currencyFormat } from "@/utils/currencyFormat";

interface Props {
  prod: {
    id: string;
    title: string;
    price: number;
    image: string;
    slug: string;
  }[];
}

export const SliderBar2 = ({ prod }: Props) => {
  return (
    <section className="w-full py-14 bg-gradient-to-b from-gray-100 via-white to-gray-100">
      <div className="container mx-auto px-4">
        {/* Encabezado */}
        <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-12 text-center tracking-tight">
          Novedades 🔥
        </h2>

        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop
          spaceBetween={30}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1280: { slidesPerView: 3 },
          }}
        >
          {prod.map((product, index) => (
            <SwiperSlide key={product.id}>
              <Link
                href={`/product/${product.slug}`}
                className={`
                  group relative block rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl
                  transition-all duration-500
                  ${index % 3 === 0 ? "h-[450px]" : "h-[350px]"}
                `}
              >
                {/* Imagen */}
                <ProductImage
                  src={product.image}
                  alt={product.title}
                  width={500}
                  height={500}
                  
                  className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
                />

                {/* Overlay degradado */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                {/* Texto superpuesto */}
                <div className="absolute bottom-6 left-6 text-white z-10">
                  <h3 className="text-2xl md:text-3xl font-extrabold uppercase drop-shadow-md">
                    {product.title}
                  </h3>
                  <p className="text-lg md:text-xl font-bold text-yellow-400 drop-shadow-sm">
                    {currencyFormat(product.price)}
                  </p>
                  <span
                    className="inline-block mt-3 px-4 py-2 bg-yellow-400 text-black rounded-lg 
                    text-sm font-semibold group-hover:bg-yellow-500 transition-colors"
                  >
                    Comprar →
                  </span>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
