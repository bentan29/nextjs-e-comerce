"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { ProductImage } from "@/components";
import Link from "next/link";
import { currencyFormat } from "@/utils/currencyFormat";
import Image from "next/image";

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
        <div className="w-full h-[320px] relative overflow-hidden shadow-lg">

            {/* -- Imagen de fondo -- */}
            <Image
                src="/slider-publicitario/publi4.jpg"
                alt="Fondo publicitario"
                fill
                className="object-cover object-center scale-105"
                priority
            />

            {/* -- Overlay con blur y degradado -- */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-black/50 backdrop-blur-xs " />

            {/* Swiper encima */}
            <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                loop={true}
                className="w-full h-full relative z-20"
            >
                {prod.map((product) => (
                    <SwiperSlide
                        key={product.id}
                        className="flex justify-center items-center px-4"
                    >
                        <Link
                            href={`/product/${product.slug}`}
                            className="flex bg-white/10 backdrop-blur-md border border-white/20 p-4 items-center gap-6 shadow-lg hover:scale-105 transition-transform"
                        >
                            {/* Imagen más chica */}
                            <ProductImage
                                src={product.image}
                                alt={product.title}
                                className="max-h-[220px] max-w-[220px] shadow-md shadow-black/30"
                                width={220}
                                height={220}
                            />

                            {/* Texto y precio */}
                            <div className="flex flex-col gap-3 text-center text-white">
                                <h2 className="font-bold text-start uppercase text-2xl md:text-4xl tracking-wide drop-shadow-lg drop-shadow-black/50">
                                    {product.title}
                                </h2>
                                <p className="font-extrabold text-start text-3xl md:text-6xl p-2 text-yellow-500 px-2 w-fit drop-shadow-lg drop-shadow-black/50">
                                    {currencyFormat(product.price)}
                                </p>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
