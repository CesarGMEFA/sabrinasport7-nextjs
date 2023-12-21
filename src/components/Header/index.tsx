import React from "react";
import Image from "next/image";
import Link from "next/link";

import MenuAccountHeader from "../Menus/MenuAccountHeader";
import SheetMenuMobile from "../Menus/SheetMenuMobile";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ShoppingCart, UserCircle } from "lucide-react";
import HeaderCart from "./HeaderCart";

type Props = {};

export default function Header({}: Props) {
  return (
    <header className="bg-white lg:text-base">
      <section className="p-4 lg:px-8 lg:py-6 flex justify-between items-center mb-4 lg:mb-0">
        <section className="flex items-center">

          {/* Logo */}
          <Link href="/">
            <Image
              src="/logo.png"
              alt="logo sabrinasport image"
              width={100}
              height={60}
              className="block lg:hidden"
            />
            <Image
              src="/logo.png"
              alt="logo sabrinasport image"
              width={150}
              height={90}
              className="hidden lg:block"
            />
          </Link>

          {/* Input Search Desktop & Tablet */}
          <section className="ml-6 hidden sm:flex w-full max-w-lg items-center space-x-2">
            <Input
              type="text"
              placeholder="Buscar producto"
              className="md:w-96 inline lg:text-base"
            />
            <Button type="submit" className="inline lg:text-base">
              Buscar
            </Button>
          </section>
        </section>

        <section className="flex items-center">
          {/* User Account */}
          <section className="mr-4 hidden lg:flex items-center">
            {/* <div className="font-medium text-base">Sign In</div> */}
            {/* <UserCircle size={28} className="mr-1" />
            <div className="flex items-center">
              Cesar
              <ChevronDown size={16}/>
            </div> */}
            <MenuAccountHeader />
          </section>

          {/* Cart */}
          <HeaderCart />
          {/* Burger mobile */}
          <div className="lg:hidden">
            <SheetMenuMobile />
          </div>
        </section>
      </section>

      {/* Input Search Mobile */}
      <section className="px-4 pt-0 pb-4 lg:p-8 flex w-full mx-auto max-w-sm items-center space-x-2 sm:hidden">
        <Input type="text" placeholder="Buscar producto" />
        <Button type="submit">Buscar</Button>
      </section>

      <nav className="h-8 hidden bg-gray-50 lg:flex lg:justify-evenly lg:items-center font-medium border-red-600 border-b-2">
        <Link
          href=""
          className="h-full px-2 flex items-center bg-red-600 text-white hover:bg-red-400 hover:text-white focus:bg-red-400 focus:text-white"
        >
          opcion 1
        </Link>
        <Link href="" className="h-full px-2 flex items-center hover:bg-red-400 hover:text-white focus:bg-red-400 focus:text-white">
          opcion 2
        </Link>
        <Link href="" className="h-full px-2 flex items-center hover:bg-red-400 hover:text-white focus:bg-red-400 focus:text-white">
          opcion 3
        </Link>
        <Link href="" className="h-full px-2 flex items-center hover:bg-red-400 hover:text-white focus:bg-red-400 focus:text-white">
          opcion 4
        </Link>
        <Link href="" className="h-full px-2 flex items-center hover:bg-red-400 hover:text-white focus:bg-red-400 focus:text-white">
          opcion 5
        </Link>
      </nav>
    </header>
  );
}
