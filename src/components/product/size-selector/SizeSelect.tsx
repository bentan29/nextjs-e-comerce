'use client'

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Size, SizeStock } from "@/interfaces"
import { cn } from "@/lib/utils";
// import { useState } from "react";

interface Props {
    sizesStock: SizeStock[];
    selectedSize: SelectedSize[];
    setSelectedSize: React.Dispatch<React.SetStateAction<SelectedSize[]>>;
    getAvailableStock: (size: string) => number;
}

interface SelectedSize {
    idSizeStock: string;
    size: Size;
    quantity: number;
}


export const SizeSelect = ({sizesStock, selectedSize, setSelectedSize, getAvailableStock}: Props) => {
    
    //- talles que tienen mas de cero articulos disponibles
    const availableSizes = sizesStock.filter((sizeStock) => sizeStock.stock > 0);

    //- Agregamos o quitamos el talle a la lista
    const toggleSize = (sizeStock: SizeStock) => {
        //- Verificamos si ya existe el talle si ya lo tenemos seleccionado
        const exists = selectedSize.find((s) => s.idSizeStock === sizeStock.id);
        if(exists) {
            // Des-seleccionar
            setSelectedSize((prev) => prev.filter((s) => s.idSizeStock !== sizeStock.id));
        } else {
            // Seleccionar con cantidad 1 por defecto
            setSelectedSize((prev) => [
                ...prev,
                {   
                    idSizeStock: sizeStock.id ?? '',
                    size: sizeStock.size,
                    quantity: 1,
                },
            ]);
        }
    }

    
    const handleChangeQuantity = (id: string, delta: number) => {
        
        const maxStock = getAvailableStock(id);

        setSelectedSize((prev) =>
            prev.map((s) => s.idSizeStock === id
                ? {...s, quantity: Math.min(
                    maxStock,
                    Math.max(1, s.quantity + delta) // límite inferior y superior
                  )}
                : s
            )
        );
    };

    return (
        <div className="flex items-center gap-2">
            {availableSizes?.map((sizeStock) => {

                const selected = selectedSize.find((s) => s.idSizeStock === sizeStock.id);
                
                return (
                    <div key={sizeStock.id} className="relative w-15 mt-4">

                        <Button
                            onClick={() => toggleSize(sizeStock)}
                            className={cn(
                                "rounded-none cursor-pointer w-full h-7 bg-yellow-300/20 border border-yellow-500/80 text-primary hover:bg-yellow-500 font-bold hover:transition",
                                selected && "bg-yellow-500 text-secondary"
                            )}
                        >
                            {sizeStock.size}
                        </Button>

                        {selected && (
                            <div className="absolute top-[-18] left-0 flex items-center">

                                <Button 
                                className="h-3 w-5 mb-2 px-1 py-2 text-lg font-bold rounded-none cursor-pointer" 
                                size="sm"
                                variant="ghost"
                                onClick={() => handleChangeQuantity(sizeStock.id ?? '', -1)}
                                >
                                    -
                                </Button>

                                <Badge className="border border-yellow-500 bg-black h-5 w-5 text-xs rounded-md text-white" >
                                    {selected?.quantity}
                                </Badge>

                                <Button
                                onClick={() => handleChangeQuantity(sizeStock.id ?? '', 1)}
                                className="h-3 w-5 mb-2 px-1 py-2 text-lg font-bold rounded-none cursor-pointer" 
                                size="sm"
                                variant="ghost"
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
