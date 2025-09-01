"use client"

import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable,} from "@tanstack/react-table"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import { DataTablePagination } from "@/components/dashboard/TablePagination"
import { useEffect, useState } from "react"
import { TableFilterSearch } from "@/components/dashboard/TableFilterSearch"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { socket } from "@/lib/socketClient"
import { useRouter } from "next/navigation"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function OrdersTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {

    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [rowSelection, setRowSelection] = useState({})

    const router = useRouter();

    useEffect(() => {
        if (!socket.connected) {
            socket.connect();
        }
    
        socket.emit("join-admin");
    
        socket.on("new-order", ({ order }) => {
            console.log("💰 Nueva orden pagada:", order);
            router.refresh();
        });
    
        return () => {
            socket.off("new-order");
        };
    }, []);


    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            rowSelection,
            columnFilters,
        },
    })

    const handleDelete = () => {
        const selectedRows = table.getFilteredSelectedRowModel().rows
        //-Array de ids
        const selectedIds = selectedRows.map((row) => (row.original as any).id)
        console.log(selectedIds)
    }

    return (
        <div className="rounded-md border">
            <div className="flex items-center justify-between p-2">

                {/* Buscador */}
                <TableFilterSearch 
                    table={table} 
                    searchKey="id" 
                />

                <div className="flex gap-2">
                    {/* Eliminar */}
                    <Button
                        disabled={table.getFilteredSelectedRowModel().rows.length === 0} //- deshabilitamos el boton si no hay filas seleccionadas
                        onClick={handleDelete}
                        variant="destructive" 
                        className="rounded-lg h-8 cursor-pointer text-md"
                        >
                        <Trash2 className="size-5"/>
                    </Button>
                </div>
            </div>

            {/* Tabla */}
            <Table>

                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>

                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            

            <DataTablePagination table={table} />
            
        </div>
    )
}