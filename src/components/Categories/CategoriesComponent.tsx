import { Categories } from '@/Interfaces/CategoriesInterface'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function CategoriesComponent({categories}:{categories:Categories[]}) {
    return (
        <div className="container mx-auto px-4 py-10">

            <h2 className="text-3xl font-bold mb-8">Brands</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories?.map((category) => (
                    <Link href={'/categories/' + category._id} key={category._id}><div
                        key={category._id}
                        className=" rounded-xl shadow-sm p-8 flex flex-col items-center justify-center hover:shadow-md transition"
                    >
                        <Image
                            src={category.image}
                            alt={category.name}
                            width={150}
                            height={80}
                            className="object-cover mb-6 w-100 h-100"
                        />

                        <p className="text-lg font-medium">{category.name}</p>
                    </div></Link>
                ))}

            </div>
        </div>
    )
}
