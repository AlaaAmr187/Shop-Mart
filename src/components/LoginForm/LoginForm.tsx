"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from 'react-hot-toast'
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import ForgetPassword from "../ForgetPassword/ForgetPassword"


const formSchema = z.object({
    email: z.email('invalid email').nonempty('email is required'),

    password: z.string('invalid password').nonempty('password is required').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, 'invalid password')
})
export default function LoginForm() {

    const [isLoading, setLoading] = useState(false);
    const searchParams = useSearchParams();
    const redirectUrl = searchParams.get('url');
    const error = searchParams.get('error')

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });


    useEffect(() => {
        if (error) {
            toast.error('Invalid email or password')
        }
    }, [error])


    const router = useRouter()
    async function onSubmit(data: z.infer<typeof formSchema>) {
        setLoading(true);
        const response = await signIn('credentials', {
            email: data.email,
            password: data.password,
            callbackUrl: redirectUrl ? redirectUrl : '/',
            redirect: true
        })
        setLoading(false);
    }

    return (<div className="w-full sm:max-w-md">
        <Card className="">
            <CardContent>
                <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="email"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-email">
                                        Email
                                    </FieldLabel>
                                    <Input
                                        type="email"
                                        {...field}
                                        id="form-rhf-demo-email"
                                        aria-invalid={fieldState.invalid}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="password"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-password">
                                        Password
                                    </FieldLabel>
                                    <Input
                                        type="password"
                                        {...field}
                                        id="form-rhf-demo-password"
                                        aria-invalid={fieldState.invalid}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter>
                <div className="flex justify-between w-full">
                <Field orientation="horizontal" className="">
                    <Button type="button" variant="outline" onClick={() => form.reset()}>
                        Reset
                    </Button>
                    <Button disabled={isLoading} type="submit" form="form-rhf-demo">
                        {isLoading && <Loader2 className="animate-spin" />}
                        Submit
                    </Button>
                </Field>
                <ForgetPassword/>
                </div>
            </CardFooter>
        </Card>
        <p className="flex justify-center pt-3">If you don't have account, please <Link className="text-blue-800" href={'/register'}> SignUp </Link> Now</p>
    </div>
    )
}

