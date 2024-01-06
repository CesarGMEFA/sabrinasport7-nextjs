"use client"
import Image from "next/image";
import { Swiper, SwiperSlide } from '@/lib/Swiper';

export default function CarouselThumbs({ gallery, setThumbsSwiper }: any) {
  return (
    <div className="max-w-md lg:mt-8 mx-auto relative lg:pb-2">
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={20}
        slidesPerView={4}
        watchSlidesProgress={true}
        freeMode={true}
        observer={true}
        observeParents={true}
      >
        {gallery?.map((item: any) => (
          <SwiperSlide
            key={`product-thumb-gallery-${item.id}`}
            className="w-20 h-20 flex items-center justify-center cursor-pointer rounded overflow-hidden border border-border-200 border-opacity-75 hover:opacity-75"
          >
            <Image
              src={item.src}
              alt={`Product thumb gallery ${item.id}`}
              width={80}
              height={80}
              className="object-container mx-auto"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
