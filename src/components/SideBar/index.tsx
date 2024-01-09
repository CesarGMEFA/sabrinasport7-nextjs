"use client";
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

import { categories } from "./categories";
import clsx from "clsx";

type Props = {};

export default function SiderBar({}: Props) {
  //   const [selectedValue, setSelectedValue] = useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const categoryId = searchParams.get("category");

  const handleChange = (categoryId: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", categoryId);

    if (params.get("page")) {
      params.delete("page");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleChangeDesktop = (categoryId: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", categoryId);

    if (params.get("page")) {
      params.delete("page");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <section className="h-max shadow-md flex items-center justify-start flex-col lg:bg-white lg:w-72 lg:py-12">
      {/* Select Mobile */}
      <section className="mb-5 lg:hidden">
        <Select onValueChange={(e) => handleChange(e.toString())}>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Selecciona una categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {/* <SelectLabel>Norte America</SelectLabel> */}
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.category}
                </SelectItem>
              ))}
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
        {categories.map((category) => (
          <button
            key={category.id}
            className={clsx(
              "w-64 pl-3 py-2 font-medium text-left hover:bg-red-400 hover:text-white",
              {
                "bg-red-600 text-white":
                  categoryId === category.id,
              }
            )}
            onClick={() => {
              handleChangeDesktop(category.id);
            }}
          >
            {category.category}
          </button>
        ))}
      </nav>
    </section>
  );
}
