"use client";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

type Props = {};

export default function SiderBar({}: Props) {
//   const [selectedValue, setSelectedValue] = useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
    const router = useRouter();

  const handleChange = (categoryId: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", categoryId);
    console.log(`${pathname}?${params.toString()}`)

    if (params.get("page")) {
      params.delete("page")
    }
    // return `${pathname}?${params.toString()}`
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <section className="h-max flex items-center justify-start flex-col lg:bg-white lg:w-72 lg:py-12">
      {/* Select Mobile */}
      <section className="mb-5 lg:hidden">
        <Select onValueChange={(e) => handleChange(e.toString())}>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Selecciona una categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {/* <SelectLabel>Norte America</SelectLabel> */}
              <SelectItem value="42">Babal&uacute;</SelectItem>
              <SelectItem value="75">Bonlife</SelectItem>
              <SelectItem value="toys">Juguetes</SelectItem>
              <SelectItem value="suplementos">Suplementos</SelectItem>
              <SelectItem value="escolar">Escolar</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </section>
      <Separator className="w-72 bg-red-400 lg:hidden mb-5" />

      {/* Menu Selection Tablet and Desktop */}
      <h2 className="hidden lg:block text-2xl font-semibold">
        Categor&iacute;as
      </h2>
      <Separator className="my-5 w-4/5 hidden lg:block" />
      <nav className="hidden lg:flex lg:flex-col lg:space-y-4">
        <Link
          href={"/"}
          className="w-64 pl-3 py-2 bg-red-600 text-white font-medium hover:bg-red-400 hover:text-white focus:bg-red-400 focus:text-white"
        >
          Babal&uacute;
        </Link>
        <Link
          href={"/"}
          className="w-64 pl-3 py-2 font-medium hover:bg-red-400 hover:text-white focus:bg-red-400 focus:text-white"
        >
          Tsunami
        </Link>
        <Link
          href={"/"}
          className="w-64 pl-3 py-2 font-medium hover:bg-red-400 hover:text-white focus:bg-red-400 focus:text-white"
        >
          Suplementos
        </Link>
        <Link
          href={"/"}
          className="w-64 pl-3 py-2 font-medium hover:bg-red-400 hover:text-white focus:bg-red-400 focus:text-white"
        >
          Juguetes
        </Link>
        <Link
          href={"/"}
          className="w-64 pl-3 py-2 font-medium hover:bg-red-400 hover:text-white focus:bg-red-400 focus:text-white"
        >
          Escolar
        </Link>
      </nav>
    </section>
  );
}

