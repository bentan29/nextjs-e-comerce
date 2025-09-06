"use client";

import { useState } from "react";
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

export const SliderBar3 = ({ prod }: Props) => {
  return (
    <section className="w-full py-16 relative bg-gradient-to-b from-gray-900 via-black to-gray-900 overflow-hidden">
      {/* Luces de neón en el fondo */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-600/40 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-cyan-500/40 rounded-full blur-3xl animate-pulse" />

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-center text-4xl md:text-6xl font-extrabold mb-14 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent tracking-wider uppercase">
          🚀 Productos Destacados
        </h2>

        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          loop
          spaceBetween={30}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1280: { slidesPerView: 3 },
          }}
        >
          {prod.map((product) => (
            <SwiperSlide key={product.id}>
              <Link
                href={`/product/${product.slug}`}
                className="group relative block rounded-3xl overflow-hidden
                  bg-white/10 backdrop-blur-md border border-white/20 shadow-lg
                  hover:shadow-[0_0_25px_rgba(168,85,247,0.8)] transition-all duration-500"
              >
                {/* Imagen con preload */}
                <ImageWithPreload
                  src={product.image}
                  alt={product.title}
                />

                {/* Contenido flotante */}
                <div className="absolute inset-0 flex flex-col justify-center p-4">
                  <div className="bg-gradient-to-t from-transparent via-black/40 to-transparent p-4">
                    <h3 className="text-xl md:text-2xl font-extrabold text-white uppercase tracking-wide">
                      {product.title}
                    </h3>
                    <p className="text-lg md:text-xl font-bold text-cyan-400 drop-shadow-sm">
                      {currencyFormat(product.price)}
                    </p>
                    <span
                      className="inline-block mt-3 px-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 
                      text-black font-bold rounded-lg text-sm shadow-md group-hover:scale-105 transition-transform"
                    >
                      Ver 🚀
                    </span>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

/* 🔥 Componente con skeleton shimmer */
const ImageWithPreload = ({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full h-72">
      {!loaded && (
        <div className="absolute inset-0 bg-gray-700 animate-pulse rounded-2xl">
          <div className="h-full w-full bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 animate-[shimmer_1.5s_infinite]" />
        </div>
      )}
      <ProductImage
        src={src}
        alt={alt}
        className={`object-cover object-center w-full h-72 rounded-2xl transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        width={400}
        height={300}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};
