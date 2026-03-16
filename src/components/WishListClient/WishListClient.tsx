'use client'
import React, { useEffect, useState } from 'react'
import { product } from '@/Interfaces/productInterface'
import { Star, StarHalf, Loader2, ShoppingCartIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { formatCurrency } from '@/Helpers/formatCurrency'
import AddToCart from '../AddToCart/AddToCart'



export default function WishlistClient({ initialProducts }: { initialProducts: product[] }) {
    const [products, setProducts] = useState(initialProducts)

    useEffect(() => {
        function handleRemove(e: CustomEvent) {
            const removedId = e.detail
            setProducts(products => products.filter(p => p.id !== removedId))
        }

        window.addEventListener('wishlistUpdated', handleRemove as EventListener)
        return () => {
            window.removeEventListener('wishlistUpdated', handleRemove as EventListener)
        }
    }, [])

    return (
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.length > 0 ? products.map(product => (
                <div key={product.id} className='p-2'>
                    <Card className='overflow-hidden pt-0'>
                        <Link href={'/products/' + product.id}>
                            <div className="-m-1">
                                <Image src={product.imageCover} alt={product.title} width={200} height={150} className='w-full object-cover' />
                            </div>
                            <CardHeader className='mt-2'>
                                <CardDescription>{product.brand.name}</CardDescription>
                                <CardTitle className='line-clamp-1'>{product.title}</CardTitle>
                                <CardDescription>{product.category.name}</CardDescription>
                            </CardHeader>
                            <CardContent className='flex flex-col gap-2'>
                                <div className="flex">
                                    <Star className='text-amber-400 fill-amber-400' />
                                    <Star className='text-amber-400 fill-amber-400' />
                                    <Star className='text-amber-400 fill-amber-400' />
                                    <Star className='text-amber-400 fill-amber-400' />
                                    <StarHalf className='text-amber-400 fill-amber-400' />
                                    <p>({product.ratingsAverage})</p>
                                </div>
                                <p>{formatCurrency(product.price)}</p>
                            </CardContent>
                        </Link>
                        <AddToCart productId={product.id} />
                    </Card>
                </div>
            )) : <div className='col-span-full'><h1 className='text-center text-xl text-gray-500 py-10 font-medium'>WishList Is Empty</h1></div>}
        </div>
    )
}
