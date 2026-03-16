'use client'
import { cleareCartAction, deleteProductAction, UpdateProductAction } from '@/Actions/cartActions'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/Helpers/formatCurrency'
import { CartRes } from '@/Interfaces/CartInterface'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import CheckOutSession from '../CheckOutSession/CheckOutSession'
export default function Cart({ cartData }: { cartData: CartRes | null }) {
    const [cart, setCart] = useState<CartRes | null>(cartData || null);
    const [loadingId, setLoadingId] = useState<string | null>(null);


    new CustomEvent('cartUpdated', { detail: cart?.numOfCartItems });





    async function deleteCartProduct(productId: string) {
        setLoadingId(productId);
        const response: CartRes = await deleteProductAction(productId);
        if (response.status == 'success') {
            setCart(response)
            dispatchEvent(new CustomEvent('cartUpdated', { detail: response.numOfCartItems }))
        } setLoadingId(null)
    }
    async function crealeCart() {
        setLoadingId('clear')
        const response: CartRes = await cleareCartAction();
        if (response.message == 'success') {
            setCart(null);
            dispatchEvent(new CustomEvent('cartUpdated', { detail: 0 }))
        }
        setLoadingId(null)
    }
    async function updateCartProduct(productId: string, count: number) {
        setLoadingId(productId);
        const response: CartRes = await UpdateProductAction(productId, count);
        if (response.status == 'success') {
            setCart(response);
            toast.success('Product Count Updated')
        }
        setLoadingId(null)
    } return (
        <>
            {cart ? <div className='container mx-auto px-4 py-6'>
                <h1 className='text-3xl font-bold tracking-tight'>Shopping Cart</h1>
                <p className='text-muted-foreground mt-1'>{cart.numOfCartItems} item in your cart</p>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start mt-6">
                    <div className="lg:col-span-2 space-y-4">
                        {cart.data.products.map((product) =>
                            <div key={product._id} className="flex gap-4 relative rounded-xl border p-4 shadow-sm bg-card">
                                {loadingId == product.product.id &&
                                    <div className="absolute flex justify-center items-center inset-0 bg-white/80"> <Loader2 className='animate-spin' />
                                    </div>}
                                <img src={product.product.imageCover} alt={product.product.title} className='w-24 h-24 rounded-lg object-cover md:w-28 md:h-28' />
                                <div className="flex-1">
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                                        <div className="min-w-0">
                                            <h3 className='font-semibold text-base md:text-lg line-clamp-2'> {product.product.title} </h3>
                                            <p className='text-sm text-muted-foreground mt-1'>{product.product.brand.name} - {product.product.category.name} </p>
                                        </div> <div className="text-right shrink-0">
                                            <div className="font-semibold"> {formatCurrency(product.price)} </div>
                                        </div>
                                    </div>
                                    <div className="mt-3 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <button disabled={product.count == 1} aria-label='decrease' className='size-8 rounded-lg border hover:bg-accent' onClick={() => updateCartProduct(product.product.id, product.count - 1)} > -
                                            </button> <span className='w-6 text-center font-medium'> {product.count} </span>
                                            <button disabled={product.count == product.product.quantity} aria-label='increase' className='size-8 rounded-lg border hover:bg-accent' onClick={() => updateCartProduct(product.product.id, product.count + 1)} > + </button>
                                        </div> <button onClick={() => deleteCartProduct(product.product.id)}
                                            aria-label='remove'
                                            className=' text-destructive hover:underline text-sm cursor-pointer flex gap-1 items-center'> Remove </button>
                                    </div>
                                </div>
                            </div>)}
                    </div>
                    <div className="lg:col-span-1 sticky top-18">
                        <div className="rounded-xl border p-5 shadow-sm">
                            <h2 className='text-lg font-semibold'>Order Summary</h2>
                            <div className="mt-4 space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className='text-sm text-muted-foreground'> SubTotal ({cart.numOfCartItems} items)
                                    </span>
                                    <span className='font-semibold'>{formatCurrency(cart.data.totalCartPrice)}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className='text-sm text-muted-foreground'>Shipping</span>
                                    <span className=' text-emerald-600 font-medium'>Free</span>
                                </div> </div> <div className="my-4 border-t">
                                <div className="flex items-center justify-between">
                                    <span className='text-base font-semibold'>Total</span>
                                    <span className='text-base font-bold'>{formatCurrency(cart.data.totalCartPrice)}</span>
                                </div>
                                <Button className=' w-full mt-3 h-11 rounded-xl border bg-white text-black hover:bg-accent'> Continue Shopping </Button>
                                <CheckOutSession cartId={cart.cartId} />
                                </div> <Button onClick={crealeCart} variant={'outline'} className='text-destructive hover:text-destructive mt-2 ms-auto flex cursor-pointer'>
                                {loadingId == 'clear' && <Loader2 className=' animate-spin' />} Clear Cart </Button>
                        </div>
                    </div>
                </div>
            </div>
                : <div className="min-h-[60vh] flex justify-center items-center flex-col">
                    <h2 className='text-2xl mb-3'>Your Cart Is Empty</h2>
                    <Link href={'/products'} className=''>
                        <Button> Add Ones </Button>
                    </Link>
                </div>}
        </>
    )
}