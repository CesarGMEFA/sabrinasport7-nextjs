import { Suspense } from "react";

import ProductCard from "@/components/Product/ProductCard";
import Pagination from "@/components/Pagination";
import SiderBar from "@/components/SideBar";

import { getProducts } from "@/lib/api/products";

type Props = {
  searchParams: {
    category?: string;
    search?: string;
    page?: string;
  };
};

export default async function TiendaPage({ searchParams }: Props) {
  const category = searchParams?.category || '';
  const search = searchParams?.search || '';
  const currentPage = Number(searchParams?.page) || 1;

  const { products, totalPages, totalProducts } = await getProducts(currentPage, search, category);
  const actualProducts = products.length;

  return (
    <main className="p-4 lg:px-8 lg:py-12 lg:flex lg:flex-col">
      <section className="flex flex-col lg:flex-row">
        {/* Siderbar Section */}
        <SiderBar />

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
