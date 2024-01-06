import { Suspense } from "react";
import Link from "next/link";

import ProductCard from "@/components/Product/ProductCard";
import Pagination from "@/components/Pagination";
import SiderBar from "@/components/SideBar";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

import { getProducts } from "@/lib/api/products";

type Props = {
  searchParams: {
    category?: string;
    search?: string;
    page?: string;
  };
};

export default async function TiendaPage({ searchParams }: Props) {
  const category = searchParams?.category || "";
  const search = searchParams?.search || "";
  const currentPage = Number(searchParams?.page) || 1;

  const { products, totalPages, totalProducts } = await getProducts(
    currentPage,
    search,
    category
  );
  const actualProducts = products.length;

  const whatsapp_url = "https://wa.me/573053503583?text=Hola! Quiero comprar en tu tienda!"

  return (
    <main className="p-4 lg:px-8 lg:py-12 lg:flex lg:flex-col">
      <section className="flex flex-col lg:flex-row">
        {/* Siderbar Section */}
        <SiderBar />

        {/* Product list */}
        <Suspense key={search + currentPage} fallback={<p>Loading...</p>}>
          <section className="lg:ml-4 grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 2xl:gap-6 min-[1745px]:grid-cols-6 ">
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

      <Link
        href={whatsapp_url}
        target="_blank"
        className="bg-whatsapp w-16 h-16 flex flex-row items-center justify-center text-white font-bold rounded-full hover:bg-green-700 fixed bottom-10 right-4"
      >
        <WhatsAppIcon />
      </Link>
    </main>
  );
}
