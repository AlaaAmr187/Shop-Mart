"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog, DialogClose, DialogContent, DialogDescription,
    DialogFooter, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog"
import { Field, FieldGroup } from '../ui/field'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { forgetAction, resetPasswordAction, varifyCodeAction } from '@/Actions/SignUpAction'
import toast from 'react-hot-toast'
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from 'lucide-react'

const resetPasswordSchema = z.object({
    password: z.string()
        .nonempty('Password is required')
        .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'Invalid password')
});

export default function ForgetPassword() {
    const [sendCodeLoding, SetSendCodeLoding] = useState(false);
    const [verifyCodeLoding, SetVerifyCodeLoding] = useState(false);
    const [resetPasswordLoding, SetResetPasswordeLoding] = useState(false);

    const [email, setEmail] = useState("")
    const [resetCode, setResetCode] = useState("")
    const [step, setStep] = useState(1)

    const { register, handleSubmit, formState: { errors }, reset }
        = useForm<z.infer<typeof resetPasswordSchema>>({
            resolver: zodResolver(resetPasswordSchema)
        });

    async function sendCode() {
        SetSendCodeLoding(true);
        if (!email) {
            toast.error("Please enter your email"); return
        }
        const data = await forgetAction(email);
        if (data.statusMsg === "success") {
            toast.success(data.message); setStep(2)
        }
        else toast.error(data.message)
        SetSendCodeLoding(false);
    }

    async function verifyCode() {
        SetVerifyCodeLoding(true);
        if (!resetCode) {
            toast.error("Enter reset code"); return
        }
        const data = await varifyCodeAction(resetCode)
        if ("status" in data && data.status === "Success") {
            toast.success("Code verified"); setStep(3)
        }
        else if ("message" in data) toast.error(data.message)
        SetVerifyCodeLoding(false)
    }

    async function resetPassword(values: z.infer<typeof resetPasswordSchema>) {
        SetResetPasswordeLoding(true);
        const data = await resetPasswordAction(email, { password: values.password });
        if (data.token) {
            toast.success("Password changed successfully")
            setStep(1)
            setEmail("")
            setResetCode("")
            reset()
        } else toast.error(data.message || "Something went wrong")
        SetResetPasswordeLoding(false);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Forget Password</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>Forget Password</DialogTitle>
                    <DialogDescription>Recover your account password</DialogDescription>
                </DialogHeader>

                <FieldGroup>

                    {step === 1 && (
                        <Field>
                            <Label>Email</Label>
                            <Input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                            />
                        </Field>
                    )}

                    {step === 2 && (
                        <Field>
                            <Label>Reset Code</Label>
                            <Input
                                value={resetCode}
                                onChange={(e) => setResetCode(e.target.value)}
                                placeholder="Enter reset code"
                            />
                        </Field>
                    )}

                    {step === 3 && (
                        <form onSubmit={handleSubmit(resetPassword)} className="w-full space-y-2">
                            <Field>
                                <Label>New Password</Label>
                                <Input type="password" placeholder="Enter new password" {...register("password")} />
                                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                            </Field>
                            <Button disabled={resetPasswordLoding} type="submit" className="w-full">{resetPasswordLoding && <Loader2 className='animate-spin' />}Reset Password</Button>
                        </form>
                    )}

                </FieldGroup>

                {step !== 3 && (
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        {step === 1 && <Button disabled={sendCodeLoding} onClick={sendCode}>{sendCodeLoding && <Loader2 className='animate-spin' />}Send Code</Button>}
                        {step === 2 && <Button disabled={verifyCodeLoding} onClick={verifyCode}>{verifyCodeLoding && <Loader2 className='animate-spin' />}Verify Code</Button>}
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    )
}
