'use client'

import { db } from '@/utils/db';
import { Course } from '@/utils/schema';
import { useUser } from '@clerk/nextjs'
import { and, eq } from 'drizzle-orm';
import { ArrowLeftCircle, LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import CourseBasicInfo from './_components/CourseBasicInfo';
import LoadingDialog from '@/app/_components/LoadingDialog';
import CourseChapterList from './_components/CourseChapterList';
import CourseDetails from './_components/CourseDetails';
import { Button } from '@/components/ui/button';
import service from '@/utils/service';

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

    const generateChapterContent = async () => {
        const chapters = course?.courseOutput?.course?.chapters;
        chapters.forEach(async (chapter, index) => {
            setLoading(true);
            try {
                // generate video url
                let videoId = '';
                service.getVideos(course?.courseTitle + ':' + chapter?.chapterName).then(resp => {
                    videoId = resp[0]?.id?.videoId;
                    saveVideoId(videoId);
                })

                const saveVideoId = async (videoId) => {
                    course.courseOutput.course.chapters[index].chapterVideo = videoId;
                    const result = await db.update(Course).set({
                        courseOutput: course?.courseOutput
                    }).where(and(
                        eq(Course?.id, course?.id),
                        eq(Course?.createdBy, course?.createdBy)
                    ))
                    if (result) {
                        toast(
                            <p className='text-sm text-green-500 font-bold'>Congratulations🎉 Your course is ready</p>
                        )
                        router.replace('/dashboard');
                    }
                }
            } catch (error) {
                toast(
                    <p className='text-sm text-red-500 font-bold'>Internal error occured while creating AI Course Content</p>
                )
                console.log('video generation error: ', error);
            } finally {
                setLoading(false);
            }
        })
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
                        <CourseDetails course={course} />
                    </div>
                    {/* more details */}
                    <div>
                        <CourseChapterList course={course} refreshData={() => getCourseByCourseId()} />
                    </div>
                </div>
            </div>

            {/* submit button */}
            <Button onClick={generateChapterContent} className='my-5 float-end'>
                {
                    loading ? (
                        <LoaderCircle className={'animate-spin'} />
                    ) : (
                        'Generate Course'
                    )
                }
            </Button>
            <LoadingDialog loading={loading} />
        </div>
    )
}

export default CourseLayout