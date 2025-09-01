'use client'

import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Box, ChevronDown, Heart, LogIn, LogOut, ShoppingCart, User, UserRoundX } from "lucide-react"
import Link from 'next/link'
import { useWishlistStore } from "@/store/wishlist/wishlist-store"
import { signOut } from 'next-auth/react'
import { cn } from '@/lib/utils'
import { Session } from 'next-auth'

interface Props {
    session: Session | null;
}

export const UserDropdown = ({session}: Props) => {

    const { wishlistCount } = useWishlistStore();
    // const { data:session } = useSession();
    const isAuthenticated = !!session?.user;

    return (
        <DropdownMenu>

            <DropdownMenuTrigger className='flex items-center gap-1 bg-custom-blue-secondary rounded-full p-0.5'>
                <Avatar className='size-7'>
                    <AvatarFallback className={cn(isAuthenticated && 'text-sm text-white bg-black')}>
                        {isAuthenticated ? (
                                session?.user?.name
                                    ?.split(' ')
                                    .slice(0, 2)
                                    .map(n => n[0])
                                    .join('')
                                    .toUpperCase() ?? <User />
                        ) : (
                            <UserRoundX size={16}/>
                        )}
                    </AvatarFallback>
                </Avatar>
                <ChevronDown size={18}/>
            </DropdownMenuTrigger>

            <DropdownMenuContent sideOffset={10} className='rounded-sm'>

                <DropdownMenuLabel className='text-muted-foreground text-center bg-muted/50 rounded-t-sm'>My Account</DropdownMenuLabel>

                <DropdownMenuSeparator />

                {
                    !isAuthenticated && (
                        <>
                            <Link href='/auth/login'>
                                <DropdownMenuItem 
                                    className='bg-green-800/20 cursor-pointer rounded-none'
                                    >
                                    <LogIn className="h-[1.2rem] w-[1.2rem] mr-2"/>
                                    LogIn
                                </DropdownMenuItem>
                            </Link>

                            <DropdownMenuSeparator />
                        </>
                    )
                }


                {/* Wishlist */}
                <Link href='/user/wishlist'>
                    <DropdownMenuItem className='cursor-pointer'>
                        <Heart className="h-[1.2rem] w-[1.2rem] mr-1"/>
                        Wishlist
                        <span className='text-muted-foreground ml-2'>
                            {wishlistCount() > 0 && wishlistCount()}
                        </span>
                    </DropdownMenuItem>
                </Link>

                {/* Cart */}
                <Link href='/user/cart'>
                    <DropdownMenuItem className='cursor-pointer'>
                        <ShoppingCart className="h-[1.2rem] w-[1.2rem] mr-1"/>
                        Cart
                    </DropdownMenuItem>
                </Link>

            

                {isAuthenticated && (
                    <>
                        <DropdownMenuSeparator />
                    
                        {/* Orders */}
                        <Link href='/user/orders'>
                            <DropdownMenuItem className='cursor-pointer'>
                                <Box className="h-[1.2rem] w-[1.2rem] mr-1"/>
                                Orders
                            </DropdownMenuItem>
                        </Link>

                        {/* Profile */}
                        <Link href="/user/profile">
                            <DropdownMenuItem className='cursor-pointer'>
                                <User className="h-[1.2rem] w-[1.2rem] mr-1"/>
                                Profile
                            </DropdownMenuItem>
                        </Link>

                        <DropdownMenuSeparator />

                            {/* Logout */}
                            <DropdownMenuItem 
                                onClick={() => signOut({callbackUrl: '/'})}
                                className='bg-red-800/20 cursor-pointer rounded-b-sm rounded-t-none'
                            >
                                <LogOut className="h-[1.2rem] w-[1.2rem] mr-2"/>
                                Logout
                            </DropdownMenuItem>
                        </>
 
                    )
                }

            </DropdownMenuContent>
        </DropdownMenu>
    )
}
