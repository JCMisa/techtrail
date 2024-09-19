'use client'

import { db } from '@/utils/db'
import { Course } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Dot, EllipsisVertical } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'
import DropdownOption from './DropdownOption'

{/* <div classNameName="card-c w-full sm:w-[230px]">
                <div classNameName="top-section-c relative">
                    <div classNameName="border-c"></div>
                    <div classNameName="icons-c">
                        <div classNameName="logo-c">
                            <Image src={'/techtrail-logo.png'} width={100} height={100} alt={'logo'} />
                        </div>
                        <div classNameName="social-media-c">
                            <Dot classNameName='svg-c' />
                            <Dot classNameName='svg-c' />
                            <Dot classNameName='svg-c' />
                        </div>
                    </div>
                    <div classNameName='w-[70%] h-20 absolute top-12 left-8 hidden sm:block'>
                        <Image src={course?.courseBanner} width={100} height={100} alt='banner' classNameName='w-full h-full bg-cover rounded-lg' />
                    </div>
                </div>
                <div classNameName="bottom-section-c">
                    <span classNameName="title-c">{course?.courseOutput?.course?.name?.slice(0, 15)}...</span>
                    <div classNameName="row-c row1-c">
                        <div classNameName="item-c">
                            <span classNameName="big-text-c">{course?.courseOutput?.level}</span>
                            <span classNameName="regular-text-c">Level</span>
                        </div>
                        <div classNameName="item-c">
                            <span classNameName="big-text-c">{course?.courseOutput?.duration}</span>
                            <span classNameName="regular-text-c">Duration</span>
                        </div>
                        <div classNameName="item-c">
                            <span classNameName="big-text-c">{course?.courseOutput?.chapters}</span>
                            <span classNameName="regular-text-c">Chapters</span>
                        </div>
                    </div>
                </div>
            </div> */}

const UserCourseCard = ({ course, refreshData, displayUser = false }) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const deleteCourse = async (id) => {
        setLoading(true);
        try {
            const data = await db.delete(Course)
                .where(eq(Course?.id, id))

            if (data) {
                toast(
                    <p className='font-bold text-green-500 text-sm'>Course deleted successfully</p>
                )
                refreshData();
            }
        } catch (error) {
            toast(
                <p className='font-bold text-red-500 text-sm'>Internal error occured while deleting the course</p>
            )
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full bg-dark-100 border border-dark-300 rounded-lg shadow-md">
            <Link href="#">
                <Image className="rounded-t-lg w-full min-h-[200px] max-h-[200px]" src={course?.courseBanner} alt="banner" width={1000} height={1000} />
            </Link>
            <div className="p-5">
                <Link href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">{course?.courseOutput?.course?.name?.slice(0, 30)}...</h5>
                </Link>
                <p className="mb-3 font-normal text-gray-400">{course?.courseOutput?.course?.description?.slice(0, 50)}....</p>
                <div className='flex flex-row items-center justify-between'>
                    <Link href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white linear-bg rounded-lg hover:bg-primary focus:ring-4 focus:outline-none focus:ring-blue-300">
                        Read more
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </Link>
                    {!displayUser && <DropdownOption children={<EllipsisVertical />} deleteCourse={() => deleteCourse(course?.id)} />}
                </div>
            </div>
        </div >

    )
}

export default UserCourseCard