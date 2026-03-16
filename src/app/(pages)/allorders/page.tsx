"use client"

import { useEffect, useState } from "react"

export default function Page() {

    const [orders, setOrders] = useState<any[]>([])

    async function getOrders() {

        const response = await fetch(
            "https://ecommerce.routemisr.com/api/v1/orders/user/" +
            localStorage.getItem("userCartId")
        )

        const data = await response.json()

        const sortedOrders = data.sort(
            (a: any, b: any) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )

        setOrders(sortedOrders)
    }

    useEffect(() => {
        getOrders()
    }, [])

    return (

        <div className="container mx-auto px-6 py-10 mt-20">

            <h1 className="text-3xl font-bold mb-10">My Orders</h1>

            <div className="space-y-10">

                {orders.map((order) => (

                    <div
                        key={order._id}
                        className="border rounded-xl shadow-sm bg-white overflow-hidden"
                    >


                        <div className="bg-gray-50 p-5 flex flex-wrap justify-between gap-4">

                            <div>
                                <p className="text-xs text-gray-500">ORDER ID</p>
                                <p className="font-semibold">{order._id}</p>
                            </div>

                            <div>
                                <p className="text-xs text-gray-500">TOTAL</p>
                                <p className="text-lg font-bold text-green-600">
                                    {order.totalOrderPrice} EGP
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-gray-500">DATE</p>
                                <p>
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </p>
                            </div>

                        </div>



                        <div className="flex gap-3 flex-wrap px-5 pt-4">

                            <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700">
                                {order.paymentMethodType}
                            </span>

                            <span className={`px-3 py-1 text-sm rounded-full
                                ${order.isPaid
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-600"}
                            `}>
                                {order.isPaid ? "Paid" : "Not Paid"}
                            </span>

                            <span className={`px-3 py-1 text-sm rounded-full
                                ${order.isDelivered
                                    ? "bg-green-100 text-green-700"
                                    : "bg-yellow-100 text-yellow-700"}
                            `}>
                                {order.isDelivered ? "Delivered" : "Shipping"}
                            </span>

                        </div>



                        <div className="grid md:grid-cols-3 gap-4 p-5">

                            {order.cartItems.map((item: any) => (

                                <div
                                    key={item._id}
                                    className="flex gap-4 border rounded-lg p-3 hover:shadow-md transition"
                                >

                                    <img
                                        src={item.product.imageCover}
                                        className="w-20 h-20 object-cover rounded-md"
                                    />

                                    <div className="text-sm flex flex-col justify-center">

                                        <p className="font-semibold line-clamp-1">
                                            {item.product.title}
                                        </p>

                                        <p className="text-gray-500">
                                            Qty: {item.count}
                                        </p>

                                        <p className="font-semibold">
                                            {item.price} EGP
                                        </p>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>

                ))}

            </div>

        </div>
    )
}
