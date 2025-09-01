'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Store } from 'lucide-react';
import Link from 'next/link';

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

export const SideBarAccordion = () => {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full my-4"
      defaultValue="item-1"
    >


      <AccordionItem value="item-1">
        <Link href="/" className="flex text-muted-foreground items-center gap-1.5 py-2 mb-2 text-sm font-medium ">
            <Store size={16} /> <span>Home</span>
          </Link>
      </AccordionItem>

      {
        genderItems.map((gender) => (
          <AccordionItem value={gender.id} key={gender.id} >
            <AccordionTrigger className='hover:no-underline hover:text-muted-foreground cursor-pointer'>{gender.title}</AccordionTrigger>
            <AccordionContent className="z-50">
              <ul className="grid gap-2 px-2">
                {
                  categoryItems.map((category) => (
                    <li key={category.id}>
                        <Link href={`${gender.url}${category.url}`} className='hover:text-muted-foreground hover:underline underline-offset-2'>
                          {category.title}
                        </Link>
                    </li>
                  ))
                }
                <li>
                    <Link href={gender.url} className="text-muted-foreground hover:underline underline-offset-2">
                      See all
                    </Link>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))
      }

    </Accordion>
  )
}
