'use client'

import React, { useState, useContext, useEffect } from 'react'
import LoadingDialog from '../_components/LoadingDialog'
import CourseList from './_components/CourseList'
import { UserInputContext } from '../_context/UserInputContext'
import CourseTopic from './_components/CourseTopic'
import CourseOptions from './_components/CourseOptions'

const CreateCoursePage = () => {

    const [loading, setLoading] = useState(false)
    const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

    useEffect(() => {
        console.log('courseInput Context: ', userCourseInput)
    }, [userCourseInput])

    return (
        <div className='p-5 mb-20'>
            <div id='course-select'>
                <h2 className='text-center text-3xl my-5'>Select Your Tech Course</h2>
                <div className='flex justify-center items-center'>
                    <CourseList />
                </div>
            </div>
            {
                userCourseInput?.courseName != null && (
                    <div id='course-topic' className='mt-60'>
                        <CourseTopic />
                    </div>
                )
            }
            {
                userCourseInput?.topic != null && (
                    <div id='course-level' className='mt-60'>
                        <h2 className='text-center text-3xl my-5'>Select Course Options</h2>
                        <CourseOptions />
                    </div>
                )
            }
            <LoadingDialog loading={loading} />
        </div>
    )
}

export default CreateCoursePage