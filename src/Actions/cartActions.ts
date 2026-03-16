'use server'

import { authOptions } from "@/auth"
import { getServerSession } from "next-auth"

export async function deleteProductAction(productId: string) {
    const session = await getServerSession(authOptions)
    const response = await fetch(`${process.env.API_URL}/cart/${productId}`, {
        method: 'DELETE',
        headers: {
            token: session?.token as string
        }
    })
    const data = await response.json();
    return data
}


export async function cleareCartAction() {
    const session = await getServerSession(authOptions)
    const response = await fetch(`${process.env.API_URL}/cart/`, {
        method: 'DELETE',
        headers: {
            token: session?.token as string
        }
    })
    const data = await response.json();
    return data
}

export async function UpdateProductAction(productId: string, count: number) {
    const session = await getServerSession(authOptions)
    const response = await fetch(`${process.env.API_URL}/cart/${productId}`, {
        method: 'PUT',
        headers: {
            token: session?.token as string,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            count
        })
    })
    const data = await response.json();
    return data
}

