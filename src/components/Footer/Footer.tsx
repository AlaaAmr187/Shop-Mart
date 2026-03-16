import { MapPin, Phone, Mail } from "lucide-react"
import Link from "next/link"

export default function Footer() {
    return (
        <footer className="border-t  mt-10">
            <div className="container mx-auto px-6 py-10 grid md:grid-cols-6 gap-5">

                <div className="md:col-span-2 space-y-4">

                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-black flex items-center justify-center rounded-md">
                            <span className="text-white font-bold text-xl">S</span>
                        </div>

                        <h2 className="text-2xl font-bold">ShopMart</h2>
                    </div>

                    <p className="text-gray-600 leading-relaxed">
                        Your one-stop destination for the latest technology, fashion,
                        and lifestyle products. Quality guaranteed with fast shipping
                        and excellent customer service.
                    </p>

                    <div className="space-y-2 text-gray-600">

                        <div className="flex items-center gap-2">
                            <MapPin size={16} />
                            <span>123 Shop Street, October City, DC 12345</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Phone size={16} />
                            <span>(+20) 01093333333</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Mail size={16} />
                            <span>support@shopmart.com</span>
                        </div>

                    </div>
                </div>


                {/* SHOP */}

                <div>
                    <h3 className="font-semibold mb-4">SHOP</h3>

                    <ul className="space-y-2 text-gray-600">

                        <li><Link href="#">Electronics</Link></li>
                        <li><Link href="#">Fashion</Link></li>
                        <li><Link href="#">Home & Garden</Link></li>
                        <li><Link href="#">Sports</Link></li>
                        <li><Link href="#">Deals</Link></li>

                    </ul>
                </div>


                {/* CUSTOMER SERVICE */}

                <div>
                    <h3 className="font-semibold mb-4">CUSTOMER SERVICE</h3>

                    <ul className="space-y-2 text-gray-600">

                        <li><Link href="#">Contact Us</Link></li>
                        <li><Link href="#">Help Center</Link></li>
                        <li><Link href="#">Track Your Order</Link></li>
                        <li><Link href="#">Returns & Exchanges</Link></li>
                        <li><Link href="#">Size Guide</Link></li>

                    </ul>
                </div>


                {/* ABOUT */}

                <div>
                    <h3 className="font-semibold mb-4">ABOUT</h3>

                    <ul className="space-y-2 text-gray-600">

                        <li><Link href="#">About shopmart</Link></li>
                        <li><Link href="#">Careers</Link></li>
                        <li><Link href="#">Press</Link></li>
                        <li><Link href="#">Investor Relations</Link></li>
                        <li><Link href="#">Sustainability</Link></li>

                    </ul>
                </div>


                {/* POLICIES */}

                <div>
                    <h3 className="font-semibold mb-4">POLICIES</h3>

                    <ul className="space-y-2 text-gray-600">

                        <li><Link href="#">Privacy Policy</Link></li>
                        <li><Link href="#">Terms of Service</Link></li>
                        <li><Link href="#">Cookie Policy</Link></li>
                        <li><Link href="#">Shipping Policy</Link></li>
                        <li><Link href="#">Refund Policy</Link></li>

                    </ul>
                </div>

            </div>
        </footer>
    )
}
