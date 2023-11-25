"use client";
import { useState } from "react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import ProductOptions from "@/components/ProductOptions";

type Props = {};

const sizes = ["S", "M", "L", "XL"];
const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00"];

export default function ProductPage({}: Props) {
  const [mainImage, setMainImage] = useState("/products/top_naranja_1.jpg");
  const thumbnails = [
    "/products/top_naranja_2.jpg",
    "/products/brasier-nike_w_white.jpg",
    "/products/brasier-nike-w_black.jpg",
  ];
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

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

        {/* Price */}
        <section className="font-bold text-lg mt-2">
          <span className="text-gray-500 mr-2 line-through">$32.00</span>
          <span className="text-red-600 mr-1">$25.00</span>
          <Tag className="text-red-600 inline" size={20} strokeWidth={3} />
        </section>

        {/* Size & Colors Radio */}
        <section className="mt-4">
          <ProductOptions />
          <section className="size_selector mb-3">
            <h2>Size</h2>
            <section className="d-flex align-items-center">
              <section className="single_size_opt">
                <input type="text" className="size_inp" id="size-1" />
              </section>
              <section className="single_size_opt ms-2">
                <input type="text" className="size_inp" id="size-2" />
              </section>
              <section className="single_size_opt ms-2">
                <input type="text" className="size_inp" id="size-3" />
              </section>
              <section className="single_size_opt ms-2">
                <input type="text" className="size_inp" id="size-4" />
              </section>
            </section>
          </section>
        </section>
        {/* <RadioGroup defaultValue="comfortable">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="default" id="r1" />
            <Label htmlFor="r1">Default</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="comfortable" id="r2" />
            <Label htmlFor="r2">Comfortable</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="compact" id="r3" />
            <Label htmlFor="r3">Compact</Label>
          </div>
        </RadioGroup> */}

        {/* Other Info */}
        <section className="my-3">
          <p className="mb-1">
            <span className="font-bold">Disponibilidad: </span>
            <span className="text-green-500 font-bold">5 en stock</span>
          </p>
          <p className="mb-1">
            <span className="font-bold">Marca: </span>
            <span>Babalu</span>
          </p>
          <p className="mb-1">
            <span className="font-bold">Categoria: </span>
            <span>Ropa Deportiva</span>
          </p>
          <p className="mb-1">
            <span className="font-bold">SKU: </span>
            <span>CH-137</span>
          </p>
        </section>

        {/* Short Description */}
        <section className="font-bold">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
            exercitationem quaerat excepturi labore blanditiis.
          </p>
        </section>
      </section>
    </main>
  );
}
