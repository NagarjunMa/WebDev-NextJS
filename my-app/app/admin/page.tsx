'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

const AdminHomePage = () => {
    const router = useRouter()
    return (
        <div>Admin Home Page
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => router.push('/')}>Go to Home</button>
        </div>
    )
}

export default AdminHomePage