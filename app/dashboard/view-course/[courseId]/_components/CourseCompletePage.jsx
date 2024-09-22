'use client'

import React, { useContext } from 'react'
import Certificate from './Certificate'
import { Button } from '@/components/ui/button'
import { ShieldCheck } from 'lucide-react'
import { UserSubscriptionContext } from '@/app/_context/UserSubscriptionContext'
import CongratulatoryMessage from './CongratulatoryMessage'
import Link from 'next/link'

const CourseCompletePage = ({ course, user }) => {
    // download the cert
    const handleDownload = () => {
        window.print();
    };

    const { userSubscription, setUserSubsciption } = useContext(UserSubscriptionContext);

    return (
        <div>
            <div className='no-print'>
                <h2 className='font-bold text-2xl overflow-hidden'>
                    Congratulations! <span className='linear-text'>{user?.fullName}</span>🎉
                </h2>
                <p className='text-sm text-gray-500'>Congratulations on finishing the {course?.courseOutput?.course?.name}! Your hard work and dedication have paid off. Well done!</p>
            </div>
            {/* congratulatory message */}
            <div className='no-print'>
                <CongratulatoryMessage />
            </div>
            {/* certificate */}
            {
                userSubscription ? (<div className='my-5'>
                    <div id='print-area' className='hidden sm:block'>
                        <Certificate user={user} course={course} />
                    </div>
                    <div className="sm:w-1/2 w-full block sm:hidden">
                        <div className="bg-dark-200 rounded flex p-4 h-full items-center overflow-auto card-scroll">
                            <ShieldCheck className="text-primary w-6 h-6 flex-shrink-0 mr-4" />
                            <span className="title-font font-medium text-white">Completion Certificate Earned 🎉</span>
                        </div>
                    </div>

                    <div className='mt-3 no-print overflow-auto card-scroll'>
                        <Button className="min-w-36" onClick={handleDownload}>
                            Download
                        </Button>
                    </div>
                </div>) : (
                    <div>
                        <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                            <div className="h-full flex items-center border-primary border p-4 rounded-lg">
                                <div className="flex-grow">
                                    <h2>Upgrade to PRO and receive a course completion certificate</h2>
                                    <Link href={'/dashboard/upgrade'} className="text-gray-600 cursor-pointer">Upgrade</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default CourseCompletePage