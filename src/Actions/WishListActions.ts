'use server'

import { authOptions } from "@/auth"
import { getServerSession } from "next-auth"



export async function addToWishListAction(productId: string) {

    const session = await getServerSession(authOptions);
    if (session) {
        console.log(session.token)
        const response = await fetch(`${process.env.API_URL}/wishlist`,
            {
                method: 'POST',
                body: JSON.stringify({ productId }),
                headers: {
                    token: session?.token as string,
                    'Content-Type': 'application/json'
                }
            }
        );
        const data = await response.json();
        console.log(data)
        return data;
    }
    else {
        return null;
    }
}

export async function deleteWishListAction(productId: string) {
    const session = await getServerSession(authOptions)
    const response = await fetch(`${process.env.API_URL}/wishlist/${productId}`, {
        method: 'DELETE',
        headers: {
            token: session?.token as string
        }
    })
    const data = await response.json();
    return data
}


export async function geteWishListAction() {
    const session = await getServerSession(authOptions)
    const response = await fetch(`${process.env.API_URL}/wishlist`, {
        method: 'GET',
        headers: {
            token: session?.token as string
        }
    })
    const data = await response.json();
    return data
}


