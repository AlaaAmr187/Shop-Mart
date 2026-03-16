"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast/headless"
import signUpApi from "@/Actions/SignUpAction"
import { FailedLogin, Payload, successLogin } from "@/Interfaces/AuthInterface"
import Link from "next/link"

const registerSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email").nonempty("Email is required"),
    password: z.string()
        .nonempty("Password is required")
        .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
            "Password must be 8+ chars with uppercase, lowercase, number & special char"),
    rePassword: z.string(),
    phone: z.string()
        .regex(/^\d{10,15}$/, "Phone number must be 10-15 digits")
})
    .refine((data) => data.password === data.rePassword, {
        message: "Passwords do not match",
        path: ["rePassword"],
    })

type RegisterData = z.infer<typeof registerSchema>

export default function Register() {

    const { register, handleSubmit, formState: { errors } } = useForm<RegisterData>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: ""
        },
        resolver: zodResolver(registerSchema),
    })

    const router = useRouter()
    const [loading, setLoading] = useState(false)

    async function signUp(values: RegisterData) {
        setLoading(true)
        try {
            const payload: Payload = {
                name: values.name,
                email: values.email,
                password: values.password,
                rePassword: values.rePassword,
                phone: values.phone
            };

            const data = await signUpApi(payload);

            if (data.message === 'success') {
                router.push('/login')
            } else {
                console.log(data.errors.msg)
                toast.error(data.errors.msg)
            }

        } catch (error) {
            console.log(error)
            toast.error('failed to register')
        }
        setLoading(false)
    }




    return (
        <div className="max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-6">Register</h2>

            <form onSubmit={handleSubmit(signUp)} className="space-y-4">

                <div>
                    <Input placeholder="Name" {...register("name")} disabled={loading} />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>

                <div>
                    <Input placeholder="Email" {...register("email")} disabled={loading} />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                <div>
                    <Input type="password" placeholder="Password" {...register("password")} disabled={loading} />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>

                <div>
                    <Input type="password" placeholder="Confirm Password" {...register("rePassword")} disabled={loading} />
                    {errors.rePassword && <p className="text-red-500 text-sm">{errors.rePassword.message}</p>}
                </div>

                <div>
                    <Input placeholder="Phone" {...register("phone")} disabled={loading} />
                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                </div>

                <Button
                    type="submit"
                    className="w-full flex justify-center items-center gap-2"
                    disabled={loading}
                >
                    {loading ? <><Loader2 className="animate-spin" /> Registering...</> : "Register"}
                </Button>

            </form>
            <p className="flex justify-center pt-3">If you don't have account, please <Link className="text-blue-800" href={'/login'}> LogIn </Link> Now</p>
        </div>
    )
}
