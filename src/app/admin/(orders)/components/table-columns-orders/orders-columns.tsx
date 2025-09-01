"use client"

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { currencyFormat } from "@/utils/currencyFormat";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown} from "lucide-react";
import { ConfirmOrder } from "../confirm-order/ConfirmOrder";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import Link from "next/link";
 

export const ordersColumns: ColumnDef<any>[] = [
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
        accessorKey: "id",
        header: ({ column }) => {
            return (
                <Button
                className="p-0" 
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                ID
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
        },
        cell: ({ row }) => {
          const fullId = row.getValue("id") as string;
          const shortId = fullId.split("-")[0];

          return (
            <div className="font-medium text-left flex w-fit">
              <HoverCard>
                  <HoverCardTrigger asChild>
                    <Link 
                      href={`/admin/orders/${fullId}`}
                      className="text-primary hover:underline truncate max-w-[150px]"
                    >
                      {shortId}...
                    </Link>
                  </HoverCardTrigger>
                  <HoverCardContent className="bg-green-900 py-1 px-2 text-white w-fit" side="top">
                      <p>{fullId}</p>
                  </HoverCardContent>
              </HoverCard>
            </div>
          );
        },
    }, 
    {
        accessorKey: "total",
        header: ({ column }) => {
          return (
            <Button
              className="p-0"
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Total
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => {
          const amount = parseFloat(row.getValue("total"))
          return (
            <div className="font-medium w-fit px-2">
              {currencyFormat(amount)}
            </div>
          )
      },
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
          return (
            <Button
                className="p-0 hidden md:flex"
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Created At
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          const value = row.getValue("createdAt");
          const date = new Date(value as string);
          const formatted = date.toLocaleString("es-UY", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });
          return (
            <span className="text-sm text-muted-foreground hidden md:table-cell">
                {formatted}
            </span>
          );
        },
    },

    //----- Confirmar orden
    {
      accessorKey: "isConfirmed",
      header: ({ column }) => {
        return (
          <Button
            className="p-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Confirmed
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const orderConfirm = row.original.isConfirmed;
        const orderId = row.original.id;

        return (
          <ConfirmOrder 
            orderConfirm={orderConfirm} 
            orderId={orderId} 
          />
        );
        
      },
    },  
    
];