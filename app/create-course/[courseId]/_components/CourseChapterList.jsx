
import { Clock, TableOfContents } from 'lucide-react'
import React from 'react'
import EditCourseChapters from './EditCourseChapters'

const CourseChapterList = ({ course, refreshData, edit = true }) => {
    return (
        <div className='mt-3'>
            <h2 className='font-bold text-xl'>Chapters</h2>
            <div className='mt-2 flex flex-col gap-2'>
                {
                    course?.courseOutput?.course?.chapters?.map((chapter, index) => (
                        <div key={index} className='border p-5 rounded-lg shadow-md bg-dark-100 flex items-center justify-between gap-5'>
                            <div className='flex gap-5 items-center'>
                                <h2 className='bg-primary flex-none h-10 w-10 text-white rounded-full text-center items-center justify-center p-2'>
                                    {index + 1}
                                </h2>
                                <div>
                                    <h2 className='font-medium text-lg'>
                                        {chapter?.chapterName}
                                        {edit && <EditCourseChapters course={course} chapterIndex={index} refreshData={refreshData} />}
                                    </h2>
                                    <p className='text-sm text-gray-500'>{chapter?.about}</p>
                                    <p className='flex flex-row items-center gap-2 text-primary text-xs'><Clock className='w-3 h-3' /> {chapter?.duration}</p>
                                </div>
                            </div>
                            <TableOfContents className='text-4xl text-gray-500 flex-none' />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default CourseChapterList
