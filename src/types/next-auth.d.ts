import { UserInterface } from "@/Interfaces/AuthInterface"
import NextAuth, { User } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {

    interface Session {
        user: UserInterface
        token: string
    }

    interface User {
        userRes: UserInterface
        tokenRes: string
    }
}



declare module "next-auth/jwt" {
    interface JWT extends User{}
}