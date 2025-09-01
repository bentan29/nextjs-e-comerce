'use client'

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { ChevronRight, Menu, Moon, ShieldCheck, ShoppingCart, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { SidebarShop } from "../sidebar/SidebarShop";
import { UserDropdown } from "./user-dropdown/UserDropdown";
import { Separator } from "@/components/ui/separator";
import { MenuNavbar, SearchFilter } from "@/components";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store";
import { Suspense, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export const NavbarShop = () => {

    const {theme, setTheme} = useTheme();
    const itemsInCart = useCartStore(state => state.getTotalItems());
    const [loaded, setLoaded] = useState(false);

    //- Tomamos los datos de la sesion
    const { data:session } = useSession();
    
    useEffect(() => {
        setLoaded(true);
    },[])

    return (
        <nav className="sticky top-0 shadow-lg shadow-black/50 z-50 text-white">

            {/* -- Admin Panel -- */}
            {session?.user.role === 'admin' &&
                <div className="text-white font-semibold bg-yellow-600 py-0.5">
                    <Link 
                        href="/admin" 
                        className="flex container mx-auto items-center justify-center hover:underline transition-all hover:text-yellow-300 underline-offset-4"
                    >
                        <ShieldCheck size={20} className="mr-2"/>
                        <h1>Go to the Admin Panel</h1>
                        <ChevronRight size={20} />
                    </Link>
                </div>
            }
            
            <div className="bg-custom-blue">
                <section className="py-4">
                    <div className="flex items-center gap-4 justify-between container mx-auto">
                        {/* LEFT */}
                        <div className="flex flex-1 items-center gap-4 flex-nowrap overflow-hidden">
                            
                            {/* ----!! Menu Sidebar !!----*/}
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button size="sm" variant="ghost" className="md:hidden block">
                                        <Menu/>
                                    </Button>
                                </SheetTrigger>
                                {/*---- Aca esta el contenido de sidebar !!!! ----*/}
                                <SidebarShop/>
                            </Sheet>

                            {/* Titulo */}
                            <Link href="/">
                                <h1 className="text-2xl flex items-center font-bold whitespace-nowrap text-yellow-500">
                                    E-comerce | Shop
                                </h1>
                            </Link>
                        
                            {/*---- Input Search, buscador ----*/}
                            <div className="hidden md:block w-2/3">
                                <Suspense fallback={<p>Loading...</p>}>
                                    <SearchFilter/>
                                </Suspense>
                            </div>
                        </div>
                        
                        {/* RIGHT */}
                        <div className="flex items-center gap-3 h-8">

                            {/* Carrito */}
                            <div className="relative">
                                <Link href="/user/cart" className="h-8 w-8 border border-gray-700 p-1 rounded-full relative flex items-center justify-center cursor-pointer" >
                                    <ShoppingCart className="h-4 w-4" />
                                </Link>                                
                                {loaded && itemsInCart > 0 && (
                                    <Badge  
                                        className="absolute top-[-8px] right-[-8px] rounded-full text-white bg-green-700 h-5 w-5 text-sm ">
                                            {itemsInCart}
                                    </Badge>
                                )}
                            </div>

                            {/* --- User Dropdown */}
                            <UserDropdown session={session}/>

                            <p className="text-sm hidden md:block text-muted-foreground">
                                {session?.user?.name}
                            </p>

                            <Separator orientation="vertical" className="bg-white/20"/>

                            {/* --- Theme */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className="rounded-full bg-transparent text-white" variant="secondary" size="icon">
                                        <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                                        <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                                        <span className="sr-only">Toggle theme</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => setTheme("light")}>
                                        Light
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                                        Dark
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setTheme("system")}>
                                        System
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </section>
            

                {/* ------ Bottom Menus, categorias ------*/}
                <section className="hidden md:block bg-white/5">
                    <div className="container mx-auto">
                        <MenuNavbar/>
                    </div>
                </section>
            </div>
        </nav>
    )
}
