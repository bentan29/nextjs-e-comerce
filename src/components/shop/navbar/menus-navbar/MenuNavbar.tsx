'use client'

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink
} from "@/components/ui/navigation-menu";
import { Store } from "lucide-react";
import Link from "next/link";

interface Item {
  title: string;
  id: string;
  url: string;
}

const genderItems: Item[] = [
    {
        title: "Men",
        id: "men",
        url: "/products/men",
    },
    {
        title: "Women",
        id: "women",
        url: "/products/women",
    },
    {
        title: "Kid",
        id: "kid",
        url: "/products/kid",
    },
    {
        title: "Unisex",
        id: "unisex",
        url: "/products/unisex",
    },
];

const categoryItems: Item[] = [
    {
        title: "Hoodies",
        id: "hoodies",
        url: "/Hoodies",
    },
    {
        title: "Shirts",
        id: "shirts",
        url: "/Shirts",
    },
    {
        title: "Hats",
        id: "hats",
        url: "/Hats",
    },
    {
        title: "Pants",
        id: "pants",
        url: "/Pants",
    },
];

export function MenuNavbar() {
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>

        {/* Opción "See all" general */}
        <NavigationMenuItem>
          <Link 
            href="/" 
            className="flex rounded-none text-muted-foreground items-center gap-1.5 px-4 py-2 text-sm font-medium hover:text-accent-foreground hover:bg-yellow-600 transition-colors"
          >
            <Store size={16} /> <span>Home</span>
          </Link>
        </NavigationMenuItem>


        {/* Items por género con submenu */}
        {genderItems.map((gender) => (
          <NavigationMenuItem key={gender.id}>
            <NavigationMenuTrigger className="px-4 hover flex items-center gap-1 bg-transparent rounded-none ui-hover:bg-yellow-600 data-[state=open]:bg-yellow-600 transition-colors">
              {gender.title}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="z-50">
              <ul className="grid gap-1 p-0 w-[150px]">
                {categoryItems.map((category) => (
                  <li key={category.id}>
                    <NavigationMenuLink asChild>
                      <Link href={`${gender.url}${category.url}`}>
                        {category.title}
                      </Link>
                    </NavigationMenuLink>
                  </li>
                ))}

                <li>
                  <NavigationMenuLink asChild>
                    <Link href={gender.url} className="text-muted-foreground">
                      See all
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
        
      </NavigationMenuList>
    </NavigationMenu>
  );
}

