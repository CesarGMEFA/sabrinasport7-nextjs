"use client";
import { useState } from "react";
import Image from "next/image";

type Props = {};

export default function ProductPage({}: Props) {
  const [mainImage, setMainImage] = useState("/products/top_naranja_1.jpg");
  const thumbnails = [
    "/products/top_naranja_2.jpg",
    "/products/brasier-nike_w_white.jpg",
    "/products/brasier-nike-w_black.jpg",
  ];

  return (
    <main className="p-4 flex flex-col items-center">
      {/* Image Gallery */}
      <section>
        <section className="bg-wjote">
          <Image
            src={mainImage}
            alt="Main"
            className="bg-white"
            width={240}
            height={270}
          />
        </section>

        <div className="flex mt-4">
          {thumbnails.map((thumbnail, index) => (
            <Image
              key={index}
              src={thumbnail}
              alt={`Thumbnail ${index + 1}`}
              className="bg-white mx-2"
              width={62}
              height={74}
              onClick={() => setMainImage(thumbnail)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
