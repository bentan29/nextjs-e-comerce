"use client"
import { AlertConfirmDialog, ProductImage } from "@/components";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { ProductRowItem } from "@/interfaces";
import { useCartStore } from "@/store";
import { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import Link from "next/link";




export const columns: ColumnDef<ProductRowItem>[] = [
    //- Titulo
    {
        accessorKey: "title",
        header: () => <div>Product</div>,
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
    //- Precio
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
    //- Tamaño size
    {
      accessorKey: "size",
      header: () => <div>Size</div>,
      cell: ({ row }) => <div>{row.original.size}</div>,
    },
    //- Cantidad quantity
    {
      accessorKey: "quantity",
      header: () => <div>Qty</div>,
      cell: ({ row }) => <div>{row.original.quantity}</div>,
    },
    //- Acciones
    {
      header: "Actions",
      accessorKey: "actions",
      id: "actions",
      cell: ({ row }) => {
        const cartProduct = row.original
        const {removeProductFromCart} = useCartStore();
     
        return (
          <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="cursor-pointer" variant="destructive">
                  <Trash2 size={35}/>
                </Button>
            </AlertDialogTrigger>
            <AlertConfirmDialog
              title="Are you sure to delete this product?"
              message={`${cartProduct.title} - ${cartProduct.size}`}
              action="destroy"
              onConfirm={() => removeProductFromCart(cartProduct.id, cartProduct.size)}
            />
          </AlertDialog>
        )
      },
    },
    
];