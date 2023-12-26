"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";
import { v4 as uuid } from 'uuid';
import { generatePagination } from "@/lib/utils";

type Props = {
  totalProducts: string | null;
  actualProducts: number;
  totalPages: number;
};

export default function Pagination({
  totalProducts,
  actualProducts,
  totalPages,
}: Props) {
const [ sinceProducts, setSinceProducts ] = useState<number>(1);
const [ untilProducts, setUntilProducts ] = useState<number>(actualProducts);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (page: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    return `${pathname}?${params.toString()}`;
  };

  const allPages = generatePagination(currentPage, totalPages);

  useEffect(() => {
    setSinceProducts((currentPage - 1) * 20 + 1);
    setUntilProducts(Math.min(currentPage * 20, Number(totalProducts)));
  }, [currentPage, totalProducts])

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white mt-2 px-4 py-3 sm:px-6">
      <div className="mx-auto flex flex-col items-center sm:flex-row sm:flex-nowrap sm:flex-1 sm:items-center sm:justify-between">
        <div className="mb-2">
          <p className="text-sm text-gray-700">
            Mostrando <span className="font-medium">{sinceProducts}</span> hasta{" "}
            <span className="font-medium">{untilProducts}</span> de{" "}
            <span className="font-medium">{totalProducts}</span> resultados
          </p>
        </div>

        <>
          <div className="inline-flex">
            <PaginationArrow
              direction="left"
              href={createPageURL(currentPage - 1)}
              isDisabled={currentPage <= 1}
            />

            <div className="flex -space-x-px">
              {allPages.map((page, index) => {
                let position:
                  | "first"
                  | "last"
                  | "single"
                  | "middle"
                  | undefined;

                if (index === 0) position = "first";
                if (index === allPages.length - 1) position = "last";
                if (allPages.length === 1) position = "single";
                if (page === "...") position = "middle";

                return (
                  <PaginationNumber
                    key={`${page}-${uuid()}`}
                    href={createPageURL(page)}
                    page={page}
                    position={position}
                    isActive={currentPage === page}
                  />
                );
              })}
            </div>

            <PaginationArrow
              direction="right"
              href={createPageURL(currentPage + 1)}
              isDisabled={currentPage >= totalPages}
            />
          </div>
        </>
      </div>
    </div>
  );
}

function PaginationNumber({
  page,
  href,
  isActive,
  position,
}: {
  page: number | string;
  href: string;
  position?: "first" | "last" | "middle" | "single";
  isActive: boolean;
}) {
  const className = clsx(
    "flex w-7 h-7 min-[430px]:h-10 min-[430px]:w-10 items-center justify-center text-sm border",
    {
      "rounded-l-md": position === "first" || position === "single",
      "rounded-r-md": position === "last" || position === "single",
      "z-10 bg-red-600 border-red-600 text-white": isActive,
      "hover:bg-gray-100": !isActive && position !== "middle",
      "text-gray-300": position === "middle",
    }
  );

  return isActive || position === "middle" ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: "left" | "right";
  isDisabled?: boolean;
}) {
  const className = clsx(
    "flex w-7 h-7 min-[430px]:h-10 min-[430px]:w-10 items-center justify-center rounded-md border",
    {
      "pointer-events-none text-gray-300": isDisabled,
      "hover:bg-gray-100": !isDisabled,
      "mr-2 md:mr-4": direction === "left",
      "ml-2 md:ml-4": direction === "right",
    }
  );

  const icon =
    direction === "left" ? (
      <ChevronLeft className="w-4" />
    ) : (
      <ChevronRight className="w-4" />
    );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link className={className} href={href}>
      {icon}
    </Link>
  );
}
