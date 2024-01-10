"use client";
import { useEffect, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "@/components/Product/ProductCard";
import SkeletonCarousel from "@/components/ui/SkeletonCarousel";

import { getRelatedProducts } from "@/lib/api/products/getRelatedProducts";
import { Product } from "@/lib/interfaces/Product.interface";

type Props = {
  product: Product;
};

export default function CarouselProductsRelated({ product }: Props) {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function getRelatedProductsAsync() {
      const relatedProducts = await getRelatedProducts(product);
      setRelatedProducts(relatedProducts);
    }
    getRelatedProductsAsync();
  }, [product]);

  if (relatedProducts == null) {
    return <SkeletonCarousel />;
  }

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-[85%] lg:w-full mx-auto"
    >
      <CarouselContent>
        {relatedProducts.map((p, index) => (
          <CarouselItem
            key={index}
            className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
          >
            <div className="p-1">
              <ProductCard data={p} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}