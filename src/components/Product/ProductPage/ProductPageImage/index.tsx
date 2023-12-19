import Image from "next/image";
import { Swiper, SwiperSlide, Navigation, Thumbs } from '@/lib/Swiper';

export default function ProductPageImage({ gallery, thumbsSwiper }: any ) {
  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Thumbs]}
        thumbs={{ swiper: thumbsSwiper }}
        navigation
      >
        {gallery?.map((item: any) => (
          <SwiperSlide
            key={`product-gallery-${item.id}`}
            className="flex justify-center items-center"
          >
            <Image
              src={item.src}
              alt={`Product gallery ${item.id}`}
              width={300}
              height={300}
              className="object-contain mx-auto sm:hidden"
            />
            <Image
              src={item.src}
              alt={`Product gallery ${item.id}`}
              width={500}
              height={500}
              className="object-contain mx-auto hidden sm:block"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
