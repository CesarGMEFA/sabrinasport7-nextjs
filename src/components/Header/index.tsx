import Image from "next/image";
import Link from "next/link";

import MenuAccountHeader from "../Menus/MenuAccountHeader";
import SheetMenuMobile from "../Menus/SheetMenuMobile";

import HeaderCart from "./HeaderCart";
import SearchMobile from "./SearchMobile";
import SearchDesktop from "./SearchDesktop";

import NavHeader from "../Menus/NavHeader";

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
          <SearchDesktop />
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
      <SearchMobile />

      <NavHeader />
    </header>
  );
}
