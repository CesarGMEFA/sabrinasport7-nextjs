"use client";
import { useState } from "react";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { v4 as uuid } from "uuid";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import ReactHtmlParser from "react-html-parser";

import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

import { colorMap } from "@/lib/colorMap";
import { Product } from "@/lib/interfaces/Product.interface";
import { CartStore } from "@/lib/interfaces/CartStore.interface";
import { useCartStore } from "@/lib/store/cart";

import ProductPageImage from "./ProductPageImage";
import CarouselThumbs from "./CarouselThumbs";
import CarouselProductsRelated from "./CarouselProductsRelated";

type Props = {
  product: Product;
  variations: Product[];
};

export default function ProductPageComponent({ product, variations }: Props) {
  const [amount, setAmount] = useState(1);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const { add } = useCartStore() as CartStore;

  let message = `Hola sabrinasport7, me interesa saber más acerca de:\n`;
  message += `- ${product.name}\n`;
  message += `- Precio: ${product.price}\n`;
  message += `- URL: ${product.permalink}\n`;
  message += `- SKU: ${product.sku}\n`;

  // for (const [taxonomy, selected_term] of Object.entries(selected_attributes)) {
  //   message += `- ${taxonomy}: ${selected_term}\n`;
  // }

  const url_encoded_message = encodeURIComponent(message);
  const whatsapp_url = `https://wa.me/573053503583?text=${url_encoded_message}`;

  // const formSchema = z.object({
  //   color: z.string().optional().refine(value => value !== '', {
  //     message: "Es obligatorio seleccionar un color para guardar el producto.",
  //   }),
  //   size: z.string().optional().refine(value => value !== '', {
  //     message: "Es obligatorio seleccionar un tamaño para guardar el producto.",
  //   }),
  // });
  const formSchema = z.object({
    color: z.string().optional(),
    size: z.string().optional(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: any) => {
    data.id = product.id;
    data.name = product.name;
    data.imgSrc = product.images[0].src;
    data.item_price = Number(product.price);
    data.link = product.permalink;
    data.amount = amount;
    add(data);
    setAmount(1);
  };

  const attributeColor = product.attributes.find(
    (attribute) => attribute.name === "Color"
  );

  const attributeSize = product.attributes.find(
    (attribute) => attribute.name === "Talla"
  );

  return (
    <section className="max-w-7xl mx-auto p-8">
      <section className="chequear mb-9 flex flex-col lg:justify-between lg:flex-row lg:gap-16 lg:items-center">
        {/* Image Gallery */}
        <div className="flex flex-col gap-4 lg:w-2/4">
          <ProductPageImage
            gallery={product.images}
            thumbsSwiper={thumbsSwiper}
          />
          <CarouselThumbs
            gallery={product.images}
            setThumbsSwiper={setThumbsSwiper}
          />
        </div>

        {/* Product Info */}
        <section className="mt-6 flex flex-col lg:self-start gap-2 lg:w-2/4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">{product.name}</h1>
          </div>
          <div className="text-gray-700">
            {ReactHtmlParser(product.short_description)}
          </div>
          <div className="my-2 text-3xl font-semibold">
            {product.variations[0] && (
              <>
                {variations[0].on_sale ? (
                  <div className="flex items-center">
                    <p className="line-through text-gray-600 mr-1">
                      ${variations[0].regular_price}
                    </p>
                    <p className="text-red-600 font-bold">
                      ${variations[0].sale_price}
                    </p>
                  </div>
                ) : (
                  <span>${variations[0].regular_price}</span>
                )}
              </>
            )}
            {!product.variations[0] && (
              <>
                {product.on_sale ? (
                  <div className="flex items-center">
                    <p className="line-through text-gray-600 mr-1">
                      ${product.regular_price}
                    </p>
                    <p className="text-red-600 font-bold">
                      ${product.sale_price}
                    </p>
                  </div>
                ) : (
                  <span className="holas">${product.regular_price}</span>
                )}
              </>
            )}
          </div>

          <section>
            <p>
              <span className="font-bold">SKU:</span>{" "}
              {product.sku ? product.sku : "N/A"}
            </p>
            <p className="">
              <span className="font-bold">Disponibilidad:</span>{" "}
              {product.stock_quantity} items
            </p>
          </section>

          {/* Options */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6">
            {/* <!-- Colors --> */}
            {attributeColor && (
              <Controller
                control={form.control}
                name="color"
                render={({ field }) => (
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Color</h3>

                    <fieldset className="mt-4">
                      <legend className="sr-only">Choose a color</legend>
                      <div className="flex items-center space-x-3">
                        {attributeColor ? (
                          attributeColor?.options.map((color, index) => (
                            <label
                              key={uuid()}
                              className={clsx(
                                `relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-700`,
                                {
                                  "ring ring-offset-1": field.value === color,
                                  "ring-2": field.value !== color,
                                }
                              )}
                            >
                              <input
                                type="radio"
                                value={color}
                                className="sr-only"
                                onChange={() => field.onChange(color)}
                                aria-labelledby={`color-choice-${index}-label`}
                              />
                              <span
                                id={`color-choice-${index}-label`}
                                className="sr-only"
                              >
                                {color}
                              </span>
                              <span
                                aria-hidden="true"
                                className={`h-8 w-8 rounded-full border border-black border-opacity-10`}
                                style={{
                                  backgroundColor:
                                    colorMap[color as keyof typeof colorMap],
                                }}
                              ></span>
                            </label>
                          ))
                        ) : (
                          <div>Cargando...</div>
                        )}
                      </div>
                    </fieldset>
                  </div>
                )}
              />
            )}

            {/* <!-- Sizes --> */}
            {attributeSize && (
              <Controller
                control={form.control}
                name="size"
                render={({ field }) => (
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-900">Talla</h3>
                    <fieldset className="mt-4">
                      <legend className="sr-only">Choose a size</legend>
                      <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                        {attributeSize ? (
                          attributeSize?.options.map((size, index) => (
                            <label
                              key={uuid()}
                              className={clsx(
                                "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 cursor-pointer bg-white text-gray-900 shadow-sm",
                                {
                                  "ring-2 ring-red-500": field.value === size,
                                }
                              )}
                            >
                              <input
                                type="radio"
                                value={size}
                                className="sr-only"
                                onChange={() => field.onChange(size)}
                                aria-labelledby={`size-choice-${index}-label`}
                              />
                              <span id={`size-choice-${index}-label`}>
                                {size}
                              </span>
                              {/* ... */}
                            </label>
                          ))
                        ) : (
                          <div>Cargando...</div>
                        )}
                      </div>
                    </fieldset>
                  </div>
                )}
              />
            )}

            {/* Qty & Btn Cart */}
            <section className="flex flex-row flex-wrap sm:flex-nowrap items-center gap-4 sm:gap-12 mt-6">
              <div className="flex flex-row items-center">
                <button
                  type="button"
                  disabled={amount === 0}
                  className="bg-gray-200 py-2 px-5 rounded-lg text-red-800 text-3xl disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => setAmount((prev) => (prev > 0 ? prev - 1 : 0))}
                >
                  -
                </button>
                <span
                  className={clsx("py-4 px-6 rounded-lg", {
                    "text-gray-500": amount === 0,
                  })}
                >
                  {amount}
                </span>
                <button
                  type="button"
                  disabled={amount === product.stock_quantity}
                  className="bg-gray-200 py-2 px-4 rounded-lg text-red-800 text-3xl disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => setAmount((prev) => prev + 1)}
                >
                  +
                </button>
              </div>
              <button
                type="submit"
                disabled={amount === 0}
                className="bg-red-800 w-full text-white font-semibold py-3 lg:px-16 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Agregar al carrito
              </button>
            </section>
          </form>

          {/* WhatsApp Button */}
          <Link
            href={whatsapp_url}
            className="w-full bg-whatsapp flex flex-row items-center justify-center text-white font-bold text-lg rounded-xl py-3 px-6 hover:bg-green-700"
          >
            <WhatsAppIcon />
            <p className="ml-2">Haga su consulta</p>
          </Link>
        </section>
      </section>

      {/* Related Products */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Productos Relacionados</h2>
        {/* Productos Relacionados */}
        <CarouselProductsRelated product={product} />
      </section>

      {/* Product Description */}
      {product.description && (
        <section className="mt-12 flex flex-col md:flex-wrap justify-start">
          <section className="md:w-2/4 pr-4">
            <h2 className="text-2xl font-bold mb-4">Descripción</h2>
            <div className="text-black">
              {ReactHtmlParser(product.description)}
            </div>
          </section>
        </section>
      )}
    </section>
  );
}
