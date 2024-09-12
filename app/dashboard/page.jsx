'use client'

import React from 'react'
import AddCourseButton from './_components/AddCourseButton'
import { useUser } from '@clerk/nextjs'

const DashboardPage = () => {
    const { user } = useUser();

    return (
        <div className='p-5'>
            <div className='flex flex-row items-center justify-between'>
                <div>
                    <h2 className='text-3xl'>Welcome! <span className='linear-text'>{user ? user?.firstName : "Unknown"}</span></h2>
                    <p className='text-gray-500 text-sm'>Discover tailored course content, and interactive exercises to master your coding skills.</p>
                </div>
                <AddCourseButton />
            </div>
        </div>
    )
}

export default DashboardPage