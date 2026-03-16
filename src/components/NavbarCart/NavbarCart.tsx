'use client'

import Link from "next/link"
import { NavigationMenuItem, NavigationMenuLink } from "../ui/navigation-menu"
import { ShoppingCartIcon } from "lucide-react"
import { useEffect, useState } from "react"

export default function NavbarCart({ serverCartNum, userCartId }: { serverCartNum: number, userCartId: string }) {

    const [cartNum, setCartNum] = useState(serverCartNum);
    useEffect(() => {
        if (userCartId) {
            localStorage.setItem('userCartId', userCartId)
        }

        function handler(e: CustomEvent) {
            setCartNum(e.detail)
        }

        window.addEventListener('cartUpdated', handler as EventListener)

        return () => window.removeEventListener('cartUpdated', handler as EventListener)
    }, [userCartId])


    return (
        <NavigationMenuItem>
            <Link href="/cart" className="relative block">
                <ShoppingCartIcon className="size-5 text-inherit" />

                <span className="absolute w-4 h-4 inset-s-5/6 -top-3 z-10 text-xs bg-accent-foreground text-accent flex justify-center items-center rounded-full">
                    {cartNum || 0}
                </span>
            </Link>
        </NavigationMenuItem>

    )
}
