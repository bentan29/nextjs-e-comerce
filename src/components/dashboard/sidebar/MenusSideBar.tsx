'use client'

import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Box, ChartColumnBig, Inbox, Users } from "lucide-react";
import Link from "next/link";

interface Item {
    title: string;
    url: string;
    icon: React.ReactNode;
}

const items: Item[] = [
    {
        title: "Dashboard",
        url: "/admin",
        icon: <ChartColumnBig />
    },
    // {
    //     title: "Inbox",
    //     url: "#",
    //     icon: <Inbox/>
    // },
    {
        title: "Products",
        url: "/admin/products",
        icon: <Box/>
    },
    {
        title: "Users",
        url: "/admin/users",
        icon: <Users/>
    },
]

export const MenusSideBar = () => {
  return (
    <SidebarGroup>
        <SidebarGroupLabel>Menu</SidebarGroupLabel>
        <SidebarGroupContent>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                            <Link href={item.url}>
                                {item.icon}
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                        {/* {item.title === "Inbox" && (
                            <SidebarMenuBadge>24</SidebarMenuBadge>
                        )} */}
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroupContent>
    </SidebarGroup>
  )
}
