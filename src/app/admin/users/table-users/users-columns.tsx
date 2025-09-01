"use client"
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { User } from "@/interfaces";
import { slugify } from "@/lib/slugify";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye, MoreHorizontal, Trash2, UserLock } from "lucide-react";
import Link from "next/link";
import { UserActions } from "./user-actions";
 

export const usersColumns: ColumnDef<User>[] = [
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
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                className="p-0" 
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
        },
        cell: ({row}) => {
            const user = row.original
            return (
                <Link
                    //href={{
                    //    pathname: `/users/${slugify(user.name)}`, // visible en URL
                    //    query: { id: user.id } // oculto, accesible en `searchParams`
                    //}}
                    href={`/admin/users/${user.id}_${slugify(user.name)}`}
                    //href={`/users/${user.id}`}
                    className="text-primary hover:underline truncate max-w-[150px]"
                >
                    {user.name}
                </Link>
            )
        }
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    className="p-0" 
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                Email
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
        },
    },   
    {
        accessorKey: "role",
        header: () => <span className="hidden md:table-cell">Role</span>,
        cell: ({row}) => {
            const role = row.getValue("role");
            return (
                <div
                    className={cn(
                        `py-1 px-2 capitalize w-max rounded text-xs hidden md:table-cell`,
                        role === "admin" && "bg-yellow-500/40 border border-yellow-500",
                        role === "user" && "bg-green-500/40 border border-green-500",
                    )}
                >
                    {role as string}
                </div>
            )
        }
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
    {
        header: "Actions",
        accessorKey: "actions",
        id: "actions",
        cell: ({ row }) => {
          const user = row.original
          const userId = user.id;
          const name = user.name;
     
          return (
            <UserActions 
                userId={userId} 
                name={name}
            />
          )
        },
    },
    
];