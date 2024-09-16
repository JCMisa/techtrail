import React from 'react'
import UploadImage from './UploadImage'
import { LayoutGrid, PenBox } from 'lucide-react'
import EditCourseInfo from './EditCourseInfo'

const CourseBasicInfo = ({ course, refreshData, edit = true }) => {
    return (
        <div className='p-10 flex flex-col md:flex-row items-center justify-between gap-10'>
            <div className='flex flex-col gap-1'>
                <h2 className='text-xl font-bold'>
                    {course?.courseOutput?.course?.name}
                    {edit && <EditCourseInfo course={course} refreshData={refreshData} />}
                </h2>
                <div className='flex items-center gap-2 text-primary'>
                    <LayoutGrid className='w-5 h-5' />
                    <p className='text-sm'>{course?.courseName}</p>
                </div>
                <p className='text-gray-500 text-xs mt-2'>{course?.courseOutput?.course?.description}</p>
            </div>
            <div>
                <UploadImage course={course} edit={edit} />
            </div>
        </div>
    )
}

export default CourseBasicInfo