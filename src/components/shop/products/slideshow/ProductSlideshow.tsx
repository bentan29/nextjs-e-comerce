'use client'

import { useState } from "react";
import { Swiper as SwiperObject} from "swiper";
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react"
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './slideshow.css';
import { ProductImage } from "@/components";

interface Props {
    images: string[],
    title: string,
    className?: string
}

export const ProductSlideshow = ({images, title, className} : Props) => {

    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();

    return (
        <div className={className}>

            <Swiper
            spaceBetween={10}
            navigation={true}
            autoplay={{
                delay: 3500
            }}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs, Autoplay]}
            className="mySwiper2"
            >
                {
                    images.map(image => (
                        <SwiperSlide key={image}>
                            <ProductImage
                                width={1024}
                                height={1024}
                                src={image}
                                alt={title}
                                className="object-fill"
                            />
                        </SwiperSlide>
                    ))
                }
            </Swiper>

            <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper"
            >
                {
                    images.map(image => (
                        <SwiperSlide key={image}>
                            <ProductImage
                                width={300}
                                height={300}
                                src={image}
                                alt={title}
                                className="object-fill"
                            />
                        </SwiperSlide>
                    ))
                }
            </Swiper>

        </div>
    )
}
