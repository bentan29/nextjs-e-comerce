'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const SortProducts = ({currentSort}: {currentSort: string}) => {
    
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleSortChange = (value: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("sort", value);
        router.push(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="mb-2 ml-auto">
            <Select 
                onValueChange={handleSortChange} 
                defaultValue={currentSort}
            >
                <SelectTrigger className="w-[180px] rounded-none" size="sm">
                    <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="newest-first">Newest First</SelectItem>
                    <SelectItem value="oldest-first">Oldest First</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}
