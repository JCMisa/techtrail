'use client'

import React, { useState, useContext, useEffect } from 'react'
import LoadingDialog from '../_components/LoadingDialog'
import CourseList from './_components/CourseList'
import { UserInputContext } from '../_context/UserInputContext'
import CourseTopic from './_components/CourseTopic'
import CourseOptions from './_components/CourseOptions'
import { Button } from '@/components/ui/button'
import { Brain, LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'
import { chatSession } from '@/utils/AiModel'

const CreateCoursePage = () => {

    const [loading, setLoading] = useState(false);
    const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

    useEffect(() => {
        console.log('courseInput Context: ', userCourseInput)
    }, [userCourseInput])

    const generateAiCourse = async () => {
        const PROMPT = `Generate a course tutorial on the following details, courseCategory with value of ${userCourseInput?.courseName}, topic with value of ${userCourseInput?.topic}, level with value of ${userCourseInput?.level}, duration with value of ${userCourseInput?.duration}, and chapters which is ${userCourseInput?.chapters}, based on those properties I want additional property called course which has an object value with properties called name which is the name of the course, description which is the description of the course, chapters which is an array of objects and each object has properties called chapterName which is the name of the chapter, about which is what the chapter is all about, duration which is the duration of the chapter, and questions which is an array of five objects where each object has properties as question which is the question related to the current chapter, options which is an array of 3 elements about the possible answers in string format, and answer which is the actual answer for the question, make it in JSON format.`

        setLoading(true);
        try {
            const aiResponse = await chatSession.sendMessage(PROMPT);
            if (aiResponse) {
                console.log('aiResponse: ', JSON.parse(aiResponse.response.text()));
            }
        } catch (error) {
            toast(
                <p className='font-bold text-sm text-red-500'>Internal error occured while generating course</p>
            )
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='p-5 mb-20'>
            <div id='course-select'>
                <h2 className='text-center text-3xl my-5'>Select Your Tech Course</h2>
                <div className='flex justify-center items-center'>
                    <CourseList />
                </div>
            </div>
            {
                userCourseInput?.courseName != null && (
                    <div id='course-topic' className='mt-60'>
                        <CourseTopic />
                    </div>
                )
            }
            {
                userCourseInput?.topic != null && (
                    <div id='course-level' className='mt-60'>
                        <h2 className='text-center text-3xl my-5'>Select Course Options</h2>
                        <CourseOptions />
                    </div>
                )
            }
            {
                (userCourseInput?.level != null && userCourseInput?.duration != null && userCourseInput?.chapters != null) && (
                    <div className='px-10 md:px-20 lg:px-44 mt-5 float-end'>
                        <Button className='min-w-40 max-w-40 flex flex-row items-center gap-2' onClick={() => generateAiCourse()}>
                            {
                                loading ? <LoaderCircle className='animate-spin' /> : <>Generate Course <Brain /></>
                            }
                        </Button>
                    </div>
                )
            }
            <LoadingDialog loading={loading} />
        </div>
    )
}

export default CreateCoursePage