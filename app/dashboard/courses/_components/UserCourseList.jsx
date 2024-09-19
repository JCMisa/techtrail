'use client'

import LoadingDialog from '@/app/_components/LoadingDialog'
import { db } from '@/utils/db'
import { Course } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import React, { useState, useEffect } from 'react'
import { toast } from 'sonner'
import UserCourseCard from './UserCourseCard'
import SkeletonCard from './SkeletonCard'

const UserCourseList = () => {
  const { user } = useUser();

  const [loading, setLoading] = useState(false);
  const [courseList, setCourseList] = useState([]);

  const getUserCourses = async () => {
    setLoading(true);
    try {
      const result = await db.select()
        .from(Course)
        .where(eq(Course?.createdBy, user?.primaryEmailAddress?.emailAddress))

      if (result) {
        setCourseList(result);
      }
    } catch (error) {
      toast(
        <p className='font-bold text-red-500 text-sm'>Internal error occured while fetching user courses</p>
      )
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    user && getUserCourses();
  }, [user])

  return (
    <>
      {
        courseList?.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
            {
              courseList && courseList?.map((course, index) => (
                <div key={course?.id || index}>
                  <UserCourseCard course={course} refreshData={() => getUserCourses()} />
                </div>
              ))
            }
            <LoadingDialog loading={loading} />
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
            <SkeletonCard />
            <SkeletonCard />
          </div>
        )
      }
    </>
  )
}

export default UserCourseList