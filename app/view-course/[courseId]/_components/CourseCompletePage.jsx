import { useUser } from '@clerk/nextjs'
import React from 'react'
import Certificate from './Certificate'
import { Button } from '@/components/ui/button'

const CourseCompletePage = ({ course, user }) => {
    // download the cert
    const handleDownload = () => {
        window.print();
    };

    return (
        <div>
            <div className='no-print'>
                <h2 className='font-bold text-2xl overflow-hidden'>
                    Congratulations! <span className='linear-text'>{user?.fullName}</span>🎉
                </h2>
                <p className='text-sm text-gray-500'>Congratulations on finishing the {course?.courseOutput?.course?.name}! Your hard work and dedication have paid off. Well done!</p>
            </div>
            {/* certificate */}
            <div className='my-5'>
                <div id='print-area'>
                    <Certificate user={user} course={course} />
                </div>

                <div className='mt-3 no-print'>
                    <Button className="min-w-36" onClick={handleDownload}>
                        Download
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CourseCompletePage