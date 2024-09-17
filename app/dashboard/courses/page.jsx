import React from 'react'
import AddCourseButton from '../_components/AddCourseButton'
import UserCourseList from './_components/UserCourseList'

const Courses = () => {
    return (
        <div className='p-5'>
            <div className='flex flex-row items-center justify-between'>
                <div>
                    <h2 className='text-3xl'>My Courses</h2>
                    <p className='text-gray-500 text-sm'>Visit and manage your courses.</p>
                </div>
                <AddCourseButton />
            </div>
            <div className='my-10'>
                <UserCourseList />
            </div>
        </div>
    )
}

export default Courses