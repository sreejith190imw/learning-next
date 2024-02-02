import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    return (
        <nav className='flex justify-between items-center bg-slate-900 text-white p-4'>
            <Link href="/" className='hover:text-white hover:font-bold'>Todo App</Link>
            <Link href="/add" className="bg-white text-black hover:brightness-125 hover:underline font-bold p-2">New Todo</Link>
        </nav>
    )
}

export default Navbar;
