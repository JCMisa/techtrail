'use client'

import { db } from '@/utils/db';
import { Course } from '@/utils/schema';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import SkeletonCard from '../courses/_components/SkeletonCard';
import LoadingDialog from '@/app/_components/LoadingDialog';
import UserCourseCard from '../courses/_components/UserCourseCard';
import { desc } from 'drizzle-orm';
import { Button } from '@/components/ui/button';

const ExplorePage = () => {
    const [loading, setLoading] = useState(false);
    const [courseList, setCourseList] = useState([]);
    const [pageIndex, setPageIndex] = useState(0);

    const getAllCourses = async () => {
        setLoading(true);
        try {
            const result = await db.select().from(Course)
                .limit(4)
                .offset(pageIndex * 4)
                .orderBy(desc(Course?.id));
            if (result.length > 0) {
                setCourseList(result);
            }
        } catch (error) {
            toast(
                <p className='text-sm font-bold text-red-500'>Internal error occured while fetching all courses</p>
            )
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getAllCourses();
    }, [pageIndex]);

    return (
        <div className='p-5 mb-20 md:mb-0'>
            <h2 className='text-3xl'>Explore Courses</h2>
            <p className='text-sm text-gray-500'>Dive deeper into your learning journey.</p>
            <div className='my-5'>
                {
                    courseList?.length > 0 ? (
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                            {
                                courseList && courseList?.map((course, index) => (
                                    <div key={course?.id || index}>
                                        <UserCourseCard course={course} displayUser={true} />
                                    </div>
                                ))
                            }
                        </div>
                    ) : (
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                            <SkeletonCard />
                            <SkeletonCard />
                        </div>
                    )
                }
            </div>

            <div className='mt-5 flex justify-between items-center'>
                {pageIndex != 0 && <Button variant='outline' onClick={() => setPageIndex(pageIndex - 1)}>Previous Page</Button>}
                {pageIndex == courseList.length - 1 ? <Button variant='outline'>Last Page</Button> : <Button onClick={() => setPageIndex(pageIndex + 1)}>Next Page</Button>}
            </div>

            <LoadingDialog loading={loading} />
        </div>
    )
}

export default ExplorePage