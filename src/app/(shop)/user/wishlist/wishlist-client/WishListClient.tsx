"use client"

import { useWishlistStore } from "@/store";
import { Heart } from "lucide-react";
import { columns } from "../wishllist-columns/wishList-columns";
import { CommonTable } from "../../components";


export default function WishListClient() {

    const {wishlist} = useWishlistStore();

    return (
        <div className="container mx-auto py-8">

            <div className="flex items-center gap-5 mb-8">
                <Heart size={48} strokeWidth={3} />
                <h1 className="text-4xl font-bold ">Wishlist</h1>
            </div>


            <CommonTable 
                columns={columns} 
                data={wishlist} 
            />
        </div>
    );
}