'use client'
import React from 'react'


interface Props {
    error: Error
}

const ErrorPage = ({ error }: Props) => {
    console.log('Error', error)
    return (
        <div>
            <div>An unexpected error has occured
            </div>    
        </div>

    )
}

export default ErrorPage