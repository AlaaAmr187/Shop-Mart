'use server'
import { FailedLogin, Payload, successLogin } from "@/Interfaces/AuthInterface";
import { schema } from "@hookform/resolvers/ajv/src/__tests__/__fixtures__/data.js";
import * as z from "zod";

export default async function signUpApi(payload: Payload) {
    const response = await fetch(
        `https://ecommerce.routemisr.com/api/v1/auth/signup`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        }
    )

    const data = await response.json()
    return data;
}



export async function forgetAction(email: string) {
    const response = await fetch(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        }
    )

    const data = await response.json()
    return data;
}


export async function varifyCodeAction(resetCode: string) {
    const response = await fetch(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ resetCode }),
        }
    )

    const data = await response.json()
    return data;
}



export async function resetPasswordAction(email: string, values: { password: string }) {
    const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email,
                newPassword: values.password
            })
        }
    );

    const data = await response.json();
    return data;
}


