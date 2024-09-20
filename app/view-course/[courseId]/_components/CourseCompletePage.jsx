import { useUser } from '@clerk/nextjs'
import React from 'react'
import Certificate from './Certificate'

const CourseCompletePage = ({ course, user }) => {
    return (
        <div>
            <div>
                <h2 className='font-bold text-2xl overflow-hidden'>
                    Congratulations! <span className='linear-text'>{user?.fullName}</span>🎉
                </h2>
                <p className='text-sm text-gray-500'>Congratulations on finishing the {course?.courseOutput?.course?.name}! Your hard work and dedication have paid off. Well done!</p>
            </div>
            {/* certificate */}
            //TODO: Print the certificate
            <div className='my-5'>
                <Certificate user={user} course={course} />
            </div>
        </div>
    )
}

export default CourseCompletePage