"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { ProductImage } from "@/components";
import Link from "next/link";
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

export const SliderBar = ({ prod }: Props) => {
  return (
    <section className="w-full py-12 bg-white">
      <div className="container mx-auto px-4 ">
        {/* Título */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-10">
          Productos destacados
        </h2>

        {/* Slider */}
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          loop
          spaceBetween={24}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {prod.map((product) => (
            <SwiperSlide key={product.id}>
              <Link
                href={`/product/${product.slug}`}
                className="group block bg-white rounded-2xl shadow-md hover:shadow-xl 
                transition-all duration-300 overflow-hidden"
              >
                {/* Imagen */}
                <div className="w-full h-64 flex items-center justify-center bg-gray-50">
                  <ProductImage
                    src={product.image}
                    alt={product.title}
                    width={260}
                    height={260}
                    className="object-contain max-h-[220px] transition-transform 
                    duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Info */}
                <div className="p-5 text-center">
                  <h3 className="text-lg font-medium text-gray-800 truncate">
                    {product.title}
                  </h3>
                  <p className="text-xl font-semibold text-indigo-600 mt-2">
                    {currencyFormat(product.price)}
                  </p>
                  <button
                    className="mt-4 px-5 py-2 bg-indigo-600 text-white rounded-lg 
                    font-medium hover:bg-indigo-700 transition-colors"
                  >
                    Ver producto
                  </button>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
