"use client";
import { useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {};

export default function SearchMobile({}: Props) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }

    if (params.get("page")) {
      params.delete("page")
    }

    if (pathname === "/") {
      router.replace(`${pathname}?${params.toString()}`);
    } else {
      router.push(`/?${params.toString()}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(searchTerm);
    }
  };

  return (
    <section className="px-4 pt-0 pb-4 lg:p-8 flex w-full mx-auto max-w-sm items-center space-x-2 sm:hidden">
      <Input
        type="text"
        placeholder="Buscar producto"
        onChange={(e) => setSearchTerm(e.target.value)}
        defaultValue={searchParams.get("search")?.toString()}
        onKeyDown={handleKeyPress}
      />
      <Button type="button" onClick={() => handleSearch(searchTerm)}>Buscar</Button>
    </section>
  );
}
