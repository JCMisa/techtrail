'use client'

import { db } from '@/utils/db';
import { Course } from '@/utils/schema';
import { useUser } from '@clerk/nextjs'
import { and, eq } from 'drizzle-orm';
import { ArrowLeftCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import CourseBasicInfo from './_components/CourseBasicInfo';
import LoadingDialog from '@/app/_components/LoadingDialog';
import CourseChapterList from './_components/CourseChapterList';

const CourseLayout = ({ params }) => {
    const { user } = useUser();
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [course, setCourse] = useState();

    useEffect(() => {
        params && getCourseByCourseId();
    }, [params, user])

    const getCourseByCourseId = async () => {
        setLoading(true);
        try {
            const result = await db.select()
                .from(Course)
                .where(
                    and(
                        eq(Course?.createdBy, user?.primaryEmailAddress?.emailAddress),
                        eq(Course?.courseId, params?.courseId)
                    )
                )
            if (result.length > 0) {
                setCourse(result[0]);
            }
        } catch (error) {
            toast(
                <p className='font-bold text-sm text-red-500'>Internal error occured while fetching courses</p>
            )
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='p-5'>
            <div className='flex flex-row items-center justify-center gap-2 my-5'>
                <ArrowLeftCircle className='cursor-pointer' onClick={() => router.push('/dashboard')} />
                <h2 className='text-center text-3xl font-bold'>Review Your Course</h2>
            </div>

            <div className='flex flex-col gap-3'>
                {/* basic info */}
                <div className='bg-dark-100 rounded-lg'>
                    <CourseBasicInfo course={course} refreshData={() => getCourseByCourseId()} />
                </div>

                <div className='flex flex-col md:flex-row gap-3'>
                    {/* chapter list */}
                    <div>
                        <CourseChapterList course={course} refreshData={() => getCourseByCourseId()} />
                    </div>
                    {/* more details */}
                    <div></div>
                </div>
            </div>
            <LoadingDialog loading={loading} />
        </div>
    )
}

export default CourseLayout