export interface successLogin {
    message: string
    user: UserInterface
    token: string
}

export interface FailedLogin {
    message: string
    statusMsg: string
}

export interface UserInterface {
    name: string
    email: string
    role: string
}


export interface Payload {
    name: string
    email: string
    password: string
    rePassword: string
    phone: string
}


export interface ForgetPasswordRes {
    statusMsg: string
    message: string
}

export type VerifyCodeRes =
    | {
        status: "Success"
    }
    | {
        statusMsg: string
        message: string
    }




