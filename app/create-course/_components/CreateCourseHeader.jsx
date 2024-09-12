'use client'

import { UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const CreateCourseHeader = () => {
    const { user } = useUser();
    const router = useRouter();

    return (
        <div className='flex justify-between items-center p-5 shadow-lg'>
            <div className='flex flex-row items-center cursor-pointer' onClick={() => router.push('/')}>
                <Image src={'/techtrail-logo.png'} width={50} height={50} alt='logo' />
                <h2 className='logo-text text-lg -ml-2'>TechTrail</h2>
            </div>
            {
                user && <UserButton />
            }
        </div>
    )
}

export default CreateCourseHeader