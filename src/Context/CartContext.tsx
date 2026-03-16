'use client'

import { createContext, useContext, useState, ReactNode } from "react"

interface CartContextType {
    cartCount: number
    setCartCount: (count: number) => void
}

interface CartProviderProps {
    children: ReactNode
    initialCartCount: number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children, initialCartCount }: CartProviderProps) {
    const [cartCount, setCartCount] = useState<number>(initialCartCount)

    return (
        <CartContext.Provider value={{ cartCount, setCartCount }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart(): CartContextType {
    const context = useContext(CartContext)
    if (!context) throw new Error("useCart must be used inside CartProvider")
    return context
}
