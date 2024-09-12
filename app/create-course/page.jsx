'use client'

import React, { useState } from 'react'
import LoadingDialog from '../_components/LoadingDialog'
import CourseList from './_components/CourseList'

const CreateCoursePage = () => {

    const [loading, setLoading] = useState(false)
    return (
        <div className='p-5'>
            <h2 className='text-center text-3xl my-5'>Select Your Tech Course</h2>
            <div className='flex justify-center items-center'>
                <CourseList />
            </div>
            <LoadingDialog loading={loading} />
        </div>
    )
}

export default CreateCoursePage