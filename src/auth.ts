import { FailedLogin, successLogin } from "@/Interfaces/AuthInterface";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"


export const authOptions:AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'ShoPmart',
            credentials: {
                email: { type: 'email' },
                password: { type: 'password' }
            },
            async authorize(data) {
                const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signin', {
                    method: 'POST',
                    body: JSON.stringify({ email: data?.email, password: data?.password }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const payload: successLogin | FailedLogin = await response.json();

                if ("user" in payload) {
                    return {
                        id: payload.user.email,
                        userRes: payload.user,
                        tokenRes: payload.token,
                    };
                } else {
                    throw new Error(payload.message);
                }

            }
        })
    ],
    pages: {
        signIn: '/login',
        error: '/login'
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.tokenRes = user.tokenRes;
                token.userRes = user.userRes;
            }
            return token
        },
        async session({ session, token }) {
            if (token) {
                session.user = token.userRes;
                        session.token = token.tokenRes;
            }
            return session
        },
    }
}