import AddToCart from '@/components/AddToCart/AddToCart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/Helpers/formatCurrency';
import { product } from '@/Interfaces/productInterface';
import { Star, StarHalf } from 'lucide-react';
import { Params } from 'next/dist/server/request/params'
import Image from 'next/image';
import Link from 'next/link';

export default async function BrandInfo({ params }: { params: Params }) {
    const { brandId } = await params;
    const response = await fetch(
        `${process.env.API_URL}/products?brand=${brandId}`
    );
    const { data }: { data: product[] } = await response.json();

    return (
        <div className='mt-25'>
            <div>{data.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {data.map((product) => <div key={product.id} className='p-2'>
                    <Card className=' overflow-hidden pt-0'>
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
                                    <Star className='text-amber-400 fill-amber-400' fill='true' />
                                    <Star className='text-amber-400 fill-amber-400' fill='true' />
                                    <Star className='text-amber-400 fill-amber-400' fill='true' />
                                    <Star className='text-amber-400 fill-amber-400' fill='true' />
                                    <StarHalf className='text-amber-400 fill-amber-400' />
                                    <p>({product.ratingsAverage})</p>
                                </div>
                                <p>{formatCurrency(product.price)}</p>
                            </CardContent></Link>
                        <AddToCart productId={product.id} />
                    </Card>
                </div>)}
            </div> :
                <div className=' flex justify-center items-center text-gray-400 min-h-[80vh]'>
                    <h1 className='font-semibold text-xl'>No products found from this brand.</h1>
                </div>}
            </div>
        </div>
    )
}
