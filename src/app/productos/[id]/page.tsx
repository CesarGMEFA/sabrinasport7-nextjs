"use client";
import { useState, Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { v4 as uuid } from "uuid";
import clsx from "clsx";
import ReactHtmlParser from "react-html-parser";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { colorMap } from "@/lib/colorMap";
import { getProduct } from "@/lib/api/products";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
type Props = {
  params: {
    id: string;
  };
};

export default function ProductPage({ params }: Props) {
  const id = params.id;

  // const data = await getProduct(Number(id))
  // console.log('data', data)

  const [images, setImages] = useState([
    "https://sabrinasport7.com/wp-content/uploads/2023/12/104273_6_738x.progressive.webp",
    "https://sabrinasport7.com/wp-content/uploads/2023/11/104153_2_738x.progressive.webp",
    "https://sabrinasport7.com/wp-content/uploads/2023/11/104153_4_738x.progressive.webp",
    "https://sabrinasport7.com/wp-content/uploads/2023/11/104153_3_738x.progressive.webp",
    "https://sabrinasport7.com/wp-content/uploads/2023/11/104153_6_738x.progressive.webp",
  ]);
  const [activeImg, setActiveImage] = useState(images[0]);
  const [amount, setAmount] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  let message = `Hola {site_name}, me interesa saber más acerca de:\n`;
message += `- {product_name}\n`;
message += `- Precio: {product_price}\n`;
message += `- URL: {product_url}\n`;
message += `- SKU: {product_sku}\n`;

// for (const [taxonomy, selected_term] of Object.entries(selected_attributes)) {
//   message += `- ${taxonomy}: ${selected_term}\n`;
// }

const url_encoded_message = encodeURIComponent(message);
const whatsapp_url = `https://wa.me/573053503583?text=${url_encoded_message}`;

  const atributos = {
    id: 2,
    name: "Color",
    position: 1,
    visible: true,
    variation: true,
    options: ["AZUL", "FUCSIA", "GRIS", "MARRON", "ROJO"],
  };

  const sizes = {
    id: 5,
    name: "Talla",
    position: 0,
    visible: true,
    variation: true,
    options: ["UNICA", "XL", "L", "M", "s"],
  };

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
    data.amount = amount;
    console.log(data);
  };

  return (
    <section className="max-w-7xl mx-auto p-8">
      <section className="flex flex-col lg:justify-between lg:flex-row lg:gap-16 lg:items-center">
        {/* Image Gallery */}
        <div className="flex flex-col gap-6 lg:w-2/4">
          <div className="flex justify-center">
            <Image
              src={activeImg}
              alt=""
              width={300}
              height={300}
              className="block sm:hidden aspect-square object-cover rounded-xl"
            />
            <Image
              src={activeImg}
              alt=""
              width={500}
              height={500}
              className="hidden sm:block aspect-square object-cover rounded-xl"
            />
          </div>
          <div className="flex flex-row flex-wrap mx-auto">
            {images.map((image) => (
              <Fragment key={uuid()}>
                <div className="relative w-16 h-16 sm:hidden">
                  <Image
                    src={image}
                    alt=""
                    fill
                    className="m-0.5 object-cover rounded-md cursor-pointer"
                    onClick={() => setActiveImage(image)}
                  />
                </div>
                <div className="relative w-24 h-24 hidden sm:block">
                  <Image
                    src={image}
                    alt=""
                    fill
                    className="m-0.5 object-cover rounded-md cursor-pointer"
                    onClick={() => setActiveImage(image)}
                  />
                </div>
                {/* <Image
                    src={image}
                    alt=""
                    fill
                    className="h-24 w-24 hidden sm:block m-0.5 object-cover rounded-md cursor-pointer"
                    onClick={() => setActiveImage(image)}
                  /> */}
              </Fragment>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <section className="mt-6 flex flex-col lg:self-start gap-4 lg:w-2/4">
          <div>
            {/* <span className=" text-violet-600 font-semibold">
            Special Sneaker
          </span> */}
            <h1 className="text-xl sm:text-2xl font-bold">
              CHAQUETA DEPORTIVA MUJER TELA SEMI - IMPERMEABLE ESTAMPADA TALLA S
              -M
            </h1>
          </div>
          <div className="text-gray-700">
            {ReactHtmlParser(
              "<p >CHAQUETA DEPORTIVA CON TELA SEMI &#8211; IMPERMEABLE, ESTAMPADO, CIERRE FRONTAL CON ARGOLLA, MARQUILLA TEJIDA, CORDON TRENZADO CON TERMINAL PARA AJUSTAR A LA MEDIDA Y ELÁSTICO INTERNO PARA MEJOR AJUSTE EN PUÑOS.</p>\n"
            )}
          </div>
          <h6 className="text-2xl font-semibold">$ 199.00</h6>
          {/* Options */}

          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10">
            {/* <!-- Colors --> */}
            <Controller
              control={form.control}
              name="color"
              render={({ field }) => (
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Color</h3>

                  <fieldset className="mt-4">
                    <legend className="sr-only">Choose a color</legend>
                    <div className="flex items-center space-x-3">
                      {atributos.options.map((color, index) => (
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
                      ))}
                    </div>
                  </fieldset>
                </div>
              )}
            />

            {/* <!-- Sizes --> */}
            <Controller
              control={form.control}
              name="size"
              render={({ field }) => (
                <div className="mt-10">
                  <fieldset className="mt-4">
                    <legend className="sr-only">Choose a size</legend>
                    <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                      {sizes.options.map((size, index) => (
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
                          <span id={`size-choice-${index}-label`}>{size}</span>
                          {/* ... */}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </div>
              )}
            />

            {/* Qty & Btn Cart */}
            <div className="flex flex-row flex-wrap sm:flex-nowrap items-center gap-4 sm:gap-12 mt-6">
              <div className="flex flex-row items-center">
                <button
                  type="button"
                  className="bg-gray-200 py-2 px-5 rounded-lg text-red-800 text-3xl"
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
                  className="bg-gray-200 py-2 px-4 rounded-lg text-red-800 text-3xl"
                  onClick={() => setAmount((prev) => prev + 1)}
                >
                  +
                </button>
              </div>
              <button
                type="submit"
                className="bg-red-800 w-full text-white font-semibold py-3 lg:px-16 rounded-xl"
              >
                Agregar al carrito
              </button>
            </div>
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
    </section>
  );
}

// const ProductPage2 = () => (
//   <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10">
//             {/* <!-- Colors --> */}
//             <div>
//               <h3 className="text-sm font-medium text-gray-900">Color</h3>

//               <fieldset className="mt-4">
//                 <legend className="sr-only">Choose a color</legend>
//                 <div className="flex items-center space-x-3">
//                   {atributos.options.map((color, index) => (
//                     <label
//                       key={uuid()}
//                       className={clsx(
//                         `relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-700`,
//                         {
//                           "ring ring-offset-1": selectedColor === color,
//                           "ring-2": selectedColor !== color,
//                         }
//                       )}
//                     >
//                       <input
//                         type="radio"
//                         name="color-choice"
//                         value={color}
//                         className="sr-only"
//                         onChange={() => setSelectedColor(color)}
//                         aria-labelledby={`color-choice-${index}-label`}
//                       />
//                       <span
//                         id={`color-choice-${index}-label`}
//                         className="sr-only"
//                       >
//                         {color}
//                       </span>
//                       <span
//                         aria-hidden="true"
//                         className={`h-8 w-8 rounded-full border border-black border-opacity-10`}
//                         style={{
//                           backgroundColor:
//                             colorMap[color as keyof typeof colorMap],
//                         }}
//                       ></span>
//                     </label>
//                   ))}
//                 </div>
//               </fieldset>
//             </div>

//             {/* <!-- Sizes --> */}
//             <div className="mt-10">
//               <div className="flex items-center justify-between">
//                 <h3 className="text-sm font-medium text-gray-900">Size</h3>
//                 <a
//                   href="#"
//                   className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
//                 >
//                   Size guide
//                 </a>
//               </div>

//               <fieldset className="mt-4">
//                 <legend className="sr-only">Choose a size</legend>
//                 <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
//                   {/* <!-- Active: "ring-2 ring-indigo-500" --> */}
//                   <label className="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 cursor-not-allowed bg-gray-50 text-gray-200">
//                     <input
//                       type="radio"
//                       name="size-choice"
//                       value="XXS"
//                       disabled
//                       className="sr-only"
//                       aria-labelledby="size-choice-0-label"
//                     />
//                     <span id="size-choice-0-label">XXS</span>
//                     <span
//                       aria-hidden="true"
//                       className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
//                     >
//                       <svg
//                         className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
//                         viewBox="0 0 100 100"
//                         preserveAspectRatio="none"
//                         stroke="currentColor"
//                       >
//                         <line
//                           x1="0"
//                           y1="100"
//                           x2="100"
//                           y2="0"
//                           vectorEffect="non-scaling-stroke"
//                         />
//                       </svg>
//                     </span>
//                   </label>

//                   {/* <!-- Active: "ring-2 ring-indigo-500" --> */}
//                   <label
//                     className={clsx(
//                       "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 cursor-pointer bg-white text-gray-900 shadow-sm",
//                       {
//                         "ring-2 ring-indigo-500": selectedSize === "XS",
//                       }
//                     )}
//                   >
//                     <input
//                       type="radio"
//                       name="size-choice"
//                       value="XS"
//                       className="sr-only"
//                       aria-labelledby={`size-choice-4-label`}
//                     />
//                     <span id="size-choice-1-label">XS</span>
//                     {/* <!--
//                   Active: "border", Not Active: "border-2"
//                   Checked: "border-indigo-500", Not Checked: "border-transparent"
//                 --> */}
//                     <span
//                       className={clsx(
//                         "pointer-events-none absolute -inset-px rounded-md",
//                         {
//                           "border border-indigo-500": selectedSize === "XS",
//                           "border-2 border-transparent":
//                             selectedSize !== "XS",
//                         }
//                       )}
//                       aria-hidden="true"
//                     ></span>
//                   </label>

//                   {sizes.options.map((size, index) => (
//                     <label
//                       key={uuid()}
//                       className={clsx(
//                         "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 cursor-pointer bg-white text-gray-900 shadow-sm",
//                         {
//                           "ring-2 ring-red-500": selectedSize === size,
//                         }
//                       )}
//                     >
//                       <input
//                         type="radio"
//                         name="size-choice"
//                         value={size}
//                         className="sr-only"
//                         onChange={() => setSelectedSize(size)}
//                         aria-labelledby={`size-choice-${index}-label`}
//                       />
//                       <span id={`size-choice-${index}-label`}>{size}</span>
//                       {/* <!--
//                   Active: "border", Not Active: "border-2"
//                   Checked: "border-indigo-500", Not Checked: "border-transparent"
//                 --> */}
//                       <span
//                         className={clsx(
//                           "pointer-events-none absolute -inset-px rounded-md",
//                           {
//                             "border border-indigo-500": selectedSize === "XS",
//                             "border-2 border-transparent":
//                               selectedSize !== "XS",
//                           }
//                         )}
//                         aria-hidden="true"
//                       ></span>
//                     </label>
//                   ))}
//                 </div>
//               </fieldset>
//             </div>

//             <button
//               type="submit"
//               className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//             >
//               Add to bag
//             </button>
//           </form>
// )
