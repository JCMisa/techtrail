import { BookOpen, ChartBar, SquarePlay, Timer } from 'lucide-react'
import React from 'react'

const CourseDetails = ({ course }) => {
    return (
        <div className='mt-3'>
            <h2 className='font-bold text-xl'>Details</h2>
            <div className='md:flex md:flex-col grid grid-cols-3 gap-3 mt-2'>
                <div className='flex justify-center items-center gap-2 bg-dark-100 rounded-lg p-3'>
                    <ChartBar className='text-4xl text-primary' />
                    <div>
                        <h2 className='text-xs text-gray-500'>Difficulty Level</h2>
                        <h2 className='font-medium text-lg'>{course?.level}</h2>
                    </div>
                </div>
                <div className='flex justify-center items-center gap-2 bg-dark-100 rounded-lg p-3'>
                    <Timer className='text-4xl text-primary' />
                    <div>
                        <h2 className='text-xs text-gray-500'>Duration</h2>
                        <h2 className='font-medium text-lg'>{course?.courseOutput?.duration}</h2>
                    </div>
                </div>
                <div className='flex justify-center items-center gap-2 bg-dark-100 rounded-lg p-3'>
                    <BookOpen className='text-4xl text-primary' />
                    <div>
                        <h2 className='text-xs text-gray-500'>No. of Chapters</h2>
                        <h2 className='font-medium text-lg'>{course?.courseOutput?.chapters}</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseDetails