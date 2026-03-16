import { product } from '@/Interfaces/productInterface';
import { Params } from 'next/dist/server/request/params'
import React from 'react'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {  Star, StarHalf } from 'lucide-react';
import Slider from '@/components/Slider/Slider';
import AddToCart from '@/components/AddToCart/AddToCart';
import { formatCurrency } from '@/Helpers/formatCurrency';

export default async function ProductDetails({ params }: { params: Params }) {

    const { productId } = await params;

    const response = await fetch(`${process.env.API_URL}/products/` + productId);
    const { data: product }: { data: product } = await response.json();
    return (
        <div className=''>
            <Card className='grid grid-cols-1 md:grid-cols-3 items-center mt-28'>
                <div className="w-full">
                    <Slider images={product.images} title={product.title} />
                </div>
                <div className="col-span-2 space-y-5 p-4">
                    <CardHeader className='mt-2'>
                        <CardDescription>{product.brand.name}</CardDescription>
                        <CardTitle className=''>{product.title}</CardTitle>
                        <CardAction>{product.category.name}</CardAction>
                        <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent className='flex gap-2 flex-col'>
                        <div className="flex">
                            <Star className='text-amber-400 fill-amber-400' fill='true' />
                            <Star className='text-amber-400 fill-amber-400' fill='true' />
                            <Star className='text-amber-400 fill-amber-400' fill='true' />
                            <Star className='text-amber-400 fill-amber-400' fill='true' />
                            <StarHalf className='text-amber-400 fill-amber-400' />
                            <p>({product.ratingsAverage})</p>
                        </div>
                        <p>{formatCurrency(product.price)}</p>
                    </CardContent>
                    <AddToCart productId={product.id}/>
                </div>
            </Card>
        </div>
    )
}