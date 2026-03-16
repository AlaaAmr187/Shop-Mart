'use client'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import Image from 'next/image'
import Autoplay from 'embla-carousel-autoplay'

export default function Slider({ images, title }: { images: string[], title: string }) {
    return (
        <div  className="">
            <Carousel className="" opts={{ loop: true  }} plugins={[
                Autoplay({
                    delay: 2000,
                }),
            ]}>
                <CarouselContent className="">
                    {images.map((img, index) =>
                        <CarouselItem key={index} className="">
                            <Image src={img} alt={title} width={400} height={100} className='w-full' />
                        </CarouselItem>
                    )}
                </CarouselContent>
            </Carousel>
        </div>
    )
}



