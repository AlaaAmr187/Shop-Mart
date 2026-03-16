'use server'

import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";

export async function addToCartAction(productId: string) {

    const session = await getServerSession(authOptions);
    if (session) {
        const response = await fetch(`${process.env.API_URL}/cart`,
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
    else{
        console.log('hhhh')
        return null;
    }
}