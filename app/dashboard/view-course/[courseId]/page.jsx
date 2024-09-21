'use client'

import LoadingDialog from '@/app/_components/LoadingDialog'
import CourseDetails from '@/app/create-course/[courseId]/_components/CourseDetails'
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { Course } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import { ArrowLeftCircle, LoaderCircle } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { toast } from 'sonner'
import CourseComponent from './_components/CourseComponent'
import { useRouter } from 'next/navigation'
import { UserAnswerContext } from '@/app/_context/UserAnswerContext'
import CourseCompletePage from './_components/CourseCompletePage'

const ViewCourse = ({ params }) => {
    const { user } = useUser();
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [activeIndex, setactiveIndex] = useState(0);
    const [course, setCourse] = useState();
    const [bgImage, setBgImage] = useState();

    const [userAnswer, setUserAnswer] = useState([]);

    const getCourseByCourseId = async () => {
        setLoading(true);
        try {
            const result = await db.select()
                .from(Course)
                .where(
                    eq(Course?.courseId, params?.courseId)
                )

            if (result) {
                setCourse(result[0]);
            }
        } catch (error) {
            toast(
                <p className='font-bold text-red-500 text-sm'>Internal error occured while fetching the course</p>
            )
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        user && getCourseByCourseId();
    }, [user, params])

    // check if context array is empty, then disable te next button
    const checkStatus = () => {
        if (userAnswer?.length == 0) {
            return true;
        }
        return false;
    }

    const completeCourse = () => {
        router.replace('/dashboard/courses');
    }

    // generate random number to display random bg image
    const getRandomBgImage = () => {
        const randomNumber = Math.floor(Math.random() * 3) + 1;
        if (randomNumber === 1) {
            setBgImage('bg-img1')
        } else if (randomNumber === 2) {
            setBgImage('bg-img2')
        } else {
            setBgImage('bg-img3')
        }
    }

    useEffect(() => {
        getRandomBgImage();
    }, [])

    return (
        <div className='mb-20 md:mb-0'>
            <UserAnswerContext.Provider value={{ userAnswer, setUserAnswer }}>
                <div className={`min-h-screen w-full overflow-x-hidden flex justify-center items-center ${bgImage} bg-fixed bg-no-repeat bg-cover bg-center no-print`}>
                    <div className='flex flex-col gap-3 p-10 sm:p-5 w-full'>
                        <ArrowLeftCircle className='min-w-10 max-w-10 min-h-10 max-h-10 cursor-pointer' onClick={() => router.replace('/dashboard/courses')} />
                        <h2 className='text-2xl sm:text-6xl font-black linear-text'>{course?.courseOutput?.course?.name}</h2>
                        <p className='text-xs sm:text-lg'>{course?.courseOutput?.course?.description}</p>
                    </div>
                </div>

                <div className='p-10'>
                    <CourseDetails course={course} showTitle={false} />

                    <div>
                        {/* stepper */}
                        <div className='flex flex-col items-center justify-center mt-10 overflow-x-auto card-scroll no-print'>
                            <div className='flex mt-10 mb-7'>
                                {
                                    course?.courseOutput?.course?.chapters?.map((item, index) => (
                                        <div key={item.id || index} className='flex flex-row items-center'>
                                            <div className='flex flex-col items-center w-[50px] md:w-[100px]'>
                                                <div className={`bg-dark-100 p-3 w-5 h-5 text-center flex items-center justify-center rounded-full text-white text-xs ${activeIndex >= index && "linear-bg"}`}>
                                                    {index + 1}
                                                </div>
                                            </div>
                                            {
                                                index !== course?.courseOutput?.course?.chapters?.length - 1 &&
                                                <div className={`h-1 w-[15px] rounded-full bg-gray-300 ${activeIndex - 1 >= index && "linear-bg"}`}></div>
                                            }
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                        <div className=' mt-10'>
                            {/* components */}
                            {
                                course?.courseOutput?.course?.chapters?.map((chapter, index) => (
                                    activeIndex === index && (
                                        <div key={index}>
                                            <CourseComponent chapter={chapter} />
                                        </div>
                                    )
                                ))
                            }
                            {
                                activeIndex >= course?.courseOutput?.course?.chapters?.length && (
                                    <CourseCompletePage course={course} user={user} />
                                )
                            }

                            {/* next & prev btns */}
                            <div className='flex flex-col gap-3 sm:flex-row justify-between mt-10 items-center overflow-auto card-scroll no-print'>
                                <Button onClick={() => setactiveIndex(activeIndex - 1)} disabled={activeIndex === 0} className='min-w-32 border-primary hover:bg-primary hover:text-white' variant={'outline'}>
                                    Previous
                                </Button>
                                {
                                    activeIndex < course?.courseOutput?.course?.chapters?.length &&
                                    <Button onClick={() => setactiveIndex(activeIndex + 1)} className='min-w-32' disabled={checkStatus()}>
                                        Next
                                    </Button>
                                }
                                {
                                    activeIndex === course?.courseOutput?.course?.chapters?.length &&
                                    <Button onClick={() => completeCourse()} className='min-w-32' disabled={checkStatus()}>
                                        {loading ? <LoaderCircle className='animate-spin' /> : 'Complete Course'}
                                    </Button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </UserAnswerContext.Provider>
            <LoadingDialog loading={loading} />
        </div>
    )
}

export default ViewCourse