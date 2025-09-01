"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const SearchFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // tomamos los searchparams
  const [searchValue, setSearchValue] = useState(searchParams.get("search") || "");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (searchValue) {
        params.set("search", searchValue);
      } else {
        params.delete("search"); // limpia el query si está vacío
      }
      router.push(`${pathname}?${params.toString()}`);
    }, 500); // ⏳ debounce 500ms

    return () => clearTimeout(delayDebounce);
  }, [searchValue, pathname, router]);

  return (
    <div className="relative w-full">
      <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input
        className="h-8 rounded-sm pl-8" // 👈 padding extra para que no tape el icono
        placeholder="Search..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  );
};
