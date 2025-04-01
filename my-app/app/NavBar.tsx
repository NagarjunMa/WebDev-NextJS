import Link from 'next/link'
import React from 'react'

const NavBar = () => {
    return (
        <div className='flex bg-slate-200 text-zinc-900 p-5'>
            <Link href='/' className='mr-5'>Next.JS</Link>
            <Link href='/users' className='mr-5'>Users</Link>
            <Link href='/admin' className='mr-5'>Admin</Link>
            <Link href='/api/auth/signin' className='mr-5'>Login</Link>
        </div>
    )
}

export default NavBar