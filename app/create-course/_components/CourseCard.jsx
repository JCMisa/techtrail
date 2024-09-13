'use client'

import { UserInputContext } from '@/app/_context/UserInputContext';
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'

const CourseCard = ({ course }) => {
    const router = useRouter();

    const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

    return (
        <div className={`bg-dark-100 w-full min-h-56 max-h-56 rounded-md shadow-md border cursor-pointer ${userCourseInput?.courseName == course.name && 'border-secondary border-2 rounded-xl'}`} onClick={() => router.push('#course-topic')}>
            <div className='flex flex-col gap-3'>
                <div className='rounded-lg w-full h-20 linear-bg relative'>
                    {/* <Image src={course.img} alt='image' width={100} height={100} className='w-full h-32 bg-contain p-2 rounded-lg' /> */}
                    <span className='absolute bottom-2 left-2 text-dark-100'>{course.icon}</span>
                </div>
                <div className='p-2'>
                    <h2 className='text-sm font-bold'>{course.name}</h2>
                    <p className='text-xs text-gray-500'>{course.description.slice(0, 200)}...</p>
                </div>
            </div>
        </div>
    )
}

export default CourseCard