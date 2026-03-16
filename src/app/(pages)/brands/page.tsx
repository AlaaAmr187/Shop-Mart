import BrandsComponent from '@/components/Brands/Brands'
import { Root } from '@/Interfaces/BrandsInterface'
import React from 'react'

export default async function Brands() {

        const response = await fetch(`${process.env.API_URL}/brands`)
        const data :Root = await response.json()


    return (
        <div>
            <BrandsComponent brands={data.data || null} />
        </div>
    )
}
