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
      <section className="w-[269px]">
        <section className="bg-white">
          <Image
            src={"/products/brasier-nike-w_black.jpg"}
            alt="Main"
            className="bg-white"
            width={269}
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

      {/* Info Section */}
      <section className="w-full mt-8">

        {/* Title */}
        <h1 className="text-2xl font-bold">
          Top Naranja para dama talla S, M y L
        </h1>

        {/* Other Info */}
        <section className="mt-5 mb-3">
          <p className="text-lg mb-1">
            <span className="font-bold">Disponibilidad: </span>
            <span className="text-green-500 font-bold">5 en stock</span>
          </p>
          <p className="text-lg mb-1">
            <span className="font-bold">Marca: </span>
            <span>Babalu</span>
          </p>
          <p className="text-lg mb-1">
            <span className="font-bold">Categoria: </span>
            <span>Ropa Deportiva</span>
          </p>
          <p className="text-lg mb-1">
            <span className="font-bold">SKU: </span>
            <span>CH-137</span>
          </p>
        </section>

        {/* Price */}
        <section className="font-bold text-lg mb-3">
          <span className="text-gray-500 mr-2">$32.00</span>
          <span className="text-red-600 mr-2">$25.00</span>
          <span className="text-red-600">OFERTA</span>
        </section>

        {/* Short Description */}
        <section className="text-lg font-bold">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim exercitationem quaerat excepturi labore blanditiis.</p>
        </section>
      </section>
    </main>
  );
}
