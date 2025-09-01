import { ChevronUp, ShieldCheck, Store, User2 } from "lucide-react"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarSeparator } from "../../ui/sidebar"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import { OrdersSideBar } from "./OrdersSideBar";
import { MenusSideBar } from "./MenusSideBar";
import { getAllOrders } from "@/actions";

export const AppSideBar = async() => {

    const pendingOrders: any = await getAllOrders(false);
    const { totalOrders } = pendingOrders;
    
    return (
        <Sidebar collapsible="icon" className="z-20">

            {/* Header */}
            <SidebarHeader className="group py-4 bg-gradient-to-t from-sidebar to-background backdrop-blur-sm overflow-hidden">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <Link
                            href="/admin"
                            className="flex items-center gap-1 justify-center group-data-[collapsible=icon]:justify-center hover:opacity-80 transition-all duration-150 w-full overflow-hidden"
                        >
                            <ShieldCheck size={22} className="text-primary" />
                            <span className="text-xl font-semibold tracking-tight group-data-[collapsible=icon]:hidden">Admin Panel</span>
                        </Link>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>


            {/* Content Principal */}
            <SidebarContent className="py-4">

                {/* ------------ Menu ------------ */}
                <MenusSideBar/>

                {/* ------------ Orders  -------------*/}
                <OrdersSideBar totalOrders={totalOrders}/>


                {/* Collapsible */}
                {/* <Collapsible defaultOpen className="group/collapsible">
                    <SidebarGroup>
                        <SidebarGroupLabel asChild>
                            <CollapsibleTrigger>
                                Collapsible Group
                                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180"/>
                            </CollapsibleTrigger>
                        </SidebarGroupLabel>
                        <CollapsibleContent>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <Link href="#">
                                                <Projector/>
                                                <span>See all projects</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <Link href="#">
                                                <Plus/>
                                                <span>Add project</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </CollapsibleContent>
                    </SidebarGroup>
                </Collapsible> */}

            </SidebarContent>
        
            {/* -------- Footer -------- */}
            <SidebarFooter>
                <SidebarGroupContent>

                    <SidebarMenu className="text-muted-foreground my-2">
                        <SidebarMenuItem >
                                <SidebarMenuButton asChild className="">
                                    <Link href="/">
                                        <Store/>
                                        <span>Go to the Store</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                    </SidebarMenu>

                    <SidebarSeparator className="mx-auto"/>
                    
                    <SidebarMenu className="my-2">
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton>
                                        <User2/> Nombre Usuario <ChevronUp className="ml-auto"/>
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Account</DropdownMenuItem>
                                    <DropdownMenuItem>Settings</DropdownMenuItem>
                                    <DropdownMenuItem variant="destructive">Sign out</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarFooter>
        </Sidebar>
    )
}
