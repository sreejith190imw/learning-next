import Link from 'next/link'
import React from 'react'
import Modal from "@/components/Modal";
import Register from './Register';


const Login = () => {
    return (
        <div>
        <Modal Content={<Register />} />

            <Link href="?modal=true">
                <button type="button" className="bg-blue-500 text-white p-2">Open Modal</button>
            </Link>

        </div>
    )
}

export default Login
