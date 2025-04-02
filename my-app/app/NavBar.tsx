'use client'
import { useSession } from 'next-auth/react';
import Link from 'next/link'
import React from 'react'

const NavBar = () => {
    const { status, data: session } = useSession();

    return (
        <div className='flex bg-slate-200 text-zinc-900 p-5'>
            <Link href='/' className='mr-5'>Next.JS</Link>
            <Link href='/users' className='mr-5'>Users</Link>
            <Link href='/admin' className='mr-5'>Admin</Link>
            {status === 'loading' && <div>Loading...</div>}
            {status === 'authenticated' && <div className='mr-5'>{session.user!.name}
                <Link className='mr-5 ml-3' href="/api/auth/signout">SignOut</Link>
            </div>}

            {status === 'unauthenticated' && <Link href='/api/auth/signin' className='mr-5'>Login</Link>}
        </div>
    )
}

export default NavBar