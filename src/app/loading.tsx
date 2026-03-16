import React from 'react'

export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white animate-pulse">
            <div className="text-center">
                <div className="flex items-center justify-center mb-10">
                    <div className="w-12 h-12 bg-black flex items-center justify-center mr-3 rounded-md">
                        <span className="text-white font-bold text-2xl">S</span>
                    </div>
                    <span className="text-3xl font-bold text-black">
                        ShopMart
                    </span>
                </div>
                <div className="relative flex items-center justify-center">
                    <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
                    <div className="absolute w-10 h-10 border-4 border-gray-100 border-b-gray-400 rounded-full animate-spin"></div>
                </div>
                <p className="mt-6 text-gray-500 text-sm tracking-wide">
                    Loading products...
                </p>
            </div>
        </div>
    )
}
