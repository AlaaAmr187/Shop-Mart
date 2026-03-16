import { authOptions } from '@/auth'
import Cart from '@/components/Cart/Cart'
import { CartRes } from '@/Interfaces/CartInterface'
import { getServerSession } from 'next-auth'
import React from 'react'

export default async function cartPage() {

    const sessien = await getServerSession(authOptions)
    console.log(sessien?.token)

    const response = await fetch(`${process.env.API_URL}/cart` , {
        headers:{
            token: sessien?.token as string
        }
    });
    const data : CartRes = await response.json();


    return (
        <div className='mt-18'>
            <Cart cartData={data.numOfCartItems == 0? null : data}/>
        </div>
    )
}
