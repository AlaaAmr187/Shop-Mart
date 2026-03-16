import { Brands } from "@/Interfaces/BrandsInterface";
import Image from "next/image";
import Link from "next/link";

export default function BrandsComponent({ brands }: { brands: Brands[] | null }) {
    return (
        <div className="container mx-auto px-4 py-10">

            <h2 className="text-3xl font-bold mb-8">Brands</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                {brands?.map((brand ) => (
                    <Link href={'/brands/' + brand._id} key={brand._id}><div
                        key={brand._id}
                        className=" rounded-xl shadow-sm p-8 flex flex-col items-center justify-center hover:shadow-md transition"
                    >
                        <Image
                            src={brand.image}
                            alt={brand.name}
                            width={150}
                            height={80}
                            className="object-contain mb-6 w-full"
                        />

                        <p className="text-lg font-medium">{brand.name}</p>
                    </div></Link>
                ))}

            </div>
        </div>
    );
}
