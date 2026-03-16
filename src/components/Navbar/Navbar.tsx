import Link from 'next/link'
import React from 'react'
import {
    NavigationMenu,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { UserIcon } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import Logout from '../LogOut/Logout'
import NavbarCart from '../NavbarCart/NavbarCart'
import NavbarLinks from '../NavbarLinks/NavbarLinks'
import { CartRes } from '@/Interfaces/CartInterface'

export default async function Navbar() {

    const session = await getServerSession(authOptions);
    let data: CartRes | null = null;
    if (session) {
        const response = await fetch(`${process.env.API_URL}/cart`, {
            headers: {
                token: session?.token as string
            }
        });
        data = await response.json();
    }

    return (
        <nav className='bg-gray-100 shadow py-4 fixed top-0 left-0 w-full z-50 mb-14'>
            <div className="container mx-auto font-semibold flex items-center justify-between px-4">

                <div className="flex items-center gap-4 order-3 md:order-3">
                    <NavigationMenu>
                        <NavigationMenuList>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <UserIcon className='size-5 cursor-pointer' />
                                </DropdownMenuTrigger>

                                <DropdownMenuContent>
                                    <DropdownMenuGroup>

                                        {session ?
                                            <>
                                            <DropdownMenuLabel>{session.user.name}</DropdownMenuLabel>
                                                <Link href={'/allorders'}>
                                                    <DropdownMenuItem>MyOrder</DropdownMenuItem>
                                                </Link>
                                                <Link href={'/wishlist'}>
                                                    <DropdownMenuItem>WishList</DropdownMenuItem>
                                                </Link>

                                                <Logout />
                                            </>
                                            :
                                            <>
                                                <Link href={'/login'}>
                                                    <DropdownMenuItem>Login</DropdownMenuItem>
                                                </Link>

                                                <Link href={'/register'}>
                                                    <DropdownMenuItem>Register</DropdownMenuItem>
                                                </Link>
                                            </>
                                        }

                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            {session && data && <NavbarCart serverCartNum={data.numOfCartItems} userCartId={data.data.cartOwner} />}

                        </NavigationMenuList>
                    </NavigationMenu>
                </div>


                <Link
                    className="flex items-center justify-center order-2 md:order-1"
                    href={'/'}
                >
                    <div className="w-10 h-10 bg-black flex items-center justify-center mr-2 rounded-md">
                        <span className="text-white font-bold text-1xl">S</span>
                    </div>

                    <span className="text-2xl md:text-2xl font-bold text-black">
                        ShopMart
                    </span>
                </Link>


                <div className="order-1 md:order-2 ">
                    <NavbarLinks />
                </div>

            </div>
        </nav>
    )
}
