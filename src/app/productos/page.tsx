import { Suspense } from "react";
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
import ProductCard from "@/components/Product/ProductCard";
import Pagination from "@/components/Pagination";

import { getProducts } from "@/lib/api/products";

type Props = {
  searchParams: {
    search?: string;
    page?: string;
  };
};

export default async function TiendaPage({ searchParams }: Props) {
  const search = searchParams?.search || '';
  const currentPage = Number(searchParams?.page) || 1;
  const { products, totalPages, totalProducts } = await getProducts(currentPage, search);
  const actualProducts = products.length;

  return (
    <main className="p-4 lg:px-8 lg:py-12 lg:flex lg:flex-col">
      <section className="flex flex-col lg:flex-row">
        {/* Siderbar Section */}
        <section className="h-max flex items-center justify-start flex-col lg:bg-white lg:w-72 lg:py-12">
          {/* Select Mobile */}
          <section className="mb-5 lg:hidden">
            <Select>
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Selecciona una categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {/* <SelectLabel>Norte America</SelectLabel> */}
                  <SelectItem value="babalu">
                    <Link href="/tienda/babalu">Babal&uacute;</Link>
                  </SelectItem>
                  <SelectItem value="tsunami">Tsunami</SelectItem>
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

        {/* Product list */}
        <Suspense key={search + currentPage} fallback={<p>Loading...</p>}>
          <section className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 xl:gap-12 2xl:gap-16">
            {products.map((product) => (
              <ProductCard key={product.id} data={product} />
            ))}
          </section>
        </Suspense>

      </section>
      <Pagination
        totalProducts={totalProducts}
        actualProducts={actualProducts}
        totalPages={Number(totalPages)}
      />
    </main>
  );
}
