"use client"

import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable,} from "@tanstack/react-table"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import { DataTablePagination } from "@/components/dashboard/TablePagination"
import { useState } from "react"
import { TableFilterSearch } from "@/components/dashboard/TableFilterSearch"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"
import { useProductDialogStore } from "@/store"
import { Sheet } from "@/components/ui/sheet"
import { AlertConfirmDialog, SheetProduct } from "@/components"
import { Category, Product } from "@/interfaces"
import { deleteManyProducts } from "@/actions"
import { useRouter } from "next/navigation"
import { AlertDialog } from "@/components/ui/alert-dialog"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    categories: Category[]
}

export function ProductsTable<TData, TValue>({ columns, data, categories }: DataTableProps<TData, TValue>) {

    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [rowSelection, setRowSelection] = useState({})

    // Dialog Edit or New Product
    const { open, closeDialog, openDialog } = useProductDialogStore()
    const [openAlertDialog, setOpenAlertDialog] = useState(false);
    const router = useRouter()

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

    const handleDeleteMany = async() => {
        const selectedRows = table.getFilteredSelectedRowModel().rows
        //-Array de ids
        const selectedIds = selectedRows.map((row) => (row.original as Product).id)
        try {
            const productDeleted = await deleteManyProducts(selectedIds)
            if(productDeleted.ok) {
                router.refresh()
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="rounded-md border">
            <div className="flex items-center justify-between p-2">

                {/* Buscador */}
                <TableFilterSearch 
                    table={table} 
                    searchKey="title" 
                />

                <div className="flex gap-2">
                    {/* Agregar */}
                    <Button
                        onClick={() => openDialog()} //- abrimos el dialogo para agregar un nuevo producto
                        variant="outline" 
                        className="rounded-lg h-8 cursor-pointer text-md"
                    >
                        <Plus className="size-5"/>
                    </Button>

                    {/* Eliminar */}
                    <Button
                        disabled={table.getFilteredSelectedRowModel().rows.length === 0} //- deshabilitamos el boton si no hay filas seleccionadas
                        onClick={() => setOpenAlertDialog(true)}
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

            {/* SideBar de edicion */}
            <Sheet open={open} onOpenChange={closeDialog}>
                <SheetProduct categories={categories}/> {/* Conenido de sidebar */}
            </Sheet>

            {/* ---- Dialogo de confirmación ---- */}
            <AlertDialog open={openAlertDialog} onOpenChange={setOpenAlertDialog}>
              <AlertConfirmDialog
                  title={`Are you sure to delete ${table.getFilteredSelectedRowModel().rows.length} Products?`}    
                  action={ "destroy"}
                  onConfirm={handleDeleteMany}
              />
            </AlertDialog>
            
        </div>
    )
}