import LoginForm from '@/components/LoginForm/LoginForm'
import React from 'react'

export default function Login() {
    return (
        <div className='flex flex-col gap-3 justify-center items-center h-[80vh]'>
            <h2 className='text-2xl font-bold '>Login</h2>
            <LoginForm/>
        </div>
    )
}
