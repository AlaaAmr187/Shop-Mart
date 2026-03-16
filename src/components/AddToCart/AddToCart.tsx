'use client'
import { CardFooter } from '../ui/card'
import { Button } from '../ui/button'
import { Heart, Loader2, ShoppingCartIcon } from 'lucide-react'
import { CartRes } from '@/Interfaces/CartInterface'
import { useState } from 'react'
import { addToCartAction } from '@/Actions/addtoCart.action'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import WhishList from '../WhishList/WhishList'

export default function AddToCart({ productId }: { productId: string }) {

    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    async function addToCart(productId: string) {
        setIsLoading(true)

        try {
            const data: CartRes = await addToCartAction(productId)

            if (data.status == 'success') {
                toast.success(data.message + '')
                dispatchEvent(new CustomEvent('cartUpdated', { detail: data.numOfCartItems }))
            }

        } catch (err) {
            router.push('/login')
        }

        setIsLoading(false)
    }



    return (
        <CardFooter className='gap-2'>

            <Button
                disabled={isLoading}
                onClick={() => addToCart(productId)}
                className='grow gap-2'
            >
                {isLoading ? <Loader2 className='animate-spin' /> : <ShoppingCartIcon />}
                Add To Cart
            </Button>

            <WhishList productId={productId}/>
        </CardFooter>
    )
}
