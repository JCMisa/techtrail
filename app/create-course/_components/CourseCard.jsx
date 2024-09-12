import Image from 'next/image'
import React from 'react'

const CourseCard = ({ course }) => {
    return (
        <div className='bg-dark-100 w-full min-h-56 max-h-56 rounded-md shadow-md cursor-pointer'>
            <div className='flex flex-col gap-10'>
                <div className='rounded-lg w-full h-20 linear-bg'>
                    <Image src={course.img} alt='image' width={100} height={100} className='w-full h-32 bg-contain p-2 rounded-lg' />
                </div>
                <div className='p-2'>
                    <h2 className='text-sm font-bold'>{course.name}</h2>
                    <p className='text-xs text-gray-500'>{course.description.slice(0, 50)}...</p>
                </div>
            </div>
        </div>
    )
}

export default CourseCard