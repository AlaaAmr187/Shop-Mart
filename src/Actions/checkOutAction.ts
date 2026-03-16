'use server'
import { authOptions } from "@/auth";
import { ShippingAdress } from "@/Interfaces/CartInterface";
import { getServerSession } from "next-auth";


export async function checkOutAction(cardId: string, shippingAdress: ShippingAdress) {
    const session = await getServerSession(authOptions)
    const response = await fetch(`${process.env.API_URL}/orders/checkout-session/${cardId}?url=${process.env.BASE_URL}`, {
        method: 'POST',
        headers: {
            token: session?.token as string,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ shippingAdress })
    })
    const data = await response.json();
    return data
}



export async function cashCheckOutAction(cardId: string, shippingAdress: ShippingAdress) {
    const session = await getServerSession(authOptions)
    const response = await fetch(`${process.env.API_URL}/orders/${cardId}`, {
        method: 'POST',
        headers: {
            token: session?.token as string,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ shippingAdress })
    })
    const data = await response.json();
    return data
}

