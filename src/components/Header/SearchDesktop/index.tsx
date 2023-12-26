"use client";
import { useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {};

export default function SearchDesktop({}: Props) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(searchTerm);
    }
  };

  return (
    <section className="ml-6 hidden sm:flex w-full max-w-lg items-center space-x-2">
      <Input
        type="text"
        placeholder="Buscar producto"
        className="md:w-96 inline lg:text-base"
        onChange={(e) => setSearchTerm(e.target.value)}
        defaultValue={searchParams.get("search")?.toString()}
        onKeyDown={handleKeyPress}
      />
      <Button
        type="button"
        className="inline lg:text-base"
        onClick={() => handleSearch(searchTerm)}
      >
        Buscar
      </Button>
    </section>
  );
}