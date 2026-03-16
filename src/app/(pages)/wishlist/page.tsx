import { geteWishListAction } from "@/Actions/WishListActions"
import WishlistClient from "@/components/WishListClient/WishListClient"
import { wishListres } from "@/Interfaces/wishList"

export default async function WishlistPage() {
    const data: wishListres = await geteWishListAction()

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">My Wishlist</h1>
                <p className="text-gray-500">{data.data.length} Products</p>
            </div>
            <WishlistClient initialProducts={data.data} />
        </div>
    )
}
