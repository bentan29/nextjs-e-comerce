"use client"
import { ProductImage } from "@/components";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { FavoriteProduct } from "@/interfaces";
import { useWishlistStore } from "@/store";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, HeartOff } from "lucide-react";
import Link from "next/link";




export const columns: ColumnDef<FavoriteProduct>[] = [
    {
        accessorKey: "title",
        header: ({ column }) => {
          return (
            <Button
              className="p-0"
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Title
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => {
          const product = row.original
        
          return (
            <div className="font-medium text-left flex items-center gap-2 w-fit">

              {
                row.original.image && (
                  <ProductImage
                      src={row.original.image}
                      alt={product.title}
                      width={50}
                      height={50}
                  />
                )
              } 
              
              <HoverCard>
                  <HoverCardTrigger asChild>
                    <Link 
                      href={`/product/${product.slug}`}
                      className="text-primary hover:underline truncate max-w-[150px]"
                    >
                      {product.title}
                    </Link>
                  </HoverCardTrigger>
                  <HoverCardContent className="bg-green-900 py-1 px-2 text-white w-fit" side="top">
                      <p>{product.title}</p>
                  </HoverCardContent>
              </HoverCard>
          
            </div>
          )
        }
    },
    {
        accessorKey: "price",
        header: () => <div>Price</div>,
        cell: ({ row }) => {
          const amount = parseFloat(row.getValue("price"))
          const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(amount)
     
          return <div className="font-medium">{formatted}</div>
        },
    },
    {
        header: "Actions",
        accessorKey: "actions",
        id: "actions",
        cell: ({ row }) => {
          const favourite = row.original
          const {removeFavoriteProduct} = useWishlistStore();
     
          return (
              <Button 
                variant="destructive" 
                className="cursor-pointer"
                onClick={() => removeFavoriteProduct(favourite)}
              >
                <HeartOff size={35}/>
              </Button>
          )
        },
    },
    
];