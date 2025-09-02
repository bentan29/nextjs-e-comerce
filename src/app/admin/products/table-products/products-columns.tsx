"use client"

import { ProductImage } from "@/components";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Product } from "@/interfaces";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";
import { ProductsAction } from "./products-action";
 

export const productsColumns: ColumnDef<Product>[] = [
    {
        id: "select",
        header: ({table}) => 
            <Checkbox 
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)} 
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
            />,
        cell: ({row}) => (
            <Checkbox 
                onCheckedChange={(value) => row.toggleSelected(!!value)} 
                checked={row.getIsSelected()}
            />
        )
    },
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
                row.original.images && (
                  <ProductImage
                      src={row.original.images[0].url}
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
        header: ({ column }) => {
            return (
              <Button
                className="p-0" 
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Price
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            )
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("price"))
            const formatted = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(amount)
       
            return <div className="font-medium text-left flex w-fit">{formatted}</div>
        },
          
    },
    {
        accessorKey: "gender",
        header: ({ column }) => {
          return (
            <Button
              className="p-0"
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Gender
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
    },
    {
        accessorKey: "stock",
        header: ({ column }) => {
            return (
              <Button
                className="p-0"
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Stock
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
        },
        cell: ({ row }) => {
            const totalStock = row.original?.sizesStock?.reduce((acc, sizeStock) => acc + sizeStock.stock, 0)
            return (
              <Badge className={cn( 
                "px-2 w-max rounded text-md text-foreground",
                totalStock === 0 && "bg-red-500/50",
                totalStock && totalStock > 0 && totalStock < 6 && "bg-yellow-500/50",
                totalStock && totalStock > 5 && "bg-green-500/50",
                )}
              >
                <HoverCard>
                  <HoverCardTrigger className="cursor-default">
                        {totalStock}
                    </HoverCardTrigger>
                    <HoverCardContent 
                      className="bg-green-900 py-1 px-2 text-white w-fit" 
                      side="right"
                      sideOffset={15}
                    >
                        {
                          row.original?.sizesStock?.map((sizeStock) => (
                            <p key={sizeStock.size}>{sizeStock.size}: {sizeStock.stock}</p>
                          ))
                        }
                    </HoverCardContent>
                </HoverCard>
                
              </Badge>
            )
        },
    },
    {
      header: "Actions",
      accessorKey: "actions",
      id: "actions",
      cell: ({ row }) => {
        const product = row.original
  
        return (
          <ProductsAction product={product} />
        )
      },
    },
    
];