'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Menu } from "lucide-react"

export default function NavbarLinks() {

    const [openMenu, setOpenMenu] = useState(false)

    return (
        <div className=" w-full">

            <div className="md:hidden">
                <button onClick={() => setOpenMenu(!openMenu)}>
                    <Menu className="size-6 cursor-pointer" />
                </button>
            </div>

            <div className="hidden md:block">
                <NavigationMenu>
                    <NavigationMenuList>

                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link href="/products">Products</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link href="/brands">Brands</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link href="/categories">Categories</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                    </NavigationMenuList>
                </NavigationMenu>
            </div>

            {openMenu && (
                <div className="md:hidden absolute top-16 left-0 z-10 my-4  w-full bg-white shadow-md">
                    <ul className="flex flex-col items-center gap-6 py-4">

                        <li>
                            <Link href="/products" onClick={() => setOpenMenu(false)}>
                                Products
                            </Link>
                        </li>

                        <li>
                            <Link href="/brands" onClick={() => setOpenMenu(false)}>
                                Brands
                            </Link>
                        </li>

                        <li>
                            <Link href="/categories" onClick={() => setOpenMenu(false)}>
                                Categories
                            </Link>
                        </li>

                    </ul>
                </div>
            )}


        </div>
    )
}
