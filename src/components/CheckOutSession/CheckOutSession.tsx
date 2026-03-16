'use client'
import React, { useRef, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cashCheckOutAction, checkOutAction } from '@/Actions/checkOutAction'
import { ShippingAdress } from '@/Interfaces/CartInterface'
import { Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
export default function CheckOutSession({ cartId }: { cartId: string }) {


    const [loading, setIsLOading] = useState(false);
    const [cashLoading, setCashIsLOading] = useState(false);
    const city = useRef<HTMLInputElement | null>(null);
    const details = useRef<HTMLInputElement | null>(null);
    const phone = useRef<HTMLInputElement | null>(null);
    const router = useRouter()

    async function checkOut() {
        setIsLOading(true)
        const sippingAdress: ShippingAdress = {
            city: city.current?.value as string,
            details: details.current?.value as string,
            phone: phone.current?.value as string,
        }
        const response = await checkOutAction(cartId, sippingAdress);
        console.log(response);
        if (response.status == 'success') {
            location.href = response.session.url
        }
        setIsLOading(false)
    }



    async function CashcheckOut() {
        setCashIsLOading(true)
        const sippingAdress: ShippingAdress = {
            city: city.current?.value as string,
            details: details.current?.value as string,
            phone: phone.current?.value as string,
        }

        const response = await cashCheckOutAction(cartId, sippingAdress);
        console.log(response);
        if (response.status == 'success') {
            toast.success('CheckedOut Successfully');
            dispatchEvent(new CustomEvent('cartUpdated', { detail: 0 }));
            router.push('/allorders')
        }
        setCashIsLOading(false)
    }

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className=' w-full mt-3 h-11 rounded-xl border text-white bg-black hover:bg-accent-foreground'> CheckOut </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Add Shipping Adress</DialogTitle>
                        <DialogDescription>
                            Please , Add Your Shipping Adress
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            <Label htmlFor="city">City</Label>
                            <Input ref={city} id="city" name="city" defaultValue="Cairo" />
                        </Field>
                        <Field>
                            <Label htmlFor="details">Details</Label>
                            <Input ref={details} id="details" name="details" defaultValue="maadi" />
                        </Field>
                        <Field>
                            <Label htmlFor="phone">Phone</Label>
                            <Input ref={phone} id="phone" name="phone" defaultValue="01283356737" />
                        </Field>
                    </FieldGroup>
                    <DialogFooter>
                        <div className="flex w-full flex-col">
                            <div className="flex w-full justify-between gap-2 mb-5">
                                <Button onClick={checkOut} type="submit" disabled={loading} className='grow'>
                                    {loading && <Loader2 className='animate-spin' />}
                                    Online CheckOut
                                </Button>
                                <Button onClick={CashcheckOut} type="submit" disabled={cashLoading} className='grow'>
                                    {cashLoading && <Loader2 className='animate-spin' />}
                                    Cash CheckOut
                                </Button>
                            </div>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
