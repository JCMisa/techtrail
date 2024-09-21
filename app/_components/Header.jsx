'use client'

import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const Header = () => {
    const { user } = useUser();
    const router = useRouter();

    return (
        <div className='flex justify-between items-center p-5 shadow-lg overflow-hidden'>
            <div className='flex flex-row items-center cursor-pointer' onClick={() => router.replace('/')}>
                <Image src={'/techtrail-logo.png'} width={50} height={50} alt='logo' />
                <h2 className='logo-text text-lg -ml-2'>TechTrail</h2>
            </div>
            {
                user ? (
                    <Button onClick={() => router.push('/dashboard')} className='min-w-40 max-w-40'>Get Started</Button>
                ) : (
                    <Button onClick={() => router.push('/sign-in')} className='min-w-40 max-w-40'>Sign in</Button>
                )
            }
        </div>
    )
}

export default Header