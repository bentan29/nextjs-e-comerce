'use client'

import { findCityById, findProvinceById } from "@/actions";
import { Separator } from "@/components/ui/separator";
import { currencyFormat } from "@/utils/currencyFormat";
import { MapPinHouse, MapPinned, Phone, Radar } from "lucide-react";
import { useEffect, useState } from "react";

interface PaymentDataProps {
    firstName: string;
    lastName: string;
    address: string;
    address2?: string;
    postalCode: string;
    phone: string;
    itemsInCart: number;
    subTotal: number;
    tax: number;
    total: number;
    city_id: string;
    province_id: string;
}

export const PaymentData = ({ firstName, lastName, address, address2, postalCode, phone, itemsInCart, subTotal, tax, total, city_id, province_id }: PaymentDataProps) => {
    
    const [loadingLocationNames, setLoadingLocationNames] = useState(false);
    const [nameCity, setNameCity] = useState('');
    const [nameProvince, setNameProvince] = useState('');
    
    //- Efecto para cargar nombres de ciudad y provincia
    useEffect(() => {
        async function fetchNames() {
            if(city_id && province_id) {
                setLoadingLocationNames(true);
                try {
                    const city = await findCityById(city_id);
                    const province = await findProvinceById(province_id);
                    if(city) setNameCity(city.name);
                    if(province) setNameProvince(province.name);
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoadingLocationNames(false);
                }
            }
        }
        fetchNames();
    }, [city_id, province_id]);
    
    return (
        <div className="space-y-3 bg-white p-3 rounded-sm shadow-xl">

            {/*-------- Address Data ------- */}
            <div className="bg-green-200 p-3 rounded-sm">
                <h2 className="text-2xl mb-2 font-semibold text-black/80">Order Address</h2>
                <p className="text-xl">{firstName} {lastName}</p>

                <div className="flex items-center gap-2">
                    <MapPinHouse size={16} className="text-black/70"/>
                    <p>{address}</p>
                </div>

                {address2 && (
                    <div className="flex items-center gap-2">
                        <MapPinHouse size={16} className="text-black/70"/>
                        <p>{address2}</p>
                    </div>
                )}

                <div className="flex items-center gap-2">
                    <Radar size={16} className="text-black/70"/>
                    <p>{postalCode}</p>
                </div>

                <div className="flex items-center gap-2">
                    <MapPinned size={16} className="text-black/70"/>
                    <p>
                        {loadingLocationNames
                            ? <span className="animate-pulse">Loading location...</span>
                            : `${nameCity}, ${nameProvince}`
                        }
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <Phone size={16} className="text-black/70"/>
                    <p>{phone}</p>
                </div>
            </div>

            <Separator className="bg-black/40"/>

            {/*-------- Order Resume Data ------- */}
            <div className="bg-yellow-200 p-3 rounded-sm">

                <h2 className="text-2xl mb-2 font-semibold text-black/80">Order Resume</h2>

                <div className="grid grid-cols-2">
                    <span>Qty. Products</span>
                    <span className="text-right">{itemsInCart === 1 ? '1 product' : `${itemsInCart} products`}</span>
                </div>

                <div className="grid grid-cols-2">
                    <span>Subtotal</span>
                    <span className="text-right">{currencyFormat(subTotal)}</span>
                </div>

                <div className="grid grid-cols-2">
                    <span>Tax (%15)</span>
                    <span className="text-right">{currencyFormat(tax)}</span>
                </div>

                <div className="grid grid-cols-2 mt-3 text-lg border-y border-black/10 py-0.5">
                    <span className="font-bold">Total</span>
                    <span className="text-right font-semibold">{currencyFormat(total)}</span>
                </div>

            </div>
        </div>
    )
}
