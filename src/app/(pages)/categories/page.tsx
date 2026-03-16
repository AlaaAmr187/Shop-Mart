import CategoriesComponent from '@/components/Categories/CategoriesComponent';
import { RootCAt } from '@/Interfaces/CategoriesInterface';
import React from 'react'

export default async function Categories() {
    const response = await fetch(`${process.env.API_URL}/categories`);
    const data:RootCAt = await response.json()
    return (
        <div>
            <CategoriesComponent categories={data.data}/>
        </div>
    )
}
