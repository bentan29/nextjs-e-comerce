'use client'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Size, SizeStock } from "@/interfaces"
import { cn } from "@/lib/utils"

interface SizeSelectorProps {
    sizesStock: SizeStock[]
    selectedSize: SelectedSize[]
    onSizeChanged: (sizes: SelectedSize[]) => void
    getAvailableStock: (size: string) => number
}

export type SelectedSize = {
    idSizeStock: string
    size: Size
    quantity: number
}

export const SizeSelector = ({ sizesStock, selectedSize, onSizeChanged, getAvailableStock }: SizeSelectorProps) => {

    const handleSelectSize = (size: string) => {
        const exists = selectedSize.find((s) => s.size === size)
        if (exists) {
            // Deseleccionar talla
            const updated = selectedSize.filter((s) => s.size !== size)
            onSizeChanged(updated)
        } else {
            // Seleccionar talla nueva con cantidad 1
            const idStock = sizesStock.find(s => s.size === size)?.id ?? ''
            const updated: SelectedSize[] = [
                ...selectedSize,
                {
                    idSizeStock: idStock,
                    size: size as Size,
                    quantity: 1
                }
            ]
            onSizeChanged(updated)
        }
    }

    const handleChangeQuantity = (size: string, delta: number) => {
        const updated = selectedSize
            .map((s) =>
                s.size === size
                    ? {
                          ...s,
                          quantity: Math.max(
                              1,
                              Math.min(s.quantity + delta, getAvailableStock(size))
                          ),
                      }
                    : s
            )
            .filter((s) => s.quantity > 0)
        onSizeChanged(updated)
    }

    return (
        <div className="flex items-center gap-2">
            {sizesStock.map(({ size }) => {
                const selected = selectedSize.find((s) => s.size === size)

                return (
                    <div key={size} className="relative mt-4 w-15">
                        <Button
                            onClick={() => handleSelectSize(size)}
                            className={cn(
                                "rounded-none cursor-pointer w-full h-7 bg-yellow-300/40 border border-yellow-500 text-black hover:bg-yellow-500 font-bold hover:transition",
                                selected && "bg-yellow-400"
                            )}
                        >
                            {size}
                        </Button>

                        {selected && (
                            <div className="absolute top-[-18] left-0 flex items-center">
                                <Button
                                    className="h-3 w-5 mb-2 px-1 py-2 text-lg font-bold rounded-none cursor-pointer"
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleChangeQuantity(size, -1)}
                                >
                                    -
                                </Button>

                                <Badge className="border border-yellow-500 bg-black h-5 w-5 text-xs rounded-md text-white">
                                    {selected.quantity}
                                </Badge>

                                <Button
                                    className="h-3 w-5 mb-2 px-1 py-2 text-lg font-bold rounded-none cursor-pointer"
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleChangeQuantity(size, 1)}
                                >
                                    +
                                </Button>
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}
