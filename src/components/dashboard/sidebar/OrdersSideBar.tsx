'use client'

import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Boxes, PackageCheck, SquareCheckBig } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Item {
    title: string;
    url: string;
    icon: React.ReactNode;
}

const itemsOrders: Item[] = [
    {
        title: "All Orders",
        url: "/admin/orders",
        icon: <Boxes />
    },
    {
        title: "Pending Orders",
        url: "/admin/pending-orders",
        icon: <PackageCheck/>
    },
    {
        title: "Confirmed Orders",
        url: "/admin/confirmed-orders",
        icon: <SquareCheckBig />
    },
]


export const OrdersSideBar = ({ totalOrders } : { totalOrders: number }) => {

    const [pendingQuantity, setPendingQuantity] = useState<number>(0);

    useEffect(() => {
        setPendingQuantity(totalOrders);
    },[totalOrders])

    return (
        <SidebarGroup className="bg-background/20">
            <SidebarGroupLabel>Orders</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {itemsOrders.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild>
                                <Link href={item.url}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                            {item.title === "Pending Orders" && (
                                <SidebarMenuBadge className={cn(
                                    "bg-red-600 font-bold text-white px-2", 
                                    pendingQuantity > 0 && "bg-yellow-600")}>
                                    {pendingQuantity }
                                </SidebarMenuBadge>
                            )}
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}
