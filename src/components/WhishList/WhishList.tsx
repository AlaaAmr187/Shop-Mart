'use client'
import { addToWishListAction, deleteWishListAction, geteWishListAction } from '@/Actions/WishListActions'
import { product } from '@/Interfaces/productInterface'
import { AddToListRes } from '@/Interfaces/wishList'
import { Heart } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'



export default function WishList({ productId }: { productId: string }) {
    const [isFavorite, setIsFavorite] = useState(false)

    async function checkWishlist() {
        try {
            const data = await geteWishListAction()

            const products = data?.data ?? []

            const exists = products.some((p: product) => p.id === productId)
            setIsFavorite(exists)
        } catch (error) {
            console.error("Error fetching wishlist:", error)
            setIsFavorite(false)
        }
    }

    useEffect(() => {
        checkWishlist()
    }, [productId])

    async function toggleWishlist() {
        if (!isFavorite) {
            const data: AddToListRes = await addToWishListAction(productId)
            if (data.status === 'success') {
                toast.success("Added to wishlist")
                setIsFavorite(true)
            }
        } else {
            const data = await deleteWishListAction(productId)
            if (data.status === 'success') {
                toast.success("Removed from wishlist")
                setIsFavorite(false)
                window.dispatchEvent(new CustomEvent('wishlistUpdated', { detail: productId }))
            }
        }
    }

    return (
        <Heart
            onClick={toggleWishlist}
            className={`cursor-pointer transition ${isFavorite ? "fill-black text-black" : "text-gray-400"}`}
        />
    )
}
